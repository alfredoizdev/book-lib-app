'use server'

import { signIn } from '@/auth'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { IAuthCredentials } from '@/interfaces/Credentials'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'
// import { workflowClient } from '../workflow'
// import config from '../config'

export const signInWithCredentialsAction = async (
  params: Pick<IAuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'

  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return redirect('/too-fast')
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: result.error }
    }

    return { success: true, error: '' }
  } catch (error) {
    console.log('ERROR-HERE', error)
    return { success: false, error: 'Invalid Credentials' }
  }
}

export const singUpAction = async (
  params: IAuthCredentials
): Promise<{
  success: boolean
  error: string
}> => {
  const { email, fullName, password, universityId, universityCard } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'

  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return redirect('/too-fast')
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (user.length > 0) {
      return {
        success: false,
        error: 'User already exists',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      email,
      fullName,
      password: hashedPassword,
      universityId,
      universityCard,
    })

    // await workflowClient.trigger({
    //   url: `${config.env.prodApiEndPoint}/api/workflows/onboarding`,
    //   body: {
    //     email,
    //     fullName,
    //   },
    // })

    await signInWithCredentialsAction({ email, password })

    return {
      success: true,
      error: '',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Internal server error',
    }
  }
}
