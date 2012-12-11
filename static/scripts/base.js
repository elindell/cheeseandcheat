(function($) {
 $("document").ready
    (function() {
     var baseImageUrl = "/static/images/"
     //Last index must be #banner's beginning image
     , imageUrls = [baseImageUrl + "IMAG0053.jpg"
                    , baseImageUrl + "IMAG0054.jpg"
                    , baseImageUrl + "IMAG0066.jpg"
                    , baseImageUrl + "IMAG0084.jpg"
                    , baseImageUrl + "IMAG0022small.jpg"]
     , visiblePeriod = 6000
     , fadePeriod = 2000
     , banner = $("#banner1")
     , banner2 = $("#banner2");
     
     i = 0;
     
     setInterval
     (function() {
      var urlAttribute = "url('" + imageUrls[i % imageUrls.length] + "')"
      , indexIsEven = (i % 2) === 0
      , bannerToFadeOut = indexIsEven ? banner : banner2
      , bannerToFadeIn = indexIsEven ? banner2 : banner;
      
      console.log("Banner to fade out: ", bannerToFadeOut);
      console.log("Banner to fade in: ", bannerToFadeIn);
      
      bannerToFadeIn.css({backgroundImage: urlAttribute});
      bannerToFadeIn.fadeIn(fadePeriod);
      bannerToFadeOut.fadeOut(fadePeriod);
      i++;
      }, visiblePeriod);
     });
})($);