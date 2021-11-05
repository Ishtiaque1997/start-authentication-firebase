import './App.css';
import { useState } from 'react';
import { GoogleAuthProvider,getAuth,FacebookAuthProvider,signInWithPopup,signOut,GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';

//function initialization and variable declaration in common
initializeAuthentication();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider=new FacebookAuthProvider();
const githubProvider=new GithubAuthProvider();


function App() {
 
 //state to set user 
 const[user,setUser]=useState({});

 //segment for handling sign in
 const handleGoogleSignIn=()=>{
  signInWithPopup(auth, googleProvider)
  .then((result) => {

    //destructure from result
    const{displayName,email,photoURL}=result.user;
    //set the data in variable
    const loggedInUser={
      name:displayName,
      email:email,
      photo:photoURL
    }
    /*set in state*/
    setUser(loggedInUser)
  })
  }

 //segment to handle github sign in 
 const handleGithubSignIn=()=>{
 signInWithPopup(auth, githubProvider)
  .then((result) => {
    //destructure from result
    const {email,photoURL} = result.user;
    //set the data in variable
    const loggedInUser={
      email:email,
      photo:photoURL
    }
    /*set in state*/
    setUser(loggedInUser)
  })
  }

  //segment to handle sign out
  const handleSignOut=()=>{
  signOut(auth).then(() => {
  setUser({})
  })
  .catch((error) => {
  // An error happened.
  });
  }

  const handleFacebookSignIn=()=>{
   signInWithPopup(auth,facebookProvider)
   .then(res=>{
     const{displayName,email,photoURL}=res.user;
     console.log(res.user)
    //set the data in variable
    const loggedInUser={
      name:displayName,
      email:email,
      photo:photoURL
    }
    setUser(loggedInUser)
   })
  }

  return (
  <div className="App">

   {/* conditional button rendering  */}
   {
    !user.name?
     <div>
       <button onClick={handleGoogleSignIn} >Google Sign In</button>
       <br/>
       <button onClick={handleGithubSignIn}>Github Sign In</button>
        <button onClick={handleFacebookSignIn}>facebook Sign In</button>
       <br/>
     </div>
     : <button onClick={handleSignOut}>Sign Out</button>
   }

   {/*display information */}

    {user.name&&
     <div>
      <h1>Your name:{user.name}</h1>
      <h3>Your email:{user.email}</h3>
      <img src={user.photo}></img>
     </div>
    }
   </div>  
  );
}

export default App;
