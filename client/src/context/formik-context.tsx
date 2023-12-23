import { createContext, useContext, useState } from 'react'
import { useFormik, FormikTouched, FormikErrors } from 'formik'
import { ProfileSidebarInformationType, Role } from '../types/Auth'
import AuthenticationContext from './authentication'

interface SignUpDetailsType {
  name: string
  image: string
  email: string
  password: string
  description?: string
  mobileNo: string
  location: string
  locationCoordinates: {
    latitude: {
      coordinate: number
      direction: 'N' | 'S'
    }
    longitude: {
      coordinate: number
      direction: 'E' | 'W'
    }
  }
}

export interface FormikContextType {
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
      : (e: string | React.ChangeEvent<any[]>) => void
  }
  values: ProfileInformationType
  touched: FormikTouched<ProfileInformationType> | null
  errors: FormikErrors<ProfileInformationType> | null
  submitted: boolean
  setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpInformation | null>>
}

interface Props {
  children: string | JSX.Element | JSX.Element[]
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  profileInformation?: ProfileSidebarInformationType
}

export interface ProfileInformationType {
  name: string
  description?: string
  mobileNo: string
  location: string
  latitudeCoordinate: number | undefined
  latitudeDirection: 'N' | 'S'
  longitudeCoordinate: number | undefined
  longitudeDirection: 'E' | 'W'
}

const FormikContext = createContext<FormikContextType>({
  handleBlur: (e: React.FocusEvent<any, Element>) => {},
  handleChange: (e: string | React.ChangeEvent<any[]>) => {},
  handleSubmit: (e) => {},
  values: {
    name: '',
    description: '',
    mobileNo: '',
    location: '',
    latitudeCoordinate: undefined,
    latitudeDirection: 'N',
    longitudeCoordinate: undefined,
    longitudeDirection: 'E',
  },
  touched: null,
  errors: null,
  submitted: false,
  setSignUpInfo: () => {},
})

interface FormikErrorType {
  name?: string
  description?: string
  mobileNo?: string
  location?: string
  latitudeCoordinate?: string
  longitudeCoordinate?: string
}

interface SignUpInformation {
  email: string
  password: string
  role: 'Farmer' | 'Consumer'
}

