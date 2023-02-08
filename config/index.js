
const nodemailer = require('nodemailer');

export const PROMPT=`
Write a professional concise e-mail where targeted to a potential client who's quite an influential and 
important person in that company. Tell how the sender can help the client, and ask for a meeting schedule 
if interested. The description of the sender's business/services is given by following keyword/description: <Business Description>
The client name and their company name are: <name> from <company name> Client's business is related to <Client Description>
Identify and sell on three best selling points based on possible issues faced by clients in terms of a <Business Description>. 
The sender is a firm and not an individual. Include a Subject line.
Dear <name>,
`

//const test=await nodemailer.createTestAccount()
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_PASS
    }
});