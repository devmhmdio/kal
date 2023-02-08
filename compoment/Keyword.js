import React, { useState } from 'react'
import Chips from './Chip'
import style from  './style.module.css'


export default function Keyword({emailKeyword ,setemailKeyword,label}) {
  
  const [key, setkey] = useState("")
  return (
    <>
    <div className={style.formboldmb5}>
    <label className={`${style.formboldformlabel} ${style.formboldformlabel2}`}>
    {label}  :
    </label>
       
        <div style={{
          display:"flex",
          flexDirection:"row"

        }}>
          {
            emailKeyword.length>0 && emailKeyword.map((item)=><Chips label={item}  emailKeyword={emailKeyword} setemailKeyword={setemailKeyword} />)
          }
        </div>
        <div style={{
          display:"flex",
          flexDirection:"row",
          marginTop:"10px"


        }}>
        <input
          type="text"
          name="key"
          id="#email"
          placeholder="Enter your key to generate the email"
          className={style.formboldforminput}
          value={key}
          onChange={(e)=>setkey(e.currentTarget.value)}
        />
         <div>
            <button 
              onClick={()=>{
                if(key)
                {
                  setemailKeyword([...emailKeyword,key])
                  setkey("")
                }
              }}
              className={style.formboldbtn}>
              Add Key
            </button>
         </div>
       
        </div>
      </div>
    
    </>
  )
}
