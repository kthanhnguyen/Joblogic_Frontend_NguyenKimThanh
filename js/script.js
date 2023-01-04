var url = "../data/EmployeeData.json";
const actors = document.getElementById("listActor");
const listDetail = document.querySelector(".l-content-wrap");

async function actorList() {
  try {
    let result = await fetch(url);
    let data = await result.json();

    let actorList = data.employees;

    return actorList;
  } catch (error) {
    console.log(error);
  }
}

async function renderActors() {
  let actorList = await this.actorList();
  if (actorList && actorList.length) {
    var actorItem = actorList.map((item, index) => {
      const active = index === 0 ? "active" : "";
      return `<li>
      <a href="#${item.name.replace(/\s+/g, "")}" data-tab="${item.name.replace(
        /\s+/g,
        ""
      )}" class="${active}">${item.name}</a>
      </li>`;
    });

    actors.innerHTML += actorItem.join("");
  }
}

async function renderActorDetail() {
  let actorList = await this.actorList();
  if (actorList && actorList.length) {
    var actorItem = actorList.map((item, index) => {
      const active = index === 0 ? "active" : "";
      return `<div id="${item.name.replace(/\s+/g, "")}" class="l-detail b-tab ${active}">
      <div class="actor-img"><img src="./images/profile/${item.image}" alt=""></div>
      <div class="actor-info">
        <div class="actor-name">${item.name}</div>
        <div class="actor-popularity">
        <div class="actor-range">
          <input type="range" min="1" max="10" value="${item.popularity}" class="range" id="range-input">
        </div>
        </div>
        <div class="actor-biography">
          <div class="actor-biograph-label">Biography</div>
          <p class="actor-biograph-desc">${item.biography}</p>
        </div>
      </div>
    </div>`;
    });
    listDetail.innerHTML += actorItem.join("");
  }
}

function Tabs() {
  var bindAll = function () {
    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", change, false);
    }
  };

  var clear = function () {
    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove("active");
      var id = menuElements[i].getAttribute("data-tab");
      document.getElementById(id).classList.remove("active");
    }
  };

  var change = function (e) {
    e.preventDefault()
    clear();
    e.target.classList.add("active");
    var id = e.currentTarget.getAttribute("data-tab");
    document.getElementById(id).classList.add("active");
  };

  bindAll();
}

async function onload() {
  await renderActors();

  await renderActorDetail();

  new Tabs();
}

document.addEventListener("DOMContentLoaded", ()=>{
  onload();
})
