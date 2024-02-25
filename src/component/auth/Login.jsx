import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        if (user) {
          navigate('/');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const { user } = userCredential;
        if (user) {
          navigate('/');
        }
        console.log(user); // Logging the user, not the auth module
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-page">
      <Link to="/">
        <img className="amazon-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="amazon-logo" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-login" onClick={handleLogin}>Sign in</button>

        </form>
        <p>By continuing, you agree to FAKE AMAZON CLONE Conditions of Use and Privacy Notice.</p>
        <button type="submit" className="btn-sign-up" onClick={handleSignup}>Create your Amazon Account</button>
      </div>
    </div>
  );
};
export default Login;
