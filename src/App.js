import React, { useState } from 'react'

import './style.css'

function App() {
  /**
   * Apenas para visualizar os dados.
   */
  const [data, setData] = useState({})

  const handleSubmit = event => {
    event.preventDefault()
    /**
     * agora nao precisamos mais usar o target para pegar os dados.
     */
    console.log(`
      send data to API: ${JSON.stringify(data, null, 2)}
    `)
  }

  const isDataEmpty = Object.keys(data).length <= 0

  /**
   * Para lidar com mudanca de dados de forma individual podemos fazer dessa forma:
   */
  const handleChange = ({ target }) =>
    setData({
      ...data,
      [target.name]: target.value,
    })

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
    </div>
  )
}

export default App
