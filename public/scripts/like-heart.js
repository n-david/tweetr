$(document).ready(function() {
  $('.container').on('click', '.heart', function() {
    const $currentCounter = $(this).closest('.show-tweets').find('.likes-counter');

    let $tempCounter = $currentCounter.attr('value');
    let like = ' like';
    if ($(this).data('liked') === false) {
      $tempCounter++;
      $(this).data('liked', true);
      $(this).attr('src', '../images/solid-dark-red-heart-md.png');
    } else {
      $(this).data('liked', false);
      $(this).attr('src', '../images/solid-dark-grey-heart-md.png');
    }
    $currentCounter.val($tempCounter);
    $tempCounter < 2 ? like : like = ' likes';
    $tempCounter > 0 ? $currentCounter.text($tempCounter + like) : $currentCounter.text('');

    $.ajax({
      method: 'PUT',
      url: '/tweets',
      data: {name: $(this).closest('.show-tweets').find('.name').text(), liked: $(this).data('liked')}
    }).catch(function(err) {
      alert(`Failed to update like counter, ${err.statusText}`);
    });
  });
});
