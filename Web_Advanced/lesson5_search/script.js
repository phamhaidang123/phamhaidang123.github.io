let data = [
    {
      name: "xoai",
      url:
        "https://media.mercola.com/assets/images/foodfacts/mango-nutrition-facts.jpg",
    },
    {
      name: "thom",
      url:
        "https://antioxidant-fruits.com/wp-content/uploads/2015/10/Fresh-Golden-Pineapple.jpg",
    },
    {
      name: "dua",
      url:
        "https://www.plantgrower.org/uploads/6/5/5/4/65545169/published/coconut-white-balsamic-condimento.jpg?1515168579",
    },
    {
      name: "dua hau",
      url:
        "https://lh3.googleusercontent.com/proxy/l9-Xxf_vI63hAZZFHE54yuBHOgAodKwBYUI7CKY0QLcaJkW3BmaUwjYdhZooPRLufN7pAB7CnbyN6ppJxP9KB_H0iytyrBvxkMbv3qIG4xv2PueMiN_pxLQrU208vDE",
    },
    {
      name: "du du",
      url:
        "https://c.ndtvimg.com/2019-06/qlo3s8ko_papaya-seeds_625x300_06_June_19.jpg",
    },
    {
      name: "vai thieu",
      url: "https://i5.walmartimages.ca/images/Enlarge/524/207/6000200524207.jpg",
    },
    {
      name: "Cam",
      url:
        "https://th.bing.com/th/id/OIP.PKHYlstDYAp3lswvX1o0aAHaE8?w=224&h=180&c=7&o=5&dpr=3&pid=1.7",
    },
    {
      name: "Kiwi",
      url:
        "https://th.bing.com/th/id/OIP.Lmvdlq0GJuGUdz1ylkyCCAHaD3?w=322&h=180&c=7&o=5&dpr=3&pid=1.7",
    },
    {
      name: "MíT",
      url:
        "https://th.bing.com/th/id/OIP.wlkNLGO2aweRe61m7uVNLQHaE8?w=296&h=197&c=7&o=5&dpr=3&pid=1.7",
    },
    {
      name: "ổi",
      url:
        "https://th.bing.com/th/id/OIP.Hj4GOzt-TJIkJw-s0HEHygHaFj?w=230&h=180&c=7&o=5&dpr=3&pid=1.7",
    },
    {
      name: "Chuối",
      url:
        "https://th.bing.com/th/id/R589c6beca423dbc5f47de0a7cb605e7f?rik=sHyfydrZfxAROA&pid=ImgRaw",
    },
    {
      name: "Quýt",
      url:
        "https://www.theepochtimes.com/assets/uploads/2015/02/15/shutterstock_95061862.jpg",
    },
  ];

let form = document.getElementById("inputData")
console.log(form)
let img = document.getElementById("DuyPhatDang")
img.src = "https://giphy.com/gifs/STARFACE-GmbH-looping-404-starface-UoeaPqYrimha6rdTFV"

form.onsubmit = (e)=>{
    e.preventDefault();

    let key = form.fruit.value
    console.log(key)
    for(let i=0; i<data.length; i++){
        if(data[i].name.toLocaleLowerCase() == key.toLocaleLowerCase()){
            console.log(data[i].url);
            break;
        }else{
            console.log("not found");
        }
    }
}
