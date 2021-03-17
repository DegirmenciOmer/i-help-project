import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await callback()
    } catch (e) {
      console.error(e)
    }
  }
  const onChange = (event, { name, value }) => {
    setValues({ ...values, [name]: value })
  }
  // console.log(values)

  return {
    onChange,
    onSubmit,
    values,
  }
}
