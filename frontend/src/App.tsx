import * as React from 'react'

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Field Deploy Dashboard</h1>
      <p>Frontend placeholder — click to fetch a camera snapshot from the backend at <code>/snapshot</code>.</p>
      <img alt="camera snapshot" id="snapshot" />
      <div style={{ marginTop: 12 }}>

        <button onClick = {async () => {
          try {
            const res = await fetch('/camera/snapshot')
            if (!res.ok) throw new Error(await res.text())
            const blob = await res.blob() // blob turns the binary response into a format that can be used to create an object URL
            const url = URL.createObjectURL(blob) || null // avoid getting an any type error
            if (url != null) {
              (document.getElementById('snapshot') as HTMLImageElement).src = url
            }
          } catch (e) {
            alert('Failed to fetch snapshot: ' + e)
          }
        }}>
          Fetch Snapshot
        </button>
      </div>
    </div>
  )
}
