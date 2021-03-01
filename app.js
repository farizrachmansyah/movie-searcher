$('.search__cta').on('click', function () {
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=1dba4b8e&s=${$('.input__keyword').val()}`,

    success: res => {
      const movies = res.Search;
      let cards = '';

      movies.forEach(m => {
        cards += createCards(m);
      });

      $('.cards__container').html(cards);

      // Details button
      $('.details__cta').on('click', function () {
        $.ajax({
          url: `http://www.omdbapi.com/?apikey=1dba4b8e&i=${$(this).data('imdbid')}`,

          success: res => {
            const movieDetails = createDetails(res);

            $('.modal-body').html(movieDetails);
          },

          error: e => {
            console.log(e.responseText);
          }
        })
      });
    },

    error: e => {
      console.log(e.responseText);
    }
  })
});


function createCards(m) {
  return `
    <div class="col-md-3 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary details__cta" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${m.imdbID}">
            Details
          </a>
        </div>
      </div>
    </div>
  `;
}

function createDetails(res) {
  return `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${res.Poster}" class="img-fluid" />
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item">
              <h4>${res.Title} ${res.Year}</h4>
            </li>
            <li class="list-group-item">
              <strong>Director: <strong>${res.Director}</strong></strong>
            </li>
            <li class="list-group-item">
              <strong>Actors: ${res.Actors}</strong>
            </li>
            <li class="list-group-item">
              <strong>Writer: ${res.Writer}</strong>
            </li>
            <li class="list-group-item">
              <strong>Plot:</strong>
              <br />
              ${res.Plot}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}