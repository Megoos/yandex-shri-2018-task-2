//hamburger menu
$(function(){
  $('.hamburger-menu-link').on('click', function(e){
   e.preventDefault()
    $('.device-menu').fadeIn();
  });

  $('.close').on('click', function(e){
   e.preventDefault()
    $('.device-menu').fadeOut();
  })
});