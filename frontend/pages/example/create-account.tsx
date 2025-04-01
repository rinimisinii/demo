import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Input, Label, Button, WindmillContext } from '@roketid/windmill-react-ui'
import { useAuth } from 'hooks/auth'
import Loader from 'example/components/Loader/Loader'

interface IEvent {
  preventDefault: () => void
}

function CrateAccount() {
  const { register, loading, user } = useAuth({
      middleware: 'guest',
      redirectIfAuthenticated: '/example',
  })

  const [submitting, setSubmittingState] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = async (event: IEvent) => {
    event.preventDefault()

    setSubmittingState(true)
    register({ name, email, password, password_confirmation, setErrors, setStatus })
    setSubmittingState(false)
  }

  const { mode } = useContext(WindmillContext)
  const imgSource = mode === 'dark' ? '/assets/img/create-account-office-dark.jpeg' : '/assets/img/create-account-office.jpeg'

  return loading || user
    ? (<Loader />)
    : (
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
                Create account
              </h1>
              {
                errors.length && !submitting
                  ? <h6 className='mb-4 text-red-500 text-xs'>{errors[0]}</h6>
                  : ``
              }

              <Label className="mt-4">
                <span>Full Name</span>
                <Input className="mt-1" type="text" placeholder="Full Name" required value={name} onChange={event => setName(event.target.value)} />
              </Label>
              <Label className="mt-4">
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

              <Label className="mt-6" check>
                <Input type="checkbox" required />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button type='submit' block className="mt-4" disabled={submitting}>
                Create account
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link href="/example/login">
                  <a
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Already have an account? Login
                  </a>
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}

export default CrateAccount
