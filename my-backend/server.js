import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGO_URI;
console.log(MONGODB_URL)


const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT,async () => {
    console.log(`app listening on port ${PORT}`)
    await mongoose.connect(MONGODB_URL).then(() => {console.log('connected to database')})
} )

const mongoSchema = new mongoose.Schema({
    txnType : String,
    amount : Number,
    category : String,
    desc : String,
})

const txns = mongoose.model("transactions" , mongoSchema);


app.get('/gettxns' , async (req , res) => {
    const result = await txns.find();
    res.json(result);
})

app.post('/addtxn' , async (req, res) => {
    const result = await txns.create(req.body);
    res.json(result);
})

app.put('/updatetxn/:id' , async (req, res) => {
    const result = await txns.findByIdAndUpdate({_id : req.params.id} , {$set : req.body}, {new : true});
    res.json(result)
})

app.delete('/deletetxn/:id' , async (req , res) => {
    const result = await txns.findByIdAndDelete({_id : req.params.id});
    res.json(result);
})