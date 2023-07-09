import * as FORM_SCHEMA from './constants/form.schema'
import * as yup from 'yup'

import FormInputText from './ControllerForm'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ControllerTest() {
  const { email, password, password_confirm, phone, age } = FORM_SCHEMA
  const [data, setData] = useState({ email: '', phone: '', age: '' })

  const schema = yup.object().shape({
    email,
    password,
    password_confirm,
    phone,
    age,
  })
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) })

  const onSubmitSignUp = (data) => {
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
