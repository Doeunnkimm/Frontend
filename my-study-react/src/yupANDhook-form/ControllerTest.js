import * as yup from 'yup'

import FormInputText from './ControllerForm'
import { REGEX } from './constants/regex.const'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ControllerTest() {
  const [data, setData] = useState({ email: '', phone: '', age: '' })

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(REGEX.email, {
        message: '이메일 형식에 알맞게 입력해주세요',
        excludeEmptyString: true,
      })
      .required('이메일을 입력해주세요'),
    password: yup
      .string()
      .min(8, '8자 이상 입력해주세요')
      .max(16, '16자 이상 입력해주세요')
      .matches(REGEX.password, {
        message: '영문자, 숫자, 특수문자를 포함해서 입력해주세요',
      })
      .required('비밀번호를 입력해주세요'),
    password_confirm: yup
      .string()
      .oneOf([yup.ref('password')], '입력한 비밀번호와 일치하지 않습니다'),
    phone: yup
      .string()
      .matches(REGEX.phone, { message: '휴대폰 번호를 정확히 입력해주세요' })
      .required('휴대폰 번호를 입력해주세요'),
    age: yup.string().required('나이를 입력해주세요'),
  })
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) })

  const onSubmitSignUp = (data) => {
    console.log({ data })

    const { email, phone, age } = data

    setData({ email, phone, age })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitSignUp)}>
        <FormInputText
          name='email'
          control={control}
          label='이메일'
        />
        <FormInputText
          name='password'
          control={control}
          label='비밀번호'
          type='password'
        />
        <FormInputText
          name='password_confirm'
          control={control}
          label='비밀번호 확인'
          type='password'
        />
        <FormInputText
          name='phone'
          control={control}
          label='휴대폰 번호'
        />
        <FormInputText
          name='age'
          control={control}
          label='나이'
        />
        <button>SUBMIT</button>
      </form>
      {data.email && data.phone && data.age && (
        <div>
          <div>안녕하세요, {data.email}님 😀</div>
          <div>연락처: {data.phone}</div>
          <div>나이: {data.age}</div>
        </div>
      )}
    </>
  )
}
