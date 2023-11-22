import React, { useState } from 'react'

interface AddProfileInformationProps {
  edit: boolean
}

const AddProfileInformation: React.FC<AddProfileInformationProps> = ({
  edit,
}) => {
  const [previewImage, setPreviewImage] = useState('/previewImage.jpg')
  const [uploadedImage, setUploadedImage] = useState(null)
  const isFarmer = true

  const handleUploadImage = () => {
    const data = new FormData()
    data.append('file', previewImage)

    fetch(__filename, { method: 'POST', body: data })
      .then(async (response) => {
        const imageResponse = await response.json()
        setUploadedImage(imageResponse)
      })
      .catch((err) => {})
  }

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        const result = fileReader.result

        if (result && typeof result === 'string') {
          setPreviewImage(result)
        }
      })

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="font-bold text-xl mb-5">
        {edit ? 'Edit' : 'Add'} Profile Details
      </div>
      <div className="flex gap-10 items-center">
        <div className="w-3/5 flex flex-col">
          <label className="text-md" htmlFor="">
            Your Name/Farm Name:
          </label>
          <input
            title="title"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
          />
          {isFarmer && (
            <div className="mt-5">
              <label htmlFor="">Short About/ Description</label>
              <textarea
                title="title"
                className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
              />
            </div>
          )}
          <label className="whitespace-nowrap text-md mt-5" htmlFor="">
            Mobile No:
          </label>
          <input
            title="title"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
          />
          <label className="text-md mt-5" htmlFor="">
            Location
          </label>
          <input
            title="title"
            className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
          />
          <div className="flex items-center gap-5 mt-5">
            <div className="flex items-center gap-2">
              <label className="text-md" htmlFor="">
                Latitude:
              </label>
              <input
                title="title"
                className="bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                type="decimal"
              />
              <select
                title="lat"
                name="lat"
                className="bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
              >
                <option value="">N</option>
                <option value="">S</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-md" htmlFor="">
                Longitude:
              </label>
              <input
                title="title"
                className="bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                type="decimal"
              />
              <select
                title="lat"
                name="lat"
                className="bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
              >
                <option value="">E</option>
                <option value="">W</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col">
          <div>
            {previewImage ? (
              <div className="h-40 mb-3 md:h-68 md:w-68 flex items-center justify-center overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={previewImage}
                  alt="preview"
                />
              </div>
            ) : null}
            {uploadedImage ? <img src={uploadedImage} alt="uploaded" /> : null}
            <input title="image" type="file" onChange={handleSelectImage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProfileInformation
