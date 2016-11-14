(function(){
  $(document).ready(init);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsuv6QgMi5xaueBBX9U5elajaCDjBtqCI",
    authDomain: "obeo-80ee3.firebaseapp.com",
    databaseURL: "https://obeo-80ee3.firebaseio.com",
    storageBucket: "obeo-80ee3.appspot.com",
    messagingSenderId: "70930637876"
  };

  function init (){
    firebase.initializeApp(config);
    $('#searchByCity').click(searchCity);
  }

  function searchCity(){
    var place = $('.citySearch').val();
    location.assign("newtripresults.html?name="+place);
  }

})();
