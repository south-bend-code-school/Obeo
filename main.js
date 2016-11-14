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

  function updateData(){

    var username = location.search.split('name=')[1];

    var city = $('.city').val();
    var state_province = $('.state_province').val();
    var country = $('.country').val();
    var languages = $('.languages').val();
    var hobbies = $('.hobbies').val();
    var foods = $('.foods').val();
    var traveled = $('.traveled').val();



    // // Picture
    // var selectedFile = $('.photo').files[0];
    //
    // var file = selectedFile;
    // ref.put(file).then(function(snapshot) {
    //   console.log('You are uploading a file!');
    // });

    // // Firebase Paths
    // var path = "images/" + username + "_" + city + "_" + selectedFile.name;
    // var pathRef = storageRef.child(path)
    //
    // // Upload
    // var uploadTask = pathRef.put(selectedFile);

    firebase.database().ref('user/' + username).update({
      city: city,
      state_province: state_province,
      country: country,
      languages: languages,
      hobbies: hobbies,
      foods: foods,
      traveled: traveled
    });

    firebase.database().ref('user/traveled').once('value').then(function(snapshot){
      location.assign("userprofile.html?name="+username);
    });

  }


})();
