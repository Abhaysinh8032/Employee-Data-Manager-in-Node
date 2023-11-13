import {useState , useRef} from "react";
import axios from "axios";

function Feedback(){
    const[name , setName] = useState("");
    const [title , setTitle] = useState("");
    const [salary , setSalary] = useState("");
    const[ans , setAns] = useState("");
    const [email, setEmail] = useState("");
    const rName = useRef();
    const rEmail = useRef();
    const rTitle = useRef();
    const rSalary   = useRef();

    const hName = (event) =>{setName(event.target.value);}
    const hEmail = (event) =>{setEmail(event.target.value);}
    const hTitle = (event) =>{setTitle(event.target.value);}
    const hSalary = (event) =>{setSalary(event.target.value);}

 
    const save =(event) => {
        event.preventDefault();
        if((email.trim() === "") ||
        !email.match(/^\S+@\S+\.\S+$/)){
            alert("empty or invalid eamil");
           
            setEmail("");
            setAns("");
            rEmail.current.focus();
            
            return;
        }else if((name ==="")||(name.trim() ==="")||(!name.match(/^[A-Za-z]+$/))){
            alert("name shold not empty and incluede only chars ");
            setName("");
            rName.current.focus();
        }
        else if((title ==="")||(title.trim() ==="")||(!title.match(/^[A-Za-z]+$/))){
            alert("empty/invalid JobTitle");
            setTitle("");
            rTitle.current.focus();
           
        }
        else if((salary ==="")||(salary<= 0)||(salary.match(/^[0-9]\$/))){
            alert("invalid salary");
            setSalary("");
            rSalary.current.focus();
           
        }
        else if((salary* 100) % 1 !== 0){
            alert("salary should be up to 2 decimals");
            setSalary("");
            rSalary.current.focus(); 
        }
        else {let data = {email,name , title ,salary};
        let urladd = "http://localhost:9000/save";
        axios.post(urladd , data)
        .then(res=>{
            if(res.data.affectedRows===1){
                // setAns("recorded Updated");
                alert("record updated successfully");
                setName("");
                setEmail("");
                setTitle("");
                setSalary("");
                
            }
            else if (res.data === "Email already exists") {
                alert("Email already exists");
              } 
            else{
                setAns(email + " email  exists");
                setName("");
                setTitle("");
            }
        })
        .catch(err => {
            if(err.code==="ERR_NETWORK")
            setAns("Please try after sometime");
        })};
        


    }
    
    return(
        <>
        <center>
            <h1>Info Please</h1>
            <form onSubmit={save}>
                <input type="text" placeholder="enter ur name" onChange={hName}
                ref={rName} value={name}/>
                <br/><br/>
                <input type="email" placeholder="Enter your email" onChange={hEmail} ref={rEmail} value={email}
        />
        <br/><br/>
                <input type="text"  placeholder="enter ur JobTitle" value={title} ref={rTitle} onChange={hTitle}/>
                <br/><br/>
                <input type="number"  placeholder="enter ur CTC" value={salary} ref={rSalary} onChange={hSalary}/>
                <br/><br/>
                
                <input type="submit" value="Save"/>
                
            </form>
            <h1>{ans}</h1>
        </center>
        </>
    );
}
export default Feedback;