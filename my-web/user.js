import{app}from "./admin.js"
import {  getFirestore, collection, addDoc, onSnapshot,doc, deleteDoc,updateDoc,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app);

// user.... update data
function getdata() {
    const getdivrow = document.querySelector("#div-row")  
    onSnapshot(collection(db, "data/"), (data) => {
  data.docChanges().forEach(newData => {
    // console.log(newData.doc.data());
  if(newData.type == "removed"){
  const del = document.getElementById(newData.doc.id)
  del.remove()
  }
  else if(newData.type == "added"){
    getdivrow.innerHTML+=`<div id="${newData.doc.id}" class="card mb-3" style="max-width: 540px;">
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
      <button type="button"  )">Add to Card</button>
      </div>
      </div>
      ` 
  }
  });    
    });
    
  }
  getdata()
  // onclick = "dltbtn('${newData.doc.id}'