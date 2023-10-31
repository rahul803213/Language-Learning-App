import React, { useState } from "react";
import './sign-in.styles.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from "@/redux/user/userSlice";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signInWithFacebook } from "../../firebase/firebase.utils";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const dispatch=useDispatch();
const router= useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        const id = user.uid;
        const documentReference = firestore.doc(`/users/${id}`); // Create a DocumentReference
        const getData = await documentReference.get();
        
        if (getData.exists) {
          const userData = getData.data();
          setEmail("");
          setPassword("");
          console.log(userData);
          console.log("user");
         dispatch(setCurrentUser(userData));
         router.push('/home');
        } else {
          // Handle the case where the document doesn't exist
          console.log("User document does not exist.");
        }
      } catch (error) {
        setEmail("");
        setPassword("");
        alert("Email Or Password is Incorrect");
      }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="sign-in">
      <div>
        <h2 className="sm:text-5xl text-md text-center text-bold"> Welcome Back</h2>
      </div>
      <div>
        <span className="sm:text-xl text-sm text-center">Please enter your details to sign in.</span>
      </div>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormInput
          type="email"
          name="email"
          handelchange={handleChange}
          value={email}
          label="email"
          required
        />

        <FormInput
          type="password"
          name="password"
          handelchange={handleChange}
          value={password}
          label="password"
          required
        />

        <div className="sign-in-buttons">
          <div className="button flex flex-col gap-y-2">
            <CustomButton type="submit">sign in </CustomButton>
           <div> OR <Link href={'/signup'} className="text-green-500">Signup</Link></div>
           <div> OR <Link href={'/signup'} className="text-red-500">Admin Login</Link></div>
           <div> OR <Link href={'/signup'} className="text-red-500">Forgot Password</Link></div>
          </div>

          <div className="signInOptions">
            <div className="line"></div>
            <div className="signInIcons">
              <CustomButton onClick={signInWithGoogle} className="button-1">
                <FcGoogle /> <span>Google</span>
              </CustomButton>
              <CustomButton onClick={signInWithFacebook} className="button-1">
                <FaFacebook /> <span>facebook</span>
              </CustomButton>
              {/* <FcGoogle onClick={signInWithGoogle} className='hoverIcons'/> 
                  <FaFacebook onClick={signInWithFacebook} className='hoverIcons'/>  */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
