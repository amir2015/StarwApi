const results = document.querySelector("#results");
const footer = document.querySelector(".footer");
const navigationButton = document.querySelector("#navigationButtons");
let btnNext = document.getElementById("#btnNext");
let btnPrev = document.getElementById("#btnPrev");

//  console.log(navigationButton.innerHTML)
const asyncFetch = async (value) => {
  const res = await fetch(`https://swapi.dev/api/${value}`).catch((err) => {
    alert(err);
  });
  if (res) {
    const data = await res.json();
    resultShow(data, value);
  } else {
    throw new Error(res.statusText);
  }
};
const resultShow = (data, value) => {
  let output = "";
  let navButtonsOutput = "";
  // if (!data.next) {
  //   btnNext.style.visibility = "hidden";
  // }
  if (value === "people") {
    data.results.forEach((item) => {
      if (data.next) {
      }
      if (data.previous) {
      }
      output += `<div class="card p-3 m-3" style="opacity:1">
                <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                  <p class="card-text"> Height ${item.height}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Birth year: ${item.birth_year} </li>
                  <li class="list-group-item">Hair colour: ${item.hair_color}</li>
                  <li class="list-group-item">Mass: ${item.mass}</li>
                </ul>
                
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
  </div>
  `;

      console.log(data, "data");
    });
  }
  if (value === "starships") {
    data.results.forEach((item) => {
      output += `<div class="card p-3 m-3" style="opacity:1">
                <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                  <p class="card-text"> Model: ${item.model}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Manufacturer: ${item.manufacturer}</li>
                  <li class="list-group-item">Length: ${item.length}</li>
                  <li class="list-group-item">Consumables: ${item.consumables}</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
  </div>`;
    });
  }

  if (value === "films") {
    data.results.forEach((item) => {
      output += `<div class="card p-3 m-3" style="opacity:1">
                <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                  <p class="card-text"> ${item.opening_crawl}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Director: ${item.director} </li>
                  <li class="list-group-item">Release date: ${item.release_date}</li>
                  <li class="list-group-item">Producer: ${item.producer}</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
  </div>`;
    });
  }
  results.innerHTML = output;
};

document.querySelector("#buttons").addEventListener("click", (e) => {
  asyncFetch(e.target.textContent.trim().toLowerCase());
});
