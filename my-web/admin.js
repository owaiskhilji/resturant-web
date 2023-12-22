import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getStorage, ref ,uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import {  getFirestore, collection, addDoc, onSnapshot,doc, deleteDoc,updateDoc,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCq3nBf2ZLssGrrSm7dRjblnomATEtP8AM",
    authDomain: "myweb-b0c38.firebaseapp.com",
    projectId: "myweb-b0c38",
    storageBucket: "myweb-b0c38.appspot.com",
    messagingSenderId: "469404720914",
    appId: "1:469404720914:web:9e23abd9abac1bd951ddcb",
    measurementId: "G-6759QQSP9X"
  };

  export  const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);


let getbtn = document.querySelector(".addbtn")
let getitem = document.querySelector("#get-item")
let uploadpic = document.querySelector("#get-img")
let getdes = document.querySelector("#get-des")
let getprice = document.querySelector("#get-price")
let getselect = document.querySelector("#get-select")
let edititem = document.querySelector(".dropdown-item")
let editrs = document.querySelector("#edit-rs")
// Storage store & Add Data
let imageURL;
if(getbtn){
    getbtn.addEventListener("click",async()=>{
//       getitem.value == ' '
//       uploadpic == ' '
//       getdes.value == ' '
//       getprice.value == ' '
//       getselect.value == 'select cetegary '
//       if(getitem.value == ' ' || uploadpic == ' ' || getdes.value == ' ' ||getprice.value == '' ||  getselect.value == ' '){
// alert('fill the fild')
//       }
      const mountainImagesRef = ref(storage, `images/${uploadpic.files[0].name}`);
        // uploadBytes(mountainImagesRef ,uploadpic.files[0]).then((snapshot) => {
        //     console.log('Uploaded a blob or file!',snapshot);})
        const uploadTask = uploadBytesResumable(mountainImagesRef, uploadpic.files[0]);
        uploadTask.on('state_changed', 
          (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
        console.log(error);  
        }, 
          () => {
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                       imageURL = downloadURL
                       console.log('File available at', imageURL);
                       addtofirestore()
            });
          }
          );           
          async function addtofirestore() {
            const docRef = await addDoc(collection(db, "data/"), {
              uploadimg:imageURL,
             itemselect:getselect.value,
              itemname:getitem.value,
              itemdes:getdes.value,
              itemprice:getprice.value,
            });
            console.log("Document written with ID: ", docRef.id);
    }
    })
}

// update data
function getdata() {
  const getrow = document.querySelector(".row")  
  onSnapshot(collection(db, "data/"), (data) => {
data.docChanges().forEach(newData => {
  // console.log(newData.doc.data());
if(newData.type == "removed"){
const del = document.getElementById(newData.doc.id)
del.remove()
}
else if(newData.type == "added"){
  getrow.innerHTML+=`<div id="${newData.doc.id}" class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=" ${newData.doc.data().uploadimg}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title"> ${newData.doc.data().itemselect}</h3>
        <h5 class="card-text"> ${newData.doc.data().itemname}</h5>
        <p class="card-text"><small class="text-body-secondary">${newData.doc.data().itemdes}</small></p>
        <p class="card-text"><small class="text-body-secondary">${newData.doc.data().itemprice}rs</small></p>
      </div>
    </div>
  </div>
   <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button"  onclick = "dltbtn('${newData.doc.id}')">Left</button>
    <div class="btn-group dropup" role="group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" onclick = "edit(this,'${newData.doc.id}')">item name</a></li>
          <li><a id="edit-rs" class="dropdown-item" href="#" onclick = "edit(this,'${newData.doc.id}')">item rs</a></li>
        </ul>
      </div>
    </div>
    </div>
    ` 
}
});    
  });
  
}
getdata()

// Delete
async function dltbtn(id) {
  await deleteDoc(doc(db, "data/", id))
}
window.dltbtn = dltbtn


// async function edit(e,id) {
//   if (getitem = edit) {
//   let editval = prompt('Enter Edit item')
//     e.parentNode.firstChild.nodeValue = editval
//     await updateDoc(doc(db, "data/", id), {
//       getitem : editval
      
//     })
    
//   };
//   if (getprice = edit) {
//   let editval = prompt('Enter Edit price')
//     e.parentNode.firstChild.nodeValue = editval
//     await updateDoc(doc(db, "data/", id), {
//       getprice : editval
//     });

//   }}
// window.edit = edit


