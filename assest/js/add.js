const BASE_URL = " http://localhost:8080";
const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allInput = document.querySelectorAll("input");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
let newData;
let copyData;
async function getData() {
  let res = await axios(`${BASE_URL}/cards`);
  drawTable(res.data);
  newData = res.data;
}
getData();
function drawTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((element) => {
    const tr = document.createElement("tr");

    tr.innerHTML += `
    <td>${element.id}</td>
    <td><img src="${element.img}" alt=""></td>
    <td>${element.name}</td>
    <td>${element.des}</td>
    <td>${element.price}</td>
    <td><i class="fa-solid fa-trash fa-beat-fade" onclick=dataDelete("${element.id}",this)></i></td>
        `;
    tBody.append(tr);
  });
}
// ADD
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    name: allInput[0].value,
    des: allInput[1].value,
    details: allInput[2].value,
    price: allInput[3].value,
    img: allInput[4].value,
  };
  try {
    await axios.post(`${BASE_URL}/cards`, obj);
  } catch (error) {
    console.log(error);
  }
});
// DELETE
async function dataDelete(id, btn) {
  try {
    if (window.confirm("r u sure to delete?")) {
      await axios.delete(`${BASE_URL}/cards/${id}`);
      btn.closest("tr").remove();
    }
  } catch (error) {
    console.log(error);
  }
}
// SEARCH
search.addEventListener("input", function (e) {
  let filtered = newData.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
// SORT
sort.addEventListener("click", function () {
  let sorted;
  if (sort.innerText === "ASC") {
    sort.innerText = "DES";
    sorted = newData.sort((a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    );
  } else if (sort.innerText === "DES") {
    sort.innerText = "ASC";
    sorted = newData.sort((a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase())
    );
  } else if (sort.innerText === "ASC") {
    sorted = copyData;
  }
  drawTable(sorted);
});
