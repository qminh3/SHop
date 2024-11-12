import mongoose from 'mongoose';

const connectDB = async () =>{

    mongoose.connection.on('connected',()=>{
        console.log('MongoDB Connected...');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

    // try {
    //     await mongoose.connect(process.env.MONGODB_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useCreateIndex: true,
    //         useFindAndModify: false
    //     });
    //     console.log('MongoDB Connected...');
    // } catch (error) {
    //     console.error(`Error connecting to MongoDB: ${error.message}`);
    //     process.exit(1);
    // }

    // // Define schema for User
    // const userSchema = new mongoose.Schema({
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     email: {
    //         type: String,
    //         required: true,
    //         unique: true
    //     },
    //     password: {
    //         type: String,
    //         required: true
    //     },
    //     role: {
    //         type: String,
    //         default: 'user'
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now
    //     }
    // });
}
export default connectDB;