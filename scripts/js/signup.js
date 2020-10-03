var mainApp = {};

(function(){ 
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			if(!isShuEmail(user.email)){
				//delete account
				console.log("not a valid account");
				window.location.replace("index.html");
			}
		}else{
			// user if not signed in
			window.location.replace("index.html");
		}
	});
	function isShuEmail(email){
		// no need to check, it will always be an email
		var email = email.split("@"); 
		return (email[1] === "my.shu.ac.uk"); 
	}
	function signout(){
		firebase.auth().signOut().then(function() {
		console.log('Signed Out');
		}, function(error) {
		console.error('Sign Out Error', error);
		});
	}
}
)()