import './App.css';
import { useState } from 'react';
import { getAuth,signOut, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider=new GithubAuthProvider();


function App() {
const[user,setUser]=useState({});
const auth = getAuth();

const handleGoogleSignIn=()=>{
signInWithPopup(auth, googleProvider)
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
const handleGithubSignIn=()=>{
signInWithPopup(auth, githubProvider)
  .then(result => {
    // The signed-in user info.
    const {email,photoURL} = result.user;
    const loggedInUser={
    email:email,
    photo:photoURL
    }
    setUser(loggedInUser)
    // ...
  })
}
const handleSignOut=()=>{
signOut(auth).then(() => {
  setUser({})
}).catch((error) => {
});
}
  return (
  <div className="App">


  { !user.name?
  <div>
       <button onClick={handleGoogleSignIn}>google sign in</button>
     <br />
     <button onClick={handleGithubSignIn}>github sign in</button>
     <br />
     </div>
     :<button onClick={handleSignOut}> sign out</button>}
     
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
