const accessKey = "ahd7eiv4CcTI0m0QY2tyjwjLrLy086LNsSsA2lVKre0";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search_query");
const container = document.querySelector(".container");
const showMore = document.getElementById("searchmore");

let inputData = "";
let page = 1;

 async function searchImage() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/photos?page=${page}&qurey= 
     ${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    container.innerHTML = "";
  }

  results.map((_results) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search_result");
    const image = document.createElement('img');
    image.src = _results.urls.small;
    image.alt = _results.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = _results.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = _results.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    container.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
