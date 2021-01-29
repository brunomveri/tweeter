$(document).ready(function() {
  
  const createTweetElement = function (tweetObj) {
    let $tweet =`
    
    <article>
          <header class="second-header">
            <div class="name-and-account">
              <div class="image-name">
                <img class="users-photo" src="${tweetObj.user.avatars}" alt="photo">
                <p>${tweetObj.user.name}</p>
              </div>
              <div class="user-account">
                <p>${tweetObj.user.handle}</p>
              </div>
            </div>
            <div class="tweet-body-text">
            <p>${escape(tweetObj.content.text)}</p>  
            </div>
          </header>
          <footer>
            <div class="footer-timestamp">
              <p>10 days ago</p>
            </div>
            <div class="footer-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
    
    ` 
    return $tweet;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (let element of tweets) {
      const $tweet = createTweetElement(element);
      $('.tweets-container').prepend($tweet);
    }
  };
  
  
  $("form").on("submit", function(event) {    
    
    event.preventDefault();
    
    const dataInput = $(this).serialize();
    
    const dataValue = $(this).serializeArray()["0"]["value"];
    
    if (dataValue === '' || dataValue === null) {
      $(".error-content-hidden").slideDown("slow", () => $(".error-content-hidden").attr("id", "error-shown"));
      $("#tweet-text").on("input", () => $(".error-content-hidden").slideUp());
    } else if (dataValue.length > 140) {
      $(".error-size-hidden").slideDown(() => $(".error-size-hidden").attr("id", "error-shown"));
    } else { 

      $.ajax({
        url:"/tweets", 
        method: "POST",
        data: dataInput
      })
        .then(() => {
          loadTweets();
          $("form").trigger("reset");
          $(".counter").text(140);
          console.log('New tweet has been added to the database');
        })
        .catch(err => console.log('AJAX error caught ->', err));

    }

  });

  const loadTweets = () => {
    $.ajax({ url: "/tweets", method: "GET" })
    .then(res => renderTweets(res))
    .catch(err => console.log('AJAX error caught ->', err));
  };
  
  loadTweets();
  
  $(".link-button").click(() => {
    $(".new-tweet-hidden").toggle(() => $(".new-tweet-hidden").attr("id", "#new-tweet"));
  });

});