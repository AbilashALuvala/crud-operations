const connec = require("./app");
const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors")

const App = express();
const port = 3000;
App.use(bodyparser.json())
App.use(cors({
    origin: 'http://localhost:5173'  // Replace with your React app URL
  }));

// var data = {
//     idcars: 2,
//     name: "audi",
//     mfy: 1800,
//     price: 30000,
// }

// var query = "INSERT INTO cars (idcars ,name , mfy ,price ) VALUES (?,?,?,?)";

// connec.query(query, [data.idcars, data.name ,data.mfy ,data.price ], (err , results)=> {
//     if(err){
//         console.error('Error inserting data:', err.message);
//         return ;
//     }else{
//         console.log('Data inserted successfully:', results);
//         return results;
//     }
// })

App.post("/car", (req, res) => {
    const data = req.body;
   
    // Validate input
    if (!data.name || !data.mfy || !data.price) {
        return res.status(400).json({ error: 'All fields (make, model, year) are required' });
    }

    var query = "INSERT INTO cars (name , mfy ,price ) VALUES (?,?,?)";

    connec.query(query, [ data.name, data.mfy, data.price], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Error inserting data' });
        } else {
            res.status(201).json({ message: 'Car data inserted successfully', data: results });
        }
    })
})

App.listen(port, () => {
    console.log(`App is listening on port https://https:127.0.0.1:${port}`)
})



