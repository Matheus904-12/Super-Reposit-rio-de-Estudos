<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<h1 class="fade-in">Título da Página</h1>
<p class="fade-in">Lorem ipsum dolor sit amet...</p>
$(window).scroll(function() {
    $('.fade-in').each(function() {
      var top_of_element = $(this).offset().top;
      var bottom_of_element = top_of_element + $(this).outerHeight();
      var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      var top_of_screen = $(window).scrollTop();
  
      if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        $(this).animate({'opacity':'1'},500);
      }
      else {
        $(this).animate({'opacity':'0'},500);
      }
    });
  });
  