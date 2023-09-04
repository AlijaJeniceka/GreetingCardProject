document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('greetingForm').addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      var fullName = document.getElementById('fullName').value;
      var email = document.getElementById('email').value;
      var recipientFullName = document.getElementById('recipientFullName').value;
      var recipientAddress = document.getElementById('recipientAddress').value;
      var recipientEmail = document.getElementById('recipientEmail').value;
      var message = document.getElementById('message').value;
      var inPaper = document.querySelector('input[name="inPaper"]:checked');
      var select = document.getElementById('select').value;
      var sendingTimeNow = document.getElementById('now').checked;
      var sendingTimeLater = document.getElementById('later').checked;
      var dob = document.getElementById('dob').value;

      var recipient = {
        recipientFullName: recipientFullName,
        recipientEmail: recipientEmail,
        message: message
      };
  
      if (!fullName || !email || !recipientFullName || !recipientAddress || !recipientEmail || !message || !inPaper || !select) {
        alert('Please fill all the required fields.'); 
        return; 
      }
  
      if (sendingTimeLater && !dob) {
        alert('Please provide a date for the recipient to receive the card.'); 
        return; 
      }
  
      if (sendingTimeNow && sendingTimeLater) {
        alert('Please select only one option for sending time.'); 
        return; 
      }

      alert('Form submitted successfully.'); 

      var subject = 'Greetings card';
      var body = 'Hello, ' + name + '! Thank you for submitting the form. We are glad that you are using our service to send the greeting: '
       + recipient.message;

      var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;
  
      document.getElementById('greetingForm').reset();
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
