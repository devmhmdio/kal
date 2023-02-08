import second, { transporter } from '../../config/index'

export default async function (req, res) {  
  
  try {
    const { mailBody,reciever,subject}=req.body
    console.log(mailBody,reciever)
    if(!mailBody) throw new Error("email body is missing ")
    if(!reciever.length) throw new Error("Recipient missing")
    var response=[["email","status"]]
    // //extract subject
    // let sub=mailBody.split("}")
    // if(sub.length!==2) throw new Error("Subject is missing or format not match ")
    // let subleft=sub[0].split("{")
    // let restbody=sub[1]
    
  
    for(let i=0; i<reciever.length; i++){
      
      await HandleRequest(reciever[i],response,mailBody,subject)
  
    }
      res.status(200).json({
        response
      })
    
  } catch (error) {
    console.log("error",error.message)
    res.status(404).json(error.message)
    
  }
  }


  async function HandleRequest(item,response,mailBody,subject){
   try {
    let AfterName=mailBody.replace("<name>",item?.name).replace("[Your Name]",item?.name).replace("[Your name]",item?.name).replace("<Sender's Name>",item?.name).replace("<Sender's name>",item?.name).replace("<Name>",item?.name)
    const CompanyNameBody=AfterName.replace("<company name>",item?.companyname).replace("<sender's business name>",item?.name)
    const sub=subject.replace("<company name>",item?.companyname).replace("<sender's business name>",item?.name).replace("<name>",item?.name).replace("[Your Name]",item?.name).replace("[Your name]",item?.name).replace("<Sender's Name>",item?.name).replace("<Sender's name>",item?.name).replace("<Name>",item?.name)
    
    
    await transporter.sendMail({
      from: process.env.FROM_EMAIL, // sender address
      to: item?.email, // list of receivers
      subject:sub, // Subject line
      text: CompanyNameBody, // plain text body
       // html body
    }).then((res)=>{
      console.log(res)
      response.push([
        item?.email,"SENT DONE"
      ])
    }).catch((err)=>{
      console.log("err",err)
      response.push([
        item?.email,"Some thing went wrong"
      ])
      throw new Error(err.message)
    })
    
   } catch (error) {
    console.log("error",error)
    throw new Error(error.message)
    
   }
   
  }