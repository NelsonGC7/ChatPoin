

//API requires ------------------------------------
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

//socket.io requires-----------------------------------------------------

const  logger = require('morgan');
const  {Server} = require('socket.io');
const {createServer} = require('http') 


//API de comucicacion con el front------------------
const file= path.join(__dirname,'data.json')
const data = fs.readFileSync(file);
const jsonData = JSON.parse(data);

const app = express();
app.use(logger('dev'));

app.use(cors());
app.use(express.json());
/*
app.get('/users',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.status(200).json(jsonData);
})
*/
app.post('/users/new',(req,res)=>{  
    const {userName, email, password} = req.body;
    const userExist = jsonData.find(user => {
        if(user.email === email){
            return user;
        }else if(user.userName === userName){
            return user
        }
    });
    if(userExist){
        return res.status(409).json({msg: 'User already exist'})
    }
    console.log(userExist)
    if(!userName || !email || !password){
        return res.status(422).json({msg: 'Please include userName, email and pass'})
    }
    const new_user ={
        id: crypto.randomInt(1000,9999),
        userName,
        email,
        password
    }
    jsonData.push(new_user);
    const updateData  = JSON.stringify(jsonData,null,2);
    fs.writeFileSync(file,updateData);
    res.status(201).json(new_user);
})
app.post('/users',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const{ userName,password }= req.body;
    const userExist = jsonData.find(user =>{
        if(user.userName === userName && user.password === password){
            return user;
        }
    })
    if(!userExist || userExist.length === 0){
        return res.status(401).json({msg: 'User not found'})
    }else{
        return res.status(203).json({msg:"user found"});
    };
});


//socket.io--------------------------------------------------------------
const PORTsocket = process.env.PORT || 42066;
const socketServer = createServer(app);

const io  = new Server(socketServer)
io.on('connection',(socket)=>{
    console.log("user connected")
})

socketServer.listen(PORTsocket,()=>{
    console.log("server socket and API running on:",PORTsocket)
})


