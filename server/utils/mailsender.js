const nodemailer=require("nodemailer");
const mailSender=async(email,title,body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
        
            auth: {
              user: process.env.MAIL_USER,
              pass:process.env.MAIL_PASS,
            },
            
          });
          const info = await transporter.sendMail({
            from: 'StudyNotion ', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            // plain text body
            html: body, // html body
          });
          return info;

    }
    catch(e){
    console.log(e.message); 
    }
}
module.exports=mailSender;