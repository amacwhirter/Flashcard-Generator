//Create variables for packages needed

var Flashcard = require("./flashcards");
var fs = require("fs");
var inquirer = require("inquirer");

//create functions to be used in cli prompt


function createBasic() {

    inquirer.prompt([

        {
            type: "input",
            message: "Enter a question:",
            name: "front"
        },
        {
            type: "input",
            message: "Enter the answer to the question:",
            name: "back"
        }


    ]).then(function (user) {
        front = user.front;
        back = user.back;

        var myFlashcard = new Flashcard();

        var newCard = Flashcard.cards.BasiCard(front, back);
        console.log(JSON.stringify(newCard, null, 2));
    });
}

//Prompt user - create basic? create cloze? play?

inquirer.prompt([{
            type: "list",
            message: "Welcome to Flashcard Study Session. What would you like to do?",
            choices: ["Create Basic Card", "Create Cloze Card", "Study"],
            name: "commands"
        }

    ]).then(function(user) {
            console.log(JSON.stringify(user, null, 2));

            if (user.commands === "Create Basic Card"){
              createBasic();
            }else if (user.commands === "Create Cloze Card"){
              createCloze();
            }else{
              study();
            }
          });
