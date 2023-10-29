"use client"
import React ,{useState}from "react";
import './sign-up.styles.scss';
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag"

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createUserProfileDocument } from "../../firebase/firebase.utils";
import { auth } from "../../firebase/firebase.utils";
import firebase from "../../firebase/firebase.utils";

class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            displayName:"",
            confirm_password:"",
            step:1,
            selected:false,
            want_to_learn:"",
            Native_language:"",
            Proficiency_level:"",
            
            items:[{code:'US',isActive:false},
            {code:'IN',isActive:false},
            {code:'ES',isActive:false} ],
            
            
         }
    }

    




handelSubmit = async event =>{
    event.preventDefault();
   if(this.state.step<3 )
{
   
   

    this.setState({step:this.state.step+1})
    console.log(this.state.step);
}
else{
    const {email,password,displayName,confirm_password,want_to_learn,Proficiency_level}=this.state;
    if(password !== confirm_password){
        alert("Password and Confirm Password are not same");
        return;
    }
   
    try{
        const {user} = await auth.createUserWithEmailAndPassword(email,password);
        console.log({user});
        await createUserProfileDocument(user,{displayName,want_to_learn,Proficiency_level});
      

        this.setState({
            email:"",
            password:"",
            displayName:"",
            confirm_password:"",
            step:1,
            selected:false,
            want_to_learn:"",
            Native_language:"",
            Proficiency_level:"",
            
           
        })
    }
    catch(error){
        console.log(error);
    }
}


}


    handleChange = event =>{
        const {name,value} =event.target;

        this.setState({[name]:value});
    }

    handleItemClick = (code) => {
        // Create a copy of the items array and modify the isActive field
        const updatedItems = this.state.items.map((item) => {
            return { ...item, isActive: false };
          });
      
          // Find the item to activate and set isActive to true
          const itemToActivate = updatedItems.find((item) => item.code === code);
          if (itemToActivate) {
            itemToActivate.isActive = true;
          }
    
        // Update the state with the modified items array
        this.setState({ items: updatedItems },()=>{
            this.state.items.forEach(element => {
                if(element.isActive && element.code ==="IN") this.setState({want_to_learn:"Hindi"});
                if(element.isActive && element.code ==="US") this.setState({want_to_learn:"English"});
                if(element.isActive && element.code ==="ES") this.setState({want_to_learn:"Spanish"});
              });
        });
       
      };

      handleProficiencyClick = e =>{
       //e.preventDefault();
       const {name,value} =e.target;
 this.setState({[name]:value},()=>console.log(this.state.Proficiency_level));
    
      }

render(){
    const countryCodes = ['US', 'IN', 'GB']; // Add more country codes as needed
    const defaultCountryCode = 'US'; // Set the default selected country code
    return(
        <div className="sign-up text-center">
          <h1 className="sm:text-5xl sm:text-center text-md text-center "> Create Your Profile !</h1>
        <form onSubmit={this.handelSubmit}>

        {
            this.state.step==1 && 
           (<div className="mt-10 mb-10"> <label className="text-center text-3xl ">What Language Do You Want To Learn.</label>
           <br />
          

          
        {this.state.items.map((item) => (
         
            <ReactCountryFlag countryCode={item.code} value={item.code} key={item.code} svg style={{ width: '10em', height: '10em' }} title={item.code} 
            className={`${item.isActive ? 'border-4  border-green-700': ""} m-2`}
            onClick={() => this.handleItemClick(item.code)}/> 
         
        ))}
    

                </div>)
        }

{this.state.step==2 && (
    <>
    
        <h1 className="sm:text-3xl sm:text-center  text-md text-center ">What is the proficiency level in {this.state.want_to_learn} language.</h1>
       <div className="flex flex-col items-start text-lg gap-y-5 mb-4">
    <label> <input type="radio" name="Proficiency_level"  value="Newbie" className="w-5 h-5" onChange={this.handleProficiencyClick}/>I am new to {this.state.want_to_learn}.</label> 
    <label> <input type="radio" name="Proficiency_level"  value="Familiar" className="w-5 h-5" onChange={this.handleProficiencyClick}/>I know some words and phrases</label> 
    <label> <input type="radio" name="Proficiency_level"  value="Beginner" className="w-5 h-5" onChange={this.handleProficiencyClick}/>I can have simple conversations.</label> 
    <label> <input type="radio" name="Proficiency_level"  value="Intermediate" className="w-5 h-5" onChange={this.handleProficiencyClick}/>I am Intermediate or higher.</label> 
      </div>

    </>
)}


        {
            this.state.step==3 && (<>
                <FormInput 
            type="text"
            name="displayName"
            value={this.state.displayName}
            handelchange={this.handleChange}
            label="display name"
            required
            />

    
            <FormInput 
            type="email"
            name="email"
            value={this.state.email}
            handelchange={this.handleChange}
            label="email"
            required
            />
            <FormInput 
            type="password"
            name="password"
            value={this.state.password}
            handelchange={this.handleChange}
            label="password"
            required
            />

          <FormInput 
            type="password"
            name="confirm_password"
            value={this.state.confirm_password}
            handelchange={this.handleChange}
            label="confirm password"
            required
            />
            </>)
        }

        
           
         
    

        <div className="flex flex-row justify-between">
        { this.state.step >1 
      
      && (<div style={{width:'30%', margin:'0 auto'}}>
      <CustomButton onClick={(event)=>{event.preventDefault();this.setState({step:--this.state.step})}}  >
      Previous
      </CustomButton>
      </div>)} 

     { this.state.step===1 
     && this.state.want_to_learn 
     && (<div style={{width:'30%', margin:'0 auto'}}><CustomButton type="submit" 
    >
     {this.state.step===3?'Sign Up': 'Next'}
     </CustomButton>
     </div>)}   

     { this.state.step==2 
     && this.state.Proficiency_level 
     && (<div style={{width:'30%', margin:'0 auto'}}><CustomButton type="submit" 
    >
     {this.state.step===3?'Sign Up': 'Next'}
     </CustomButton>
     </div>)}  

     { this.state.step==3 
     
     && (<div style={{width:'30%', margin:'0 auto'}}><CustomButton type="submit" 
    >
     {this.state.step===3?'Sign Up': 'Next'}
     </CustomButton>
     </div>)}
    
     </div>

        
    </form>
   
       

    {/*    { !show ? 
        <div> <FormInput 
            type="number "
            name="phone_number"
            value={this.state.phone_number}
            handelchange={this.handleChange}
            label="phone number"
            required
            />
            <div id="recaptcha-container"></div>
            <CustomButton onClick={this.sendOTP} >Send OTP</CustomButton>
            </div>
           
        : <div> 
          <FormInput 
            type="number "
            name="otp"
            value={this.state.otp}
            handelchange={this.handleChange}
            label="OTP"
            required
            />
            <CustomButton onClick={this.ValidateOTP} >validate OTP</CustomButton>
            </div> } */}


    </div>
    );
}



}
export default SignUp;