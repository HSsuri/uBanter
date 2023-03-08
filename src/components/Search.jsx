import React, { useContext, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setUser([]);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)      
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        
        setUser(prev=>{
          return [
            ...prev,
            doc.data()
          ]
        });
        console.log(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (idx) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user[idx].uid
        ? currentUser.uid + user[idx].uid
        : user[idx].uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user[idx].uid,
            displayName: user[idx].displayName,
            photoURL: user[idx].photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user[idx].uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err)
    }

    setUser([]);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button style={{color:"#371443"}} onClick={handleSearch}><SearchIcon /></button>
      </div>
      {err && <span>User not found!</span>}
      {user.map((u,idx)=>(
        <div className="userChat" key={u.uid} onClick={()=>handleSelect(idx)}>
          <img src={u.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{u.uid===currentUser.uid?u.displayName+"(You)":u.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;