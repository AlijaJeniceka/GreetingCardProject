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

var logo = document.getElementById('logoDiv');
function handleMouseOver(){
    this.style.backgroundColor='lightblue'
}

function handleMouseOut(){
    this.style.backgroundColor='transparent'
}

logo.addEventListener('mouseover', handleMouseOver);
logo.addEventListener('mouseout', handleMouseOut);