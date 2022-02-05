// TESTB ** Paul Stuart 30/11/2020 
//Question 1 - Objects --------------------------------------------

//create the array of books
bookArray = [];

//create the Book constructor
function bookConst(title, isbn, price) {
 this.title = title;
 this.isbn = isbn;
 this.price = price;
 bookArray.push(this);
}

/* Use the following data to create 5 books 
title					isbn	price
Javascript for Dummies 	97803 55
HTML for Dummies 		97807 99
CSS for Dummies 		22334 60
Python for Dummies 		55555 100
php for Dummies 		12345 75
*/
var jsBook = new bookConst("Javascript for Dummies ", 97803, 55.00);
var htmlBook = new bookConst("HTML for Dummies ", 97807, 99.00);
var cssBook = new bookConst("CSS for Dummies", 22334, 60.00);
var pythonBook = new bookConst("Python for Dummies ", 55555, 100.00);
var phpBook = new bookConst("PHP for Dummies ", 12345, 75.00);

// array for collection
console.table(bookArray);


//write a function writeBooks(array) to output the array of books in a table to the div element with an id of "outputBooks".
function writeBooks(array) {
 table = "<table><tr><th>Title</th><th>ISBN</th><th>Price</th></tr>";
 for (var i = 0; i < array.length; i++) {
  table += "<tr><td>" + array[i].title + "</td>";
  table += "<td>" + array[i].isbn + "</td>";
  table += "<td>" + array[i].price + "</td></tr>";
 }
 table += "</table>";
 var output = document.getElementById("outputBooks");
 output.innerHTML = table;
}

//call the writeBooks function to output the array of books
writeBooks(bookArray);

//Question 2 - Sorting and Binary Search -------------------------------------------- 
function sortByPrice(array) {

 array.sort(function(a, b) {
  var price1 = a.price;
  var price2 = b.price;
  var result = 0;
  if (price1 < price2) {
   result = -1;
  } else if (price1 > price2) {
   result = 1;
  }
  return result;
 })
}
console.log("Newly sorted Array by Price");
sortByPrice(bookArray)
console.table(bookArray);

function sortByISBN(array) {
 array.sort(function(a, b) {
  var isbn1 = a.isbn;
  var isbn2 = b.isbn;
  var result = 0;
  if (isbn1 < isbn2) {
   result = -1;
  } else if (isbn1 > isbn2) {
   result = 1;
  }
  return result;
 })
}
console.log("Newly sorted Array by ISBN");
sortByISBN(bookArray);
console.table(bookArray);

// write the Binary search for isbn number ----------------------------------------------------------------------------------------
function findBookByISBN(array, value) {
 sortByISBN(array);
 var min = 0;
 var max = array.length - 1;
 var searchCounter = 0;
 var message = "<br/>ISBN: <b>" + value + "</b> NOT Found <br/>";
 var index;
 var found = false;

 while (min <= max && !found) {
  searchCounter++;
  index = Math.floor((max + min) / 2);

  if (array[index].isbn == value) { // check this
   message = "<br/><b>ISBN found at index: </b>" + index;
   message += "<br/> Book Title is: " + array[index].title;
   message += "<br/> Items searched: " + searchCounter + "<br/>";
   found = true;
  } else if (array[index].isbn < value) {
   min = index + 1;
  } else {
   max = index - 1;
  }
 }
 return message;
}
isbnSearch = document.getElementById("bookSearch");
isbnSearch.innerHTML = (findBookByISBN(bookArray, 43424542431431234));
isbnSearch.innerHTML += (findBookByISBN(bookArray, 12345));
isbnSearch.innerHTML += (findBookByISBN(bookArray, 97807));


// write the Binary search for price number ----------------------------------------------------------------------------------------
function findBookByPrice(array, value) {
 sortByPrice(array);
 var min = 0;
 var max = array.length - 1;
 var searchCounter = 0;
 var message = "<br/> Book priced at: <b>" + value + "</b> NOT Found<br/>";
 var index;
 var found = false;

 while (min <= max && !found) {
  searchCounter++;
  index = Math.floor((max + min) / 2);

  if (array[index].price == value) {
   message = "<br/><b>ISBN found at index: </b>" + index;
   message += "<br/>Book Title is: " + array[index].title;
   message += "<br/>Book Price is: " + array[index].price;
   message += "<br/>Items searched: " + searchCounter + "<br/>";
   found = true;
  } else if (array[index].price < value) {
   min = index + 1;
  } else {
   max = index - 1;
  }
 }
 return message;
}
priceBookSearch = document.getElementById("bookPriceSearch");
priceBookSearch.innerHTML = (findBookByPrice(bookArray, 99));
priceBookSearch.innerHTML += (findBookByPrice(bookArray, 60));
priceBookSearch.innerHTML += (findBookByPrice(bookArray, 200));

//Question 3 file handling ----------------------------------------------------------------------------------------
//write a function to read a text file
if (window.File && window.FileReader && window.FileList && window.Blob) {
 // get the file input element by its ID
 var theInput = document.getElementById("file");
 var theFile = theInput.files;

 function readFile() {
  console.log(theFile);
  if (theFile[0] == undefined || theFile[0] == "") {
   alert("Please select a file!");
   return;
  }

  var textType = /text.*/;

  if (theFile[0].type.match(textType)) {

   var reader = new FileReader();
   reader.onload = function() {
     document.getElementById("about").innerHTML = "<p>" + reader.result + "</p>";
    }
    // specifying how to interpret (read) the file, in this case as text
   reader.readAsText(theFile[0]);
  } else {
   // error message if user attempts to upload a file that is not a text file
   alert("Please upload a text file");
  }
 }
} else {
 alert("Your browser does not support file handling");
}