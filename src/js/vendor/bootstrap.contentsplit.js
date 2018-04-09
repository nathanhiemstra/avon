// ContentSplit uses data attributes to define various content, then moves that
// content around based on screen size. It's ideally suited for splitting up
// a sidebar with some content that sits on top of buttons. On a large screen,
// a normal sidebar column will be displayed and on small screens, the buttons
// will get pulled out and placed into a sticky footer while the upper content
// will display above the main page content. Essentially turning a two-column
// layout into a single column (with sticky buttons) for mobile

! function ( $ ) {

  "use strict";

  // CONTENTSPLIT CLASS DEFINITION
  // ======================
  var ContentSplit = function ( el, options ) {
    this.options = options;
    this.$el = $( el );
    this.$els = {};

    // main content area for mobile
    this.$els.splitContainerMobile = this.$el.find('[data-split-content-container="mobile"]');

    // main content area for desktop
    this.$els.splitContainerDesktop = this.$el.find('[data-split-content-container="desktop"]');

    // bottom content area - mobile only
    this.$els.splitContainerBottom = this.$el.find('[data-split-content-container="bottom"]');

    // the actual button content that will be moved
    this.$els.splitContainerButtons = this.$el.find('[data-split-content-chunk="buttons"]');

    // the actual main content that will be moved
    this.$els.splitContainerContent = this.$el.find('[data-split-content-chunk="content"]');


    // error checking
    $.each(this.$els, function(i, val) {
      if(val.length < 1) {
        console.error('The ContentSplit plugin requires a DOM elelent with the following data attribute: ' + val.selector + ' - This element should be placed within the outer [data-split-content] element.');
      }
    });

    var that = this;
    $(window).resize(function () {
      console.log('resize');
      that._calculateAndApplyBottomPadding();
      that._checkWidthAndMoveContent();
    });

    this._checkWidthAndMoveContent();

  };

  ContentSplit.DEFAULTS = {
    breakpoint: 991
  };

  ContentSplit.prototype._calculateAndApplyBottomPadding = function() {
    // console.log(this.$els.splitContainerBottom.outerHeight());
    var footerHeight = this.$els.splitContainerBottom.outerHeight();
    $('body').css('padding-bottom', footerHeight);
  };
  ContentSplit.prototype._checkWidthAndMoveContent = function() {
    if($(window).width() > this.options.breakpoint) {
        // desktop view
        this.$els.splitContainerBottom.addClass('invisible');

        // move summary block to sidebar
        this.$els.splitContainerContent.detach().appendTo(this.$els.splitContainerDesktop);

        // move 'checkout' & 'refresh' buttons to sidebar summary
        this.$els.splitContainerButtons.detach().appendTo(this.$els.splitContainerDesktop);
        this.$els.splitContainerBottom.addClass('invisible');
      } else {
        // mobile view
        this.$els.splitContainerBottom.removeClass('invisible');

        // move summary block to top of page
        this.$els.splitContainerContent.detach().appendTo(this.$els.splitContainerMobile);

        // move 'checkout' & 'refresh' buttons to fixed bottom nav
        this.$els.splitContainerButtons.detach().appendTo(this.$els.splitContainerBottom);
        this.$els.splitContainerBottom.removeClass('invisible');
      }

      this._calculateAndApplyBottomPadding();
  };

  // CONTENT SPLIT PLUGIN DEFINITION
  // =======================

  $.fn.contentSplit = function ( option ) {
    return this.each( function () {
      var $this = $( this );
      var data = $this.data( 'bs.contentsplit' );
      var options = $.extend( {}, ContentSplit.DEFAULTS, $this.data(), typeof option === 'object' && option );

      if( !data ) $this.data( 'bs.contentsplit', new ContentSplit( this, options ) );
    } );
  };

  $.fn.contentSplit.Constructor = ContentSplit;


}( window.jQuery );
