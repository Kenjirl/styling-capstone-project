// const API_KEY = '320e0fbf344c463793cf046bdff36de8';
const API_KEY = '156b4218b04147e690781d4aff77412c';

const getManyRecipes = q => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&number=12&query=${q}`,
    success: function(res) {
      console.log(res);
      const { baseUri, results } = res;
      console.log(results);

      $('#recipesList').html('');

      Object.keys(results).forEach((key, index) => {
        console.log(key, results[key]);
        $('#recipesList').append(`
        <div class='recipe-container'>
          <img src='${baseUri}${results[index].image}' alt='${results[index].title}'>
          <h3>${results[index].title}</h3>
          <a href='#' class='to-detail-btn'>Try this Recipe</a>
        </div>
        `);
      });
    }
  })
}

$('#searchForm').submit( event => {
  event.preventDefault();

  const searchRecipe = $('#recipe').val();

  getManyRecipes(searchRecipe);
});

$( window ).on( "load", function() {
  console.log( "window loaded" );
  getManyRecipes('salad');
});

feather.replace()
