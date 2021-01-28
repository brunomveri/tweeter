/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

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
      // $('.tweets-container').append($tweet);
      $('.tweets-container').prepend($tweet);  // or .prepend()    !!!!!
    }
  };
  
  // renderTweets(data);

  
  $("form").on("submit", function(event) {    
    event.preventDefault();
    
    const dataInput = $(this).serialize();
    
    const dataValue = $(this).serializeArray()["0"]["value"];
    
    if (dataValue === '' || dataValue === null) {
      alert('Your content is not present');
    } else if (dataValue.length > 140) {
      alert('Your content is too long');
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

  // loadTweets();

});