$(document).ready(function() {
  // This function counts the numver of characters in the text area,  
  // changes the counter's color to red and shows error message when the coun goes over 140
  let count = 140;
  let counter = $('.counter');
  
  $("#tweet-text").on('input', function() {
    const char = $(this).val().length;
    counter.html(count - char);
    
    count < char ? counter.css('color', 'red') : counter.css('color', '#545149');

    if (count  >= char) {
      $(".error-size-hidden").slideUp();
    } 

  });
 
});

