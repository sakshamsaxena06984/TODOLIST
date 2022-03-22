const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Date,
        required:true
    },
    cotegoery:{
        type:String,
        required:true
    }
});
const item=new mongoose.model("CollegeTecTakToe",itemSchema);
module.exports=item;