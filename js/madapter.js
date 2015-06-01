'use strict';

window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var RTCPeerConnection = null;
var getUserMedia = null;
var attachMediaStream = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;

var configuration = { iceServers: [{ url: "stun:stun.services.mozilla.com",username: "louis@mozilla.com", credential: "webrtcdemo" }]};
var sdpConstraints = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }};

window.createIceServer = function(url, username, password) {
    var iceServer = null;
    var urlParts = url.split(':');
    if (urlParts[0].indexOf('stun') === 0) {
      // Create iceServer with stun url.
      iceServer = {
        'url': url
      };
    } else if (urlParts[0].indexOf('turn') === 0) {
      // Chrome M28 & above uses below TURN format.
      iceServer = {
        'url': url,
        'credential': password,
        'username': username
      };
    }
    return iceServer;
  };

  // Creates an ICEServer object from multiple URLs.
  window.createIceServers = function(urls, username, password) {
    return {
      'urls': urls,
      'credential': password,
      'username': username
    };
  };


  RTCPeerConnection = function(pcConfig, pcConstraints) {
    return new window.RTCPeerConnection(pcConfig, pcConstraints);
  };


  attachMediaStream = function(videocontainer, stream) {
    var element = document.createElement('video');
      element.autoPlay = true;
    if (typeof element.srcObject !== 'undefined') { 
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      console.log('Error attaching stream to element.');
    }
    videocontainer.appendChild(element);      
  };