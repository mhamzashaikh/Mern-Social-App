import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

function Login() {
    const [text, setText] = useState({
        email: "",
        password: ""

    })

    const authcontext = useContext(AuthContext);
    const navigate = useNavigate();

    const notifySuccess = () => toast.success("Successfully Login", { position: toast.POSITION.TOP_CENTER });
    const notifyWarn = () => toast.warning("Wrong Credentials", { position: toast.POSITION.TOP_CENTER });


    const authCheck = () => {
        setTimeout(() => {
            fetch('http://localhost:5000/api/login')
                .then(response => response.json())
                .then(data => {
                    notifySuccess();
                    localStorage.setItem("user", JSON.stringify(data));
                    authcontext.signin(data._id, () => {
                        navigate('/');

                    })
                })
                .catch((err) => {
                    notifyWarn();
                    console.log(err)
                })

        }, 3000);
    }



    const loginUser = (e) => {

        // Cannot send empty data
        if (text.email === "" || text.password === "") {
            alert("To login user, enter details to proceed...")
        }
        else {
            fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(text)
            }).then((result) => {
                
                console.log("User login", result);
            })
                .catch((error) => {
                    console.log("Something went wrong ", error);
                })
        }
        authCheck();
        console.log("Auth: ", authcontext);
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat provident obcaecati nam sed
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Username" value={text.email} onChange={(e) => setText({ ...text, email: e.target.value })} />
                        <input type="password" placeholder="Password" value={text.password} onChange={(e) => setText({ ...text, password: e.target.value })} />
                        <button onClick={loginUser}>Login </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>


    )
}

export default Login;