export const FormikContextProvider = ({
  children,
  setOpenModal,
  profileInformation,
}: Props) => {
  const isFarmer = false
  const [submitted, setSubmitted] = useState(false)
  const [isFarmerChecked, setIsFarmerChecked] = useState(true)
  const [isConsumerChecked, setIsConsumerChecked] = useState(false)
  const [signUpInfo, setSignUpInfo] = useState<SignUpInformation | null>(null)
  const { logInData, setLogInData } = useContext(AuthenticationContext)

  const validate = (values: ProfileInformationType) => {
    const errors: FormikErrorType = {}

    if (!values.name) {
      errors.name = 'Required field'
    }
    if (signUpInfo?.role === Role.Farmer && !values.description) {
      errors.description = 'Required field'
    } else if (
      isFarmer &&
      values.description &&
      values.description.length > 60
    ) {
      errors.description = 'Description cannot be more than 60 characters'
    }

    if (!values.mobileNo) {
      errors.mobileNo = 'Required field'
    }

    if (!values.location) {
      errors.location = 'Required field'
    }

    if (!values.latitudeCoordinate && !values.longitudeCoordinate) {
      errors.latitudeCoordinate = 'Please enter both the location coordinates'
    } else if (
      values.latitudeCoordinate &&
      values.longitudeCoordinate &&
      isNaN(values.latitudeCoordinate) &&
      isNaN(values.longitudeCoordinate)
    ) {
      errors.latitudeCoordinate =
        'Please enter numeric values for both the coordinates'
    } else if (!values.latitudeCoordinate) {
      errors.latitudeCoordinate = 'Please enter the latitude coordinate'
    } else if (isNaN(values.latitudeCoordinate)) {
      errors.latitudeCoordinate =
        'Please enter a numeric value for the latitude coordinate'
    } else if (!values.longitudeCoordinate) {
      errors.longitudeCoordinate = 'Please enter the longitude coordinate'
    } else if (isNaN(values.longitudeCoordinate)) {
      errors.longitudeCoordinate =
        'Please enter a numeric value for the longitude coordinate'
    }

    return errors
  }

  let intialValues: ProfileInformationType
  if (profileInformation) {
    intialValues = {
      name: profileInformation?.name,
      description: profileInformation?.description,
      mobileNo: profileInformation?.mobileNo,
      location: profileInformation?.location,
      latitudeCoordinate:
        profileInformation?.locationCoordinates.latitude.coordinate,
      latitudeDirection:
        profileInformation?.locationCoordinates.latitude.direction,
      longitudeCoordinate:
        profileInformation?.locationCoordinates.longitude.coordinate,
      longitudeDirection:
        profileInformation?.locationCoordinates.longitude.direction,
    }
  } else {
    intialValues = {
      name: '',
      description: '',
      mobileNo: '',
      location: '',
      latitudeCoordinate: undefined,
      latitudeDirection: 'N',
      longitudeCoordinate: undefined,
      longitudeDirection: 'E',
    }
  }

  const formik = useFormik({
    initialValues: intialValues,
    validate,
    onSubmit: async (values, { setValues, setErrors, setTouched }) => {
      // await alert(JSON.stringify(values, null, 2))

      if (!profileInformation) {
        const signUpDetails: SignUpDetailsType = {
          email: signUpInfo?.email || 'random email',
          password: signUpInfo?.password || 'random password',
          image: 'image.png',
          name: values.name,
          mobileNo: values.mobileNo,
          location: values.location,
          locationCoordinates: {
            latitude: {
              coordinate: values.latitudeCoordinate || 0,
              direction: values.latitudeDirection,
            },
            longitude: {
              coordinate: values.longitudeCoordinate || 0,
              direction: values.longitudeDirection,
            },
          },
        }

        if (signUpInfo?.role === Role.Farmer) {
          signUpDetails.description = values.description
        }
        signUpUser(signUpDetails)
        console.log('I AM CALLING SIGN UP TOO')
        setValues({
          image: '',
          name: '',
          description: '',
          mobileNo: '',
          location: '',
          latitudeCoordinate: undefined,
          latitudeDirection: 'N',
          longitudeCoordinate: undefined,
          longitudeDirection: 'E',
        } as ProfileInformationType)
      } else {
        const updateUserDetails: ProfileSidebarInformationType = {
          name: values.name,
          image: 'image2.png',
          mobileNo: values.mobileNo,
          location: values.location,
          locationCoordinates: {
            latitude: {
              coordinate: values.latitudeCoordinate!,
              direction: values.latitudeDirection,
            },
            longitude: {
              coordinate: values.longitudeCoordinate!,
              direction: values.longitudeDirection,
            },
          },
        }

        if (logInData.role === Role.Farmer) {
          updateUserDetails.description = values.description
        }
        updateUser(updateUserDetails)
      }

      setTouched({})
      console.log('IN ON SUBMIT')
      setSubmitted(true)
      setErrors({})
      if (setOpenModal) setOpenModal(false)
    },
  })

  const signUpUser = async (
    signUpDetails: SignUpDetailsType,
  ): Promise<void> => {
    let url
    if (signUpInfo?.role === Role.Farmer) {
      url = 'http://localhost:5000/api/v1/auth/register/farmer'
    } else {
      url = 'http://localhost:5000/api/v1/auth/register/consumer'
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpDetails),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      localStorage.setItem('token', JSON.stringify(result.token))
    } catch (error) {
      console.error('Error during sign-up:', error)
      throw error
    }
  }

  const updateUser = async (
    updateUserDetails: ProfileSidebarInformationType,
  ): Promise<void> => {
    let url
    if (logInData?.role === Role.Farmer) {
      url = 'http://localhost:5000/api/v1/farmers'
    } else {
      url = 'http://localhost:5000/api/v1/consumers'
    }
    console.log(updateUserDetails)

    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify(updateUserDetails),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log(result)

      if (logInData.role === Role.Farmer) {
        setLogInData((logInData) => {
          return {
            ...logInData,
            name: result.farmer.name,
            description: result.farmer.description,
            location: result.farmer.location,
            mobileNo: result.farmer.mobileNo,
            locationCoordinates: result.farmer.locationCoordinates,
            image: result.farmer.image,
          }
        })
      } else {
        setLogInData((logInData) => {
          return {
            ...logInData,
            name: result.consumer.name,
            location: result.consumer.location,
            mobileNo: result.consumer.mobileNo,
            locationCoordinates: result.consumer.locationCoordinates,
            image: result.consumer.image,
          }
        })
      }
    } catch (error) {
      console.error('Error during sign-up:', error)
      throw error
    }
  }

  const contextValue = {
    handleSubmit: formik.handleSubmit,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    touched: formik.touched,
    values: formik.values,
    errors: formik.errors,
    submitted,
    setSignUpInfo,
  }

  return (
    <FormikContext.Provider value={contextValue}>
      {children}
    </FormikContext.Provider>
  )
}

export default FormikContext
