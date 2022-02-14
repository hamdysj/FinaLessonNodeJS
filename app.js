const express = require('express');
const fs = require('fs');

const app = express();

//To Use a Middleware
app.use(express.json());
/*app.get('/', (req, res) =>{
    res
    .status(200)
    .json({message: 'Hello from the Server Side', app: 'FinaLesson'});
});

app.post('/', (req, res) =>{
    res
    .status(200)
    .send('You can post');
}); */

const tours = JSON.parse(
fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get all tours ----app.use
app.get('/api/v1/tours', (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
});


//To Create A New Tour
app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    res.send('Done');
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})
