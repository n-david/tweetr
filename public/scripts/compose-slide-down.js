$(document).ready(function() {
  $('button').on('click', function() {
    $(this).closest('body').find('.new-tweet').slideToggle(250, function() {
      $(this).closest('body').find('.text-area').focus();
    });
  });
});