import React, { useEffect, useState } from 'react'
import style from './style.module.css'

export default function RichText(props) {
  
   
  return (
    <div className={`${style.textareaDiv}`}>
      <textarea
      name="message"
      value={props.value}
      onChange={(e) =>props.setResult(e.target.value) }
      className={style.textarea}
      
      // placeholder="How can we help you?"
    ></textarea>
    </div>
  )
}
