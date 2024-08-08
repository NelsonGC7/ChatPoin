const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const file= path.join(__dirname,'data.json')

const data = fs.readFileSync(file);
const jsonData = JSON.parse(data);

const app = express();
const PORT = 3001;
app.use(express.json());
app.get('/users',(req,res)=>{
    res.status(200).json(jsonData);
})
app.post('/users',(req,res)=>{
    const {userName, email, password} = req.body;
    const userExist = jsonData.find(user => {
        if(user.email === email){
            return user;
        }else if(user.userName === userName){
            return user
        }
    });
    if(userExist){
        return res.status(400).json({msg: 'User already exist'})
    }
    console.log(userExist)
    if(!userName || !email || !password){
        return res.status(400).json({msg: 'Please include userName, email and'})
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
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})