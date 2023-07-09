import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요'),
  age: yup.string().required('나이를 입력해주세요'),
})

export default function YupAndHookForm() {
  const [data, setData] = useState({ name: '', age: 0 })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmitFunc = (data) => {
    const { name, age } = data
    setData({ name, age })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunc)}>
        <label>이름</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
        <label>나이</label>
        <input {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
        <button>SUBMIT</button>
      </form>
      {data.name && data.age !== 0 && (
        <div>
          이름은 {data.name}이시고, 나이는 {data.age}살 이시군요!
        </div>
      )}
    </>
  )
}
