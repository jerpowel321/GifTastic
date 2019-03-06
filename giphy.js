// Initial array of animals
var animals = ["Puppy", "Elephant", "Cat", "Dinosaur", "Rabbit", "Unicorn", "Whale", "Lamb", "Bird", "Cow", "Turtle", "Horse", "Lion", "Zebra", "Bear", "Giraffe",
  "Goat", "Kangaroo", "Hippopotamus", "Teacup Pig", "Frog"];
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {
  $("#animal-view").empty();
  $("#movies-view").empty();

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=h1r3UpbjPtncFwWwh82S3X0ODSXi9Vsn";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (i = 0; i < 10; i++) {
      var animalDiv = $("<div class='typeofAnimal'>");
      var rating = response.data[i].rating;
      var title = response.data[i].title;
      var url = response.data[i].url;
      var pOne = $("<p>").text("Title: " + title);
      var pTwo = $("<p>").text("Rating: " + rating);
      var pThree = $("<a href=" + url + " target = 'blank'>").text("Click Me!");
      // <p>To go to the gif<a href="url">Click Here</a> 
      animalDiv.append(pOne);
      animalDiv.append(pTwo);
      var stillImgURL = response.data[i].images.fixed_height_still.url;
      var animateImgURL = response.data[i].images.fixed_height.url;
      var image = $("<img>").attr("src", stillImgURL).attr("data-still", stillImgURL).attr("data-animate", animateImgURL).attr("data-state", "still");
      image.addClass("gif")
      pOne.addClass("title")
      animalDiv.append(image);
      $("#animal-view").append(animalDiv);
      animalDiv.append(pThree);

    }
  });

}
var movies = ["Ratatouille", "The Lion King", "Happy Feet"]

function displayMovieInfo() {
  $("#animal-view").empty();
  $("#movie-view").empty();

  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&ap&y=&plot=short&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    $("#movies-view").empty();
    // variables
    var movieDiv = $("<div class='movie'>");
    var rating = response.Rated;
    var title = $("<h2>").text(response.Title);
    var year = $("<h4>").text(response.Year);
    var pOne = $("<p>").text("Rating: " + rating);
    var released = response.Released;
    var pTwo = $("<p>").text("Released: " + released);
    var plot = response.Plot;
    var pThree = $("<p class='leftAligned'>").text("Plot: " + plot);
    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    //append
    movieDiv.append(title);
    movieDiv.append(image);
    movieDiv.append(year)
    movieDiv.append(pOne);
    movieDiv.append(pTwo);
    movieDiv.append(pThree);
  
    
    $("#movies-view").empty();
    $("#movies-view").prepend(movieDiv);
  });

}



$(document).on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});
// Function for displaying animal data
function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#animal-buttons").empty();
  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class
    newButton.addClass("animal-btn");
    // Adding a data-attribute with a value of the movie at index i
    newButton.attr("data-name", animals[i]);
    // Providing the button's text with a value of the movie at index i
    newButton.text(animals[i]);
    // Adding the button to the HTML
    $("#animal-buttons").append(newButton);
  }
}

function renderMovieButtons() {
  $("#movie-buttons").empty();
  for (var i = 0; i < movies.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("movie-btn");
    newButton.attr("data-name", movies[i]);
    newButton.text(movies[i]);
    $("#movie-buttons").append(newButton);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The movie from the textbox is then added to our array
  animals.push(animal);

  // calling renderButtons which handles the processing of our animal array
  renderButtons();
  $("#animal-input").val("")
});

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  movies.push(movie);
  renderMovieButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);
$(document).on("click", ".movie-btn", displayMovieInfo);
// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();
renderMovieButtons();
