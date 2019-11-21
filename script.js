// make sure the script executes at least once - when the DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // global variables
  const baseURL = "https://www.omdbapi.com/?apikey=2eec4c97&t=";
  const sexyJson = [
    {
    "title": "Shutter Island",
    "url": "https://www.youtube.com/watch?v=5iaYLCiq5RM"
    },
    {
    "title": "The Great Gatsby",
    "url": "https://www.youtube.com/watch?v=rARN6agiW7o"
    },
    {
    "title": "The Wolf of Wall Street",
    "url": "https://www.youtube.com/watch?v=iszwuX1AK6A"
    },
    {
    "title": "The Revenant",
    "url": "https://www.youtube.com/watch?v=LoebZZ8K5N0"
    },
    {
    "title": "Once Upon a Time in Hollywood",
    "url": "https://www.youtube.com/watch?v=Scf8nIJCvs4"
    }
  ];
  // iterate over the array of film objects from my JSON and:
  sexyJson.forEach(async film => {
    // make the fetch call
    const data = await fetch(`${baseURL}${film.title}`);
    const filmData = await data.json();
    // create html elements for the data
    const container = document.createElement("article");
    const sideOne = document.createElement("div");
    sideOne.classList.add("card-side", "front");
    const posterAndPlot = document.createElement("section");
    posterAndPlot.classList.add("poster-plot");

    // create the YT trailer frame based on the url from my JSON
    const video = document.createElement("iframe");
    video.setAttribute("src", `https://www.youtube.com/embed/${film.url.split('v=')[1]}`);
    video.classList.add("card-side", "back");
    container.appendChild(video);

    const button = document.createElement("div");
    button.classList.add("button");
    button.addEventListener("click", () => {
      container.classList.toggle("flipped");
      video.classList.toggle("shown");
    });
    button.innerHTML = "<img src='https://cdn.dribbble.com/users/4155/screenshots/255603/flip.png' alt='flip icon' class='flip-icon'>";

    // fill the elements with data about the film
    const title = document.createElement("h2");
    title.innerText = filmData.Title;
    const age = document.createElement("span");
    age.innerText = filmData.Year;
    const plot = document.createElement("p");
    plot.innerText = filmData.Plot;
    const image = document.createElement("img");
    image.setAttribute("src", filmData.Poster);
    const rating = document.createElement("span");
    rating.innerText = `IMDB Rating: ${filmData.Ratings[0].Value}`

    // plop the elements into the DOM
    sideOne.appendChild(title);

    posterAndPlot.appendChild(image);
    posterAndPlot.appendChild(plot);

    sideOne.appendChild(posterAndPlot);
    sideOne.appendChild(age);
    sideOne.appendChild(rating);

    container.appendChild(sideOne);
    container.appendChild(button);

    document.querySelector(".films").appendChild(container);
    document.querySelector(".spinner").style.display = "none";
  });
});
