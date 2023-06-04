import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function RotateLoading() {
  return (
    <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="1"
    width="38"
    visible={true}
  />
  )
}

export default RotateLoading