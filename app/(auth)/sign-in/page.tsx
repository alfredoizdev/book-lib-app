'use client'
import AuthForm from '@/components/AuthForm'
import { signInWithCredentialsAction } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validations'

const SignInPage = () => {
  return (
    <AuthForm
      type='SIGN_IN'
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={signInWithCredentialsAction}
    />
  )
}

export default SignInPage
