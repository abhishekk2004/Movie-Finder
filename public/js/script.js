$(document).ready(() => {
  $(".input-form").on("submit", (e) => {
    e.preventDefault();
    const EnteredVal = $(".input-field").val();
    getMovies(EnteredVal);
  });
});

function getMovies(EnteredVal) {
  const api_val = "608de81f8f5b5e2d52fc88f1c6ea25c2";

  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${api_val}&query=${EnteredVal}`,
  }).then((movies) => {
    let list = movies.results;
    let div = "";
    $.each(list, (index, movie) => {
      const movieImg = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      div += `
            <div class="content">
                <img src="${movieImg}" class="movieImg" />
                <br />
                <h4>${movie.title}</h4>
                <a onclick="movieSelected('${movie.id}')" href="#"> Movie Details </a> 
            </div> 
        `;
    });
    $(".movieList").html(div);
    function movieSelected(id) {
      sessionStorage.setItem("movieId", id);
      window.location = "movie.html";
      return false;
    }
  });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=608de81f8f5b5e2d52fc88f1c6ea25c2`,
  }).then((movie) => {
    console.log(movie);
    const movieImg = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    let div = `
    <div class="row-1">
      <div class="col-1">
        <img src="${movieImg}" class="thumbnail">
      </div>
      <div class="col-2">
        <h2>${movie.title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Status:</strong> ${movie.status}</li>
          <li class="list-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
          <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
          <li class="list-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>
        </ul>
      </div>
    </div>
    <div class="row-2">
      <div class="well">
        <h3>Overview</h3>
        ${movie.overview}
        <hr>
        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" style="margin-bottom: 20px">Go Back To Search</a>
      </div>
    </div>`;
    $(".movieDetails").html(div);
  });
}
