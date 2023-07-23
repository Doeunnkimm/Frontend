import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { BorderBox } from '../Box/Box'

interface BoxIconProps {
  icon: IconProp
  cursor?: boolean
  color?: string
}

export const BoxIcon: FC<BoxIconProps> = ({
  icon,
  cursor = true,
  color = 'rgb(140, 140, 140)',
}) => {
  return (
    <BorderBox
      px='2'
      py='1'
      minH='100%'
      cursor={cursor ? 'pointer' : 'default'}>
      <FontAwesomeIcon
        icon={icon}
        style={{ color }}
      />
    </BorderBox>
  )
}

export const Icon: FC<BoxIconProps> = ({
  icon,
  cursor = true,
  color = 'rgb(140, 140, 140)',
}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      cursor={cursor ? 'pointer' : 'default'}
      color={color}
    />
  )
}
