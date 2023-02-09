const results = document.querySelector("#results");
const btnNext = document.querySelector("#btnNext");
const btnPrev = document.querySelector("#btnPrev");
const navigationButton = document.querySelector("#navigationButtons");
navigationButton.style.visibility = "hidden";

const asyncFetch = async (value) => {
  var res = await fetch(`https://swapi.dev/api/${value}`).catch((err) => {
    alert(err);
  });
  if (res) {
    var data = await res.json();
    resultShow(data, value);

    if (data.next) {
      btnNext.style.visibility = "visible";
      btnNext.addEventListener("click", async (e) => {
        e.preventDefault();
        var nextDataUrl = data.next;
        res = await fetch(nextDataUrl);
        data = await res.json();

        if (data.next == null) {
          btnNext.style.visibility = "hidden";
        }
        resultShow(data, value);
        btnPrev.style.visibility = "visible";

        btnPrev.addEventListener("click", async (e) => {
          e.preventDefault();

          var previousDataUrl = data.previous;
          res = await fetch(previousDataUrl);
          data = await res.json();
          if (data.previous == null) {
            btnPrev.style.visibility = "hidden";
          }
          resultShow(data, value);
        });
      });
    }
  } else {
    throw new Error(res.statusText);
  }
};

const resultShow = async (data, value) => {
  let output = "";
  if (value === "people") {
    data.results.forEach((item) => {
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
                  
                </div>
  </div>
  `;
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
                  
                </div>
  </div>`;
    });
  }
  results.innerHTML = output;
};

document.querySelector("#buttons").addEventListener("click", (e) => {
  asyncFetch(e.target.textContent.trim().toLowerCase());
});
