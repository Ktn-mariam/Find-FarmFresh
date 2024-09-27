import { createContext, useContext, useEffect, useState } from 'react'
import { useFormik, FormikTouched, FormikErrors } from 'formik'
import {
  ProfileSidebarInformationType,
  Role,
  SignUpDetailsType,
  ProfileInformationType,
} from '../types/Auth'
import AuthenticationContext from './authentication'
import { APIURL } from '../App'

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
  uploadedImageFile: File | null
  setUploadedImageFile: React.Dispatch<React.SetStateAction<File | null>>
  uploadedImageURL: string | null
  setUploadedImageURL: React.Dispatch<React.SetStateAction<string | null>>
  missingImageError: boolean
  setMissingImageError: React.Dispatch<React.SetStateAction<boolean>>
  previewImage: string
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>
}

interface Props {
  children: string | JSX.Element | JSX.Element[]
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  profileInformation?: ProfileSidebarInformationType
}

const FormikContext = createContext<FormikContextType>({
  handleBlur: (e: React.FocusEvent<any, Element>) => {},
  handleChange: (e: string | React.ChangeEvent<any[]>) => {},
  handleSubmit: (e) => {},
  values: {
    name: '',
    image: '',
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
  uploadedImageFile: null,
  setUploadedImageFile: () => {},
  uploadedImageURL: null,
  setUploadedImageURL: () => {},
  missingImageError: false,
  setMissingImageError: () => {},
  previewImage: '',
  setPreviewImage: () => {},
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

  const [previewImage, setPreviewImage] = useState('/previewImage.jpg')
  const [missingImageError, setMissingImageError] = useState<boolean>(false)
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null)
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [signUpInfo, setSignUpInfo] = useState<SignUpInformation | null>(null)
  const { logInData, setLogInData, token } = useContext(AuthenticationContext)

  useEffect(() => {
    if (profileInformation) {
      setPreviewImage(`${APIURL}/uploads/${profileInformation.image}`)
    }
  }, [setPreviewImage, profileInformation])

  const validate = async (values: ProfileInformationType) => {
    const errors: FormikErrorType = {}

    if (!values.name) {
      errors.name = 'Required field'
    }

    if (values.name) {
      const userexistsResponse = await fetch(
        `${APIURL}/api/v1/auth/userExists/name/${values.name}`,
      )
      const userExistsData = await userexistsResponse.json()
      if (userExistsData.nameExists && !profileInformation) {
        errors.name = 'An account with this name already exists'
      }
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

  let initialValues: ProfileInformationType
  if (profileInformation) {
    initialValues = {
      name: profileInformation?.name,
      image: profileInformation?.image,
      description: profileInformation?.description,
      mobileNo: profileInformation?.mobileNo,
      location: profileInformation?.location,
      latitudeCoordinate:
        profileInformation?.locationCoordinates?.latitude?.coordinate ||
        undefined,
      latitudeDirection:
        profileInformation?.locationCoordinates?.latitude?.direction || 'N',
      longitudeCoordinate:
        profileInformation?.locationCoordinates?.longitude?.coordinate ||
        undefined,
      longitudeDirection:
        profileInformation?.locationCoordinates?.longitude?.direction || 'E',
    }
  } else {
    initialValues = {
      name: '',
      image: '',
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
    initialValues: initialValues,
    validate,
    onSubmit: async (values, { setValues, setErrors, setTouched }) => {
      if (!uploadedImageFile && !profileInformation) {
        return
      }

      if (!profileInformation) {
        const signUpDetails: SignUpDetailsType = {
          email: signUpInfo?.email || 'random email',
          password: signUpInfo?.password || 'random password',
          image: uploadedImageFile!,
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
          image: uploadedImageFile || profileInformation?.image,
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
      setSubmitted(true)
      setErrors({})
      setMissingImageError(false)
      if (setOpenModal) setOpenModal(false)
    },
  })

  const signUpUser = async (
    signUpDetails: SignUpDetailsType,
  ): Promise<void> => {
    let url
    if (signUpInfo?.role === Role.Farmer) {
      url = `${APIURL}/api/v1/auth/register/farmer`
    } else {
      url = `${APIURL}/api/v1/auth/register/consumer`
    }

    const formDataSignUp = new FormData()

    Object.keys(signUpDetails).forEach((key) => {
      const value = (signUpDetails as Record<string, any>)[key]

      if (typeof value === 'object' && !(value instanceof File)) {
        formDataSignUp.append(key, JSON.stringify(value))
      } else {
        formDataSignUp.append(key, value)
      }
    })

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formDataSignUp,
      })

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      localStorage.setItem('token', JSON.stringify(result.token))
    } catch (error) {
      console.error('Error during sign-up:', error)
    }
  }

  const updateUser = async (
    updateUserDetails: ProfileSidebarInformationType,
  ): Promise<void> => {
    let url
    if (logInData?.role === Role.Farmer) {
      url = `${APIURL}/api/v1/farmers`
    } else {
      url = `${APIURL}/api/v1/consumers`
    }

    const formDataSignUp = new FormData()

    Object.keys(updateUserDetails).forEach((key) => {
      const value = (updateUserDetails as Record<string, any>)[key]

      if (typeof value === 'object' && !(value instanceof File)) {
        formDataSignUp.append(key, JSON.stringify(value))
      } else {
        formDataSignUp.append(key, value)
      }
    })

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataSignUp,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()

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
    uploadedImageFile,
    setUploadedImageFile,
    uploadedImageURL,
    setUploadedImageURL,
    missingImageError,
    setMissingImageError,
    previewImage,
    setPreviewImage,
  }

  return (
    <FormikContext.Provider value={contextValue}>
      {children}
    </FormikContext.Provider>
  )
}

export default FormikContext
