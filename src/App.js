import React, { useState } from 'react'

import './style.css'

function App() {
  /**
   * Apenas para visualizar os dados.
   */
  const [data, setData] = useState(false)

  return (
    <div className="container">
      <div className="papper">
        <h1 className="papper-title">Sign In</h1>

        <form method="post">
          <div className="field">
            <label className="field-label" htmlFor="username">
              username:
            </label>
            <input
              id="username"
              className="field-input"
              type="text"
              name="username"
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
            />
          </div>

          <div className="field">
            <label className="field-label check">
              <input className="field-input" type="checkbox" name="remember" />
              <span>Remember-me</span>
            </label>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default App
