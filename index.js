const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
    origin:'*',
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', require('./routes/user'));

app.use('/', (request, response) =>{
    response.status(200).json({message:'Users API working'});
});

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
});