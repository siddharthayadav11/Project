const BASE_URL = " http://localhost:8080";
const card=document.querySelector(".details")
let id = new URLSearchParams(window.location.search).get("id")
async function getData() {
    let res = await axios(`${BASE_URL}/cards/${id}`);
    drawCards(res.data);

  }
  getData();
  function drawCards(data) {
    card.innerHTML = `
    <div class="image">
    <img src="${data.img}" alt="" />
  </div>
  <div class="text">
    <h5>${data.des}</h5>
    <h2>${data.name}</h2>
    <h3>$${data.price}</h3>
    <p>${data.details}</p>
    <button class="go-back" onclick=goBack()>GO BACK</button>
  </div>
    `;
    
  }
  function goBack(){
    window.history.back()
  }