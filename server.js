//ENVIRONMENT VARIABLE
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

//Set by express: Shows the environment the app is runnin
//console.log(app.get('env'));
//Set by node: Shows the environment the app is runnin
//console.log(process.env);


//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})