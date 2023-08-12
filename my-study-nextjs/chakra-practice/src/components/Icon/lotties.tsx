'use client'

import successLottie from '@/assets/lottie/success.json'
import Lottie from 'lottie-react'

export const SuccessLottie = () => {
  return (
    <Lottie
      animationData={successLottie}
      style={{ width: '10rem' }}
      loop={false}
    />
  )
}
