import NavBar from "./NavBar";
import {useState  } from "react";
import { getAuth ,createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate } from "react-router-dom";
import app from "./FbConfig";

function SignUp(){
    const nav = useNavigate();
    // useEffect(() => {
    //     const un = localStorage.getItem("un");
    //     if (un != null)
    //         nav("/home");

    // },[]);
    const [un , setUn] = useState("");
    const [pw1 ,setPw1] = useState("");
    const [pw2 ,setPw2] = useState("");
    const[ans ,setAns] = useState("");

    const hUn = (event) => {setUn(event.target.value);}
    // const hPw1 = (event) => {setPw1(event.target.value);}
    const hPw2 = (event) => {setPw2(event.target.value);}
    const [isValid, setIsValid] = useState(false);

    const hPw1 = (event) => {
        setPw1(event.target.value);
     
    
        // Perform password validation
        const hasNumber = /\d/.test(pw1);
        const hasAlphabet = /[a-zA-Z]/.test(pw1);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw1);
    
        setIsValid(hasNumber && hasAlphabet && hasSpecialChar);
      };
    const save = (event) => {
        event.preventDefault();
        if((un ==="")||(un.trim() ==="")||(!un.match(/^\S+@\S+\.\S+$/))){
            alert("empty or invalid eamil");
           
            setUn("");
        }
        else if ((pw1==="")||(pw2==="")||(pw1.trim() ==="")||(pw2.trim() ==="")){
            alert("password empty");
           
           }
        // else if (!pw1.match(/^\S+[!@#$%^&*(),.?":{}|<>]+$/)){
        //     alert("password should contain special symbol");
           
        //     setPw1("");}
        else if (pw1.length<=7){
            alert("password min 8 length ");
            setPw1("");
            setPw2("");}
        else if (isValid===false){
            alert("password should have 1Capital,1specialSymbol and 1number");
            setPw1("");
            setPw2("");}
           
        else if((pw1 === pw2)){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,un , pw1)
            .then(res =>nav("/Login"))
            .catch(err =>setAns(" "+ err));
        }
        else {
            alert("password not match");
        }

        }

        return(
            <>
            <center>
               
                <h1>SignUp Page</h1>
                <form onSubmit={save}>
                    <input type="email" placeholder="enter reg email"
                    onChange={hUn}/>
                    <br /><br/>
                    <input type = "password" placeholder="Enter password"
                    onChange={hPw1}/>
                    <br/><br/>
                    <input type = "password" placeholder="Confirm password"
                    onChange = {hPw2}/>
                    <br/><br/>
                    <input type = "Submit" value="Register"/>
                    
                </form>


                <h3>{ans}</h3>
                </center>
                </>
        );
    
}
export default SignUp;
