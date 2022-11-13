// const API_KEY = '320e0fbf344c463793cf046bdff36de8';
const API_KEY = '156b4218b04147e690781d4aff77412c';

$( window ).on( "load", function() {
  console.log( "window loaded" );
  getRecipe('burger');
});

let equipmentPos = { top: 0, left: 0, x: 0, y: 0 };
let ingredientPos = { top: 0, left: 0, x: 0, y: 0 };

const getEquipmentWidget = id => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/equipmentWidget?apiKey=${API_KEY}`,
    success: function(res) {
      // console.log(res);
      $('#equipmentSection').html(`<h3>Equipments</h3>`);
      $('#equipmentSection').append(res);
      $('.spoonacular-ingredients-menu').remove();
      $('#spoonacular-equipment-vis-list').remove();
      $('.spoonacular-equipment').parent().removeAttr('style').attr('class', 'spoonacular-grid-item');
      $('.spoonacular-image-wrapper > img').css({
        'user-drag': 'none',
        '-webkit-user-drag': 'none',
        'user-select': 'none',
        '-moz-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none'
      });

      let noNeededDivs = document.querySelectorAll('#equipmentSection > div');
      noNeededDivs[0].remove();
      noNeededDivs[2].remove();

      const equipmentGrid = document.querySelector('#spoonacular-equipment-vis-grid');
      equipmentGrid.scrollTop = 0;
      equipmentGrid.scrollLeft = 0;

      const mouseDownHandler = function (e) {
        equipmentPos = {
            left: equipmentGrid.scrollLeft,
            top: equipmentGrid.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        equipmentGrid.addEventListener('mousemove', mouseMoveHandler);
        equipmentGrid.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        const dx = e.clientX - equipmentPos.x;
        const dy = e.clientY - equipmentPos.y;

        // Scroll the element
        equipmentGrid.scrollTop = equipmentPos.top - dy;
        equipmentGrid.scrollLeft = equipmentPos.left - dx;

        equipmentGrid.style.cursor = 'grabbing';
        equipmentGrid.style.userSelect = 'none';
      };

      const mouseUpHandler = function () {
        equipmentGrid.removeEventListener('mousemove', mouseMoveHandler);
        equipmentGrid.removeEventListener('mouseup', mouseUpHandler);

        equipmentGrid.style.cursor = 'grab';
        equipmentGrid.style.removeProperty('user-select');
      };

      equipmentGrid.addEventListener('mousedown', mouseDownHandler);
    }
  });
}

const getIngredientWidget = id => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/ingredientWidget?apiKey=${API_KEY}`,
    success: function(res) {
      // console.log(res);
      $('#ingredientSection').html(`<h3>Ingredients</h3>`);
      $('#ingredientSection').append(res);
      $('.spoonacular-ingredient').parent().removeAttr('style').attr('class', 'spoonacular-grid-item');
      $('.spoonacular-image-wrapper > img').css({
        'user-drag': 'none',
        '-webkit-user-drag': 'none',
        'user-select': 'none',
        '-moz-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none'
      });
      // $('.spoonacular-metric').remove();

      let noNeededDivs = document.querySelectorAll('#ingredientSection > div');
      noNeededDivs[0].remove();
      noNeededDivs[1].remove();
      noNeededDivs[3].remove();
      noNeededDivs[4].remove();

      const ingredientGrid = document.querySelector('#spoonacular-ingredient-vis-grid');
      ingredientGrid.scrollTop = 0;
      ingredientGrid.scrollLeft = 0;

      const mouseDownHandler = function (e) {
        ingredientPos = {
            left: ingredientGrid.scrollLeft,
            top: ingredientGrid.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        ingredientGrid.addEventListener('mousemove', mouseMoveHandler);
        ingredientGrid.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        const dx = e.clientX - ingredientPos.x;
        const dy = e.clientY - ingredientPos.y;

        // Scroll the element
        ingredientGrid.scrollTop = ingredientPos.top - dy;
        ingredientGrid.scrollLeft = ingredientPos.left - dx;

        ingredientGrid.style.cursor = 'grabbing';
        ingredientGrid.style.userSelect = 'none';
      };

      const mouseUpHandler = function () {
        ingredientGrid.removeEventListener('mousemove', mouseMoveHandler);
        ingredientGrid.removeEventListener('mouseup', mouseUpHandler);

        ingredientGrid.style.cursor = 'grab';
        ingredientGrid.style.removeProperty('user-select');
      };

      ingredientGrid.addEventListener('mousedown', mouseDownHandler);
    }
  });
}

