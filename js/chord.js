/* 
Chord Script
Zack Elliott
9/24/2017
 */

//Declare array of notes
/*
 * This is key to understanding this whole thing, this first array. Each note
 * corresponds to its index. These will be used to turn the number values given
 * by chord types into note names, and turn root note names into number values.
 */
var noteArray = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb",
    "G", "G#/Ab"];

//Initialize chord list, filled with chordList.json later
//Syke, the whole thing is in here now. Fuck getJSON().
var chordList = [ 
    {"type" : "", "abbreviation" : null, notes : [0]},
    {"type" : "Major", "abbreviation" : "maj", "notes" : [0,4,7]},
    {"type" : "Minor", "abbreviation" : "min", "notes" : [0,3,7]},
    {"type" : "Augmented", "abbreviation" : "aug", "notes" : [0,4,8]},
    {"type" : "Diminished", "abbreviation" : "dim", "notes" : [0,3,6]},
    {"type" : "Dominant 7th", "abbreviation" : "7", "notes" : [0,4,7,10]},
    {"type" : "Major 7th", "abbreviation" : "maj7", "notes" : [0,4,7,11]}
]; 

//Load chord list from chordList.json -- Doesn't work
//$(document).ready(function (){
//    alert("firing off");
//    console.log(chordList);
//    $.getJSON("json/chordList.json", function (result) {
//        chordList = JSON.parse(result); 
//       alert("Got the Json");
//    });
//});


//Method to make note number values "wrap around" after an octave. Don't worry 
//about it
function cap12(noteNum) {
    if (noteNum >= 12) {
        noteNum = noteNum - 12;
        return noteNum;
    }
    else {
        return noteNum;
    }
};

//Chord constructor
function Chord(root, type = "") {
    this.root = root;
    this.type = type;
    
    //logic to determine note numbers based on root and ype
    this.noteNums = [];
    for (i = 0; i < chordList.length; i++) {
        if (chordList[i].type === type) {
            this.noteNums = chordList[i].notes.slice();
            break;
        }
    }
    //Use noteMod to change basic chord numbers to root-appropriate values
    this.noteMod = noteArray.indexOf(this.root);
    for (i = 0; i < this.noteNums.length; i++) {
        this.noteNums[i] = cap12(this.noteNums[i] + this.noteMod);
    } 
    
    //logic to determine note names based on note numbers
    this.noteNames = [];
    for (i = 0; i < this.noteNums.length; i++) {
        this.noteNames.push(noteArray[this.noteNums[i]]);
    }
};

