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
    loadData();
    $('.edit').click(edit);
  }

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
  }

  function loadData(){
    //var username = location.search.split('name=')[1];
    var username = findGetParameter("name") || "david";

    firebase.database().ref('user/' + username).once('value', function(snapshot){
      var user = snapshot.val();

      if (user) {
        var city = user.city;
        var country = user.country;
        var email = user.email;
        var firstname = user.firstname;
        var foods = user.foods;
        var hobbies = user.hobbies;
        var languages = user.languages;
        var state_province = user.state_province;
        var traveled = user.traveled;
  
        $('.city-info').append(city + ", " + state_province);
        $('.language-info').append(languages);
        $('.hobby-info').append(hobbies);
        $('.food-info').append(foods);
        $('.email-info').append(email);
  
        firebase.storage().ref().child("images/" + snapshot.key).getDownloadURL().then(function(url) {
          $("#profilepic").attr("src", url);
        }).catch(function(error) {
          console.log(error);
        });
      }

    });
  }

  function edit(){
    var username = location.search.split('name=')[1];

    location.assign("info.html?name="+username);
  }
})();
