var hYLTBB = {
	booksOnLoan: [],
	allLibraryBooks: [{title: "The Book", read: false}, {title: "Another Book", read: false}],
	booksThatHaveBeenRead: [],

	displayBooks: function() {
		if (this.booksOnLoan.length === 0) {
			console.log("Din liste er tom, vil du låne en bok?");
		} else {
			console.log("Dine lånte bøker:");
			for (var i = 0; i < this.booksOnLoan.length; i++) {
				console.log(this.booksOnLoan[i].title);
			}
		}
	},

	availBooks: function() {
		console.log(this.allLibraryBooks);
	},

	deleteBook: function(position) {
		var removed = this.booksOnLoan.splice(position, 1)[0];
		this.booksThatHaveBeenRead.push(removed);
		for (var j = 0; j < this.booksThatHaveBeenRead.length; j++) {
			if (this.booksThatHaveBeenRead[j].read === false) {
				this.booksThatHaveBeenRead[j].read = true;
			}
		}
		this.displayBooks();
	},
	
	addBook: function(book){
		if (this.booksOnLoan.length === 0 && this.booksThatHaveBeenRead.length === 0) {
			return this.pushANewBook(book);
		} this.pushBookFromallLibBookArray(book);
		this.pushANewBook();
	}, 

	pushBookFromallLibBookArray: function (book) {
		for (var i = 0; i < this.allLibraryBooks.length; i++) {
			if (this.allLibraryBooks[i].title.indexOf(book) === 0) {
				return this.booksOnLoan.push(this.allLibraryBooks[i]);
			} else {
				console.log("This book is not available,\nplease search again.");
				this.checkIfLoanedBefore(book);
			}	
		}
	},

	pushANewBook: function (book){
		this.booksOnLoan.push(new Object({ title: book, read: false }));
		return this.displayBooks();
	},

	checkIfLoanedBefore: function(book){//must be checked, still not functioning as i want it too
		for (var i = 0, j = 0; i < this.booksOnLoan.length, j < this.booksThatHaveBeenRead.length; i++, j++) {
			if (this.booksOnLoan[i].title === book || this.booksThatHaveBeenRead[j].title === book) {
				return alert("You have read " +book +" before,\n are you sure that you want to read it again?");
			}
		}
	}

};

var libraryMembers = {

	user: [],

	displayUsers: function() {
		if (this.user.length === 0) {
			console.log("There are no active users.");
		} else {
			for (var i = 0; i < this.user.length; i++) {
				console.log(this.user[i]);
			}
		}
	},

	addUser: function (userName, firstName, lastName, password, acctNumber) {
		if (this.user.length === 0) {
			return this.pushObjectNewUser(userName, firstName, lastName, password, acctNumber);
		}else{
			for (var b = 0; b < this.user.length; b++) {
				if (this.user[b].userName === userName) {
					return alert(
						"Please choose another username,\n this one is already assigned another user."
					);
				}else{
					return this.pushObjectNewUser(userName, firstName, lastName, password, acctNumber);
				}	
			}
		}
	},

	pushObjectNewUser: function(userName, firstName, lastName, password, acctNumber){
		this.user.push(
			new Object({
				userName: userName,
				firstName: firstName,
				lastName: lastName,
				password: password,
				acctNumber: this.randomNumber(1000,10000)
			})
		) 
			return "Welcome "+firstName+"!";
		
	},

	randomNumber: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	},

	deleteUser: function(position) {
		this.user.splice(position, 1);
		this.displayUsers();
	}
};



// integration with website
var bL = document.getElementById("bL");
var currentUser = document.getElementById('currentUser');

var booksLoaned = function (){
	for(var i = 0; i < hYLTBB.booksOnLoan.length; i++) {
		return hYLTBB.booksOnLoan[i].title;
	}
};
var user = function(){
 	for(var i = 0; i < libraryMembers.user.length; i++) {
 		return libraryMembers.user[i].firstName;
 	}	
};

bL.textContent = booksLoaned();
currentUser.textContent = user();

