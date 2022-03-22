const express=require('express');//Express module
const { type } = require('os');
const path=require('path');//Path module
const app=express();//Express function
const port=3000;// This is the port number
//Setup Database
const db=require('./config/mongoose');
const contact=require('./models/contact');
//EJS setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//CSS setup
app.use(express.static('assets'));
app.use(express.urlencoded());

var contactlist=[{name:"Saksham",phone:"8191051641",cotegoery:"--"},
                 {name:"Mohan",phone:"7479417711",cotegoery:"--"}];
app.get('/',function(req,res){
    // console.log("Hello Ejs");
    // return res.render('Home',{title:"Tic-Tac-Toe",contact:contactlist});
    contact.find({},function(err,contacts){
        if(err){
            console.log("Error in the GET requirest");
            return;
        }
        return res.render('Home',{
            title:"toDoList",
            contact:contacts
        });
    })
});

app.get('/profile',function(req,res){
    res.send('<h1>Hello Profile</h1>');
});

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id;
    console.log("delete id: ",id);

    contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});


app.post('/create-form',function(req,res){
    // res.redirect('/profile');
    // contactlist.push({name:req.body.name,phone:req.body.phone});
    contact.create({
        name:req.body.name,
        phone:req.body.date,
        cotegoery:req.body.cotegoery
    },function(err,newContact){
        if(err){
            console.log("Error in Creating Object In MONGODB");
        }
        // let str=req.body.date;
        // newContact.phone=str;
        // console.log(newContact.phone);
        // console.log(req.body.date+'  '+str);
        console.log("--> ",newContact);
        return res.redirect('back');
    })
    // return res.redirect('/');
});













app.listen(port,function(err){
    if(err){
        console.log("Error!");
        return;
    }
    else{
        console.log("Congratulation!");
    }
});