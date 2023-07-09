import * as FORM_SCHEMA from './constants/form.schema'
import * as yup from 'yup'

import FormInputText2 from './components/NonControllerForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function NonControllerTest() {
  const { email, password, password_confirm, phone, age } = FORM_SCHEMA

  const schema = yup.object().shape({
    email,
    password,
    password_confirm,
    phone,
    age,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmitSignUp = (data) => {
    console.log({ data })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValue(name, value)
    trigger(name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitSignUp)}>
      <FormInputText2
        name='email'
        label='이메일'
        register={register}
        errors={errors}
        handleChange={handleChange}
        value={getValues('email')}
      />
      <FormInputText2
        name='password'
        label='비밀번호'
        type='password'
        register={register}
        errors={errors}
        handleChange={handleChange}
        value={getValues('password')}
      />
      <FormInputText2
        name='password_confirm'
        label='비밀번호 확인'
        type='password'
        register={register}
        errors={errors}
        handleChange={handleChange}
        value={getValues('password_confirm')}
      />
      <button>SUBMIT</button>
    </form>
  )
}
