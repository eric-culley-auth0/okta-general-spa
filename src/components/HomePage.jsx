import { Fragment, useState } from 'react'
import reactLogo from '../assets/react.svg'
import NavBar from '../components/NavBar'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <NavBar></NavBar>
      <hr></hr>
      <div>
        <a href="https://developer.okta.com/" target="_blank">
          <img src="/okta-developer.png" className="logo okta" alt="Okta logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Okta + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Fragment>
  )
}

export default Home
