$( document ).ready(function(){
$('.button-collapse').sideNav({
      closeOnClick: true
    }
  );
});

  $(document).ready(function(){
      $('.parallax').parallax();
    });
   
   $(document).ready(function(){
    $('ul.tabs').tabs();
  });

     $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'tab_id');
  });

    $(document).ready(function(){
      $('.carousel').carousel();
    });

  $('.carousel.carousel-slider').carousel({fullWidth: true});

  $(document).ready(function() {
    $('select').material_select();
  });

      $( document ).ready(function() {
      $('select').not('.disabled').material_select();
    });