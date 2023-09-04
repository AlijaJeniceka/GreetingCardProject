
var openButtons = document.querySelectorAll('.btn-primary');

openButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault(); 

    var cardTitle = button.parentNode.querySelector('.card-title').innerText;
    var cardText = button.parentNode.querySelector('.card-text').innerText;

    var overlayContent = '<h2>' + cardTitle + '</h2><p>' + cardText + '</p>';


    var overlayContentElement = document.getElementById('overlayContent');
    overlayContentElement.innerHTML = overlayContent;

    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  });
});

function confirmCall() {
  var confirmed = confirm('Are you sure you want to call?');
  if (confirmed) {
      window.location.href = 'tel:1235551234';
  }
}

var phoneNumber = document.getElementsByClassName('phone-Number');
function handlePhone(){
  confirmCall();
}

var cards = document.getElementsByClassName('card')

function handleMouseEnter() {
  this.style.transform = 'scale(1.1)';
}

function handleMouseLeave() {
  this.style.transform = 'scale(1)';
}
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('mouseenter', handleMouseEnter);
  cards[i].addEventListener('mouseleave', handleMouseLeave);
}
