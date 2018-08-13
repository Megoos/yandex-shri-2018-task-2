const hamburger = document.querySelectorAll('.hamburger-menu-link');
const close = document.querySelectorAll('.close');
const menu = document.querySelectorAll('.device-menu');

close[0].onclick = function(event) {
  event.preventDefault();
  menu[0].style.display = 'none';
};

hamburger[0].onclick = function(event) {
  event.preventDefault();
  menu[0].style.display = 'block';
};

var slider = document.getElementById('temperature-range');
var output = document.getElementById('value');

slider.oninput = function() {
  output.innerHTML = this.value >= 0 ? '+' + this.value : this.value;
};
