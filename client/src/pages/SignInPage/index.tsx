import React from 'react'
import AuthForm from '../../components/AuthForm'

const SignInPage = () => {
  return (
    <div className="md:px-36 px-14 pt-5 pb-32 font-noto flex justify-center items-center gap-5">
      <div className="mt-20">
        <AuthForm isSignIn={true} />
      </div>
    </div>
  )
}

export default SignInPage
