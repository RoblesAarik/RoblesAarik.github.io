console.log("Works");
$(() => {
  $("form").on("submit", () => {
    event.preventDefault();

    const userInput = $('input[type="text"]').val();

    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput,
    }).then(
      data => {
        console.log(data);
        $("#random").append(data[0]);
      },
      () => {
        console.log("bad");
      }
    );
  });
});
