import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'
import { useAuth } from 'hooks/auth'
import { useRouter } from 'next/router'

interface IEvent {
  preventDefault: () => void
}

function PasswordReset() {
  const { query } = useRouter()

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const [submitting, setSubmittingState] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = (event: IEvent) => {
    event.preventDefault()

    setSubmittingState(true)
    resetPassword({
      email,
      password,
      password_confirmation,
      setErrors,
      setStatus,
    })
    setSubmittingState(false)
  }

  useEffect(() => {
    setEmail(query ? query.email as string : '')
  }, [query])

  const { mode } = useContext(WindmillContext)
  const imgSource = mode === 'dark' ? '/assets/img/forgot-password-office-dark.jpeg' : '/assets/img/forgot-password-office.jpeg'

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout='fill'
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={submitForm} className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Reset Password
              </h1>
              {
                errors.length && !submitting
                  ? <h6 className='mb-4 text-red-500 text-xs'>{errors[0]}</h6>
                  : ``
              }
              {status && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                  {status}
                </div>
              )}

              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="your@email.com" required value={email} onChange={event => setEmail(event.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" placeholder="***************" type="password" required value={password} onChange={event => setPassword(event.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input className="mt-1" placeholder="***************" type="password" required value={password_confirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
              </Label>

              <Button type='submit' block className="mt-4" disabled={submitting || (status !== null && errors.length === 0)}>
                Reset Password
              </Button>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
