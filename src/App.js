import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail'

import './style.css'

/**
 * Precisamos mostrar os erros para o usuario entao vamos
 * adicionar uma mensagem de erro na nossa funcao.
 */
const required = message => data => data.length <= 0 && message
const email = message => data => !isEmail(data) && message
const lt = (message, size) => data => data.length <= size && message

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

const validations = {
  username: required('O username precisa ser válido.'),
  email: [required('Informe seu e-mail.'), email('O e-mail é invalido')],
  password: [
    required('A senha precisa ser válida.'),
    lt('A senha precisa ter mais que 3 caracteres', 3),
  ],
}

function App() {
  /**
   * Apenas para visualizar os dados.
   */
  const [data, setData] = useState({
    username: 'uselessdev',
    email: '',
    password: '',
    checked: true,
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = event => {
    event.preventDefault()

    console.log(`
      send data to API: ${JSON.stringify(data, null, 2)}
    `)
  }

  /**
   * Aqui nos validamos os dados no momento do blur,
   * talvez alterar para ref faria mais sentido.
   */
  const handleBlur = ({ target }) => {
    const { name, value } = target

    const result = validate({ [name]: validations[name] }, { [name]: value })

    setErrors({
      ...errors,
      [name]: result[name],
    })
  }

  const isDataEmpty = Object.keys(data).length <= 0
  const isErrorEmpty = Object.keys(errors).length <= 0
  /**
   * Para lidar com mudanca de dados de forma individual podemos fazer dessa forma:
   */
  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    })
  }

  /**
   * Lembre-se que o checkbox tem um valor boolean
   */
  const toggleCheckBox = ({ target }) =>
    setData({
      ...data,
      /**
       * usamos target.name porque bem, queremos reutilizar isso
       */
      [target.name]: target.checked,
    })

  return (
    <div className="container">
      <div className="papper">
        <h1 className="papper-title">Sign In</h1>

        <form method="post" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="username">
              username:
            </label>
            <input
              id="username"
              className="field-input"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.username && (
              <small className="field-message">{errors.username}</small>
            )}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="email">
              email:
            </label>
            <input
              id="email"
              className="field-input"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.email && (
              <small className="field-message">{errors.email}</small>
            )}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="password">
              password:
            </label>
            <input
              id="password"
              className="field-input"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.password && (
              <small className="field-message">{errors.password}</small>
            )}
          </div>

          <div className="field">
            <label className="field-label check">
              <input
                className="field-input"
                type="checkbox"
                name="remember"
                checked={data.checked}
                onChange={toggleCheckBox}
              />
              <span>Remember-me</span>
            </label>
          </div>

          <button type="submit" disabled={isDataEmpty}>
            Register
          </button>
        </form>
      </div>

      {!isDataEmpty && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {!isErrorEmpty && <pre>{JSON.stringify(errors, null, 2)}</pre>}
    </div>
  )
}

export default App
