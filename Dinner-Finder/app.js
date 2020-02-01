console.log("Works");
$(() => {
  $("form").on("submit", () => {
    event.preventDefault();

    const userInput = $('input[type="text"]').val();

    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian",
    }).then(
      data => {
        console.log(data);
        // $("#recipe1").append(data.strMeal);
      },
      () => {
        console.log("bad");
      }
    );
  });
});
