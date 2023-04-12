import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLhSC79LE-aZAIy_AoCU8FYUj691smB74",
  authDomain: "my-project-9c169.firebaseapp.com",
  databaseURL: "https://my-project-9c169-default-rtdb.firebaseio.com",
  projectId: "my-project-9c169",
  storageBucket: "my-project-9c169.appspot.com",
  messagingSenderId: "463442761873",
  appId: "1:463442761873:web:e13dd2dc502cab36bc4730",
  measurementId: "G-3D185L2SJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


$(window).on("hashchange", function () 
{
	if (location.hash.slice(1) == "signup")
	{
		$(".page").addClass("extend");
		$("#login").removeClass("active");
		$("#signup").addClass("active");
	} 
	else 
	{
		$(".page").removeClass("extend");
		$("#login").addClass("active");
		$("#signup").removeClass("active");
	}
});
$(window).trigger("hashchange");

function validateLoginForm()
{
	var email = document.getElementById("logEmail").value;
	var password = document.getElementById("logPassword").value;

	if (email == "" || password == "") 
	{
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

	else if (password.length < 8) 
	{
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
	else 
	{
		alert("Successfully logged in");
		return true;
	}
}
function validateSignupForm() 
{
	var mail = document.getElementById("signEmail").value;
	var name = document.getElementById("signName").value;
	var password = document.getElementById("signPassword").value;

	if (mail == "" || name == "" || password == "") 
	{
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

	else if (password.length < 8) 
	{
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
	else 
	{
		
        SignUp.addEventListener('click',(e) =>
        {
            var email = document.getElementById('signEmail').value;
            var username = document.getElementById('signName').value;
            var password = document.getElementById('signPassword').value;
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => 
            {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid),
                {
                    username: username,
                    email: email
                })
                alert('User Created');
            })
            .catch((error) =>
            {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });

        SignIn.addEventListener('click',(e) =>
        {
            var email = document.getElementById('log Email').value;
            var username = document.getElementById('logName').value;
            var password = document.getElementById('logPassword').value;
           

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
            {
                const user = userCredential.user;
                const dt = new Date();
                update(ref(database, 'users/' + user.uid),
                {
                    last_login:dt,
                })
                alert('User logged in');
            })
            .catch((error) => 
            {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        });
		
		return true;
	}
}
