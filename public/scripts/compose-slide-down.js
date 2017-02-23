$(document).ready(function() {
  $('button').on('click', function() {
    $(this).closest('body').find('.new-tweet').slideToggle(function() {
      $(this).closest('body').find('.text-area').focus();
    });
  });
});