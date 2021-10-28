let formFeedback = document.getElementById("contact")

formFeedback.onsubmit = (e)=>{
    e.preventDefault();

    let name = formFeedback.txtName.value;
    let email = formFeedback.txtEmail.value;
    let phone = formFeedback.txtPhone.value;
    let message = formFeedback.txtMsg.value;
    let data = {
        name = name,
        email = email,
        phone = phone,
        message = message,
    }
    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(message)
    $.ajax({
        url: './sendEmail.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            sweetAlert(data.status, data.response);
        }
    });
    
    return false
}
function sweetAlert(icon, content) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: content
    })
}
// Sign in/sign up:
let signin = document.getElementById("signin")

signin.onclick = (a)=>{
a.preventDefault()

}
