$(document).ready(function() {
  function bubbleIframeMouseMove(iframe){
      // Save any previous onmousemove handler
      var existingOnMouseMove = iframe.contentWindow.onmousemove;

      // Attach a new onmousemove listener
      iframe.contentWindow.onmousemove = function(e){
          // Fire any existing onmousemove listener
          if(existingOnMouseMove) existingOnMouseMove(e);

          // Create a new event for the this window
          var evt = document.createEvent("MouseEvents");

          // We'll need this to offset the mouse move appropriately
          var boundingClientRect = iframe.getBoundingClientRect();

          // Initialize the event, copying exiting event values
          // for the most part
          evt.initMouseEvent(
              "mousemove",
              true, // bubbles
              false, // not cancelable
              window,
              e.detail,
              e.screenX,
              e.screenY,
              e.clientX + boundingClientRect.left,
              e.clientY + boundingClientRect.top,
              e.ctrlKey,
              e.altKey,
              e.shiftKey,
              e.metaKey,
              e.button,
              null // no related element
          );

          // Dispatch the mousemove event on the iframe element
          iframe.dispatchEvent(evt);
      };
  }

  //Following Eyes
  var DrawEye = function(eyecontainer, eyepupil, speed, interval){

    var limitX = $(eyecontainer).width() - $(eyepupil).width(),
        limitY = $(eyecontainer).height() - $(eyepupil).height(),
        offset = $(eyecontainer).offset();

    var mouseX = 0, mouseY = limitY, xp = 0, yp = 0;

    $(window).mousemove(function(e){
      mouseX = Math.min(e.pageX - offset.left, limitX);
      mouseY = Math.min(e.pageY - offset.top, limitY);
      if (mouseX < 0) mouseX = 0;
      if (mouseY < 0) mouseY = 0;
    });

    var follower = $(eyepupil);
    var loop = setInterval(function(){
      xp += (mouseX - xp) / speed;
      yp += (mouseY - yp) / speed;
      follower.css({left:xp, top:yp});
    }, interval);
  };

 //create eyes
  var eye1 = new DrawEye("#left-eye",  "#left-pupil", 8, 30);
  var eye2 = new DrawEye("#right-eye", "#right-pupil", 8, 30);


  twttr.ready(function(e) {
    twttr.widgets.createTimeline({
      sourceType: 'list',
      ownerScreenName: 'VRTweets1',
      slug: 'virtual-reality'
    }, document.getElementById('twitter-widget'), {
      chrome: "noheader"
    }).then(function() {
      bubbleIframeMouseMove($("iframe")[0]);
    });
  });
});
