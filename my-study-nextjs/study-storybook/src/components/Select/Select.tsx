import * as S from './Select.style'

import { FC, useState } from 'react'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  options: { [value: string]: { title: string } }
  selectedValue: string
  setValue: (value: string) => void
}

const Select: FC<Props> = ({
  options,
  selectedValue = '',
  setValue = () => null,
}) => {
  const [isOpenSlide, setIsOpenSlide] = useState(false)

  const handleSlide = () => {
    setIsOpenSlide((prev) => !prev)
  }

  const handleValue = (value: string) => {
    setValue(value)
  }

  return (
    <S.Wrapper onClick={handleSlide}>
      <S.BoxContainer>
        <span>{options[selectedValue].title}</span>
        <FontAwesomeIcon
          icon={faAngleDown}
          rotation={isOpenSlide ? 180 : undefined}
        />
      </S.BoxContainer>
      {isOpenSlide && (
        <S.SelectContainer>
          {Object.entries(options).map(([key, value]) => (
            <S.SelectItem
              key={key}
              onClick={() => handleValue(key)}
              state={selectedValue === key}>
              {value.title}
            </S.SelectItem>
          ))}
        </S.SelectContainer>
      )}
    </S.Wrapper>
  )
}
export default Select
