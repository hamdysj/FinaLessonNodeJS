const express = require('express');
const fs = require('fs');

const app = express();

//To Use a Middleware  ----app.use
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

//Get all tours
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
    //console.log(req.body);

    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({ id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err => {
        res
    .status(201)
    .json({
        status: 'success',
        data: {
            tour: newTour
        }

    });

    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})
