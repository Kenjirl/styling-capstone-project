$(window).on('load', () => {
  setTheme();
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

$('.nav-sub-item').each(function(index) {
  $(this).click(() => {
    $('nav#mobile').removeClass('open');
    $('#dropdown-item-container').removeClass('open');
  });
});

$('.mobile-nav-toggle').each(function(index) {
  $(this).click(() => {
    $('nav#mobile').toggleClass('open');
  })
});

$('#dropdown-toggle').click(() => {
  $('#dropdown-item-container').toggleClass('open');
});

feather.replace();
