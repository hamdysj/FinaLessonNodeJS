const express = require('express');
const fs = require('fs');

const app = express();

//To Use a Middleware  ----app.use
app.use(express.json());

const tours = JSON.parse(
fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get all tours
const getTour = (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
};

//To Create A New Tour
const createTour = (req, res) => {
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
};

//Get tours by id
const getTourbyId = (req, res) => {
    console.log(req.params);
    
    //params are usually in String, to change to number, we use it like this
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    if(!tour)
    {
        res
        .status(404)
        .json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour
        }
    });
};

//Update Tour
const updateTour = (req, res) => {

    if(req.params.id * 1 > tours.length)
    {
        res
        .status(404)
        .json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour: "Update here"
        }
    });
};

//Delete Tour
const deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length)
    {
        res
        .status(404)
        .json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    res
    //204 - No Content
    .status(204)
    .json({
        status: 'success',
        data: null
    });
};


app.post('/api/v1/tours', createTour());
app.get('/api/v1/tours', getTour());
app.get('/api/v1/tours/:id', getTourbyId());
app.patch('/api/v1/tours/:id', updateTour());
app.delete('/api/v1/tours/:id', deleteTour());


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})
