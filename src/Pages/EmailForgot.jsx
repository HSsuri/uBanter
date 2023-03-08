import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { auth } from "../firebase";
import 'react-toastify/dist/ReactToastify.css';

const EmailForgot = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {

            const res = await sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/login" });
            toast.success("Email Sent", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            console.log(res);
            setLoading(false);
            setEmail("");

        } catch (err) {
            setLoading(false);
            setErr(true);
            setEmail("");
            if (err.message.includes("auth/user-not-found")) {
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

            }
            else{
                toast.error("Something Went Worng.. Try Again!", {
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

            }

            console.log(err);



        }
    }

    return (
        <>
            <div className="formContainer">
                { <ToastContainer />}
                <div className="formWrapper">
                <span className="logo"><ForumRoundedIcon fontSize="large" /> uBanter</span>
                    <span className="title">Reset Password</span>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required={true} />
                        <button disabled={loading}>Submit</button>
                        {loading && <div>Please Wait...</div>}


                    </form>
                </div>
            </div>
        </>
    )
}


export default EmailForgot;