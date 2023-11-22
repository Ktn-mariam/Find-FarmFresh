import React, { useState, useRef } from 'react'
import Modal from '@mui/material/Modal'
import AddProfileInformation from './AddProfileInformation'

interface EditProfileModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [previewImage, setPreviewImage] = useState('/previewImage.jpg')
  const [uploadedImage, setUploadedImage] = useState(null)

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
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center mt-24 justify-center">
        <div className="font-noto p-12 w-100 bg-white rounded-md flex flex-col gap-5">
          <AddProfileInformation edit={true} />
          <div className="flex gap-3 justify-end font-bold">
            <button
              className="bg-gray-300 rounded-md px-3 py-2 text-sm"
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white rounded-md px-3 text-sm py-2"
              onClick={handleUploadImage}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
