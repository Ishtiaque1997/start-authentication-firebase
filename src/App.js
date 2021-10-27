import './App.css';
import {getAuth,signInWithPopup,GoogleAuthProvider}from 'firebase/auth';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication();

const provider = new GoogleAuthProvider();
const handleSignIn=()=>{
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
   console.log(result.user)
  })
}
function App() {
  return (
    <div className="App">
     <button onClick={handleSignIn}>Sign In</button>  
    </div>
  );
}

export default App;
