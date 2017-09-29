/* 
Note Finder View Script
Zack Elliott
09/24/2017
 */

/* global chordList */

//Initialize current chord. This is an object of type Chord that is used later
var currentChord = new Chord("A");

//Populate options on load and bind event functions
$(document).ready(function (){
    //console.log(currentChord);
for (i = 0; i < chordList.length; i++){
        $(chordSelect).append($("<option></option>")
                .attr("value", chordList[i].type)
                .text(chordList[i].type));
    };
    
    $(rootSelect).change(onRootChange);
    $(chordSelect).change(onChordChange);
    $(output).text("Chord: " + currentChord.root + " " + currentChord.type +
            ". Notes in chord: "  + 
            currentChord.noteNames);
});

function onRootChange() {
    var newRoot = $(rootSelect).find(":selected").val();
    currentChord = new Chord(newRoot, currentChord.type);
    console.log(currentChord);
    $(output).text("Chord: " + currentChord.root + " " + currentChord.type +
            ". Notes in chord: "  + 
            currentChord.noteNames);
}

function onChordChange() {
    var newType = $(chordSelect).find(":selected").val();
    currentChord = new Chord(currentChord.root, newType);
    console.log(currentChord);
    $(output).text("Chord: " + currentChord.root + " " + currentChord.type +
            ". Notes in chord: "  + 
            currentChord.noteNames);
}