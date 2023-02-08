import { CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import FileUpload from "../compoment/File";
import Keyword from "../compoment/Keyword";
import RichText from "../compoment/RichText";
import style from "./../compoment/style.module.css";
import CSVReader from "react-csv-reader";

export default function App() {
  const [emailKeyword, setemailKeyword] = useState([]);
  const [clientKeyword, setclientKeyword] = useState([]);
  const [Result, setResult] = useState("");
  const [Subject, setSubject] = useState("")
  const [showLoader, setshowLoader] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setshowLoader(true);
    setResult("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Businesskeyword: emailKeyword.toString(),clientKeyword:clientKeyword.toString() }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setResult("Not Able to get ");
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

     
      const Body=data.result.split("\n")
      const sub=Body[1].split(":")
      if(sub.length==2) setSubject(sub[1])
      else setSubject("")
      const salutations = ['Dear', 'Hey', 'Hello', 'Hey there!'];
      const randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
      setResult(`${randomSalutation} <name>,\n` + Body.slice(2).join("\n"))
      // console.log(Result,Subject)
      setshowLoader(false);      
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
 
  return (
    <>
      <div className={style.formboldmainwrapper}>
        <div className={style.formboldformwrapper}>
          <Keyword
            emailKeyword={emailKeyword}
            setemailKeyword={setemailKeyword}
            label={"Enter the Business key word"}
          />
          <Keyword
            emailKeyword={clientKeyword}
            setemailKeyword={setclientKeyword}
            label={"Enter the client's keyword  "}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            {showLoader ? (
              <CircularProgress />
            ) : (
              <button className={style.formboldbtn} onClick={onSubmit}>
                Generate Email
              </button>
            )}
          </div>
          {Result ? (
            <>
            
              <Grid
                container
                style={{
                  marginTop:"100px"
                }}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <label className={`${style.formboldformlabel} ${style.formboldformlabel2}`}>
                    Response
                  </label>
                  <RichText value={Result} setResult={setResult} />
                </Grid>
                <Grid item xs={6}>
                <FileUpload Result={Result} Subject={Subject}  />
                  
                </Grid>
              </Grid>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
