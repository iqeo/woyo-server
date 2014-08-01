
$(document).foundation();

$(document).ready( function() {

  var woyo = {
    time: {
      page_in:  1000,
      page_out: 1000,
      go_slide: 1000,
      go_fade:  1000,
      go_delay: 2000
    }
  };
  
  $("body").fadeIn(woyo.time.page_in);

  $(".way .go").click( function() {
    $go_link = $(this);
    go_url = $go_link.attr("href");
    $.get( go_url, function(json) {
      if ( json.going.length > 0 ) {
        $go_link
        .siblings(".going")
        .text(json.going)
        .slideDown(woyo.time.go_slide)
        .animate({opacity: 1}, woyo.time.go_fade)
        .delay(woyo.time.go_delay)
        .queue( function(next) {
          if ( json.go == true ) {
            $("body").fadeOut(woyo.time.page_out, function() {
              window.location.reload(true);
            });
          };
          next();
        });
      } else {
        if ( json.go == true ) {
          $("body").fadeOut(woyo.time.page_out, function() {
            window.location.reload(true);
          });
        };
      };
    });
    return false;
  });

  $("a.do").click( function() {
    owner = $("#" + $(this).parent().attr("owner_element"));
    do_url = $(this).attr("href");
    $.get( do_url, function(json) {
      // todo: handle multiple texts in describe array not just a string
      if ( json.describe.length > 0 ) {
        owner
        .children(".describe-actions")
        .text(json.describe)
        .slideDown(woyo.time.go_slide)
        .animate({opacity: 1}, woyo.time.go_fade)
        .delay(woyo.time.go_delay)
        .queue( function(next) {
        if ( json.changes.length > 0 ) {
            $("body").fadeOut(woyo.time.page_out, function() {
              window.location.reload(true);
            });
          };
          next();
        });
      } else {
        if ( json.changes.length > 0 ) {
          $("body").fadeOut(woyo.time.page_out, function() {
            window.location.reload(true);
          });
        };
      };
    });
    return false;
  });

});
 