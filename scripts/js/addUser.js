

function addUser(){
	// you
	function allDataIsEntered(){
		var allData = true;

		if(document.getElementById("age").value < 18) allData = false;
		if(document.querySelector('input[name = "gender"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "wd1"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "wd2"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "wd3"]:checked') == null) allData = false;

		if(document.getElementById("theirage").value < 18) allData = false;
		if(document.querySelector('input[name = "gnderwnt"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "twd1"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "twd2"]:checked') == null) allData = false;
		if(document.querySelector('input[name = "twd3"]:checked') == null) allData = false;

		if((document.getElementById("contact").value == "")) allData = false;
		return allData;
	}
	function enterDataIntoDatabase(){
		var age = document.getElementById("age").value;
		var gender = document.querySelector('input[name = "gender"]:checked').value;
		var firstOption = document.querySelector('input[name = "wd1"]:checked').value;
		var secondOption = document.querySelector('input[name = "wd2"]:checked').value;
		var thirdOption = document.querySelector('input[name = "wd3"]:checked').value; 
		var contact = document.getElementById("contact").value;

		// them
		var theirage = document.getElementById("theirage").value;
		var theirGender = document.querySelector('input[name = "gnderwnt"]:checked').value;
		var theirFirstOption = document.querySelector('input[name = "twd1"]:checked').value;
		var theirSecondOption = document.querySelector('input[name = "twd2"]:checked').value;
		var theirThirdOption = document.querySelector('input[name = "twd3"]:checked').value;

		var firebaseRef = firebase.database().ref();
		var user = firebase.auth().currentUser; 
		var email = user.email.split("@");

		var userID = email[0]; 

		firebaseRef.child("users").child(userID).child("name").set(user.displayName);
		firebaseRef.child("users").child(userID).child("age").set(age);
		firebaseRef.child("users").child(userID).child("gender").set(gender);
		firebaseRef.child("users").child(userID).child("option1").set(firstOption);
		firebaseRef.child("users").child(userID).child("option2").set(secondOption);
		firebaseRef.child("users").child(userID).child("option3").set(thirdOption);
		firebaseRef.child("users").child(userID).child("contact").set(contact);

		firebaseRef.child("users").child(userID).child("needs").child("age").set(theirage);
		firebaseRef.child("users").child(userID).child("needs").child("gender").set(theirGender);
		firebaseRef.child("users").child(userID).child("needs").child("option1").set(theirFirstOption);
		firebaseRef.child("users").child(userID).child("needs").child("option2").set(theirSecondOption);
		firebaseRef.child("users").child(userID).child("needs").child("option3").set(theirThirdOption);
		
	}
	function acceptedTermsndCond(){
		return (((document.getElementById("termsandcond").checked)));
	}

	function addRandomData(){
		var genderAr = ["Male","Female", "Eithers"]; 
		var optionAr = ["NEVER","ALWAYS","SOMETIMES"];
		var i;
		var firebaseRef = firebase.database().ref();
		var age = 17; 
		var agee = 19; 
		for(i = 0; i < 2; i++){
			
			var age = (age <= 29) ? age + 1 : 18; 
			var gender = genderAr[i % 3];
			var firstOption = optionAr[Math.floor(Math.random() * Math.floor(3))];
			var secondOption = optionAr[Math.floor(Math.random() * Math.floor(3))];
			var thirdOption = optionAr[Math.floor(Math.random() * Math.floor(3))];
			var contact = "CONTACT "+ i;

			// them
			var agee = (agee <= 29) ? agee + 1 : 18; 
			var theirGender = genderAr[i % 3];
			var theirFirstOption = optionAr[Math.floor(Math.random() * Math.floor(3))];
			var theirSecondOption = optionAr[Math.floor(Math.random() * Math.floor(3))];
			var theirThirdOption = optionAr[Math.floor(Math.random() * Math.floor(3))];

			var max = 9;

			var n1 = Math.floor(Math.random() * Math.floor(max));
			var n2 = Math.floor(Math.random() * Math.floor(max));
			var n3 = Math.floor(Math.random() * Math.floor(max));
			var n4 = Math.floor(Math.random() * Math.floor(max));
			var n5 = Math.floor(Math.random() * Math.floor(max));
			var n6 = Math.floor(Math.random() * Math.floor(max));
			var n7 = Math.floor(Math.random() * Math.floor(max));
			
			var userID = 'b' + n1 + n2 + n3 + n4 + n5 + n6 +n7; 

			firebaseRef.child("users").child(userID).child("name").set("user "+ i);
			firebaseRef.child("users").child(userID).child("age").set(age);
			firebaseRef.child("users").child(userID).child("gender").set(gender);
			firebaseRef.child("users").child(userID).child("option1").set(firstOption);
			firebaseRef.child("users").child(userID).child("option2").set(secondOption);
			firebaseRef.child("users").child(userID).child("option3").set(thirdOption);
			firebaseRef.child("users").child(userID).child("contact").set(contact);

			firebaseRef.child("users").child(userID).child("needs").child("age").set(agee);
			firebaseRef.child("users").child(userID).child("needs").child("gender").set(theirGender);
			firebaseRef.child("users").child(userID).child("needs").child("option1").set(theirFirstOption);
			firebaseRef.child("users").child(userID).child("needs").child("option2").set(theirSecondOption);
			firebaseRef.child("users").child(userID).child("needs").child("option3").set(theirThirdOption);
			console.log("added " + i);
		}
		
	}

	if(allDataIsEntered()){
		if(acceptedTermsndCond()){
			enterDataIntoDatabase();

			setPage("panel");
			// addRandomData(); 
		}else{

		}
	}else{

	}

}