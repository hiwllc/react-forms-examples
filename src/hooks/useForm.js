import { useState, useCallback } from 'react'
import { view, keys, is, complement, lensPath, set } from 'ramda'

const isArray = is(Array)
const isNotArray = complement(is(Array))

/**
 * vamos validar todos os campos entao
 */
const validate = (schema, data, errors = {}) => {
  const lens = lensPath(keys(schema))
  const validations = view(lens, schema)
  const value = view(lens, data)

  if (!validations) {
    return {}
  }

  if (isNotArray(validations)) {
    const result = validations(value)

    if (result) {
      return set(lens, result, errors)
    }
  }

  if (isArray(validations)) {
    for (let validate of validations) {
      const result = validate(value)

      if (result) {
        return set(lens, result, errors)
      }
    }
  }

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
