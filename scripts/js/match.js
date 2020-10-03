var Matches = {};
var allUsers = {};
function Match() {
	var db = firebase.database();
	var ref1 = db.ref("users");
	var va = false; 
	ref1.on("value", (snapshot) => {
	  	snapshot.forEach((childSnapshot)=> {
    		childSnapshot.forEach((childChildSnapshot)=> {
    			allUsers[childSnapshot.key] = {}; 
    			childSnapshot.forEach((tempSnapShot)=> {
    				if(tempSnapShot.key == "needs"){
	    				tempSnapShot.forEach((childChildDSnapshot)=> {
    						allUsers[childSnapshot.key]["T"+childChildDSnapshot.key] = {}; 
    						allUsers[childSnapshot.key]["T"+childChildDSnapshot.key] = childChildDSnapshot.val();
	    				});
	    			}else{
	    				allUsers[childSnapshot.key][tempSnapShot.key] = {}; 
    					allUsers[childSnapshot.key][tempSnapShot.key] =  childChildSnapshot.val();
	    			}
    			});
    		});
		});
	});
	setTimeout(upo(allUsers), 10000);
	// 
}

function upo(allUsers){
	var userScores = {}; 

	// calculates the user scores and puts it in to the userScores json
	for (var user in allUsers) {
    	if (allUsers.hasOwnProperty(user)) {
    		var score = getScore(allUsers[user].option1) + getScore(allUsers[user].option2) + getScore(allUsers[user].option3); 
        	score += getScore(allUsers[user].Toption1) + getScore(allUsers[user].Toption2) + getScore(allUsers[user].Toption3); 
        	// userScores[user] = {}; 
        	userScores[user] = score; 
	    }
	}
	
	// gen possible matches 
	for (var user in userScores) {
    	if (userScores.hasOwnProperty(user)) {
    		if(!hasMatch(user)){
    			Matches[user] = getUserMatch(userScores,user);
    		}
	    }
	}

	console.log(Matches);
	var tempMatch = null; 
	for (var user in Matches) {
    	if (userScores.hasOwnProperty(user)) {
    		if(Matches[user] == null){
    			if(tempMatch == null){
    				tempMatch = user;
    			}else{
    				Matches[user] = tempMatch;
    				console.log(isCompatiableSex(tempMatch,user));
    				delete Matches[tempMatch]; 
    				tempMatch = null; 
    			}
    		}
    	}
    }
    console.log(Matches);
	// check if no one has a match and then match them together if they dooooooooo
}
function getUserMatch(allusers, currentUser){
	var RANGE = 2; // if you reduce this then matches are generated slower but more accurate

	var possibleUsers = getPossibleUsers(allusers,currentUser,RANGE);
	var possibleUsersGenderAppeal = getPossibleUsersGender(possibleUsers,currentUser);
	var max = possibleUsersGenderAppeal.length;
	var randomNumber = Math.floor(Math.random() * Math.floor(max));
	return possibleUsersGenderAppeal[randomNumber];
}

function getPossibleUsers(userScores,currentUser,range){
	var array = [];
	var currentUserScore = userScores[currentUser]; 
	for (var user in userScores) {
    	if (userScores.hasOwnProperty(user)) {
    		if(currentUser != user){
    			if((parseInt(userScores[user]) == currentUserScore) || (parseInt(userScores[user]) == (currentUserScore - range)) ||(parseInt(userScores[user]) == (currentUserScore + range))   ){
    				array.push(user);
    			}
    		}
    		
	    }
	}

	return array; 
}


function getPossibleUsersGender(userarray,currentUser){
	var array = [];
	var arrayLength = userarray.length;
    for (var i = 0; i < arrayLength; i++) {
        if(isCompatiableSex(currentUser,userarray[i])){
        	array.push(userarray[i]);
        }
    }
    return array; 
}

function hasMatch(userID){
	var hasmatch = false;
	for (var user in Matches) {
    	if (Matches.hasOwnProperty(user)) {
    		if(user == userID ||  Matches[user] == userID ) hasmatch = true; 
	    }
	}
	return hasmatch;
}

function getScore(text){
	if(text == "NEVER"){
		return 1;
	}else if(text == "SOMETIMES"){
		return 2;
	}else if(text == "ALWAYS"){
		return 3; 
	}
}

function isCompatiableSex(user1,user2){
	return (allUsers[user1]["Tgender"] == allUsers[user2]["gender"] || allUsers[user1]["Tgender"] == "Either"); 
}