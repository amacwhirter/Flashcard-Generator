//This is where 'BasicCard' and 'ClozeCard' constructors will be built

exports.cards = {

//BasicCard needs 'front' and 'back'

BasicCard: function BasicCard(front, back) {
    if (BasicCard) {
        this.front = front;
        this.back = back;
    } else {
        return BasicCard(front, back);
    }
},

//ClozeCard needs 'text' and 'cloze'

ClozeCard: function ClozeCard(text, cloze) {
    if (this instanceof ClozeCard) {
        this.front = text;
        this.back = cloze;
    } else {
        return ClozeCard(text, cloze);
    }
}

// BasicCard.prototype = new ClozeCard();
};
