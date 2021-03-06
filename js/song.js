/* 
 * Song Script
 * Zack Elliott
 * 09/27/2017
 * 
 * This script defines a song logically. 
 */

//Helper method
//Searches block array for matching chords. Use when deleting chords to 
//determine if the chord needs to be removed from the chords used list.
function contains(array, Chord) {
    var i = array.length;
    while (i--) {
       if (array[i].root === Chord.root && array[i].type === Chord.type) {
           return true;
       }
    }
    return false;
}

//Constructor
function Song() {
    this.blockArray = [];
    this.chordsUsed = [new Chord()];
    console.log("chords used on initialization: " + this.chordsUsed[0].root + " " + this.chordsUsed[0].type);
    
    //Adds block at end of array. Probably gonna delete this and just use insert
    this.addBlock = function(chord) {
       var newBlock = new Block(chord);
       this.blockArray.push(newBlock);
   };
   
   //Inserts block at specific index
   this.insertBlock = function(blockIndex, chord) {
       var newBlock = new Block(chord);
       this.blockArray.splice(blockIndex, 0, newBlock);
   };
   
   //deletes a block at a specific index
   this.deleteBlock = function(blockIndex) {
       this.blockArray.splice(blockIndex, 1);
   };
   
   //updates chords used array
   this.updateChordsUsed = function (blockIndex) {
       this.chordsUsed = [];
       for (j = 0; j < this.blockArray.length; j++) {
           var chordToCheck = this.blockArray[j].chord;
           if (!contains(this.chordsUsed, chordToCheck)) {  
                this.chordsUsed.push(new Chord(chordToCheck.root, chordToCheck.type));
           };
       };
   };
};
