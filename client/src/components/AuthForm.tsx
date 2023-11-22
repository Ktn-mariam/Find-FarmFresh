import React from 'react'

interface AuthFormProps {
  handleNext?: () => void
  isSignIn: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ handleNext, isSignIn }) => {
  const SignUpHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (handleNext) handleNext()
  }
  return (
    <div className="px-10 py-7 border border-gray-300 rounded-2xl mb-10 w-98">
      <h1 className="text-lg font-bold text-center">
        Sign {isSignIn ? 'In' : 'Up'}
      </h1>
      <form className="mt-3" action="" onSubmit={SignUpHandler}>
        {!isSignIn && (
          <div className="mt-4 flex gap-4">
            <div className="">
              <label htmlFor="">First Name</label>
              <input
                title="title"
                className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
                type="text"
              />
            </div>
            <div className="">
              <label htmlFor="">Last Name</label>
              <input
                title="title"
                className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
                type="text"
              />
            </div>
          </div>
        )}
        <div className="mt-4">
          <label htmlFor="">Email</label>
          <input
            title="title"
            className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="">Password</label>
          <input
            title="title"
            className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
            type="password"
          />
        </div>
        {!isSignIn && (
          <div className="mt-4">
            <label htmlFor="">Retype Password</label>
            <input
              title="title"
              className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
              type="password"
            />
          </div>
        )}
        <button className="bg-black mt-6 text-white w-full rounded-md px-3 py-2">
          {isSignIn ? 'Sign up' : 'Create Account'}
        </button>
      </form>
      <div className="text-center">OR</div>
      <div className="text-center">Sign up using Google</div>
    </div>
  )
}

export default AuthForm
