import { useState, useCallback } from 'react'

/**
 * vamos validar todos os campos entao
 */
const validate = (validations, data) => {
  let errors = {}

  Object.keys(validations).map(name => {
    if (Array.isArray(validations[name])) {
      // Pegamos apenas o primeiro erro.
      const error = validations[name].map(fn => fn(data[name] || ''))

      errors = {
        ...errors,
        /** se a primeira condicao for valida entao precisamos remover */
        [name]: error.filter(err => err).shift(),
      }
    } else {
      /**
       * Se nao existir o nome em data entao ele deve falhar na validacao.
       */
      const result = validations[name](data[name] || '')

      if (result) {
        errors = {
          ...errors,
          [name]: result,
        }
      }
    }
  })

  return errors
}

export const useForm = ({
  data = {},
  validations = {},
  validateOnSubmit = false,
}) => {
  const [values, setValues] = useState(data)
  const [invalids, setErrors] = useState({})

  const handleValuesChange = ({ target }) =>
    setValues({
      ...values,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    })

  const handleSubmit = (callback = null) => event => {
    event.preventDefault()

    if (validateOnSubmit) {
      setErrors(validate(validations, values))
    }

    if (callback) {
      // run callback
      callback()
    }
  }

  const handleBlur = ({ target }) => {
    const { name, value } = target

    const result = validate({ [name]: validations[name] }, { [name]: value })

    setErrors({
      ...invalids,
      [name]: result[name],
    })
  }

  return {
    data: values,
    errors: invalids,
    onChange: useCallback(handleValuesChange, [values]),
    onSubmit: useCallback(handleSubmit, [values]),
    onBlur: useCallback(handleBlur, [values, invalids]),
  }
}
