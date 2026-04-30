import * as React from 'react'

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Field Deploy Dashboard</h1>
      <p>Frontend placeholder — click to fetch a camera snapshot from the backend at <code>/snapshot</code>.</p>
      <img src="http://localhost:3000/camera/stream" alt="camera snapshot" id="snapshot" />
    </div>
  )
}
