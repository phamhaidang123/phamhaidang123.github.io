let login = document.getElementById("login")

login.onsubmit = (e) => {
    e.preventDefault()

    let lnpassword = login.lnpassword.value;
    let your_name = login.your_name.value;
    // ---fix---
    if (!your_name) {
        setText("#siEmail", "Name is required!");
    } else {
        setText("#siEmail", "");
    }

    if (!lnpassword) {
        setText("#siPassword", "Password is required!");
    } else if (lnpassword.length < 6) {
        setText("#siPassword", "Password must be at least 6 characters!");
    } else {
        firebase.auth().signInWithEmailAndPassword(your_name, lnpassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          if(user.emailVerified){
              console.log("Hello");
              open("../html/chat.html", "_self")
          }else{
              
              sweetAlert("error", "Pls verify your e-mail")
          }
          // ...
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage)
        }); 
    }
}
let showHidePassword1 = () => {

    let c = document.getElementById("your_pass")

    if (c.type == "password") {
        c.type = "text"
    } else {
        c.type = "password"
    }

    // console.log(a.type);
    // console.log(b);
}
let setText = (query, content) => {
    document.querySelector(query).innerHTML = content;
}

let sweetAlert = (icon, content) => {
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