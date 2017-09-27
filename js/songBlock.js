/* 
 * Block Script 
 * Zack Elliott
 * 09/27/2017
 * 
 * This script defines a "song block." These blocks are used to build songs, 
 * defined in the song.js file
 */

//Constructor
function Block (chordRoot, chordType, duration, lyrics) {
    this.chordRoot = chordRoot;
    this.chordType = chordType;
    this.duration = duration;
    this.lyrics = lyrics;
    
    //Changes the root note of a block
    this.setRoot = function(newRoot) {
        this.chordRoot = newRoot;
    };
    
    //Return's this block's root note
    this.getRoot = function() {
        if (this.chordRoot === null) {
            return "Zack is a root idiot"
        }
        else {
            return this.chordRoot; 
        }
    };
    
    //Changes the chord type of a block
    this.setType = function(newType) {
        this.chordType = newType;
    };
    
    //Returns this block's chord type
    this.getType = function() {
        if (this.chordType === null) {
            return "Zack is a type idiot"
        }
        else {
            return this.chordType; 
        }
    };
    
    //Changes the duration of a block
    this.setDuration = function(newDuration) {
        this.duration = newDuration;
    };
    
    //Returns the duration of a block
    this.getDuration = function() {
        if (this.duration === null) {
            return "Zack is a duration idiot"
        }
        else {
            return this.duration; 
        }
        return this.duration;
    }
    
    //Changes lyrics in a block
    this.setLyrics = function(newLyrics) {
        this.lyrics = newLyrics;
    };
    
    //Returns this block's lyrics
    this.getLyrics = function() {
        return this.lyrics;
    };
};


