let sendMessage = document.getElementById("chat")

//avt (chưa dùng tới)
let avt = (query, content) =>{
  document.querySelector(query).innerHTML(content)
}
// sweetAlert

let quit = (icon, content)=>{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}
// ---dảk mode---
const outerContainer = document.querySelector(".outer-container");
const container = document.querySelector(".container");


container.addEventListener("click", () => {
  outerContainer.classList.toggle("light");
});






// ---timer---
let clock = document.querySelector("#timer");
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
setInterval(function(){ clock.innerHTML = getRealTime() }, 1000);

console.log(clock);

