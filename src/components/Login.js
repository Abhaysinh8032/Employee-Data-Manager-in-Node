// import NavBar from "./NavBar";
import {useRef, useState } from "react";
import {getAuth , signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate } from "react-router-dom";
// import app from "./FbConfig";

function Login(){
    const nav = useNavigate();

    // useEffect(()=>{
    //     const un = localStorage.getItem("un");
    //     if(un !=null)
    //         nav("/Home");
    // },[])
    const [un,setUn] = useState("");
    const [pw,setPw] = useState("");
    const rUn = useRef();
    const rPw = useRef();
    // const [ans,setAns] = useState("");

    const hUn = (event) => {setUn(event.target.value);}
    const hPw = (event) => {setPw(event.target.value);}
    const hSignup = (event) => {nav("/Signup")}
    const check = (event) => {
        event.preventDefault();
        const auth =getAuth();
        if((un.trim() === "") ||
        !un.match(/^\S+@\S+\.\S+$/))
        { alert("empty or invalid eamil");
           
        setUn("");
        
        rUn.current.focus();}
        else if((pw ==="")||(pw.trim() ==="")){
            alert("empty password ");
            rUn.current.focus();
        }
        else{
        signInWithEmailAndPassword(auth,un,pw)
        .then(res => {
            localStorage.setItem("un",un);
            nav("/View")
            
        })
        .catch(err => 
        alert("invalid username/password"));
        };
    }

    return(
        <>
        <center>
            <h1>Login</h1>
            <form onSubmit={check}>
                <input type="email" placeholder="enter ref mail"
                onChange={hUn} ref={rUn}/>
                <br/><br/>
                <input type = "password" placeholder="enter password"
                onChange={hPw} ref={rPw}/>
                <br/><br/>
                <input type="Submit" value="Login"/>
            </form>
            <br/><br/>
            <button onClick={hSignup}>Sign Up</button>
            {/* <h3>{ans}</h3> */}
        </center>
        </>
    );

}
export default Login;