import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const TODOS = [
  {id:"todo-0",name:"Coding", completed:true},
  {id:"todo-2",name:"Self-care", completed:false},
  {id:"todo-3",name:"Journaling", completed:false}
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={TODOS}/>
  </React.StrictMode>,
)
