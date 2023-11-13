import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Transaction  from './models/transaction.js';
const  express  =  require('express');
const  mongoose  =  require('mongoose');
const request = require('request');
require("dotenv").config();
const app = express();


mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Connected to Mongodb")
    })
    .catch((err) =>{
        console.log(err)
    })

app.get("/" , (req, res) =>{
  res.status(201).json({message:"Every thing working fine"});
})

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
  

app.get('/initialize', async (req, res) => {
    const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = await response.json();
    transactions.forEach(async (transaction) => {
        const {id, title, description, price, dateOfSale, image, category, sold} = transaction;
        const newTransaction = new Transaction({id, title, description, price,image, category, sold, dateOfSale});
        newTransaction.save()
    });
  
    res.status(201).json({message:"Transaction initalize"});
});
 

app.get('/transactions', async (req, res) => {
    const search = req.query.search;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    let query = {};
    if (search) {
      query = {
        $or: [
          { productName: { $regex: new RegExp(search, 'i') } },
          { productDescription: { $regex: new RegExp(search, 'i') } },
          { productPrice: { $eq: Number(search) } },
        ],
      };
    }
    const transactions = await Transaction.find(query).skip(perPage * (page - 1)).limit(perPage);
    res.send(transactions);
});
  


app.get('/transactions/:month', async (req, res) => {
    
    const transactions = await Transaction.find();
    const month  = req.params.month;
    if(month === "all"){
      return res.send({staus:201, data: transactions,monthDetails:{type: typeof month, month}})
    }
    let result = transactions.filter((transaction) =>{
      let mon = transaction.dateOfSale.toISOString().split("-")[1];
      if(mon === month){
        return transaction;
      }
    })
    return res.send({staus:201, data: transactions,monthDetails:{type: typeof month, month}})
    
});
  
  

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
  