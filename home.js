var token = ``
if ('token' in localStorage) {
  token = localStorage.getItem('token')
}


let options = {
  method: "GET",
  headers: {
    Authorization: 'Token ' + token,
    'Content-type': 'application/json; charset=UTF-8'
  },




}
fetch(`http://127.0.0.1:8000/api/v1/movies/`, options).
  then(response => response.json())
  .then(data => populateMovies(data))



function populateMovies(movies) {
  let htmlData = ``
  movies.forEach(movie => {
    htmlData += `
        <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${movie.movie_image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${movie.movie_name}</h5>
        <h5 class="card-title">${movie.movie_year}</h5>
        <h5 class="card-title">${movie.movie_director}</h5>
        <h5 class="card-title">Rating : ${movie.average_rating} </h5>

        <h5 class="card-title"> Reviews: ${movie.content_count}</h5>


        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>

        <button class="btn btn-info"name="${movie.id}"onclick="cinimaDetails(event)">view</button>
        <button class="btn btn-danger"name="${movie.id}" onclick="displayReviewModalBox(event)">Add review</button>


      </div>
    </div>
  </div>
</div>
        </div>

        
        `

  })

  id_movies.innerHTML = htmlData
}



function cinimaDetails(event){
  console.log(event.target.name);
  let movieId=event.target.name;
  fetch(`http://127.0.0.1:8000/api/v1/movies/${movieId}/`,options).
    then(res => res.json()).
    then(data => movieDisplay(data))



}
function movieDisplay(movie) {
  var myModal = new bootstrap.Modal(document.getElementById("mymodal"), {});
  document.onreadystatechange = function () {
    myModal.show();
  };

  console.log(movie);
  let modelDiv = document.createElement('div')
  modelDiv.innerHTML = `
        
       
      
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${movie.movie_name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="card" style="width: 18rem;">
            <img src="${movie.movie_image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${movie.movie_year}</h5>
              <h5 class="card-title">${movie.movie_description}</h5>
              <h5 class="card-title">${movie.movie_director}</h5>

              <p class="card-text"></p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
      
            
        
        
        `
  document.body.append(modelDiv)
  var model = new bootstrap.Modal(modelDiv.querySelector("#exampleModal"))
  model.show()

}

function displayReviewModalBox(event){
  let movieId=event.target.name;

  console.log("movieId");
  fetch(`http://127.0.0.1:8000/api/v1/movies/${movieId}/`,options).
  then(res => res.json()).
  then(data => movieDisplay(data))


  let modelDiv = document.createElement('div')
  modelDiv.innerHTML = `
        
       
  <!-- Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        
       
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Review</label>
          <input type="text" class="form-control" id="id_content" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Rating</label>
          <input type="text" class="form-control" id="id_rating" placeholder="out of 5">
        </div>
        <div class="mb-3 form-check">
        </div>
        <button class="btn btn-danger" name="${movieId}" onclick="submitReview(event)">Add review</button>

     
      </div>
    </div>
  </div>
     
        `
  document.body.append(modelDiv)
  var model = new bootstrap.Modal(modelDiv.querySelector("#editModal"))
  model.show()

}
function submitReview(event) {
  let movieId=event.target.name;
  console.log(movieId);

  let content = id_content.value
  let rating = id_rating.value
  let data = {
      "content": content,
      "rating": rating
  }

  options = {
      method: "POST",
      headers: {    
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Token '+token},
      body: JSON.stringify(data)

  }

  fetch(`http://127.0.0.1:8000/api/v1/movies/${movieId}/add_review/`,options).
      then(res => res.json()).
      then(data=>{
        console.log(data);
     let box=new bootstrap.Modal(document.querySelector("#editModal"))
     box.hide()
    document.querySelector("#msg_box").innerHTML="review has been posted"})
      
  
}
function logout(){
  if ("token" in localStorage){
    localStorage.removeItem("token")
    window.location.href="index.html"
  }
}







