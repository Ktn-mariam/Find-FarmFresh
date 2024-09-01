import React from 'react'
import { FormikTouched, FormikErrors } from 'formik'
import { NavLink } from 'react-router-dom'

interface AuthFormProps {
  isLogIn: boolean
  signUpFormik: SignUpFormikType | null
  logInFormik: LogInFormikType | null
}

interface SignUpInformation {
  email: string
  password: string
  retypedPassword: string
}

interface LogInInformation {
  email: string
  password: string
}

interface SignUpFormikType {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  touched: FormikTouched<SignUpInformation>
  values: SignUpInformation
  errors: FormikErrors<SignUpInformation>
}

interface LogInFormikType {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  touched: FormikTouched<LogInInformation>
  values: LogInInformation
  errors: FormikErrors<LogInInformation>
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogIn,
  signUpFormik,
  logInFormik,
}) => {
  const formik = signUpFormik! ?? logInFormik!
  return (
    <div className="px-10 py-7 border border-gray-300 rounded-2xl mb-10 w-98">
      <h1 className="text-lg font-bold text-center">
        {isLogIn ? 'Log In' : 'Sign Up'}
      </h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <label htmlFor="">Email</label>
          <input
            title="email"
            name="email"
            className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-900">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mt-4">
          <label htmlFor="">Password</label>
          <input
            title="password"
            name="password"
            className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-900">{formik.errors.password}</div>
          ) : null}
        </div>
        {!isLogIn && (
          <div className="mt-4">
            <label htmlFor="">Retype Password</label>
            <input
              title="retypedPassword"
              name="retypedPassword"
              className="mt-1 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.retypedPassword}
            />
            {formik.touched.retypedPassword && formik.errors.retypedPassword ? (
              <div className="text-sm text-red-900">
                {formik.errors.retypedPassword}
              </div>
            ) : null}
          </div>
        )}
        <button
          type="submit"
          className="bg-black mt-6 text-white w-full rounded-md px-3 py-2"
        >
          {isLogIn ? 'Sign up' : 'Create Account'}
        </button>
      </form>
      {isLogIn ? (
        <div className="text-center mt-5">
          Dont have an account?{' '}
          <span className="underline">
            <NavLink to="/sign-up">Register Now</NavLink>
          </span>
        </div>
      ) : (
        <div className="text-center mt-5">
          Already a member?{' '}
          <span className="underline">
            <NavLink to="/sign-in">Log In</NavLink>
          </span>
        </div>
      )}
    </div>
  )
}

export default AuthForm
