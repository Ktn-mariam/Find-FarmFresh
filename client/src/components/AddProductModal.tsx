import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Modal from '@mui/material/Modal'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import getChildCategories from '../utils/getChildCategories'
import { ProductDetailTypeForDisplay } from '../types/Product'

// https://stackoverflow.com/questions/74536534/react-js-how-to-upload-image-with-preview-and-display-the-processe-image

interface AddProductFormValues {
  images: File
  title: string
  parentCategory: string
  category: string
  price: number
  hasDiscount: boolean
  discountPercentage?: number
  delivery: boolean | string
  organic: boolean | string
  transaction: boolean | string
  cashOnDelivery: boolean | string
  returnableChoice: boolean | string
  onSiteShopping: boolean | string
}

interface ErrorType {
  images?: string
  title?: string
  parentCategory?: string
  category?: string
  price?: string
  hasDiscount?: string
  discountPercentage?: string
}

interface AddProductModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setRefetchProducts?: React.Dispatch<React.SetStateAction<boolean>>
  isEditModal: boolean
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>
  editProduct: ProductDetailTypeForDisplay | null
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  openModal,
  setOpenModal,
  setRefetchProducts,
  isEditModal,
  setIsEditModal,
  editProduct,
}) => {
  const [previewImage, setPreviewImage] = useState('/previewImage.jpg')
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null)
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null)
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null)
  const [discountAvailable, setDiscountAvailable] = useState(false)
  const [childCategories, setChildCategories] = useState<string[]>([
    'Bananas',
    'Oranges',
    'Apples',
    'Mangoes',
    'Pinapples',
    'Strawberries',
  ])

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/public/previewImage.jpg`,
      )
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      setPreviewImageFile(file)
    }

    fetchImage()
  }, [])

  const validate = (values: AddProductFormValues) => {
    const errors: ErrorType = {}

    if (!values.title) {
      errors.title = 'Required'
    } else if (values.title.length < 15) {
      errors.title = 'Must be 15 characters or more'
    }

    if (!values.parentCategory) {
      errors.parentCategory = 'Please select an option'
    }

    if (!values.category) {
      errors.category = 'Please select an option'
    }

    if (!values.price) {
      errors.price = 'Required field'
    } else if (isNaN(values.price)) {
      errors.price = 'Please enter a numeric value'
    }

    if (discountAvailable && !values.discountPercentage) {
      errors.discountPercentage =
        'Please add a % value if you wish to add discount'
    } else if (values.discountPercentage && isNaN(values.discountPercentage)) {
      errors.discountPercentage = 'Please enter a numeric value'
    }

    return errors
  }

  let values
  if (isEditModal) {
    values = {
      images: editProduct?.images!,
      title: editProduct?.title!,
      parentCategory: editProduct?.parentCategory!,
      category: editProduct?.category!,
      price: editProduct?.price!,
      hasDiscount: editProduct?.hasDiscount!,
      delivery: editProduct?.delivery!,
      organic: editProduct?.organic!,
      transaction: editProduct?.transaction!,
      cashOnDelivery: editProduct?.cashOnDelivery!,
      returnableChoice: editProduct?.returnableChoice!,
      onSiteShopping: editProduct?.onSiteShopping!,
    }
  } else {
    values = {
      images: previewImageFile!,
      title: '',
      parentCategory: '',
      category: '',
      price: 0,
      hasDiscount: discountAvailable,
      delivery: false,
      organic: false,
      transaction: false,
      cashOnDelivery: false,
      returnableChoice: false,
      onSiteShopping: false,
    }
  }

  const formik = useFormik({
    initialValues: values,
    validate,
    onSubmit: async (values, { setValues, setErrors, setTouched }) => {
      const result = {
        ...values,
        delivery: values.delivery === 'on',
        organic: values.organic === 'on',
        transaction: values.transaction === 'on',
        cashOnDelivery: values.cashOnDelivery === 'on',
        returnableChoice: values.returnableChoice === 'on',
        onSiteShopping: values.onSiteShopping === 'on',
        hasDiscount: discountAvailable,
        images: uploadedImageFile,
      }

      // await alert(JSON.stringify(result, null, 2))
      const token = localStorage.getItem('token')
      const parsedToken = JSON.parse(token!)

      const formData = new FormData()
      Object.keys(result).forEach((key) => {
        const value = (result as Record<string, any>)[key]
        formData.append(key, value)
      })

      const productsResponse = await fetch(
        `http://localhost:5000/api/v1/products`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
          body: formData,
        },
      )

      const productData = await productsResponse.json()

      if (setRefetchProducts) setRefetchProducts(true)

      setValues({
        images: previewImageFile,
        title: '',
        parentCategory: '',
        category: '',
        price: 0,
        hasDiscount: discountAvailable,
        delivery: false,
        organic: false,
        transaction: false,
        cashOnDelivery: false,
        returnableChoice: false,
        onSiteShopping: false,
      } as AddProductFormValues)

      setOpenModal(false)
      setIsEditModal(false)
      setDiscountAvailable(false)
      setPreviewImage('/previewImage.jpg')
      setTouched({})
      setErrors({})
    },
  })
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
        setUploadedImageFile(imageResponse)
      })
      .catch((err) => {})
  }

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
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
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center mt-24 justify-center">
        <div className="font-noto p-12 w-100 bg-white rounded-md flex flex-col gap-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="font-bold text-xl">Enter Product Details</div>
            <div className="flex gap-10">
              <div className="w-2/3 flex flex-col">
                <label className="text-md mt-5" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-1 px-3 focus:outline-none focus:bg-white focus:border-gray-400"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-sm text-red-900">
                    {formik.errors.title}
                  </div>
                ) : null}
                <div className="flex mt-5 gap-5">
                  <div className="flex flex-col w-1/2">
                    <label className="text-md" htmlFor="parent-category">
                      Parent Category:
                    </label>
                    <select
                      title="parent-category"
                      name="parentCategory"
                      className="focus:outline-none focus:bg-white focus:border-gray-400 py-1 px-3 bg-gray-200 text-sm rounded-md w-full mt-1"
                      value={formik.values.parentCategory}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.handleChange(e)
                        const childCategories = getChildCategories(
                          e.target.value,
                        )
                        setChildCategories(childCategories)
                      }}
                    >
                      <option disabled value="">
                        Select option
                      </option>
                      {parentCategories.map((category) => {
                        return (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        )
                      })}
                    </select>
                    {formik.touched.parentCategory &&
                    formik.errors.parentCategory ? (
                      <div className="text-sm text-red-900">
                        {formik.errors.parentCategory}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-md" htmlFor="category">
                      Child Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="focus:outline-none focus:bg-white focus:border-gray-400 py-1 px-3 bg-gray-200 text-sm rounded-md w-full mt-1
                      "
                      value={formik.values.category}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option disabled value="">
                        Select option
                      </option>
                      {childCategories.map((category) => {
                        return (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        )
                      })}
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                      <div className="text-sm text-red-900">
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-5">
                  <label htmlFor="" className="text-md">
                    Select options that apply:
                  </label>
                  <div className="text-sm grid grid-cols-2 gap-1 -mt-3">
                    <div className="grid-col-1">
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="delivery"
                          id=""
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.delivery as boolean}
                        />
                        <label htmlFor="">Free Delivery</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="organic"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.organic as boolean}
                        />
                        <label htmlFor="">Organically Produced</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="transaction"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.transaction as boolean}
                        />
                        <label htmlFor="">Secure Transaction</label>
                      </div>
                    </div>
                    <div className="grid-col-1">
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="cashOnDelivery"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.cashOnDelivery as boolean}
                        />
                        <label htmlFor="">Cash on Delivery</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="returnableChoice"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.returnableChoice as boolean}
                        />
                        <label htmlFor="">Returnable Choice</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          title="radio"
                          type="radio"
                          name="onSiteShopping"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.onSiteShopping as boolean}
                        />
                        <label htmlFor="">On-site shopping</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-md">
                    Price per kg
                  </label>
                  <input
                    title="price"
                    name="price"
                    className="bg-gray-200 text-sm border-2 border-gray-200 rounded-md ml-3 py-1 px-3 focus:outline-none focus:bg-white focus:border-gray-400 mt-1 w-24"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="text-sm text-red-900">
                      {formik.errors.price}
                    </div>
                  ) : null}
                  <div className="flex items-center mt-5 justify-between">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={discountAvailable}
                            onChange={() => {
                              setDiscountAvailable((prevState) => {
                                return !prevState
                              })
                            }}
                          />
                        }
                        label={
                          <label
                            htmlFor=""
                            className="text-md whitespace-nowrap -ml-4"
                          >
                            Add Discount
                          </label>
                        }
                        labelPlacement="start"
                      />
                    </FormGroup>
                    {discountAvailable && (
                      <div className="flex gap-3 items-center">
                        <label htmlFor="" className="text-md whitespace-nowrap">
                          Discount in %
                        </label>
                        <input
                          title="discountPercentage"
                          name="discountPercentage"
                          className="bg-gray-200 text-sm border-2 border-gray-200 rounded-md py-1 px-3 focus:outline-none focus:bg-white focus:border-gray-400 w-24"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.discountPercentage}
                        />
                      </div>
                    )}
                    {discountAvailable &&
                    formik.touched.discountPercentage &&
                    formik.errors.discountPercentage ? (
                      <div className="text-sm text-red-900">
                        {formik.errors.discountPercentage}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex flex-col">
                <div>
                  {previewImage && !uploadedImageURL ? (
                    <div className="h-40 mb-3 md:h-68 md:w-56 flex items-center justify-center overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={previewImage}
                        alt="preview"
                      />
                    </div>
                  ) : null}
                  {uploadedImageURL ? (
                    <div className="h-40 mb-3 md:h-68 md:w-56 flex items-center justify-center overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={uploadedImageURL}
                        alt="uploaded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  ) : null}
                  <input
                    title="productImage"
                    name="productImage"
                    type="file"
                    onChange={handleSelectImage}
                  />
                </div>
              </div>
            </div>
            {/* button */}
            <div className="flex gap-3 justify-end font-bold">
              <button
                className="bg-gray-300 rounded-md px-3 py-2"
                onClick={() => {
                  setOpenModal(false)
                  setPreviewImage('/previewImage.jpg')
                }}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white rounded-md px-3 py-2"
                onClick={handleUploadImage}
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default AddProductModal
