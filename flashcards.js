//==============================================Setup===============================================

//Create variables for packages needed

var inquirer = require("inquirer");
var fs = require("fs");
var card = "";
var clozeCardMade = "";

//============================================Constructors=============================================

//BasicCard constructor - front and back

function BasicCard(front, back){
  this.front = front;
  this.back = back;
}

//ClozeCard constructor - full text, partial, cloze

function ClozeCard(text, cloze, partial){
  this.text = text;
  this.cloze = cloze;
  this.partial = partial;
}


//=================================starting prompt question for direction=========================

inquirer.prompt([{

        type: "list",
        name: "cardType",
        message: "What would you like to do?",
        choices: ["Create Basic Card", "Create ClozeCard", "Study!"]

}]).then(function(cardInputSetup) {
    if (cardInputSetup.cardType === "Create Basic Card") {
        makeBasicCard();
    }
    else if (cardInputSetup.cardType === "Create ClozeCard"){
        makeClozeCard();
    }
    else{
        studyCards();
    }
});

//=========================================basic card function=========================================

function makeBasicCard(){
  return inquirer.prompt([
        {
            type: "input",
            name: "front",
            message: "What is the question to put on the front of the card?"
        },
        {
            type: "input",
            name: "back",
            message: "What is the answer to place on the back of the card?"
        }
      ]).then(function(basicInfo) {

          //add the information as instance to constructor

        newBasic = new BasicCard(basicInfo.front, basicInfo.back);
            console.log(newBasic);

            //append the data to the txt file for retrieving later

          fs.appendFile("flashcards.txt", JSON.stringify(newBasic)+ '\r\n', function(err) {
            if (err) {
              console.log(err);
              }
          });
        });
}

//========================================ClozeCard function============================================

function makeClozeCard(){
  return inquirer.prompt([
          //ask for close card info
          {
            type: "input",
            name: "text",
            message: "Please enter the full text statement."
          },
          {
              type: "input",
              name: "cloze",
              message: "Please state which words of the sentence you would like omitted for studying."
          },
          {
              type: "input",
              name: "partial",
              message: "Now type the partial text omitting the cloze you stated in the previous question."
          },
        ]).then(function(clozeInfo) {
          //add to constructor
          newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
            console.log(newCloze);

          fs.appendFile("flashcards.txt", JSON.stringify(newCloze)+ '\r\n' , function(err) {
            if (err) {
              console.log(err);
              }
          });
        });
}

//============================================Study cards===============================================

function studyCards (){
  fs.readFile("flashcards.txt", "utf8",function (err, data){
    if (err){
      throw err;
    }
    console.log(data);
  });
}
