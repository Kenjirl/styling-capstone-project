$(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 10){
      $('header').addClass('sticky');
    }
    else{
      $('header').removeAttr('class');
    }
  });
});

const storeTheme = theme => {
  localStorage.setItem("web-theme", theme);
}

const setTheme = () => {
  const activeTheme = localStorage.getItem("web-theme");
  $('[name="theme"]').each(function(index) {
    if ($(this).attr('id') === activeTheme) {
      $(this).prop('checked', true);
    }
  });
  $(document.documentElement).addClass(activeTheme)
}

$('[name="theme"]').each(function(index) {
  $(this).click(() => {
    storeTheme($(this).attr('id'));
  });
});

$(window).on('load', () => {
  setTheme();
});
