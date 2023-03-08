import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [err, setErr] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
            setLoading(false);

            if ((err.message.includes("auth/user-not-found"))) {
                toast.error("User Not Found", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
                );
                setEmail("");
                setPass("");
            }
            else if (err.message.includes("auth/wrong-password")) {
                toast.error("Wrong Password", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
                );

                setPass("");
            }
            else {
                toast.info("Something Went Wrong.. Try Again!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
                );
                setEmail("");
                setPass("");
            }


        }
    }


    return (
        <>
            
            <div className="formContainer">
            { err && <ToastContainer />}
                <div className="formWrapper">
                    <span className="logo"><ForumRoundedIcon fontSize="large" /> uBanter</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required={true} />
                        <input type="password" placeholder="password" onChange={(e) => setPass(e.target.value)} value={pass} required={true} />
                        <button disabled={loading}>Login</button>
                        <span><Link to="/forgotpassword">Forgot Password?</Link></span>

                        {loading && <div>Please Wait...</div>}
                    </form>
                    <p>Don't have an account yet? <Link to="/register">Create Account</Link></p>
                </div>
            </div>
        </>
    );
};


export default Login;





