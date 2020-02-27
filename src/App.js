import React, { useState } from 'react'

import './style.css'

/**
 * Precisamos mostrar os erros para o usuario entao vamos
 * adicionar uma mensagem de erro na nossa funcao.
 */
const required = message => data => data.length <= 0 && message

/**
 * vamos validar todos os campos entao
 */
const validations = (validations, data) => {
  let errors = {}

  Object.keys(validations).map(name => {
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
  })

  return errors
}

function App() {
  /**
   * Apenas para visualizar os dados.
   */
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = event => {
    event.preventDefault()

    /**
     * Queremos validar todos os campos entao para cada um passamos uma fn de validacao.
     */
    const invalids = validations(
      {
        username: required('O username precisa ser válido.'),
        email: required('O email precisa ser válido.'),
        password: required('A senha precisa ser válido.'),
      },
      data
    )

    setErrors(invalids)

    console.log(`
      send data to API: ${JSON.stringify(data, null, 2)}
    `)
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
