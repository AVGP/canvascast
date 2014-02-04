var cast_api, cv_activity;

if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}

function receiverListener(e) {
  if( e === 'available' ) {
    console.log("Receiver available");
  }
}

var initializeCastApi = function() {
  var sessionRequest = new chrome.cast.SessionRequest("9A0FCE32");
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

document.getElementById("startCast").addEventListener("click", function() {
  chrome.cast.requestSession(function success(session) {
    session.sendMessage("urn:x-cast:remotedom", "Ohai!", function sent() {
      alert("Yay");
    }, function failed() {
      alert("Oh no, can't talk to the Chrome Cast :(");
    })
  }, function error(e) {
    alert("Oh no, it didn't work :(");
    console.log(e);
  });
}, false);
