import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'

const CreateTrainerFormHeader = () => {
  return (
    <div className="flex justify-between p-6">
      <h1>Trainer Registration</h1>
      <div className="flex gap-2 place-items-center">
        <ArrowLeft />
        <h1>Back</h1>
      </div>
    </div>
  )
}

export default CreateTrainerFormHeader