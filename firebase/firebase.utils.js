import firebase from 'firebase/compat/app'; //step 1: import firebase this is important
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { FacebookAuthProvider } from "firebase/compat/auth";

//step 2: Configuration this is realted to making account and putting the stuff here as it is...
const config={
    apiKey: "AIzaSyDG134nKx5LBASAck9QJK1OpKM0gnBO4Vs",
  authDomain: "language-learning-app-a15bf.firebaseapp.com",
  projectId: "language-learning-app-a15bf",
  storageBucket: "language-learning-app-a15bf.appspot.com",
  messagingSenderId: "423187779556",
  appId: "1:423187779556:web:5a9fe72964588c5449c1f1",
  measurementId: "G-PVSY7CPVN6"
 // database:"https://e-commerece.firebaseio.com"
}
//step 3: For Initialize the configuration using initalizeApp method
export const app =firebase.initializeApp(config);

//step 4: for authenticaion we will export at various places also firestore to save the authentication and other stuff
export const auth=firebase.auth();
export const firestore =firebase.firestore();

//steo 5: Defining various authntication provider from auth library
const provider_g = new firebase.auth.GoogleAuthProvider();
const provider_f = new firebase.auth.FacebookAuthProvider();
const provider_a = new firebase.auth.OAuthProvider('apple.com');
const provider_github = new firebase.auth.GithubAuthProvider();
provider_github.addScope('repo');

provider_a.addScope('email');
provider_a.addScope('name');

/* const provider_recaptcha=new firebase.auth.RecaptchaVerifier();
const provider_phone_number= new firebase.auth.signInWithPhoneNumber(); */
//window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);


//This is for updation in the database of the state we are doing here
export const addCollectionAndDocumentInFirestore = async (collectionKey,objectsToAdd) =>{
 const collectionRef = firestore.collection(collectionKey);
 const batch = firestore.batch();
 objectsToAdd.forEach(obj => {
  const newDocRef = collectionRef.doc();
  batch.set(newDocRef,obj);
 })

 return await batch.commit();
}
//convertCollectionsToMaps

export const converCollectionsToMaps = (collectionssnapshot) =>{
  const transformedCollection = collectionssnapshot.docs.map(doc=>{
    const {title,items} = doc.data();
    return{
      routeName: encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
  })
  console.log("transformedCollection",transformedCollection)
    return  transformedCollection.reduce((accumulator,collection)=>{
   var element = collection;
     accumulator.push(element);
     return accumulator }
      ,[])

}

//end of converCollectionsToMaps

//step 10: taking the user on changing the auth state and creating a user profile document
export const createUserProfileDocument = async (userAuth ,additionalData) =>{ 
if(!userAuth) return;
//Here the concept of queryReference is used this is of two type 
//DocumentReference and second collectionReference sometime also know as QueryReference
const userRef= firestore.doc(`/users/${userAuth.uid}`);
/* There are two ways to retrieve data stored in Cloud Firestore. 
Either of these methods can be used with documents, collections of documents, or the results of queries:

Call a method to get the data.
Set a listener to receive data-change events. */
const snapShot = await userRef.get();
//console.log(snapShot);
if(!snapShot.exits){

const {displayName,email} = userAuth;
console.log(displayName);
//if(additionalData) displayName=additionalData.displayName;
const createdAt = new Date();

try{
    userRef.set({
      displayName,
      email,
      createdAt,
     ...additionalData
    })
}
catch(error) {
console.log('error creating user',error.message);
}


}

return userRef;

}


//step 6: Some optional parameter for prompt and related stuff......

provider_g.setCustomParameters({prompt:'select_account'});
provider_f.setCustomParameters({
    'display': 'popup'
  });
  provider_a.setCustomParameters({
    // Localize the Apple authentication screen in French.
    locale: 'fr'
  });

  provider_github.setCustomParameters({
    'allow_signup': 'false'
  });
//step 7: Export the actual function of the login and it will work only after putting it in onClick function of any button.
export const signInWithGoogle=()=>
auth.signInWithPopup(provider_g)

export const signInWithFacebook=()=>{
    (auth.signInWithPopup(provider_f))
}
export const signInWithApple=()=> auth.signInWithPopup(provider_a);
export const sighInWithGithub= () => auth.signInWithPopup(provider_github);

export default firebase;