import React, { useState } from "react";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [img, setImg] = useState(false);
    const navigate = useNavigate();






    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        if (!file) {
            setImg(true);
            setLoading(false);
            toast.warn("Add a Profile Picture", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"

            });

            return false;
        }


        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                        setEmail("");
                        setPass("");
                        setUsername("");
                        setImg(false);
                        toast.warn("Something Went Wrong... Try Again!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"

                        });
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
            console.log(err);

            if ((err.message.includes("auth/email-already-in-use"))) {
                setEmail("");
                setPass("");
                setUsername("");
                setImg(false);
                toast.error("Email Already Registered", {
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
            else if (err.message.includes("auth/weak-password")) {
                setPass("");
                setImg(false);
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
                setEmail("");
                setPass("");
                setUsername("");
                setImg(false);
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
    };




    return (
        <>
            {img && <ToastContainer />}
            {err && <ToastContainer />}
            <div className="formContainer">
                <div className="formWrapper">
                <span className="logo"><ForumRoundedIcon fontSize="large" /> uBanter</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required={true} />
                        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required={true} />
                        <input type="password" placeholder="password" onChange={(e) => setPass(e.target.value)} value={pass} required={true} />
                        <input style={{ "display": "none" }} type="file" id="file" accept="image/*"
                            onChange={(e) => { const file = e.target.files[0]; if (file) document.getElementsByClassName("yo")[0].innerText =  file.name; else {document.getElementsByClassName("yo")[0].innerText="Add a Profile Picture"} }} />
                        <label htmlFor="file" >
                           <AddPhotoAlternateOutlinedIcon  fontSize="medium"/>
                            <span className="yo">Add a Profile Picture</span>
                        </label>
                        <button disabled={loading}>Sign up</button>
                        {loading && <div>Registering... </div>}

                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </>
    );
};

export default Register;

