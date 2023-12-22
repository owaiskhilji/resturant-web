import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword,updatePassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
   import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


   const firebaseConfig = {
    apiKey: "AIzaSyCq3nBf2ZLssGrrSm7dRjblnomATEtP8AM",
    authDomain: "myweb-b0c38.firebaseapp.com",
    projectId: "myweb-b0c38",
    storageBucket: "myweb-b0c38.appspot.com",
    messagingSenderId: "469404720914",
    appId: "1:469404720914:web:9e23abd9abac1bd951ddcb",
    measurementId: "G-6759QQSP9X"
  };

  const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
   const provider = new GoogleAuthProvider();
  
  
  
    //SIGN UP..............

  let semail = document.querySelector('#email')
  let spassword = document.querySelector('#password')
  let name = document.querySelector('#first')
  let rname = document.querySelector('#res-name')
  let phnum = document.querySelector('#ph-num')
  let btn = document.querySelector('#btn')
if(btn){
    btn.addEventListener("click",async(event)=>{
        event.preventDefault()
        createUserWithEmailAndPassword(auth, semail.value, spassword.value)
        .then((userCredential) => {
          const user = userCredential.user;

           console.log(user);       
          window.location  = 'signin.html'

        })
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
});
const docRef = await addDoc(collection(db, "Admin"), {
  name: name.value,
  Resturantname: rname.value,
  phonenum: phnum.value,
  email: semail.value,
  password: spassword.value
});
console.log("Document written with ID: ", docRef.id);

}
) }

//google sign up
let gbtn = document.querySelector('.gle-btn')
if(gbtn){
    gbtn.addEventListener("click",()=>{
        const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;  
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
        const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
    })
}

// SIGN UP PASSWORD SHOW & HIDE
const inputEl = document.getElementById("password");
const eyeBtn = document.querySelector('.eye-icon')
if(eyeBtn){

  eyeBtn.addEventListener("click", ()=>{
  if(inputEl.type == 'password'){
    inputEl.type = 'text'
    eyeBtn.src ='eye-open.png'
    console.log(inputEl.type);
  }
  else if(inputEl.type == 'text'){
    inputEl.type = 'password'
    eyeBtn.src ='eye-close-1.png'
    console.log(inputEl.type);
  }
  }
   )
}


// SIGN IN..........
let lemail = document.querySelector('#lemail')
let lpassword = document.querySelector('#lpassword')
let lbtn = document.querySelector('#l-btn')
if(lbtn){
    lbtn.addEventListener("click",(event)=>{
        event.preventDefault()
        signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
        alert('okay')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        alert('errorCode')
       
        });
      
    })
}

  // SIGN in password show 
  const inputE = document.querySelector("#lpassword");
  const eyebtn = document.querySelector('.eyeicon')
  if (eyebtn) {
    eyebtn.addEventListener('click', ()=>{
    if(inputE.type == 'password'){
      inputE.type = 'text'
      console.log(inputE.type);
        eyebtn.src ='eye-open.png'
    }
    else if(inputE.type == 'text'){
      inputE.type = 'password'
      console.log(inputE.type);
      eyebtn.src ='eye-close-1.png'
    }
    })
  }
  

  //forget password..............
// let forgetBtn = document.querySelector("forget")
// if (forgetBtn){
//     forgetBtn.addEventListener("click",() => {
        
//     } )
// }
  
