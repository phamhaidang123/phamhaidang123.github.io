
// -recallMessage-

// let recall = document.getElementById("message");

// recall.onsubmit = (e) =>{
//     e.preventDefault();


//     recallMessage("#message", "Message recalled!");
    
    
// };
// let recallMessage = (query, content) => {
//     document.querySelector(query).innerHTML = content;
//     console.log("Alo");

// };


// console.log("aloooo");
// console.log("AAaaaaaaallosijwudbeufbw");
// ---real time---
let getRealTime = () => {
  let date = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let d = days[date.getUTCDay()];

  let h_ = "";
  let m_ = "";
  let s_ = "";

  if (h < 10) {
    h_ = "0" + h;
  } else {
    h_ = h;
  }
  if (m < 10) {
    m_ = "0" + m;
  } else {
    m_ = m;
  }
  if (s < 10) {
    s_ = "0" + s;
  } else {
    s_ = s;
  }

  let time = h_ + ":" + m_ + ":" + s_ + " " + d;

  return time;
};

let clock = document.querySelector("#real_time")

setInterval(function(){ clock.innerHTML = getRealTime() }, 1000);
window.onload = init 
async function init(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user && user.emailVerified){
      const email = user.email;
      loadConversations(email);
      handleConversationChange(email);
    }else{
      
      sweetAlert("error", "Something went wrong")
      setTimeout(function(){ open("../html/signin.html", "_self")}, 3000)

    }
  })
}
// -quit-
// let quit = () =>{
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: 'color: green;',
//           cancelButton: 'color: red;'
//         },
//         buttonsStyling: false
//       })
      
//       swalWithBootstrapButtons.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'No, cancel!',
//         reverseButtons: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           swalWithBootstrapButtons.fire(
//             'Deleted!',
//             'Your file has been deleted.',
//             'success'
//           )
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire(
//             'Cancelled',
//             'Your imaginary file is safe :)',
//             'error'
//           )
//         }
//       })
// }
// <--firebase-->
let loadConversations = async (email)=>{
  let currentEmail = email.trim()

  document.querySelector("#currentEmail").innerHTML = currentEmail

  let result = await firebase.firestore().collection("chat").where("users", "array-contains", currentEmail).get()

  let data = getDataFromDocs(result.docs)

  renderChat(data[0], currentEmail)

  renderListUser(data, currentEmail)

}
let getDataFromDoc = (doc)=>{
  let data = doc.data()
  data.id = doc.id
  return data
}

let getDataFromDocs = (docs)=>{
 let result =[]
 for(let doc of docs){
     let data = getDataFromDoc(doc)
     result.push(data)
  }
 return result
}


let renderChat = (data, email)=>{
  let dom = document.querySelector(".chat_content");
  let chat_name = document.querySelector("#currentName")
  let chat_id = document.querySelector("#currentId")

  chat_name.innerHTML = data.name;
  chat_id.innerHTML = data.id;
 


  dom.innerHTML = "";
  

  for (let i = 0; i < data.messages.length; i++){
    let chatClass = "message";
    if(data.messages[i].owner == email){
      chatClass = "message owner"
    }
    let html = `<div class="${chatClass}">
    <div class="message_info">
      <span style="margin-right: 15px;">${data.messages[i].owner}</span>
      <span>${data.messages[i].time}</span>
    </div>
    <span class="content_m">${data.messages[i].content}</span>
  </div>`;
  dom.innerHTML+=html;
  }

};
let renderListUser = (data, email)=>{
  let dom = document.querySelector(".userslist");
  dom.innerHTML = "";
/////////////////////////////////////////////////////////    img bị loixi//
  for(let i=0; i<data.length; i++){
    let html = `<div id="c${data[i].id}" class="user" style="display: flex;
    justify-content: space-between; border-radius: 50%;">

    <img src="${data[i].Avatar}" alt="">
    <p id="profile_name">${data[i].name}</p>


    <p>${data[i].createAt}</p>
  </div>`;

  dom.innerHTML += html;
  }
  for(let i=0; i<data.length; i++){
    let user = document.querySelector(`#c${data[i].id}`);
    user.onclick = ()=>{
      renderChat(data[i], email)
    }
    
  }
}



let sg = document.getElementById("sg")
sg.addEventListener("click", ()=>{
  firebase.auth().signOut().then(()=>{
    open('../html/signin.html', "_self")
  },()=>{
    alert("Sign out error")
  }
  )
})
let sweetAlert = () => {
  Swal.fire({
    title: 'Successfully! Now check your e-mail and sign in!',
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://media0.giphy.com/media/sIIhZliB2McAo/200w.gif?cid=82a1493by5vkedanaufgzihtou3j176jfm9mrgxb53cutn64&rid=200w.gif&ct=g")
      left top
      no-repeat
    `
  })
};

//chat 
let formInputMessage = document.querySelector("#send_message")
formInputMessage.onsubmit = (e)=>{
  e.preventDefault();
let currentEmail = document.querySelector("#currentEmail").innerHTML
    let currentId = document.querySelector("#currentId").innerHTML

    let message = formInputMessage.m.value;


  updateMessage(message, currentEmail, currentId)
  formInputMessage.m.value = "";
}
//send messages
let updateMessage = async (messageContent, currentEmail, currentId)=>{
  let message = {
    content: messageContent,
    owner: currentEmail,
    time: getRealTime()

  };
  await firebase.firestore().collection("chat").doc(currentId).update({
    messages: firebase.firestore.FieldValue.arrayUnion(message),

  });

  
};   



//thêm data trên firebase
let handleConversationChange = async (email) => {
  let skipRun = true;
  let currentEmail = email;
  console.log(currentEmail);
  firebase
    .firestore()
    .collection("chat")
    .where("users", "array-contains", currentEmail)
    .onSnapshot(function (snapshot) {
      if (skipRun) {
        skipRun = false;
        return;
      }

      let docChanges = snapshot.docChanges();
      for (let docChange of docChanges) {
        let type = docChange.type;
        let conversationDoc = docChange.doc;
        let conversation = getDataFromDoc(conversationDoc);

        if (type == "modified") {
          renderChat(conversation, currentEmail);
        }
        if (type == "added") {
          setTimeout(function () {
            location.reload();
          }, 5000);
        }
      }
    });
};


  //xóa tn
  let deleteMessage = ()=>{
    db.collection("cities").doc("DC").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
let formNewConversation = document.querySelector("#addNewConversation")

let btn_addnew = document.querySelector("#formAddNewConversationBtn")

btn_addnew.addEventListener("click", ()=>{
  let name = formNewConversation.name.value
  let email = formNewConversation.email.value
  addNewConversation(email, name)
  // console.log(name);
  // console.log(email);
})

let addNewConversation = async(email,name)=>{
  let currentEmail = document.querySelector("#currentEmail").innerHTML
  let userArray = [currentEmail, email]

}







