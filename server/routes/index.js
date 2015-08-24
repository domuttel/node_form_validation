var express = require('express');
var router = express.Router();
var puppyArray = [];
var peopleArray = [];
// route handler for handling a GET request to '/'
router.get('/', function(req, res, next) {
  // send a response to the user in the form of template called index.html
  res.render('index');
});

//route handler fo handling a post request to '/submit'
router.post('/submit', function(req, res, next) {
    var puppyInputName = req.body.puppyName;
    var puppyInputID = req.body.puppyID;

    var errors = puppyValidationCheck(puppyInputName, puppyInputID);

    if (errors.length > 0) {

      res.render('index', {
        errors:errors
      });

    } else {

      puppyArray.push({
      name: req.body.puppyName,
      id: req.body.puppyID
    });
    // console.log(puppyArray);
    //sends a response to the user in the form of dog.html
    res.render('result', {
      puppies: puppyArray,
      people: peopleArray,
      success: "The item was saved successfully!"
    });
  }
});


function puppyValidationCheck(puppyName, puppyID) {

  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyIDTrimmed = puppyID.trim();


  //puppy name validations
  if(puppyNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  //puppy id validations
  if(puppyIDTrimmed === '') {
    errorArray.push('ID cannot be blank.');
  } else if (puppyIDTrimmed.length < 3) {
    errorArray.push('A ID must be at least 3 characters long.');
  }

  return errorArray;

}

router.post('/person', function(req, res, next) {

    var personInputName = req.body.personName;
    var personInputHobby = req.body.personHobby;

    var errors = puppyValidationCheck(personInputName, personInputHobby);

    if (errors.length > 0) {
      res.render('index', {
        errors:errors
      });

    } else {

      peopleArray.push({
      name: req.body.personName,
      hobby: req.body.personHobby
    });
    // console.log(puppyArray);
    //sends a response to the user in the form of dog.html
    res.render('result', {
      people: peopleArray,
      puppies: puppyArray,
      success: "The item was saved successfully!"
    });
  }
});

module.exports = router;