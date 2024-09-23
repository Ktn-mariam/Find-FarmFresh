import { useContext } from 'react'
import { useFormik } from 'formik'
import AuthForm from '../../components/AuthForm'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Role } from '../../types/Auth'
import AuthenticationContext from '../../context/authentication'
import { useNavigate } from 'react-router-dom'

interface LogInInformation {
  email: string
  password: string
}

interface FormErrorType {
  email?: string
  password?: string
}

const SignInPage = () => {
  const { logInData, setToken } = useContext(AuthenticationContext)
  const navigate = useNavigate()

  const validate = (values: LogInInformation) => {
    const errors: FormErrorType = {}

    if (!values.email) {
      errors.email = 'Required field'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email Address'
    }

    if (!values.password) {
      errors.password = 'Required field'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { setValues, setErrors, setTouched }) => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/auth/login',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        )

        const responseData = await response.json()
        localStorage.setItem('token', JSON.stringify(responseData.token))
        setToken(responseData.token)
        navigate('/my-profile')
      } catch (error) {
        console.log('Failed to login: ', error)
      }

      setValues({
        email: '',
        password: '',
      } as LogInInformation)
      setTouched({})
      setErrors({})
    },
  })

  const demoLogin = async (role: string) => {
    let loginData
    console.log('role', role)

    if (role === 'Farmer') {
      console.log('yes')

      loginData = {
        email: 'oliviathompson219@gmail.com',
        password: 'Olivia219',
      }
    } else {
      loginData = {
        email: 'liamjohnson879@gmail.com',
        password: 'Liam$879',
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const responseData = await response.json()
      localStorage.setItem('token', JSON.stringify(responseData.token))
      setToken(responseData.token)
      navigate('/my-profile')
    } catch (error) {
      console.log('Failed to login: ', error)
    }
  }

  const formikProps = {
    handleSubmit: formik.handleSubmit,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    touched: formik.touched,
    values: formik.values,
    errors: formik.errors,
  }

  if (logInData.loggedIn) {
    navigate('/my-profile')
  }

  return (
    <div className="md:px-36 px-14 pt-5 pb-32 font-noto flex justify-center items-center gap-5">
      <div className="mt-5">
        <div className=" w-98 p-7 mb-5 flex flex-col gap-5 items-center border border-gray-300 rounded-2xl">
          <div className="flex gap-2 items-center">
            <ErrorOutlineOutlinedIcon />
            <div className="text-md font-bold">
              Explore Without Sign-up: Use Demo Login
            </div>
          </div>
          <div className="flex gap-5">
            <button
              className="p-3 flex gap-2 bg-gray-100 rounded-md"
              onClick={() => {
                demoLogin(Role.Farmer)
              }}
            >
              <AgricultureIcon />
              <div>Log in as farmer</div>
            </button>
            <button
              className="p-3 flex gap-2 bg-gray-100 rounded-md"
              onClick={() => {
                demoLogin(Role.Consumer)
              }}
            >
              <ShoppingBasketIcon />
              <div>Log in as customer</div>
            </button>
          </div>
        </div>
        <div>
          <AuthForm
            signUpFormik={null}
            logInFormik={formikProps}
            isLogIn={true}
          />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
