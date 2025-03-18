'use client'
import AuthForm from '@/components/AuthForm'
import { singUpAction } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validations'

const SignUpPage = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      schema={signUpSchema}
      defaultValues={{
        email: '',
        password: '',
        fullName: '',
        universityId: 0,
        universityCard: '',
      }}
      onSubmit={singUpAction}
    />
  )
}

export default SignUpPage
