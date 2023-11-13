const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "8032",
    database : "stu_16july23"


});

app.post("/save",(req,res) =>{
    let data = [req.body.email ,req.body.name, req.body.title , req.body.salary]
    let sql = "insert into employee values(?,?,?,?)";
    con.query(sql,data,(err,result)=>{
        if(err) res.send(err);
        else  res.send(result);
    })
})

app.get("/getData",(req,res) =>{
    let sql = "select*from employee";
    con.query(sql,(err,result)=>{
        if(err) res.send(err);
        else  res.send(result);
    })
})
app.delete("/remove",(req,res) =>{
    let data = [req.body.email]
    console.log(data);
    let sql = "delete from employee where email=?";
    con.query(sql,data,(err,result)=>{
        if(err) res.send(err);
        else  res.send(result);
    })
})
app.delete("/trunc",(req,res) =>{

    console.log("delete all");
    let sql = "TRUNCATE TABLE employee;";
    con.query(sql,(err,result)=>{
        if(err) res.send(err);
        else  res.send(result);
    })
})
app.put("/modify",(req, res)=>{
    let data = [req.body.name, req.body.title, req.body.salary , req.body.email]
    let sql = "update employee set name=?, title=?,salary=? where email=?";
    con.query(sql, data,(err, result) =>{
        if(err) res.send(err);
        else res.send(result);
    })
})
app.listen(9000,()=>{console.log("ready at  @ 9000")})


