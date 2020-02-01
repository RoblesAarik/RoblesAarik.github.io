console.log("Works");
$(() => {
  // Random Dish when site first starts
  const randomDish = place => {
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/random.php",
    }).then(
      data => {
        console.log(data);
        let $h3 = $("<h3>").text(data.meals["0"].strMeal);
        let $img = $(
          `<img src="${data.meals["0"].strMealThumb}" style='width: 80%;'/>`
        );
        let $p = $("<p>").text(data.meals["0"].strInstructions);
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

  // Search Bar event listener
  $("form").on("submit", () => {
    if ($("li").text().length > 0) {
      $("li").hide();
    }
    $("#featured").hide();
    event.preventDefault();

    const userInput = $('input[type="text"]').val();
    let i = 0;
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput,
    }).then(
      data => {
        console.log(data);

        for (let i = 0; i <= data.meals.length; i += 1) {
          let $li = $("<li>").text(data.meals[`${i}`].strMeal);
          let $img = $(
            `<img src="${
              data.meals[`${i}`].strMealThumb
            }" style='width: 40%;'/>`
          );
          $("ul").append($li);
          $("ul").append($img);
        }
      },

      () => {
        console.log("bad");
      }
    );
  });
});
