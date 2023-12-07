import { createContext } from 'react'
import { useFormik, FormikTouched, FormikErrors } from 'formik'

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
}

interface Props {
  children: string | JSX.Element | JSX.Element[]
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
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
})

interface FormikErrorType {
  name?: string
  description?: string
  mobileNo?: string
  location?: string
  latitudeCoordinate?: string
  longitudeCoordinate?: string
}

export const FormikContextProvider = ({ children, setOpenModal }: Props) => {
  const isFarmer = false
  const validate = (values: ProfileInformationType) => {
    const errors: FormikErrorType = {}

    console.log(values)

    if (!values.name) {
      errors.name = 'Required field'
    }
    if (isFarmer && !values.description) {
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

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      mobileNo: '',
      location: '',
      latitudeCoordinate: undefined,
      latitudeDirection: 'N',
      longitudeCoordinate: undefined,
      longitudeDirection: 'E',
    },
    validate,
    onSubmit: async (values, { setValues, setErrors, setTouched }) => {
      await alert(JSON.stringify(values, null, 2))
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

      setTouched({})
      setErrors({})
      setOpenModal(false)
    },
  })

  const contextValue = {
    handleSubmit: formik.handleSubmit,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    touched: formik.touched,
    values: formik.values,
    errors: formik.errors,
  }

  return (
    <FormikContext.Provider value={contextValue}>
      {children}
    </FormikContext.Provider>
  )
}

export default FormikContext
