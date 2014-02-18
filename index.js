function initRemoteDOM(castButton) {
  function receiverListener(e) {
    if( e === 'available' ) {
      console.log("Receiver available");
      castButton.style.display = "inline";
    }
  }
  
  function sessionListener(s) {
    console.log("Session received", s);
    window.session = s;
  }
  
  function onInitSuccess() {
    console.log("Init successful.");
  }
  
  function onError(err) {
    console.log("Init err");
    alert("Shizzle - the initialization failed :(");
    console.log(err);
    
    document.getElementById("startCast").style.backgroundColor = "red";
  }
  
  var initializeCastApi = function() {
    if (!chrome.cast || !chrome.cast.isAvailable) {
      setTimeout(this, 1000);
      return;
    }  
    
    console.log("Initialize...");
    var sessionRequest = new chrome.cast.SessionRequest("9A0FCE32");
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
      sessionListener,
      receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    console.log("Waiting for init callbacks...");
  };
  
  var remoteContainer = document.querySelector("div[data-screen=\"remote\"]");
  var observer = new MutationObserver(function() {
    if(!window.session) return;
    window.session.sendMessage("urn:x-cast:de.geekonaut.remotedom", remoteContainer.innerHTML);
  });
  observer.observe(remoteContainer, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });
  
  
  castButton.style.display = "none";
  if (!chrome.cast || !chrome.cast.isAvailable) {
    console.log("Deferred...");
    setTimeout(initializeCastApi, 1000);
  } else {
    initializeCastApi();
  }  
  
  castButton.addEventListener("click", function() {
    if(window.session) {
      //We have a session so stop it...
      window.session.stop();
      window.session = null;
      castButton.textContent = "Connect to Chromecast";
      return;
    }
    
    chrome.cast.requestSession(function success(session) {
      window.session = session;
      console.log("Session!!", session);
      session.sendMessage("urn:x-cast:de.geekonaut.remotedom", remoteContainer.innerHTML, function sent() {
        console.log("Casting...");
        castButton.textContent = "Disconnect Chromecast";
      }, function failed(e) {
        console.log(e);
        alert("Oh no, can't talk to the Chrome Cast :(");
      })
    }, function error(e) {
      alert("Oh no, it didn't work :(");
      console.log(e);
    });
  }, false);
};