'use client'

import * as Lottie from '@/components/Icon/lotties'
import * as S from './Dialog.styles'

import {
  Dialog as ArkDialog,
  DialogBackdrop,
  DialogContainer,
  DialogContent,
  DialogDescription,
  Portal,
} from '@ark-ui/react'
import { Button, Flex } from '@chakra-ui/react'

import type { FC } from 'react'

interface Props {
  type?: 'alert' | 'confirm'
  isOpen: boolean
  text: string
  onConfirm?: () => void
  onClose: () => void
}

const Dialog: FC<Props> = ({
  type = 'alert',
  isOpen,
  text,
  // onConfirm,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <ArkDialog
          open={isOpen}
          onClose={onClose}>
          <Portal>
            <DialogBackdrop />
            <DialogContainer>
              <S.Wrapper>
                <DialogContent>
                  <S.Container>
                    <DialogDescription>
                      <S.Content>
                        <Lottie.SuccessLottie />
                        <S.Text>{text}</S.Text>
                      </S.Content>
                    </DialogDescription>
                    <Flex
                      position={'absolute'}
                      bottom={'10'}
                      left={'50%'}
                      transform={'translateX(-50%)'}
                      gap={1}>
                      <Button onClick={onClose}>확인</Button>
                    </Flex>
                  </S.Container>
                </DialogContent>
              </S.Wrapper>
            </DialogContainer>
          </Portal>
        </ArkDialog>
      )}
    </>
  )
}

export default Dialog
