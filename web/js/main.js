'use strict';

(function ($) {
  function handleSuccess(data, textStatus, jqXHR) {
    if (data.success) {
      $('#submission-form').remove();
      $('body').append('<p>'+data.msg+'</p>');
    }
  }

  function handleFailure(jqXHR, textStatus, errorThrown) {
    $('.error').remove();

    var result = JSON.parse(jqXHR.responseText);
    if (!result.success) {
      var errorLength = result.errors.length;
      for (var i = 0; i < errorLength; i++ ) {
        $('<div class="error">'+result.errors[i].msg+'</div>').insertAfter('[name='+result.errors[i].param+']');
        console.log( $('['+result.errors[i].param+']') );
      }
    }
  }

  $(function() {
    // Create datepicker on the birthdate field
    $('[name=birthday]').datepicker({ maxDate: "-18Y" });

    // Create autocomplete on the occupation field
    var occupationField = $('[name=occupation]');
    occupationField.autocomplete({
      minLength: 0,
      source: function( request, response ) {
        $.ajax({
          url: 'http://localhost:8888/v1/occupation/'+request.term,
          dataType: "json",
          success: function( data ) {
            response( data );
          }
        });
      }
    }).focus(function() {
      $(this).autocomplete('search', $(this).val());
    });

    // Submit form via AJAX
    var form = $('#submission-form');
    form.submit(function(e){
      e.preventDefault();

      $
        .ajax({
          type: 'post',
          url: form.attr('action'),
          data: form.serialize(),
          dataType: 'json'
        })
        .done(handleSuccess)
        .fail(handleFailure);
    });
  });
})(jQuery);
