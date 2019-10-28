//initial article variable initialized
let articles;

//select elements
const appBody = document.querySelector(".appBody");

//for shake of fucking pagination
let start = 0;
let end = 10;

//funtion to make request
const makeRequest = async (start,end) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=4c11a320ce5844aea8e161ffdeabcd47`;
  const req = new Request(url);

  const response = await fetch(req);
  const data = await response.json();

  return data.articles.slice(start, end);
};

//make initial request on loading the url
window.addEventListener("load", async () => {
  appBody.innerHTML =
    '<h1 class="d-block text-center btn btn-info" style="margin-top:15rem;font-size:3rem">!!......Loading.....!!</h2>';
  articles = await makeRequest(start,end);
  showNews(articles);
});

//to show news on the html document
const showNews = articles => {
  appBody.innerHTML = "";

  articles.forEach(article => {
    const div = document.createElement("div");

    const url = article.urlToImage
      ? article.urlToImage
      : "No_image_available.svg";
    const author = article.author ? article.author : "Anonymous";
    const description = article.description
      ? article.description
      : "Refer to the original article";
    const publishedDate = new Date(article.publishedAt);

    div.innerHTML = `<div class="card mx-auto mt-5" style="width: 80vw;">
      <img class="card-img-top" src=${url} alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${author}</h6>
        <h6 class="card-subtitle mb-2 text-muted">${publishedDate}</h6>
        <p class="card-text">${description}</p>
      </div>
      <a href=${article.url} class="btn btn-primary">Original Article</a>
    </div>`;

    appBody.appendChild(div);
  });
  
  //create button to load more news
  const button = document.createElement('button');
  button.innerHTML = 'Next-10 News';
  button.classList.add('btn');
  button.classList.add('btn-danger');
  button.classList.add('d-block');
  button.classList.add('mx-auto');
  button.classList.add('mt-3');
  button.classList.add('mb-2');

  appBody.appendChild(button);

  button.addEventListener('click',async ()=>{
    start= 10;
    end = 20;
    articles = await makeRequest(start,end);
    showNews(articles);
    document.documentElement.scrollTop = 0;
    appBody.lastChild.remove();
  })

};

//here comes the new features
//country based news

const changeCountry = document.querySelector(".btnC");
const countriesName = document.querySelector(".countriesName");
const countryName = document.querySelectorAll(".countryName");

changeCountry.addEventListener('click',()=>{
  countriesName.style.display='inline';
})

countryName.forEach(country=>{
  country.addEventListener('click',async()=>{
    countriesName.style.display='none';
    articles=await makeRequest(start,end,country.innerHTML);
    showNews(articles);
  })
})

