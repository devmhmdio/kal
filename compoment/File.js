import React, { useState } from "react";
import style from "./style.module.css";
import Files from "react-files";
import CSVReader from "react-csv-reader";
import { Button } from "@mui/material";
import DraggableDialog from "./Dialoge";
import axios from "axios";

export default function FileUploadz({Result,Subject}) {
  const [file, setfile] = useState("");
  const [Data, setData] = useState([]);
  const [open, setopen] = useState(false)
  const [showLoader, setshowLoader] = useState(false)
  const [response, setresponse] = useState()
  const [subject, setsubject] = useState(Subject)

  
 
  async function handleSubmit(event) {
    console.log("Result", Result)
    event.preventDefault();
    setopen(true)
    setshowLoader(true)
    SendEmail()
 

    
  }

const SendEmail=async()=>{
    try {

      const emailBody={
        subject:subject,
        mailBody:Result,
        reciever:Data
      }
      await axios.post("/api/emailsend",emailBody).then((res)=>{
        console.log(res?.data)
        setresponse(res.data?.response)
        setshowLoader(false)


      }).catch((err)=>{
        setopen(false)
        alert(err.response?.data);

      })
      
    } catch (error) {
      
    }
  }
 
  

  const handleForce = (data, fileInfo) => {
    setfile(fileInfo);
    setData(data);
    console.log("data", Data);
  };
 
 
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  return (
    <div className={`${style.mb6} ${style.pt4}`}>
      <label
        className={`${style.formboldformlabel} ${style.formboldformlabel2}`}
      >
        Upload File
      </label>
      <div style={{marginTop:"50px"}}>
      <CSVReader
        
        cssClass="react-csv-input"
       
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      </div>
      <DraggableDialog  setOpen={setopen} open={open} response={response} showLoader={showLoader}/>
      <div style={{marginTop:"50px"}}>
      <label
        className={`${style.formboldformlabel} ${style.formboldformlabel2}`}
      >
        Subject
      </label>

      <input
        type="text"
        value={subject}
        onChange={(e)=>setsubject(e.target.value)}
        className={style.formboldforminput}
        

      
      />
      </div>

      <div style={{
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        marginTop:"40px",
        height:"300px"

      }}>
      <button onClick={handleSubmit} className={style.formboldbtn}>
        Send Mail 
      </button>
      </div>
    </div>
  );
}
