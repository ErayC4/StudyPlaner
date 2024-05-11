import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Grid from './Grid.jsx'
import AddBlock from './AddBlock.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <AddBlock />
    <Grid />
  </React.StrictMode>,
)
