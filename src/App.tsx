import { useState } from 'react'
import { Test } from '@components/test'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Have a look at the source code please!</h1>
      <Test />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
