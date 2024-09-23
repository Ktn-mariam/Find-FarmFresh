import React, { useContext } from 'react'
import FormikContext from '../context/formik-context'
import { Role } from '../types/Auth'

interface AddProfileInformationProps {
  edit: boolean
  role: 'Farmer' | 'Consumer'
}

const AddProfileInformation: React.FC<AddProfileInformationProps> = ({
  edit,
  role,
}) => {
  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setUploadedImageFile,
    setUploadedImageURL,
    uploadedImageURL,
    missingImageError,
    setMissingImageError,
    previewImage,
    setPreviewImage,
  } = useContext(FormikContext)

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      console.log(`Image URL: ${imageUrl}`)

      setUploadedImageURL(imageUrl)
      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        const result = fileReader.result

        if (result && typeof result === 'string') {
          setPreviewImage(result)
        }
      })

      setUploadedImageFile(file)
    }
  }

  return (
    <div>
      <div className="font-bold text-xl mb-5">
        {edit ? 'Edit' : 'Add'} Profile Details
      </div>
      <div className="flex gap-10 items-center">
        <div className="w-3/5 flex flex-col">
          <div className="flex justify-between items-center">
            <label className="text-md" htmlFor="">
              Your Name/Farm Name:
            </label>
            {edit ? (
              <div className="text-xs text-red-900">UnChangeable</div>
            ) : (
              <div></div>
            )}
          </div>
          <input
            title="name"
            name="name"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full text-sm py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            readOnly={edit ? true : false}
          />
          {touched?.name && errors?.name ? (
            <div className="text-sm text-red-900">{errors?.name}</div>
          ) : null}
          {role === Role.Farmer && (
            <div className="mt-5">
              <label htmlFor="">Short About/ Description</label>
              <textarea
                title="description"
                name="description"
                className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full text-sm py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {touched?.description && errors?.description ? (
                <div className="text-sm text-red-900">
                  {errors?.description}
                </div>
              ) : null}
            </div>
          )}
          <label className="whitespace-nowrap text-md mt-5" htmlFor="">
            Mobile No:
          </label>
          <input
            title="mobileNo"
            name="mobileNo"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md  text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mobileNo}
          />
          {touched?.mobileNo && errors?.mobileNo ? (
            <div className="text-sm text-red-900">{errors?.mobileNo}</div>
          ) : null}
          <label className="text-md mt-5" htmlFor="">
            Location
          </label>
          <input
            title="location"
            name="location"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.location}
          />
          {touched?.location && errors?.location ? (
            <div className="text-sm text-red-900">{errors?.location}</div>
          ) : null}
          <div className="flex items-center gap-1 mt-5">
            <div className="flex items-center gap-1">
              <label className="text-md" htmlFor="">
                Latitude
              </label>
              <input
                title="latitudeCoordinate"
                name="latitudeCoordinate"
                className="bg-gray-200 border-2 border-gray-200 rounded-md text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latitudeCoordinate}
              />
              <select
                title="latitudeDirection"
                name="latitudeDirection"
                className="bg-gray-200 border-2 border-gray-200 rounded-md  text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latitudeDirection}
              >
                <option defaultChecked value="N">
                  N
                </option>
                <option value="S">S</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-md" htmlFor="">
                Longitude
              </label>
              <input
                title="longitudeCoordinate"
                name="longitudeCoordinate"
                className="bg-gray-200 border-2 border-gray-200 rounded-md text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.longitudeCoordinate}
              />
              <select
                title="longitudeDirection"
                name="longitudeDirection"
                className="bg-gray-200 border-2 border-gray-200 rounded-md text-sm w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.longitudeDirection}
              >
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
          </div>
          {touched?.latitudeCoordinate && errors?.latitudeCoordinate ? (
            <div className="text-sm text-red-900">
              {errors?.latitudeCoordinate}
            </div>
          ) : null}
          {touched?.longitudeCoordinate && errors?.longitudeCoordinate ? (
            <div className="text-sm text-red-900">
              {errors?.longitudeCoordinate}
            </div>
          ) : null}
        </div>
        <div className="w-2/5 flex flex-col">
          <div>
            {previewImage && !uploadedImageURL ? (
              <div className="h-40 mb-3 md:h-68 md:w-68 flex items-center justify-center overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={previewImage}
                  alt="preview"
                />
              </div>
            ) : null}
            {uploadedImageURL ? (
              <div className="h-40 mb-3 md:h-68 md:w-68 flex items-center justify-center overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={uploadedImageURL}
                  alt="uploaded"
                />
              </div>
            ) : null}
            <input
              title="image"
              type="file"
              onClick={() => {
                setMissingImageError(false)
              }}
              onChange={handleSelectImage}
            />
            {missingImageError ? (
              <div className="text-sm text-red-900">
                Please upload a profile image
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProfileInformation
