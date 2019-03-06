// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "heldgehog", "hermit crab", "gerbil",
  "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {
  $("#animal-view").empty();

  var animal = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=h1r3UpbjPtncFwWwh82S3X0ODSXi9Vsn";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    for (i = 0; i < 10; i++) {
      var animalDiv = $("<div class='typeofAnimal'>");
      var rating = response.data[i].rating;
      var pOne = $("<p>").text("Rating: " + rating);
      animalDiv.append(pOne);
      var imgURL = response.data[i].images.fixed_height.url;
      console.log(imgURL)
      var image = $("<img>").attr("src", imgURL);
      animalDiv.append(image);
      $("#animal-view").append(animalDiv);

    }
  });

}

// Function for displaying animal data
function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#animal-view").empty();
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
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);
// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();
