! function ($) {

  "use strict";

  // PROGRESS STEPS CLASS DEFINITION
  // ======================
  var ProgressSteps = function (el, options) {
    this.options = options;

    // elements
    this.$el = $(el);
    this.$stepLinks = this.$el.find('[data-target-step]');
    this.$stepContent = this.$el.find('[data-step]');
    this.$stepForwardBtn = this.$el.find('[data-step-forward]');
    this.$stepBackBtn = this.$el.find('[data-step-back]');

    // error checking
    if (this.$stepLinks.length !== this.$stepContent.length) {
      console.error('Progress Steps - You must provide a [data-step] for each [data-target-step] in your markup');
      return;
    }
    if (!this.$stepForwardBtn.length) {
      console.error('Progress Steps - You must provide a "next step" button using [data-step-forward] in your markup');
      return;
    }
    if (!this.$stepBackBtn.length) {
      console.error('Progress Steps - You must provide a "previous step" button using [data-step-back] in your markup');
      return;
    }

    // private vars
    this._numSteps = this.$stepLinks.length;
    this._currentStep = parseInt(this.options.currentStep);

    // let's go
    this._init();
  };

  ProgressSteps.DEFAULTS = {
    // breakpoint: 991
    currentStep: 1
  };

  ProgressSteps.prototype._init = function () {

    var that = this;

    // initial state
    this.gotoStep(this._currentStep);

    // handle forward button
    this.$stepForwardBtn.on('click touchstart', function () {
      if (that._currentStep === that._numSteps) return;
      that._currentStep++;
      that.gotoStep(that._currentStep);
    });

    // handle back button
    this.$stepBackBtn.on('click touchstart', function () {
      if (that._currentStep === 1) return;
      that._currentStep--;
      that.gotoStep(that._currentStep);
    });

  };

  ProgressSteps.prototype.gotoStep = function (step) {

    // get targets based on step
    var targetStep = this.$stepLinks.filter('[data-target-step="' + step + '"]');
    var targetContent = this.$stepContent.filter('[data-step=' + step + ']');

    // handle step progress bar
    $.each(this.$stepLinks, function (key, val) {
      var linkStep = $(this).attr('data-target-step');
      if (linkStep > step) {
        $(this).removeClass('active');
      }
    });

    // handle step content
    $.each(this.$stepContent, function (key, val) {
      $(this).removeClass('active');
    });

    // handle active states
    targetStep.addClass('active');
    targetContent.addClass('active');

    // handle button states
    step === 1 ? this.$stepBackBtn.attr('disabled', true) : this.$stepBackBtn.attr('disabled', false);
    step === this._numSteps ? this.$stepForwardBtn.attr('disabled', true) : this.$stepForwardBtn.attr('disabled', false);
  };

  // PROGRESS STEPS PLUGIN DEFINITION
  // =======================

  $.fn.progressSteps = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.progressSteps');
      var options = $.extend({}, ProgressSteps.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) $this.data('bs.progressSteps', new ProgressSteps(this, options));
    });
  };

  $.fn.progressSteps.Constructor = ProgressSteps;


}(window.jQuery);
