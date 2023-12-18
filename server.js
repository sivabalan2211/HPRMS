const express =require("express")
const mysql = require("mysql2")
const cors = require("cors")
const app = express()
app.use(express.json())

const corsOptions = {
    origin: 'http://127.0.0.1:5501',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
};

app.use(cors(corsOptions));



const con = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'mysql'
})

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log('connected')
    }
})
app.get('/patients',(req,res)=>{
    const fetchid = req.params.patients;
    con.query("select * from patients", fetchid,(err,results)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(results)
        }
    })
})

app.post('/post', (req,res)=>{
    var id = req.body.id;
    var date = req.body.date;
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;
    var history = req.body.history;
    var prescriptions = req.body.prescriptions;
    var testresults = req.body.testresults;

    con.query('insert into patients values(?,?,?,?,?,?,?,?)',[id,date,name,age,address,history,prescriptions,testresults],(err,result)=>
    {
        if(err)
        {
            console.log(err)
        }
        else{
            res.send("POSTED")
        }

    })

})
app.put('/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const { date,name, age, address, history, prescriptions, testresults } = req.body;
    console.log('Received data:', req.body);
    // Validate input and handle errors
    if (!date||!name || !age || !address || !history || !prescriptions || !testresults) {
        return res.status(400).json({ success: false, error: 'Invalid input data' });
    }

    // Construct the update query
    const updateQuery = `
    UPDATE patients
    SET date=?, name=?, age=?, address=?, history=?, prescriptions=?, testresults=?
    WHERE id=?
`;

    // Execute the update query
    con.query(updateQuery,[date, name,age, address, history, prescriptions, testresults, patientId],
        (updateErr) => {
        if (updateErr) {
            console.error('Error updating patient:', updateErr);
            return res.status(400).json({ success: false, error: 'Invalid input data', receivedData: req.body });

        }

        res.status(200).json({ success: true, message: 'Patient updated successfully' });
    });
});

// app.put('/patients/:id', (req, res) => {
//     const patientId = req.params.id;
//     const { name, age, address, history, prescriptions, testresults } = req.body;

//     // Validate input and handle errors
//     if (!name || !age || !address || !history || !prescriptions || !testresults) {
//         return res.status(400).json({ success: false, error: 'Invalid input data' });
//     }

//     // Construct the update query
//     const updateQuery = `
//         UPDATE patients
//         SET name=?, age=?, address=?, history=?, prescriptions=?, testresults=?
//         WHERE id=?
//     `;
//     console.log("err")
//     // Execute the update query
//     con.query(updateQuery, [name, age, address, history, prescriptions, testresults, patientId], (updateErr) => {
//         if (updateErr) {
//             console.error('Error updating patient:', updateErr);
//             return res.status(500).json({ success: false, error: 'Internal Server Error' });
//         }

//         res.status(200).json({ success: true, message: 'Patient updated successfully' });
//     });
// });


//   process.on('exit', () => {
//     connection.end();
//     console.log('Disconnected from MySQL');
// });

// app.put('/update', (req,res)=>{
//     const id = req.body.id;
//     const date = req.body.date;
//     const name = req.body.name;
//     const age = req.body.name;
//     const address = req.body.address;
//     const history = req.body.history;
//     const prescriptions = req.body.prescriptions;
//     const testresults = req.body.testresults;

//     con.query('update patients set id=?,date=?,name=?, age=?,address=?,history=?,prescriptions=?,testresults=? ',[id,date,name,age,address,history,prescriptions,testresults],(err,results)=>{
//         if(err)
//         {
//             console.log(err)
//         }
//         else{
//             res.send("UPDATED...")
//         }
//     })
// })

// app.delete('/patients',(req,res)=>{
//     const deldetails = req.params.patients;
//     con.query("delete from patients", deldetails,(err,results)=>{
//         if(err)
//         {
//             console.log(err)
//         }
//         else{
//             res.send(results)
//         }
//     })
// })

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log('port no is 3000')
    }
})