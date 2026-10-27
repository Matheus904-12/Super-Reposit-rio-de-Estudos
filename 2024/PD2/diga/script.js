document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      var fadeElems = document.querySelectorAll(".fade-in");
      for (var i = 0; i < fadeElems.length; i++) {
        var elem = fadeElems[i];
        if (isElementInViewport(elem)) {
          elem.style.opacity = 1;
        } else {
          elem.style.opacity = 0;
        }
      }