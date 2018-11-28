;(function($) {
   $.fn.fixMe = function() {
      return this.each(function() {
         var $this = $(this),
            $t_fixed;
         function init() {
            // $this.wrap('<div class="container" />');
            $t_fixed = $this;
            // $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
            resizeFixed();
         }
         function resizeFixed() {
            $t_fixed.find("th").each(function(index) {
              console.log('Hello ' + index);
              var $parent =  $(this).parents('table');
              var $targetTr = $parent.find("tbody").find("tr").eq(0);
              var $targetTd = $targetTr.find("td").eq(index);
              var targetWidth = $targetTd.outerWidth()+"px";

              $targetTr.css('background','red');
              $targetTd.css('background','pink');

              console.log('index: ',index);
              console.log('targetWidth: ',targetWidth);
              // console.log('parent: ',parent);
              $(this).find('.th-label').css("width",targetWidth);

            });
         }
         function scrollFixed() {
            var offset = $(this).scrollTop(),
            tableOffsetTop = $this.offset().top,
            tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
            if(offset < tableOffsetTop || offset > tableOffsetBottom)
               $t_fixed.hide();
            else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
               $t_fixed.show();
         }
         $(window).resize(resizeFixed);
         // $(window).scroll(scrollFixed);
         init();
      });
   };
})(jQuery);

$(document).ready(function(){
  console.log('Hello');
   // $("table").fixMe();
   $(".up").click(function() {
      $('html, body').animate({
      scrollTop: 0
   }, 2000);
 });
});
