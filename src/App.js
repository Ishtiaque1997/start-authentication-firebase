import './App.css';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';


initializeAuthentication();
const provider = new GoogleAuthProvider();


function App() {
  const[user,setUser]=useState({});

const handleSignIn=()=>{
const auth = getAuth();
signInWithPopup(auth, provider)
  .then(result => {
    const {displayName,email,photoURL}=result.user;
    const loggedInUser={
      name:displayName,
      email:email,
      photo:photoURL
    }
    setUser(loggedInUser);
  }).catch((error) => {
    console.log(error.message)
  });
}

  return (
    <div className="App">
     <button onClick={handleSignIn}>google sign in</button>
     {
       user.email &&<div>
         <h2>Welcome {user.name}</h2>
         <h3>I know your email which is {user.email}</h3>
         <img src={user.photo}></img>
       </div>
     }
    </div>
  );
}

export default App;
