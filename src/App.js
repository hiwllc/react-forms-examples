import React from 'react'
import isEmail from 'validator/lib/isEmail'
import { useForm } from './hooks/useForm'

import './style.css'

const required = message => data => data.length <= 0 && message
const email = message => data => !isEmail(data) && message
const lt = (message, size) => data => data.length <= size && message

const validations = {
  username: required('O username precisa ser válido.'),
  email: [required('Informe seu e-mail.'), email('O e-mail é invalido')],
  password: [
    required('A senha precisa ser válida.'),
    lt('A senha precisa ter mais que 3 caracteres', 3),
  ],
}

const initialData = {
  username: '',
  email: '',
  password: '',
  remember: true,
}

function App() {
  const { data, errors, onBlur, onChange, onSubmit } = useForm({
    data: initialData,
    validations,
  })

  const fetchAPI = () => {
    console.log(`
      send data to API: ${JSON.stringify(data, null, 2)}
    `)
  }

  const isDataEmpty = Object.keys(data).length <= 0
  const isErrorEmpty = Object.keys(errors).length <= 0

  return (
    <div className="container">
      <div className="papper">
        <h1 className="papper-title">Sign In</h1>

        <form method="post" onSubmit={onSubmit(fetchAPI)}>
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
              onChange={onChange}
              onBlur={onBlur}
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
              onChange={onChange}
              onBlur={onBlur}
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
              onChange={onChange}
              onBlur={onBlur}
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
                checked={data.remember}
                onChange={onChange}
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
