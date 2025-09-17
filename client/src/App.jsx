import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [postResponse, setPostResponse] = useState('')
  const [getResponse, setGetResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [env, setEnv] = useState('Loading')

  useEffect(() => {
    fetch('/env')
      .then(res => res.json())
      .then(data => setEnv(data.env))
      .catch(() => setEnv('Error'))
  }, [])

  const postAPI = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      })
      const data = await response.json()
      setPostResponse(data.message || 'POSTへの応答')
    } catch (error) {
      setPostResponse('ERROR: ' + error.message)
    } finally {
      setTimeout(() => setIsLoading(false), 800)
    }
  }

  const getAPI = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api')
      const data = await response.json()
      setGetResponse(data.message || 'GETへの応答')
    } catch (error) {
      setGetResponse('ERROR: ' + error.message)
    } finally {
      setTimeout(() => setIsLoading(false), 800)
    }
  }

  return (
    <div className="App">

      <header>
        <p className='enviroment'>{env}</p>
        <h1>Express-0912</h1>
      </header>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="btn-container">

        <button onClick={postAPI} className="btn post" disabled={isLoading}>
          {isLoading ? <ClipLoader size={24} color="black" /> : 'POST'}
        </button>

        <button onClick={getAPI} className="btn get">
          GET
        </button>

      </div>
      <div className="grid-area">
        <div className="state-container">
          <h3>React State</h3>
          <p>{message || '(空)'}</p>
        </div>
      </div>
      <div className="grid-area">
        <div className="res-container">
          <h3>Post Data</h3>
          <p>{postResponse || '(空)'}</p>
        </div>
        <div className="res-container">
          <h3>Get Data</h3>
          <p>{getResponse || '(空)'}</p>
        </div>
      </div>
    </div>
  )
}
export default App
