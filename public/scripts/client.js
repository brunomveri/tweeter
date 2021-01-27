/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
              <p>${tweetObj.content.text}</p>
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

  const renderTweets = function(tweets) {
    for (let element of tweets) {
      const $tweet = createTweetElement(element);
      // $('.tweets-container').append($tweet);
      $('.tweets-container').prepend($tweet);  // or .prepend()    !!!!!
    }
  };
  
  renderTweets(data);


  $("form").on("submit", function(event) {
    
    event.preventDefault();
    
    const dataInput = $(this).serialize();

    $.ajax({
      url:"/tweets", 
      method: "POST",
      data: dataInput
    })
      .then(() => console.log('ajax callback called'))
      .catch(err => {
        console.log('ajax error caught');
        console.log(err);
      });
  });


});