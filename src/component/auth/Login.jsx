import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
        throw Error(errorCode, errorMessage);
      });
  };
  const handleSignup = () => {
    navigate('/Signup');
  };

  return (
    <>
      <div className="pt-6 flex flex-col items-center justify-center bg-gray-100">
        <Link to="/">
          <img className="onject-contain w-20 mb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="amazon-logo" />
        </Link>
        <div className="flex flex-col bg-transparent  px-4 sm:px-6 md:px-8 lg:px-6 py-6 rounded-md w-full max-w-sm border border-gray-300">

          <div className="font-medium text-xl sm:text-2xl text-gray-800">Sign in</div>
          <div className="mt-4">
            <form>
              <div className="flex flex-col mb-6">
                <h5 className="font-semibold text-sm">Email</h5>
                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded-lg border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h5 className="font-semibold text-sm pt-4">Password</h5>
                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded-lg border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="flex mt-6 items-center justify-center focus:outline-none text-black shadow text-sm sm:text-base bg-amber-300 hover:bg-amber-400 rounded py-1 w-full transition duration-150 ease-in"
                  type="submit"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="text-xs pt-2 pb-6">By continuing, you agree to FAKE AMAZON CLONE Conditions of Use and Privacy Notice.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4 gap-2 flex items-center">
          <div className="col-span-1">
            <div className="h-[1px] bg-gray-300" />
          </div>
          <div className="col-span-1">
            <div className="text-xs text-gray-600">New to Amazon?</div>
          </div>
          <div className="col-span-1">
            <div className="h-[1px] bg-gray-300" />
          </div>
        </div>
        <div className="pb-8 w-full max-w-sm">
          <button
            type="submit"
            className="flex mt-4 items-center justify-center focus:outline-none text-black shadow text-sm  bg-transparent border border-gray-300 hover:bg-slate-100 rounded py-1 w-full max-w-sm transition duration-150 ease-in"
            onClick={handleSignup}
          >
            Create your Amazon Account
          </button>
        </div>
      </div>
      <p className="text-center text-xs pt-4">© 1996-2024, Fake Amazon.com, Inc. or its affiliates</p>

    </>
  );
};
export default Login;
