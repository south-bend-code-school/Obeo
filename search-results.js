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
    var place = decodeURI(location.search.split('name=')[1]);
    $('.location').append(place);
  }

  function displayResults(){
    var place = decodeURI(location.search.split('name=')[1]);

    var ref = firebase.database().ref('user/');
    ref.once('value', function(snapshot){
      var usr = snapshot.val();

      for (i in usr) {
        var city = usr[i].city;

        console.log(city);
        console.log(place);
        if (city === place){
          displayUser(i);
        }
      }
    });
  }

  function displayUser(username){
    firebase.storage().ref().child("images/" + username).getDownloadURL().then(function(url) {
      $('.suggested-contacts-list').append(
        //'<h1>' + username + '</h1>' +
        '<a class="suggested-contacts" href="userprofile.html?name=' + username + '"><img src="' + url + '"></a>'
      );
    }).catch(function(error) {
      console.log(error);
    });
  }

})();
