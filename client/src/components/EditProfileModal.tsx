import React, { useState, useContext } from 'react'
import FormikContext from '../context/formik-context'
import AddProfileInformation from './AddProfileInformation'
import Modal from '@mui/material/Modal'
import AuthenticationContext from '../context/authentication'
import { ProfileSidebarInformationType } from '../types/Auth'

interface EditProfileModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  profileInformation: ProfileSidebarInformationType
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  openModal,
  setOpenModal,
  profileInformation,
}) => {
  const [previewImage, setPreviewImage] = useState('/previewImage.jpg')
  const [uploadedImage, setUploadedImage] = useState(null)
  const { handleSubmit } = useContext(FormikContext)
  const { logInData, loadingLogInData } = useContext(AuthenticationContext)

  const handleEditProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleUploadImage()
    handleSubmit()
  }

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

  if (loadingLogInData) {
    return (
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>Loading</div>
      </Modal>
    )
  }

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center mt-10 justify-center">
        <div className="font-noto p-12 w-100 bg-white rounded-md flex flex-col gap-5">
          <form onSubmit={handleEditProfileSubmit}>
            <AddProfileInformation role={logInData.role!} edit={true} />
            <div className="flex gap-3 justify-end font-bold mt-5">
              <button
                className="bg-gray-300 rounded-md px-3 py-2"
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white rounded-md px-3 py-2"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
