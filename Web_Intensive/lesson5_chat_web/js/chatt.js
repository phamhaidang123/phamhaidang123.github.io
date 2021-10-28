let clock = document.querySelector("#real_time");

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

setInterval(function () {
  clock.innerHTML = getRealTime();
}, 1000);

window.onload = init;

async function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      const email = user.email;
      loadConversations(email);
      handleConversationChange(email);
    } else {
      sweetAlert("warning", "You need to login to chat");
      setTimeout(function () {
        open("./signin.html", "_self");
      }, 3000);
    }
  });
}

let loadConversations = async (email) => {
  let currenEmail = email.trim();
  document.querySelector("#currentEmail").innerHTML = currenEmail;

  let result = await firebase
    .firestore()
    .collection("chat")
    .where("users", "array-contains", currenEmail)
    .get();

  let data = getDataFromDocs(result.docs);

  console.log(data);
  renderChat(data[0], currenEmail);
  renderListUsers(data, currenEmail);
};

let renderChat = (data, email) => {
  let dom = document.querySelector(".chat_content"); //lấy ra dom chat
  let chat_name = document.querySelector("#currentName"); //lấy ra dom chat name
  let chat_id = document.querySelector("#currentId"); ////lấy ra dom id

  chat_name.innerHTML = data.name; //thay đổi nội dung ở dom chat name bằng dữ liệu truyền vào
  chat_id.innerHTML = data.id; ////thay đổi nội dung ở dom chat name bằng dữ liệu truyền vào
  dom.innerHTML = ""; ///rest dom trước khi đổ dữ liệu vào

  for (let i = 0; i < data.messages.length; i++) {
    let chatClass = "message";
    if (data.messages[i].owner == email) {
      chatClass = "message onwer";
    }
    let html = `<div class="${chatClass}">
    <div class="message_info">
      <span style="margin-right: 15px">${data.messages[i].owner}</span>
      <span>${data.messages[i].time}</span>
    </div>
    <span class="content_m">${data.messages[i].content}</span>
  </div>`;
    dom.innerHTML += html;
  }
};
let renderListUsers = (data, email) => {
  let dom = document.querySelector(".usersList");
  dom.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let html = `<div id="c${data[i].id}" class="user">
    <span id="nameAndAvatar"><img src="${data[i].avatar}" alt=""> ${data[i].name}</span>
    <span>${data[i].createAt}</span>
  </div>`;

    dom.innerHTML += html;
  }

  for (let i = 0; i < data.length; i++) {
    let user = document.querySelector(`#c${data[i].id}`);
    user.onclick = () => {
      renderChat(data[i], email);
    };
  }
};

let getDataFromDoc = (doc) => {
  let data = doc.data();
  data.id = doc.id;
  return data;
};

let getDataFromDocs = (docs) => {
  let result = [];
  for (let doc of docs) {
    let data = getDataFromDoc(doc);
    result.push(data);
  }
  return result;
};

let signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        open("./signin.html", "_self");
      },
      () => {
        sweetAlert("error", "Something wrong");
      }
    );
};

let sweetAlert = (icon, content) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: content,
  });
};

let formInputMessage = document.querySelector("#sent_message");
formInputMessage.onsubmit = (e) => {
  e.preventDefault();
  let currentEmail = document.querySelector("#currentEmail").innerHTML;
  let currentId = document.querySelector("#currentId").innerHTML;

  let message = formInputMessage.m.value;

  updateMessage(message, currentEmail, currentId);
  formInputMessage.m.value = "";
};

let updateMessage = async (messageContent, currenEmail, currentId) => {
  let message = {
    content: messageContent,
    owner: currenEmail,
    time: getRealTime(),
  };

  await firebase
    .firestore()
    .collection("chat")
    .doc(currentId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
};

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

let formNewConversation = document.querySelector("#addNewConversation");

let btn_addNew = document.querySelector("#formAddNewConversationBtn");
btn_addNew.addEventListener("click", () => {
  let name = formNewConversation.name.value;
  let email = formNewConversation.email.value;

  let currentEmail = document.querySelector("#currentEmail").innerHTML;
  let arrEmail = [currentEmail, email]
  addNewConversation(name,arrEmail)
});

let addNewConversation = async (chatName, friendEmail) => {
  const ref = await firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];

  const metadata = {
    contentType: file.type,
  };
  const name = file.name;
  const imgUploaded = ref.child(name).put(file, metadata);

  imgUploaded
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      let data = {
        avatar: url,
        createAt: getRealTime(),
        messages: [],
        name: chatName,
        users: friendEmail,
      };
      addConversation(data)
    })
    .catch((err) => {
      alert(err);
    });
};

let addConversation = async (data)=>{
  await firebase.firestore().collection("chat").add(data);
}
