console.log("Works");
$(() => {
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
        ).attr("id", data.meals[`0`].idMeal);
        $(place).append($h3);
        $(place).append($img);
      },

      () => {
        console.log("bad");
      }
    );
  };
  randomDish(".random1");
  randomDish(".random2");

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

  // Create modal when recipe is clicked
  const $modal = $("#modal");
  const $closeBtn = $("#close");
  const openModal = () => {
    $modal.css("display", "block");
  };
  $(".recipes").on("click", () => {
    openModal();

    $.ajax({
      url:
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +
        $(event.target).attr("id"),
    }).then(
      data => {
        console.log(data);
        modalInfo(data);
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
  };
  $closeBtn.on("click", closeModal);
});

// Modal info
const modalInfo = data => {
  let $ingredients = $(".ingredients");
  let $instructions = $("<p>");
  $instructions.addClass("instruction").text(data.meals["0"].strInstructions);
  $("#modal-text").append($instructions);
};