const getTasteWidget = id => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/tasteWidget.json?apiKey=${API_KEY}`,
    success: function(res) {
      // console.log(res);
      let tasteNameArr = [];
      let tasteValueArr = [];

      $('#tasteWidget').html('');
      Object.keys(res).forEach((key, index) => {
        $('#tasteWidget').append(`
          <li>${key} - ${res[key]}</li>
        `);
        tasteNameArr.push(key);

        if (res[key] >= 100) {
          tasteValueArr.push(100);
        } else {
          tasteValueArr.push(res[key]);
        }
      });

      // console.log(tasteNameArr, tasteValueArr);

      const config={
        type:"radar",
        data:{
          labels:[...tasteNameArr],
          datasets:[{
            label:"",
            backgroundColor:"rgba(38,159,202, 0.2)",
            borderColor:"rgb(38,159,202)",
            pointBackgroundColor:"rgb(38,159,202)",
            data:[...tasteValueArr]
          }]
        },
        options:{
          animation:{duration:10},
          legend:{display:!1},
          title:{display:!1},
          scale:{
            pointLabels:{fontSize:20},
            angleLines:{display:!0},
            ticks:{
              display:!1,
              min:0,
              max:100,
              stepSize:20
            }
          }
        }
      };

      $('#tasteContainer').html('').append(`<canvas id=tasteVisualization></canvas>`)

      new Chart($('#tasteVisualization'), config);
    }
  });
}

const getNutrientWidget = id => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/nutritionLabel?apiKey=${API_KEY}`,
    success: function(res) {
      // console.log(res);
      $('#nutrientSection').html(`<h3>Nutrient Widget</h3>`);
      $('#nutrientSection').append(res);
    }
  });
}

const getSource = id => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
    success: function(res) {
      // console.log(res);

      const { steps } = res.analyzedInstructions[0];
      // let equipmentArr = [];
      // let ingredientArr = [];

      $('#recipeSteps').html('');
      steps.map(apa => {
        $('#recipeSteps').append(`
          <li>${apa.step}</li>
        `);

        // if (apa.equipment.length) {
        //   apa.equipment.map(apalagi => {
        //     if (!equipmentArr.includes(apalagi.name)) {
        //       equipmentArr.push(apalagi.name);
        //     }
        //   });
        // }

        // if (apa.ingredients.length) {
        //   apa.ingredients.map(apalagi => {
        //     if (!ingredientArr.includes(apalagi.name)) {
        //       ingredientArr.push(apalagi.name);
        //     }
        //   });
        // }
      });

      // $('#equipments').html('');
      // equipmentArr.map(equipment => {
      //   $('#equipments').append(`
      //     <li>${equipment}</li>
      //   `);
      // });

      // $('#ingredients').html('');
      // ingredientArr.map(ingredient => {
      //   $('#ingredients').append(`
      //     <li>${ingredient}</li>
      //   `);
      // });

      if (res.sourceUrl) {
        $('#sourceLink').attr('href', res.sourceUrl).css('display', 'flex');
      }

      getEquipmentWidget(res.id);
      getIngredientWidget(res.id);
      getTasteWidget(res.id);
      getNutrientWidget(res.id);
    }
  });
}

const getRecipe = q => {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&number=1&query=${q}`,
    success: function(res) {
      console.log(res);
      $('.recipe-title').html(res.results[0].title);
      $('.recipe-img > img').attr({
        'src': `${res.baseUri}${res.results[0].image}`,
        'alt': res.results[0].title
      });
      $('figcaption').html(res.results[0].title);
      $('.prep-time').html(`Prepare time : ${res.results[0].readyInMinutes} minutes`)

      // $('#foodRecipe').html(`
      //   <h2 class="recipe-title">${res.results[0].title}</h2>
      //   <figure class="recipe-img">
      //     <img src="${res.baseUri}${res.results[0].image}" alt="${res.results[0].title}">
      //     <figcaption>${res.results[0].title}</figcaption>
      //   </figure>
      //   <p class="prep-time">Prepare time : ${res.results[0].readyInMinutes} minutes</p>
      // `);
      getSource(res.results[0].id);
    }
  });
}

$('#searchBtn').click(() => {
  const searchItem = $('#searchInput').val();
  getRecipe(searchItem);
});

feather.replace()
