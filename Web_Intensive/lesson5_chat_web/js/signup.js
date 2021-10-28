let signup = document.getElementById("signup");

signup.onsubmit = (e) => {
  e.preventDefault();
  let email = signup.email.value;
  let password = signup.password.value;
  let cfpassword = signup.repassword.value;
  if (!email) {
    setText("#suEmail", "Email is required!");
  } else {
    setText("#suEmail", "");
  }
  if (!password) {
    setText("#suPassword", "Password is required!");
  } else if (password.length < 6) {
    setText("#suPassword", "Password must be at least 6 characters!");
  } else {
    setText("#suPassword", "");
  }
  if (!cfpassword) {
    setText("#sucfpassword", "Confirm password is required!");
  } else if (cfpassword != password) {
    setText("#sucfpassword", "Confirm password does not matched!");
  } else {
    setText("#sucfpassword", "");
    // <---Firebase--->//
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        firebase.auth().currentUser.sendEmailVerification()
        console.log(user);
        // ...
        sweetAlert("success", "Successfully! Now check your email and sign in!")
       
      })
      .catch((error) => {
        
        var errorMessage = error.message;
        sweetAlert("error", errorMessage)
        // ..
      });
  }


};

let showHidePassword = () => {
  let a = document.getElementById("pw");
  let b = document.getElementById("re_pw");

  if (a.type == "password") {
    a.type = "text";
  } else {
    a.type = "password";
  }
  if (b.type == "password") {
    b.type = "text";
  } else {
    b.type = "password";
  }
  // console.log(a.type);
  // console.log(b);
};

let setText = (query, content) => {
  document.querySelector(query).innerHTML = content;
};
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

let sweetAlert2 = (icon, content) => {
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



