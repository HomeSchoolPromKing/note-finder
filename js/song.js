/* 
 * Song Script
 * Zack Elliott
 * 09/27/2017
 * 
 * This script defines a song logically. 
 */

//Helper method
//Checks chords against used array and adds them if they aren't there already
function checkChords(usedArray, newChord) {
    var wasUsed = false;
    for (i = 0; i < usedArray.length; i++) {
        if (usedArray[i] === newChord) {
            wasUsed = true;
        };
    };
    return wasUsed;
};

//Helper method
//Searches block array for matching chords. Use when deleting chords to 
//determine if the chord needs to be removed from the chords used list.
function checkBlocks(blocks, checkChord) {
    var stillInABlock = false;
    for (i = 0; i < blocks.length; i++) {
        if (blocks[i].chord === checkChord) {
            stillInABlock = true;
        }
    };
    return stillInABlock;
};

//Constructor
function Song() {
    this.blockArray = [];
    //this.chordsUsed = [];
   
    this.addBlock = function(block = new Block("A")) {
        var newBlock = block;
        this.blockArray.push(newBlock);
        //if (!checkChords(this.chordsUsed, newBlock.chord)) {
        //    this.chordsUsed.push(newBlock.chord);
       // }
   };
   
   this.deleteBlock = function(blockIndex) {
       blockArray.splice(blockIndex, 1);
       //if (!checkBlocks(this.blockArray, this.blockArray[blockIndex].chord)) {
       //    this.chordsUsed = this.chordsUsed.filter(chord => chord !== this.blockArray[blockIndex].chord);
       //}
   };
   
};
