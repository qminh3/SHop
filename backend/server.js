import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// định nghĩa

const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();


// trung gain sử lý

app.use(express.json());
app.use(cors());

// API
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.get('/', (req, res) => {
  res.send('This is a test');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// API tính t��ng