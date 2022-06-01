import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import {pageNotFound, errorHandler} from './middleware/errorMiddleware.js'



// ROUTES
import userRoutes from './routes/userRoute.js';
import profileRoutes from './routes/profileRoute.js';

dotenv.config();
connectDB();

const app = express();
 
app.use(express.json())

// ENTRY POINT ROUTE
app.get('/', (req, res) => {
    res.send('THIS IS THE MAIN ENDPOINT OF THE APP')
})



// user and uath URL's
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/profile', profileRoutes)



//middleware
app.use(pageNotFound)
app.use(errorHandler)



// SET THE PORT TO 5000
const port  = process.env.PORT || 5000;


//START THE SERVER
app.listen(port, console.log(`SERVER IS RUNNING IN ${process.env.NODE_ENV} ON PORT ${port}`.brightMagenta.bold.underline))