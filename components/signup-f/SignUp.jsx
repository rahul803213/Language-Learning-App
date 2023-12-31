import React, { useState,useEffect } from "react";
import './sign-up.styles.scss';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ReactCountryFlag from "react-country-flag";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createUserProfileDocument } from "../../firebase/firebase.utils";
import { auth } from "../../firebase/firebase.utils";
import { setCurrentUser } from "@/redux/user/userSlice";
import firebase from "../../firebase/firebase.utils";

const SignUp = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    displayName: "",
    confirm_password: "",
    step: 1,
    selected: false,
    want_to_learn: "",
    Native_language: "",
    Proficiency_level: "",
    items: [
      { code: 'US', isActive: false },
      { code: 'IN', isActive: false },
      { code: 'ES', isActive: false }
    ],
  });

  useEffect(() => {
   

    const selectedLanguage = state.items.find((item) => item.isActive);
    if (selectedLanguage) {
      if (selectedLanguage.code === "IN") setState({ ...state, want_to_learn: "Hindi" });
      if (selectedLanguage.code === "US") setState({ ...state, want_to_learn: "English" });
      if (selectedLanguage.code === "ES") setState({ ...state, want_to_learn: "Spanish" });
    }
  }, [state.items]);

 

  const handelSubmit = async event => {
    event.preventDefault();
    if (state.step < 3) {
      setState({ ...state, step: state.step + 1 });
      console.log(state.step);
    } else {
      const { email, password, displayName, confirm_password, want_to_learn, Proficiency_level } = state;
      if (password !== confirm_password) {
        alert("Password and Confirm Password are not the same");
        return;
      }

      try {
        try {
          // Create the user and update the displayName
          const userCredential = await auth.createUserWithEmailAndPassword(email, password);
          await userCredential.user.updateProfile({ displayName });
        
          // Get the user object and log the displayName
          const user = auth.currentUser;
          console.log("User's displayName:", user.displayName);
        
          // Create the user profile document
          const userDocumentRef = await createUserProfileDocument(user, { displayName, want_to_learn, Proficiency_level });
        
          // Fetch and log user data from the user profile document
          const docSnapshot = await userDocumentRef.get();
          const userData = docSnapshot.data();
          console.log("User data:", userData);
          dispatch(setCurrentUser(userData));
          router.push('/home');
        } catch (error) {
          console.error("Error creating user:", error);
        }
        

         

        setState({
          ...state,
          email: "",
          password: "",
          displayName: "",
          confirm_password: "",
          step: 1,
          selected: false,
          want_to_learn: "",
          Native_language: "",
          Proficiency_level: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleItemClick = (code) => {
    const updatedItems = state.items.map((item) => {
      return { ...item, isActive: false };
    });

    const itemToActivate = updatedItems.find((item) => item.code === code);
    if (itemToActivate) {
      itemToActivate.isActive = true;
    }

    setState({ ...state, items: updatedItems });
  };

  const handleProficiencyClick = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value }, () => console.log(state.Proficiency_level));
  };

  return (
    <div className="sign-up text-center">
      <h1 className="sm:text-5xl sm:text-center text-md text-center "> Create Your Profile !</h1>
      <form onSubmit={handelSubmit}>
        {state.step === 1 && (
          <div className="mt-10 mb-10">
            <label className="text-center text-3xl">What Language Do You Want To Learn.</label>
            <br />
            {state.items.map((item) => (
              <ReactCountryFlag
                countryCode={item.code}
                value={item.code}
                key={item.code}
                svg
                style={{ width: '10em', height: '10em' }}
                title={item.code}
                className={`${item.isActive ? 'border-4  border-green-700' : ""} m-2`}
                onClick={() => handleItemClick(item.code)}
              />
            ))}
          </div>
        )}

        {state.step === 2 && (
          <>
            <h1 className="sm:text-3xl sm:text-center  text-md text-center ">What is the proficiency level in {state.want_to_learn} language.</h1>
            <div className="flex flex-col items-start text-lg gap-y-5 mb-4">
              <label>
                <input type="radio" name="Proficiency_level" value="Newbie" className="w-5 h-5" onChange={handleProficiencyClick} />I am new to {state.want_to_learn}.
              </label>
              <label>
                <input type="radio" name="Proficiency_level" value="Familiar" className="w-5 h-5" onChange={handleProficiencyClick} />I know some words and phrases
              </label>
              <label>
                <input type="radio" name="Proficiency_level" value="Beginner" className="w-5 h-5" onChange={handleProficiencyClick} />I can have simple conversations.
              </label>
              <label>
                <input type="radio" name="Proficiency_level" value="Intermediate" className="w-5 h-5" onChange={handleProficiencyClick} />I am Intermediate or higher.
              </label>
            </div>
          </>
        )}

        { state.step === 3 && (
          <>
            <FormInput
              type="text"
              name="displayName"
              value={state.displayName}
              handelchange={handleChange}
              label="display name"
              required
            />

            <FormInput
              type="email"
              name="email"
              value={state.email}
              handelchange={handleChange}
              label="email"
              required
            />
            <FormInput
              type="password"
              name="password"
              value={state.password}
              handelchange={handleChange}
              label="password"
              required
            />

            <FormInput
              type="password"
              name="confirm_password"
              value={state.confirm_password}
              handelchange={handleChange}
              label="confirm password"
              required
            />
          </>
      )  }

        <div className="flex flex-row justify-between">
          {state.step > 1 && (
            <div style={{ width: '30%', margin: '0 auto' }}>
              <CustomButton onClick={(event) => { event.preventDefault(); setState({ ...state, step: --state.step }) }}>
                Previous
              </CustomButton>
            </div>
          )}

          {state.step === 1 && state.want_to_learn && (
            <div style={{ width: '30%', margin: '0 auto' }}>
              <CustomButton type="submit">
                {state.step === 3 ? 'Sign Up' : 'Next'}
              </CustomButton>
            </div>
          )}

          {state.step === 2 && state.Proficiency_level && (
            <div style={{ width: '30%', margin: '0 auto' }}>
              <CustomButton type="submit">
                {state.step === 3 ? 'Sign Up' : 'Next'}
              </CustomButton>
            </div>
          )}

          {state.step === 3 && (
            <div style={{ width: '30%', margin: '0 auto' }}>
              <CustomButton type="submit">
                {state.step === 3 ? 'Sign Up' : 'Next'}
              </CustomButton>
            </div>
         ) }
        </div>
      </form>
    </div>
  );
};

export default SignUp;
