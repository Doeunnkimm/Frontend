'use client'

import { Button, Heading } from '@chakra-ui/react'

import Dialog from '@/components/Dialog/Dialog'
import { useState } from 'react'

const ArkPage = () => {
  const [isOpen, setOpen] = useState(false)

  const handleDialog = () => {
    setOpen(true)
  }

  return (
    <>
      <Heading>Ark Test Page</Heading>
      <Button onClick={handleDialog}>OPEN</Button>
      <Dialog
        isOpen={isOpen}
        text='비밀번호 재설정 링크가 발송되었습니다'
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default ArkPage
