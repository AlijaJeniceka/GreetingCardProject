var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
      
      coll[i].addEventListener('dblclick', handleDoubleClick);
    }

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

  function handleDoubleClick(){
    alert('Double click event triggered!');
  }
