import { useState , useEffect, useRef} from "react";
import axios from "axios";
import {useLocation } from "react-router-dom";
import {useNavigate } from "react-router-dom";

export default function Update() {
    const loc = useLocation();
    const nav = useNavigate();

    const [email , setEmail] = useState("");
    const [name , setName ] = useState("");
    const [title , setTitle ] = useState("");
    const [salary , setSalary ] = useState("");
    const [ans , setAns ] = useState("");

    const rName = useRef();

    const rTitle = useRef();
    const rSalary   = useRef();
    // const hEmail = (event) => {setEmail(event.target.value);}
    const hName = (event) => {setName(event.target.value);}
    const hTitle = (envent) => {setTitle(envent.target.value);}
    const hSalary = (envent) => {setSalary(envent.target.value);}

    useEffect(() =>{
        setEmail(loc.state.r);
        setName(loc.state.n);
        setTitle(loc.state.m);
        setSalary(loc.state.s);

    },[loc.state.m, loc.state.n, loc.state.r, loc.state.s]);
    const save = (event) => {
        event.preventDefault();
        if((name ==="")||(name.trim() ==="")||(!name.match(/^[A-Za-z]+$/))){
            alert("name shold not empty and incluede only chars ");
            setName("");
            // rName.current.focus();
        }
        else if((title ==="")||(title.trim() ==="")||(!title.match(/^[A-Za-z]+$/))){
            alert("empty/invalid JobTitle");
            setTitle("");
            // rTitle.current.focus();
           
        }
        else if((salary ==="")||(salary<= 0)||(salary.match(/^[0-9]\$/))){
            alert("invalid salary");
            setSalary("");
            // rSalary.current.focus();
           
        }
        else if((salary* 100) % 1 !== 0){
            alert("salary should be up to 2 decimals");
            setSalary("");
            // rSalary.current.focus(); 
        }
        else{
        let data = {email , name , title, salary};
        let urladd= "http://localhost:9000/modify";
        axios.put(urladd , data)
        .then(res =>{
            if(res.data.affectedRows === 1)
            {
                alert("record updated");
                setEmail("");
                setName("");
                setTitle("");
                nav("/View");
            }
            // else{
            //    alert("email already exies");
            //     setEmail("");
            //     setName("");
            //     setTitle("");;

            // }
        })
        .catch(err =>{
            if (err.code === "ERR_NETWORK")
                setAns("pls try after sometime");
            else 
                setAns("unkonw error");
        })};
        }
        return(
            <>
            <center>
                <h1> Update Page</h1>
                <form onSubmit={save}>
                    <input type="text" defaultValue={email}
                      disabled={true}/>
                    <br/><br/>
                    <input type="text" placeholder="enter name"
                    onChange={hName} value={name} useRef={rName}/>
                    <br/><br/>
                    <input type="text" placeholder="enter Job title"
                    onChange={hTitle} value={title}  useRef={rTitle}/>
                    <br/><br/>
                    <input type="number" placeholder="enter Salary"
                    onChange={hSalary} value={salary}  useRef={rSalary}/>
                    <br/><br/>
                    <input type="submit" value="save" />
                    <br></br>

                </form>
                <h1>{ans}</h1>
            </center>
            </>
        );
}