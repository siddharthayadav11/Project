const BASE_URL = " http://localhost:8080";
const cards = document.querySelector(".cards");
const more = document.querySelector(".more");
menuIcon = document.querySelector(".fa-solid");
navBar = document.querySelector(".nav");
menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-x")
    : (this.className = "fa-solid fa-bars");
});
let newData;
let limit = 3;
async function getData() {
  let res = await axios(`${BASE_URL}/cards`);
  drawCards(res.data);
  newData = res.data;
}
getData();
function drawCards(arr) {
  cards.innerHTML = "";
  arr.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML += `<div class="image">
    <img src="${element.img}" alt="">
  </div>
  <div class="text">
  <h5>${element.des}</h5>
  <a href="details.html?id=${element.id}"><h2>${element.name}</h2></a> 

  <h3>$${element.price}</h3>
  </div>
       
              
        `;
    cards.append(card);
  });
}

more.addEventListener("click", function () {
  limit += 3;
  drawCards(newData.slice(0, limit));
  if (limit >= newData.length) {
    this.remove();
  }
});
