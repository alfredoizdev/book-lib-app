'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { ZodType } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props<T extends FieldValues> {
  type: 'SIGN_IN' | 'SIGN_UP'
  schema: ZodType<T>
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  defaultValues?: T
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN'

  const router = useRouter()

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const { success, error } = await onSubmit(data)

    if (success) {
      toast.success('Success', {
        description: isSignIn
          ? 'You have successfully signed in'
          : 'You have successfully signed up',
      })

      router.push('/')
    } else {
      toast.error(`Error ${isSignIn ? 'on sign in' : 'on sign up'}`, {
        description: error ?? 'An error occurred',
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignIn ? 'Welcome Back to Bookshelf' : 'Create you library account'}
      </h1>
      <p className='text-base font-medium'>
        {isSignIn
          ? 'Sign in to continue to your account.'
          : 'Sign up to create your library account please upload you university Id.'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6 w-full'
        >
          {Object.keys(defaultValues ?? {}).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white capitalize'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className='form-input bg-gray-700'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='submit'
            className='font-btn text-gray-950 text-lg font-BebasNeue'
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>
      <p className='text-center text-base font-medium'>
        {isSignIn ? "Don't have an account? " : 'Already have an account? '}

        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className='text-yellow-300'
        >
          {isSignIn ? 'Create Account' : 'Sign In'}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
