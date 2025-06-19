import React from 'react'
import '../css/loader.css'

export default function Loader(props) {
  return (
    <div style={{"display": props.isLoading ? 'block' : 'none'}}>
        <div className="loader" ></div>
        <div style={{"text-align": "center"}}>{props.message}</div>
    </div>
  )
}
