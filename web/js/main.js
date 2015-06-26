/*jslint browser: true*/
(function ($) {
  "use strict";
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
    $('form').logMeInForm();
  });
})(jQuery);
