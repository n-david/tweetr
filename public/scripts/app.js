/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("show-tweets");
    $tweet.append($("<header><img><span>").append($("<span>")), $("<section><p>"), $("<footer><span>").append("<img>").append("<img>").append("<img>"));
    $tweet.find("header span").first().addClass("name").next().addClass("handle");
    $tweet.find("footer img").first().addClass("heart").data('liked', false).attr("src", "../images/solid-dark-grey-heart-md.png").next().attr("src", "../images/Media_player_icons-10-512.png").next().attr("src", "../images/716975-flag-512.png");
    $tweet.find("header span").first().text(tweet['user']['name']).next().text(tweet['user']['handle']);
    $tweet.find("section p").text(tweet['content']['text']);
    $tweet.find("header img").attr("src", tweet['user']['avatars']['small']);

    const $likesCounter = tweet['user']['likes'];
    if (tweet['user']['likes'] > 1) {
      $tweet.find("section").append($("<span>").addClass('likes-counter').attr("value", $likesCounter).text($likesCounter + ' likes'));
    } else if (tweet['user']['likes'] === 1) {
      $tweet.find("section").append($("<span>").addClass('likes-counter').attr("value", $likesCounter).text($likesCounter + ' like'));
    } else {
      $tweet.find("section").append($("<span>").addClass('likes-counter').attr("value", $likesCounter));
    }

    const d = new Date(0);
    d.setUTCMilliseconds(tweet['created_at']);
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const diffDays = Math.round(Math.abs(d.getTime() - today.getTime()) / (oneDay));
    $tweet.find("footer span").text(`${diffDays} days ago`);
    return $tweet;
  }

  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      $('.container .new-tweet').after(createTweetElement(tweets[i]));
    }
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then(function(tweetsJSON) {
      renderTweets(tweetsJSON);
    }).catch(function(err) {
      alert(`Failed to fetch tweets, ${err}`);
    });
  }

  function loadLatestTweet() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then(function(tweetsJSON) {
      renderTweets([tweetsJSON[tweetsJSON.length - 1]]);
    });
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    if ($(this).find('.text-area').val().length > 140) {
      alert('Please enter 140 characters or less');
      return;
    }
    if (!$data.slice(5).length) {
      alert('Cannot submit empty post');
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $data
    }).then(function() {
      $('.text-area').val('');
      $('.counter').text('140');
      $('.new-tweet').slideUp();
      loadLatestTweet();
    }).catch(function(err) {
      alert(`Failed to add tweet, ${err.statusText}`);
    });
  });

  loadTweets();
});
