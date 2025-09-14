import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [postResponse, setPostResponse] = useState('')
  const [getResponse, setGetResponse] = useState('')

  const postAPI = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message })
      })
      const data = await response.json()
      setPostResponse(data.message || 'POSTへの応答')
    } catch (error) {
      setPostResponse('ERROR: ' + error.message)
    }
  }

  const getAPI = async () => {
    try {
      const response = await fetch('/api')
      const data = await response.json()
      setGetResponse(data.message || 'GETへの応答')
    } catch (error) {
      setGetResponse('ERROR: ' + error.message)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Express-0912</h1>
        <div className="card">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力"
            className="input-field"
          />
          <button onClick={() => setMessage('')} className="clear-btn">
            CLEAR
          </button>
          <button onClick={postAPI} className="post-btn">
            POST
          </button>
          <button onClick={getAPI} className='get-btn'>
            GET
          </button>
        </div>

        <div className="content-grid">
          <div className="content-card">
            <h3>Post Data</h3>
            <p className='display-text'>{postResponse || '(空)'}</p>
          </div>
          <div className="content-card">
            <h3>Get Data</h3>
            <p className='display-text'>{getResponse || '(空)'}</p>
          </div>
          <div className="content-card">
            <h3>React State</h3>
            <p className='display-text'>{message || '(空)'}</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
