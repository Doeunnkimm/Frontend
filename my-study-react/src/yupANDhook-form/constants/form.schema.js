import * as yup from 'yup'

import { REGEX } from './regex.const'

export const email = yup
  .string()
  .matches(REGEX.email, {
    message: '이메일 형식에 알맞게 입력해주세요',
    excludeEmptyString: true,
  })
  .required('이메일을 입력해주세요')

export const password = yup
  .string()
  .min(8, '8자 이상 입력해주세요')
  .max(16, '16자 이상 입력해주세요')
  .matches(REGEX.password, {
    message: '영문자, 숫자, 특수문자를 포함해서 입력해주세요',
  })
  .required('비밀번호를 입력해주세요')

export const password_confirm = yup
  .string()
  .oneOf([yup.ref('password')], '입력한 비밀번호와 일치하지 않습니다')
  .required('비밀번호 확인을 입력해주세요')

export const phone = yup
  .string()
  .matches(REGEX.phone, { message: '휴대폰 번호를 정확히 입력해주세요' })
  .required('휴대폰 번호를 입력해주세요')

export const age = yup.string().required('나이를 입력해주세요')
