/*jslint browser: true*/
(function ($) {
  "use strict";
  function LogMeInForm($form) {
    this.$form = $form;
    return this.init();
  }

  LogMeInForm.prototype.init = function init() {
    var instance = this.$form.data('LogMeInForm');
    if (!instance) {
      instance = this;
      this.$form.data('LogMeInForm', this);
    }

    this.$submit = this.$form.find('[type="submit"]');
    this.$submit.on('click.LogMeInForm', this.onSubmitClick.bind(this));
  };

  LogMeInForm.prototype.onSubmitClick = function onSubmitClick(e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: this.$form.attr('action'),
      data: this.$form.serialize(),
      dataType: 'json'
    })
      .done(this.handleSuccess.bind(this))
      .fail(this.handleFailure.bind(this));
  };

  LogMeInForm.prototype.handleSuccess = function handleSuccess(data, textStatus, jqXHR) {
    if (data.success) {
      this.$form.remove();
      $('body').append('<p>'+data.msg+'</p>');
    }
  };

  LogMeInForm.prototype.handleFailure = function handleFailure(jqXHR, textStatus, errorThrown) {
    this.$form.find('.error').remove();

    var result = JSON.parse(jqXHR.responseText);
    if (!result.success) {
      var errorLength = result.errors.length;
      for (var i = 0; i < errorLength; i++ ) {
        $('<div class="error">'+result.errors[i].msg+'</div>').insertAfter(this.$form.find('[name='+result.errors[i].param+']'));
      }
    }
  };

  // Register LogMeInForm as jQuery extension
  $.fn.logMeInForm = function() {
    new LogMeInForm(this);
    return this;
  };
})(jQuery);
