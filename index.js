var cast_api, cv_activity;

var initializeApi = function() {
    console.log("Initializing API...");
    
    cast_api = new cast.Api();
    cast_api.addReceiverListener("YouTube", function(list) {
      console.log(list);
    });    
};

var launchOn = function(receiver) {
  var request = new cast.LaunchRequest("YouTube", receiver);
  request.parameters = "v=sbQhgEJuExY";
  request.description = new cast.LaunchDescription();
  request.description.text = "Funsies!";
  cast_api.launch(request, function(activity) { console.log(activity); });
};

if (window.cast && window.cast.isAvailable) {
    // Cast is known to be available
    initializeApi();
} else {
  // Wait for API to post a message to us
  window.addEventListener("message", function(event) {
    console.log("MSG", event);
    if (event.source == window && event.data && 
        event.data.source == "CastApi" &&
        event.data.event == "Hello")
      initializeApi();
  });
}
