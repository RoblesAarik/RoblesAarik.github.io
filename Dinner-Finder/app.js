console.log("Works");
$(() => {
  // Create modal when recipe is clicked
  const $modal = $("#modal");
  const $closeBtn = $("#close");
  const openModal = () => {
    $modal.css("display", "block");
  };
  $(".recipes").on("click", () => {
    openModal();
    event.preventDefault();

    $.ajax({
      url:
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +
        $(event.target).attr("id"),
    }).then(
      data => {
        console.log(data);
        recipeInstructions(data);
        recipeIngredients(data);
      },
      () => {
        console.log("bad");
      }
    );
  });

  // close modal
  const closeModal = () => {
    $modal.css("display", "none");
    $(".instruction").text("");
    $("h4").hide();
    $("ul").hide();
  };
  $closeBtn.on("click", closeModal);
});

// Recipe Instructions
const recipeInstructions = data => {
  let $instructions = $("<p>");
  let $h4 = $("<h4>").text("Instructions");
  $instructions.addClass("instruction").text(data.meals["0"].strInstructions);
  $("#modal-text").prepend($instructions);
  $("#modal-text").prepend($h4);
};

// Recipe Ingredients
// find better way to access each object
const recipeIngredients = data => {
  let $h4 = $("<h4>").text("Ingredients");
  let $ul = $("<ul>").addClass("ingredients");
  $("#modal-text").prepend($ul);
  $("#modal-text").prepend($h4);
  let $li = $("<li>").text(data.meals["0"].strIngredient1);
  let $li1 = $("<li>").text(data.meals["0"].strIngredient2);
  let $li2 = $("<li>").text(data.meals["0"].strIngredient3);
  let $li3 = $("<li>").text(data.meals["0"].strIngredient4);
  let $li4 = $("<li>").text(data.meals["0"].strIngredient5);
  let $li5 = $("<li>").text(data.meals["0"].strIngredient6);
  let $li6 = $("<li>").text(data.meals["0"].strIngredient7);
  let $li7 = $("<li>").text(data.meals["0"].strIngredient8);
  let $li8 = $("<li>").text(data.meals["0"].strIngredient9);
  let $li9 = $("<li>").text(data.meals["0"].strIngredient10);
  let $li10 = $("<li>").text(data.meals["0"].strIngredient11);
  let $li11 = $("<li>").text(data.meals["0"].strIngredient12);
  let $li12 = $("<li>").text(data.meals["0"].strIngredient13);
  let $li13 = $("<li>").text(data.meals["0"].strIngredient14);
  let $li14 = $("<li>").text(data.meals["0"].strIngredient15);
  let $li15 = $("<li>").text(data.meals["0"].strIngredient16);
  let $li16 = $("<li>").text(data.meals["0"].strIngredient17);
  let $li17 = $("<li>").text(data.meals["0"].strIngredient18);
  let $li18 = $("<li>").text(data.meals["0"].strIngredient19);
  let $li19 = $("<li>").text(data.meals["0"].strIngredient20);
  $(".ingredients").append($li1);
  $(".ingredients").append($li2);
  $(".ingredients").append($li3);
  $(".ingredients").append($li4);
  $(".ingredients").append($li5);
  $(".ingredients").append($li6);
  $(".ingredients").append($li7);
  $(".ingredients").append($li8);
  $(".ingredients").append($li9);
  $(".ingredients").append($li10);
  $(".ingredients").append($li11);
  $(".ingredients").append($li12);
  $(".ingredients").append($li13);
  $(".ingredients").append($li14);
  $(".ingredients").append($li15);
  $(".ingredients").append($li16);
  $(".ingredients").append($li17);
  $(".ingredients").append($li18);
  $(".ingredients").append($li19);
  $("li").css("list-style", "none");
};
// Random Dish when site first starts
const randomDish = place => {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/random.php",
  }).then(
    data => {
      console.log(data);
      let $h3 = $("<h3>")
        .text(data.meals["0"].strMeal)
        .attr("id", data.meals[`0`].idMeal);
      let $img = $(
        `<img src="${data.meals["0"].strMealThumb}" style='width: 80%;'/>`
      )
        .attr("id", data.meals[`0`].idMeal)
        .addClass("listPic");
      $(place).append($h3);
      $(place).append($img);
    },

    () => {
      console.log("bad");
    }
  );
};
randomDish("#random1");
randomDish("#random2");

// hides the Current list of recipes
const hideCurrentList = () => {
  if ($(".recipes").text().length > 0) {
    $(".dish").hide();
    $(".listPic").hide();
  }
};

// Creates list of recipes
const createList = data => {
  for (let i = 1; i <= data.meals.length; i += 1) {
    let $div = $("<div>")
      .text(data.meals[`${i}`].strMeal)
      .attr("id", data.meals[`${i}`].idMeal)
      .addClass("dish");
    let $img = $(
      `<img src="${data.meals[`${i}`].strMealThumb}" style='width: 40%;'/>`
    )
      .addClass("listPic")
      .attr("id", data.meals[`${i}`].idMeal);
    $(".recipes").append($div);
    $(".recipes").append($img);
  }
};

// Search Bar event listener
$("form").on("submit", () => {
  hideCurrentList();
  $("#featured").hide();
  event.preventDefault();

  const userInput = $('input[type="text"]').val();
  let i = 0;
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput,
  }).then(
    data => {
      console.log(data);
      createList(data);
    },

    () => {
      console.log("bad");
    }
  );
});

// Click event listener for country buttons
$(".country").on("click", () => {
  hideCurrentList();
  $("#featured").hide();
  event.preventDefault();
  $.ajax({
    url:
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" +
      $(event.target).text(),
  }).then(
    data => {
      console.log(data);
      createList(data);
    },

    () => {
      console.log("bad");
    }
  );
});
