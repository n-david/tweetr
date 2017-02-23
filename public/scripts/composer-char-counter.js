$(document).ready(function() {
  $('.text-area').on('input', function() {
    let chars = 140 - $(this).val().length;
    $(this).closest('.container').find('.counter').text(chars);
    if (chars < 0) {
      $(this).closest('.container').find('.counter').css('color', 'red');
    } else {
      $(this).closest('.container').find('.counter').css('color', '');
    }
  });
});