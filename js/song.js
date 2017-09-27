/* 
 * Song Script
 * Zack Elliott
 * 09/27/2017
 * 
 * This script defines a song logically. 
 */

//Constructor
function Song() {
    this.blockCount = 0;
    this.chordsUsed = [];
    this.chordArray = [];
    this.lyricsArray = [];
    
    this.setBlockCount = function(newCount) {
        this.blockCount = newCount;
    };
    
    this.getBlockCount = function() {
        return this.blockCount;
    }
    
    
    this.addBlock = function() {
        //add a block logic goes here, stupid
   };
};
