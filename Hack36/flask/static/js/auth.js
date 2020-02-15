
var firebaseConfig = {
    apiKey: "AIzaSyAX1WQeY_1wWCrFYrUW5nx1BlJA30m8gfc",
    authDomain: "smarteducation-ab403.firebaseapp.com",
    databaseURL: "https://smarteducation-ab403.firebaseio.com",
    projectId: "smarteducation-ab403",
    storageBucket: "smarteducation-ab403.appspot.com",
    messagingSenderId: "406598966748",
    appId: "1:406598966748:web:7e8e42a07d25f37b7a4319",
    measurementId: "G-0QB9SYNEJH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();




const userSignIn = function () {
    var userEmail = $('#signin-email').val();
    var userPass = $('#signin-pass').val();

    console.log(userEmail, userPass);

    console.log(firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, errorCode);

    }))
}

const userSignUp = function () {
    var userEmail = $('#signup-email').val();
    var userPass = $('#signup-pass').val();
    var userConfPass = $('#signup-conf-pass').val();

    console.log(userEmail, userPass, userConfPass);

    if (userPass == userConfPass) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);

        });
    } else {
        alert("password does not match!!!");
    }
}

const userSignOut = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        console.log(error);

    });
}

firebase.auth().onAuthStateChanged(function (user) {

    var LoginBtn = document.querySelector("#login-link");
    var SignupBtn = document.querySelector("#signup-link");
    var ProfileBtn = document.querySelector("#profile-link");
    var SignoutBtn = document.querySelector("#signout-link");
    if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;
        console.log(`user is ${email} with uid ${uid}`);
        LoginBtn.setAttribute('style',"display: none;");
        SignupBtn.setAttribute('style',"display: none;");
        ProfileBtn.setAttribute('style',"display: block;");
        SignoutBtn.setAttribute('style',"display: block;");
        $("#exampleModalCenter").modal("hide");
        $("#SignupModal").modal("hide");
    } else {
        // User is signed out.
        LoginBtn.setAttribute('style', "display: block;");
        SignupBtn.setAttribute('style', "display: block;");
        ProfileBtn.setAttribute('style', "display: none;");
        SignoutBtn.setAttribute('style', "display: none;");
        console.log("user is signed out");

    }
});




