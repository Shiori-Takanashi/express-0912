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
      setPostResponse('ERROR: ' + (error?.message ?? String(error)))
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
      setGetResponse('ERROR: ' + (error?.message ?? String(error)))
    } finally {
      setTimeout(() => setIsLoading(false), 800)
    }
  }

  return (
    <div className="App">
      <div className="shell">
        <header>
          <p className="enviroment">{env}</p>
          <h1>Express-0912</h1>
        </header>

        <section className="layout">
          {/* 左：入力と状態（≈35%） */}
          <div className="stack">
            <div className="card input-container">
              <input
                type="text"
                className="input-field"
                value={message}
                placeholder="入力"
                maxLength={15}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="char-count">{message.length}/15</p>
            </div>

            <div className="card btn-container">
              <div className="btn-grid">
                <button
                  onClick={postAPI}
                  className="btn post"
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? <ClipLoader size={22} color="#ffffff" /> : 'POST'}
                </button>

                <button
                  onClick={getAPI}
                  className="btn get"
                  disabled={isLoading}
                >
                  GET
                </button>
              </div>
            </div>

            <div className="card state-container">
              <h3 className="block-title">React State</h3>
              <p className="block-value">{message || '(空)'}</p>
            </div>
          </div>

          {/* 右：結果（≈65%） */}
          <div className="responses">
            <div className="card res-container">
              <h3 className="block-title">Post Data</h3>
              <p className="block-value">{postResponse || '(空)'}</p>
            </div>
            <div className="card res-container">
              <h3 className="block-title">Get Data</h3>
              <p className="block-value">{getResponse || '(空)'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
