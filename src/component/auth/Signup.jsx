import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match');
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const { user } = userCredential;
        if (user) {
          updateProfile(user, { displayName: name });
          navigate('/');
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <div className="pt-6 flex flex-col items-center justify-center bg-gray-100">
        <Link to="/">
          <img className="onject-contain w-20 mb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="amazon-logo" />
        </Link>
        <div className="flex flex-col bg-transparent mb-6 px-4 sm:px-6 md:px-8 lg:px-6 py-6 rounded-md w-full max-w-sm border border-gray-300">

          <div className="font-medium text-xl sm:text-2xl text-gray-800">Create account</div>
          <div className="mt-4">
            <form>
              <div className="flex flex-col mb-6">
                <h5 className="font-semibold text-sm pt-2 pb-1">Your name</h5>

                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="text"
                  value={name}
                  required
                  placeholder="First and last name"
                  onChange={(e) => setName(e.target.value)}
                />
                <h5 className="font-semibold text-sm pt-2 pb-1">Email</h5>
                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h5 className="font-semibold text-sm pt-2 pb-1">Password</h5>
                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <h5 className="font-semibold text-sm pt-2 pb-1">Re-enter password</h5>

                <input
                  className="text-sm sm:text-base bg-transparent  pr-4 rounded border border-gray-400 w-full py-1 focus:outline-none focus:outline-cyan-300 focus-visible:ring focus-visible:ring-cyan-300"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="flex mt-6 items-center justify-center focus:outline-none text-black shadow text-sm sm:text-base bg-amber-300 hover:bg-amber-400 rounded py-1 w-full transition duration-150 ease-in"
                  type="submit"
                  onClick={handleSignup}
                >
                  Continue
                </button>
              </div>
            </form>
            <p className="text-xs pt-2 pb-4">By continuing, you agree to FAKE AMAZON CLONE Conditions of Use and Privacy Notice.</p>
            <p className="text-sm font-medium">
              Already have an account ?
              <Link to="/login" className="text-blue-700"> Sign in </Link>
            </p>
          </div>
        </div>

      </div>
      <p className="text-center text-xs pt-4">© 1996-2024, Fake Amazon.com, Inc. or its affiliates</p>

    </>
  );
};
export default Signup;
