import logo from '../../public/logo.svg'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <Image src={logo} alt="logo" />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="App-line"></div>

      <main className="App-main"></main>
    </div>
  )
}
