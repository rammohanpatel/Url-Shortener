import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postUrlRoutes from './routes/postUrl.js'


dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.use(postUrlRoutes);


app.get('/', (req, res) => {
    res.send('Hello from the Url Shortener API');
});

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>{
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error)=> console.log(error.message));


    

