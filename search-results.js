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
    showCity();
    displayResults();
  }

  function showCity(){
    var place = location.search.split('name=')[1];
    $('.location').append(place);
  }

  function displayResults(){
    var place = location.search.split('name=')[1];

    var ref = firebase.database().ref('user/');
    ref.once('value', function(snapshot){
      var usr = snapshot.val();

      for (i in usr) {
        var username = usr[i].firstname;
        var city = usr[i].city;

        if (city === place){
          displayUser(username, city);
        }
      }
    });
  }

  function displayUser(username, city){
    $('.suggested-contacts-list').append(
      '<h1>' + username + '</h1>' +
      '<p>' + city + '</p>'
    );
  }

})();
