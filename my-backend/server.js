import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

const authenticate = async (req , res , next) => {
    const token = req.header("Authorization");
    console.log(token);

    if(!token){
        return res.json("user not logged in")
    }

    const decode =  jwt.verify(token , process.env.SECRET_CODE);
    req.user = decode;
    next();


}

const mongoSchema = new mongoose.Schema({
    txnType : String,
    amount : Number,
    category : String,
    desc : String,
    user : mongoose.Schema.Types.ObjectId,
    date : {type : Date , default : Date.now},
})

const txns = mongoose.model("transactions" , mongoSchema);


app.get('/gettxns'  ,authenticate , async (req , res) => {
    const result = await txns.find({user : req.user._id});
    res.json(result);
})

app.post('/addtxn', authenticate , async (req, res) => {

    const result = await txns.create({...req.body , user : req.user._id});
    res.json(result);
})

app.put('/updatetxn/:id', authenticate , async (req, res) => {
    const result = await txns.findByIdAndUpdate({_id : req.params.id , user : req.user._id} , {$set : req.body}, {new : true});
    res.json(result)
})

app.delete('/deletetxn/:id', authenticate , async (req , res) => {
    const result = await txns.findByIdAndDelete({_id : req.params.id , user : req.user._id});
    res.json(result);
})




const UserSchema = new mongoose.Schema({
    username : String, 
    password : String,
})

const user = mongoose.model("users" , UserSchema);

app.post('/registerUser' , async (req , res) => {
    console.log("enter backend register")
    const exists = await user.findOne({username : req.body.username})
    if(exists){
        return res.json("user already exits")
    }

    console.log(req.body)

    const hashedPass = await bcrypt.hash(req.body.password , 10);

    const data = await user.create({username: req.body.username, password: hashedPass});
    res.json(data);
})


app.post('/loginuser' , async (req, res) => {
    const exists = await user.findOne({username : req.body.username});
    if(!exists){
        return res.json("incorrect username!!");
    }

    const validatePassword = await bcrypt.compare( req.body.password , exists.password)

    if(!validatePassword){
        return res.json("incorrect password!!");
    }

    const token = jwt.sign({_id : exists._id, username: exists.username}, process.env.SECRET_CODE);
    res.json({'token' : token})
})