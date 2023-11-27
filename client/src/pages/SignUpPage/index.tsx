import React, { useState } from 'react'
import AddProfileInformation from '../../components/AddProfileInformation'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import AuthForm from '../../components/AuthForm'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import AgricultureIcon from '@mui/icons-material/Agriculture'

const steps = ['Create your account', 'Add required Information']

const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isFarmerChecked, setIsFarmerChecked] = useState(true)
  const [isConsumerChecked, setIsConsumerChecked] = useState(false)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }
  return (
    <div className="md:px-36 px-14 pt-5 pb-8 font-noto flex justify-center flex-col gap-5">
      <div className="flex justify-center items-center">
        <Stepper
          style={{ width: '600px', color: 'green' }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </div>
      <div className="flex justify-center">
        {activeStep === 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex">
              <button
                onClick={() => {
                  setIsFarmerChecked(true)
                  setIsConsumerChecked(false)
                }}
                className={`flex rounded-l-lg justify-center gap-3 w-full py-3 transition duration-500 ease-in-out ${
                  isFarmerChecked ? 'bg-teaGreen1' : 'bg-magnolia'
                }`}
              >
                <AgricultureIcon />
                <label htmlFor="">I am a Farmer</label>
              </button>
              <button
                onClick={() => {
                  setIsConsumerChecked(true)
                  setIsFarmerChecked(false)
                }}
                className={`flex justify-center rounded-r-lg gap-3 w-full py-3 transition duration-500 ease-in-out ${
                  isConsumerChecked ? 'bg-teaGreen1' : 'bg-magnolia'
                }`}
              >
                <ShoppingBasketIcon />
                <label htmlFor="">I am a Constomer</label>
              </button>
            </div>
            <AuthForm handleNext={handleNext} isSignIn={false} />
          </div>
        )}
        {activeStep === 1 && (
          <div className="p-10 border border-1 border-zinc-300 rounded-2xl mb-10">
            <div className="font-noto w-110 bg-white rounded-md">
              <AddProfileInformation edit={false} />
              <div className="mt-5 flex justify-end mr-6">
                <button className="bg-black w-68 text-white rounded-md px-3 py-2 hover:shadow-lg">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUpPage
