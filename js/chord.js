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
    {"type" : null, "abbreviation" : null, notes : [0]),
    {"type" : "Major", "abbreviation" : "maj", "notes" : [0,4,7]},
    {"type" : "Minor", "abbreviation" : "min", "notes" : [0,3,7]},
    {"type" : "Augmented", "abbreviation" : "aug", "notes" : [0,4,8]},
    {"type" : "Diminished", "abbreviation" : "dim", "notes" : [0,3,6]},
    {"type" : "Dominant 7th", "abbreviation" : "7", "notes" : [0,4,7,10]},
    {"type" : "Major 7th", "abbreviation" : "maj7", "notes" : [0,4,7,11]}
]; 

//I was thinking about this all wrong. I'm gonna delete this nonsense down here.

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
function Chord(root, type) {
    this.root = root;
    this.type = type;
    this.noteNums = [];
    this.noteNames = [];
    
    
    //Setters and getters
    this.setRoot = function(newRoot) {
        this.root = newRoot;
    };
    
    this.getRoot = function() {
        return this.root;
    };
    
    this.setType = function(newType) {
        this.type = newType;
    };
    
    this.getType = function() {
        return this.type;
    };
    
    this.setNoteNums = function (newNoteNums) {
        this.noteNums = newNoteNums;
    };
    
    this.getNoteNums = function() {
        return this.noteNums;
    };
    
    this.setNoteNames = function(newNoteNames) {
        this.noteNames = newNoteNames;
    };
    
    this.getNoteNames = function () {
        return this.noteNames;
    };
    
    //Gonna break this into smaller parts. Just you wait.
    //Method for returning notes in chord. Returns as array of strings    
    this.getNotes = function() {
        this.noteNums = [];
        for (i = 0; i < chordList.length; i++) {
            //console.log(type);
            //console.log(chordList[i].type);
            if (chordList[i].type === type) {
                this.noteNums = chordList[i].notes.slice();
                //console.log("NoteNums from chord list: "+ chordList[i].notes);
                //console.log("NoteNums in current chord (before adjustment): "+
                //        this.noteNums);
                //console.log(this);
                break;
            }
        }
        
        //Root note determines note mod, which determines which actual note
        //names will be returned by note numbers
        var noteMod = noteArray.indexOf(root);
        //console.log("note modifier: " + noteMod);
        
        //Use noteMod to change basic chord numbers to root-appropriate values
        for (i = 0; i < this.noteNums.length; i++) {
            var newNote = cap12(this.noteNums[i] + noteMod);
            this.noteNums[i] = newNote;
        }
        //console.log(this.noteNums);
        
        //Create array for note names, fill and return
        var noteNameList = [];
        for (i = 0; i < this.noteNums.length; i++) {
            noteNameList.push(noteArray[this.noteNums[i]]);
        }
        return noteNameList;
    };
    
    //TODO: make it go BACKWARDS. Find a chord name based on notes. Comes waaay
    //later, not a priority at all.
};

