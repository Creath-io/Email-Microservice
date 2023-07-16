const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const knex = require('knex');
const sendMail = require('./src/sendMail.js');
const app = express()
const port = process.env.PORT || 3001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const db = knex({
    client : 'pg',
    connection : {
        host  : '127.0.0.1',
        user : 'postgres',
        password : 'blue',
        database : 'Creath'
    }
})



app.get('/',(req,res)=>{
    res.send("Let us get it")
})

app.post('/sendmail', async (req, res) => {
    const { to, subject, message } = req.body;
    console.log(req.body)
    console.log(to)
    console.log(subject)
    console.log(message)
    try {
      await sendMail("Creath", to, "noreply@creathteam.io", subject, message);
      res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Error sending email' });
    }
});





app.listen(port, ()=>{
    console.log(`App is running in port ${port}`)
})