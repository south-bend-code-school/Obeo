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
    $('#sign-up-btn').click(saveData);
    $('#submitUserInfo').click(updateData);
  }

  function saveData(){
    var firstname = $('#firstname').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var psw = $('#psw').val();
    var retypepsw = $('#retype-psw').val();

    firebase.database().ref('user/' + username).set({
      firstname: firstname,
      email: email,
      username: username,
      psw: psw,
      retypepsw: retypepsw
    });

    firebase.database().ref('user/').once('value').then(function(snapshot){
      location.assign("info.html?name="+username);
    });

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

  function updateData(){
    var username = findGetParameter("name");

    var city = $('.city').val();
    var state_province = $('.state_province').val();
    var country = $('.country').val();
    var languages = $('.languages').val();
    var hobbies = $('.hobbies').val();
    var foods = $('.foods').val();
    var traveled = $('.traveled').val();

    // Picture Stuff
    console.log("here");
    firebase.storage().ref().child("images/"+username).put($(".photo")[0].files[0]).then(function(snapshot) {
      console.log("Worked!");
      console.log(snapshot)
    }).then(function() {
      return firebase.database().ref('user/' + username).update({
        city: city,
        state_province: state_province,
        country: country,
        languages: languages,
        hobbies: hobbies,
        foods: foods,
        traveled: traveled,
      });
    }).then(function() {
      location.assign("userprofile.html?name="+username);
    }).catch(function(error) {
      alert(error.message);
    });
  }

})();
