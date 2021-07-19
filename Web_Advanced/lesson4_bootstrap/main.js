let form = document.getElementById("inputData");

form.onsubmit = (e) => {
  e.preventDefault();

  let dataInput = form.fruit.value;
  console.log(dataInput);
};
