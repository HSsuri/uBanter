import { confirmPasswordReset } from "firebase/auth";
import React ,{useState} from "react";

import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { auth } from "../firebase";

const useQuery=()=>{
    const loaction= useLocation();
    return new URLSearchParams(loaction.search);
}

const ForgotPassword= ()=>{
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate();
    const query = useQuery();

    

    const HandleSubmit= async(e)=>{
        setLoading(true);
        e.preventDefault();       

        try{

            const res= await confirmPasswordReset(auth, query.get('oobCode'),pass);
            toast.success("Password Reset", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

            navigate("/");


        }catch(err){
            if (err.message.includes("auth/weak-password")) {
                setPass("");
                setLoading(false);
                
                toast.error("Password must be of atleast 6 characters", {
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
            else {
                
                setPass("");
                setLoading(false);
                
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


            }

        }



    }

    return(
        <>
            <ToastContainer />
            <div className="formContainer">

                <div className="formWrapper">
                <span className="logo"><ForumRoundedIcon fontSize="large" /> uBanter</span>
                    <span className="title">Reset Password</span>
                    <form onSubmit={HandleSubmit}>
                    <input type="password" placeholder="password" onChange={(e) => setPass(e.target.value)} value={pass} required={true} />
                    <button disabled={loading}>Reset Password</button>
                    {loading && <div>Please Wait...</div>}
                        

                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;