import React, { useState, useRef } from 'react'
import Modal from '@mui/material/Modal'
// https://stackoverflow.com/questions/74536534/react-js-how-to-upload-image-with-preview-and-display-the-processe-image

interface AddProductModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [previewImage, setPreviewImage] = useState('/previewImage.png')
  const [uploadedImage, setUploadedImage] = useState(null)
  const title = useRef(null)
  const parentCategory = useRef(null)
  const childCategory = useRef(null)
  const price = useRef(null)
  const parentCategories = [
    'Fruits',
    'Vegetables',
    'Coffee & Tea',
    'Dairy & eggs',
    'Meat',
    'Honey & Bee Products',
    'Flowers',
    'Dried Fruits & Nuts',
  ]

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
          <div className="font-bold text-xl">Enter Product Details</div>
          <div className="flex gap-10">
            <div className="w-2/3 flex flex-col">
              <label className="font-bold text-md" htmlFor="">
                Title
              </label>
              <input
                title="title"
                className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
                type="text"
              />
              <div className="flex mt-5 gap-5">
                <div className="flex flex-col w-1/2">
                  <label
                    className="font-bold text-md"
                    htmlFor="parent-category"
                  >
                    Parent Category:
                  </label>
                  <select
                    title="parent-category"
                    name="parent-category"
                    className="focus:outline-none focus:bg-white focus:border-gray-400 py-2 px-3 bg-gray-200 text-sm rounded-md w-full mt-2"
                  >
                    <option defaultChecked value="fruits">
                      Select option
                    </option>
                    {parentCategories.map((category) => {
                      return <option value={category}>{category}</option>
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    className="font-bold text-md"
                    htmlFor="parent-category"
                  >
                    Child Category:
                  </label>
                  <select
                    title="parent-category"
                    name="parent-category"
                    className="focus:outline-none focus:bg-white focus:border-gray-400 py-2 px-3 bg-gray-200 text-sm rounded-md w-full mt-2"
                  >
                    <option defaultChecked value="fruits">
                      Select option
                    </option>
                    {parentCategories.map((category) => {
                      return <option value={category}>{category}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-5 flex gap-5">
                <div className="w-1/2">
                  <label htmlFor="" className="font-bold text-md">
                    Select options that apply:
                  </label>
                  <div className="text-sm flex flex-col gap-1 mt-2">
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">Free Delivery</label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">Organically Produced</label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">Secure Transaction</label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">Cash on Delivery</label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">Returnable Choice</label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input title="radio" type="radio" name="delivery" id="" />
                      <label htmlFor="">On-site shopping</label>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <label htmlFor="" className="font-bold text-md">
                    Price per kg
                  </label>
                  <input
                    title="price"
                    className="bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-400 mt-2"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
              <div>
                {previewImage ? (
                  <div className="h-40 mb-3 md:h-68 md:w-56 flex items-center justify-center overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={previewImage}
                      alt="preview"
                    />
                  </div>
                ) : null}
                {uploadedImage ? (
                  <img src={uploadedImage} alt="uploaded" />
                ) : null}
                <input title="image" type="file" onChange={handleSelectImage} />
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex gap-3 justify-end font-bold">
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
              onClick={handleUploadImage}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddProductModal
