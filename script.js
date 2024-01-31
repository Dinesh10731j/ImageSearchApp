const displayImages = document.querySelector("#display-images");
const searchBtn = document.querySelector("#Search-btn");
const searchBar = document.querySelector("#search-bar");


let page = 3;
const secretKey = `Your Unsplash api key`;

const getImages = async () => {
  try {

    //getting the value form the search bar
    const val = searchBar.value;
    const Url = `https://api.unsplash.com/search/photos?page=${page}&query=${val}&client_id=${secretKey}&per_page=12`;
    const fetchData = await fetch(Url);
    const data = await fetchData.json();
    const results = data.results;

    if (page === 3) {
      displayImages.innerHTML = "";
    }

    if (fetchData.ok || fetchData.status === 200) {
      results.map((result) => {
        const createImageContainer = document.createElement("div");
        createImageContainer.classList.add("image-container");

        const createImage = document.createElement("img");
        createImage.classList.add("img");
        createImage.src = result.urls.small;

        const downloadLink = document.createElement("a");
        downloadLink.classList.add("download-link");
        downloadLink.href = result.urls.full;
        downloadLink.setAttribute("download", "image.jpg");
        downloadLink.innerHTML =`<i class="fa-solid fa-download"></i>`;

        createImageContainer.appendChild(createImage);
        createImageContainer.appendChild(downloadLink);
        displayImages.appendChild(createImageContainer);
      });
    } else {
      console.log(fetchData.status);
    }
  } catch (err) {
    console.error("Error while fetching data:", err);
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getImages();
  page = 3;
  searchBar.value = "";
});




