import React from 'react'
import Modal from '@mui/material/Modal'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

interface GratitudeModalProps {
  openGratitudeModal: boolean
  setOpenGratitudeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GratitudeModal: React.FC<GratitudeModalProps> = ({
  openGratitudeModal,
  setOpenGratitudeModal,
}) => {
  return (
    <Modal
      open={openGratitudeModal}
      onClose={() => setOpenGratitudeModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center mt-40 justify-center">
        <div className="font-noto p-12 w-96 bg-white rounded-md flex flex-col items-center gap-2">
          <TaskAltIcon fontSize="large" />
          <h1 className="font-bold text-center">
            Thank you for your feedback! Your insights are invaluable in making
            our service even better. We appreciate your support!
          </h1>
          <button
            className="bg-gray-300 w-32 mt-3 rounded-md py-2 hover:shadow-md"
            onClick={() => {
              setOpenGratitudeModal(false)
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default GratitudeModal
