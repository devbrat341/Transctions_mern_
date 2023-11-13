import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  mongoose  =  require('mongoose');


const transactionSchema = new mongoose.Schema ({
    id :{
        type: String
    },
    title :{
        type: String
    },
    description:{
        type: String
    },
    price :{
        type: Number
    },
    image :{
        type: String
    },
    category :{
        type: String
    },
    sold :{
        type: Boolean
    },
    dateOfSale :{
        type: Date,
        required: true
    },
    quantity :{
        type: Number,
        default: 1
    },

})

const Transaction = mongoose.model("Trasaction", transactionSchema )
export default Transaction
  