(function() {
	

	//override RTCPeerConnection as per browser 
	window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


    var configuration = { iceServers: [{ url: "stun:stun.services.mozilla.com",username: "louis@mozilla.com", credential: "webrtcdemo" }]};
    
    var localVideo = document.querySelector('video');

    var sdpConstraints = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }};

	window.MRTCconnection = function(){
		
		var connection = this;

		function gotLocalStream(stream){
			attachMediaStream(localVideo, stream);
  			localStream = stream;
		}

		//create the peer connections
		connection.start = function(){
			var constraints = { 
				audio: true, 
				video: true 
			};
			navigator.getUserMedia(constraints, gotLocalStream, errorCallback);
		};




		function errorCallback(error) {
		  console.log('navigator.getUserMedia error: ', error);
		}

		function successCallback(stream) {
		  window.stream = stream; // stream available to console
		  if (window.URL) {
		    video.src = window.URL.createObjectURL(stream);
		  } else {
		    video.src = stream;
		  }
		}




		function error(err) { endCall(); };
	};

})();