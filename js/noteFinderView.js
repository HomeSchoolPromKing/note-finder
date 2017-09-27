/* 
Note Finder View Script
Zack Elliott
09/24/2017
 */

/* global chordList */

//Initialize current chord. This is an object of type Chord that is used later
var currentChord = new Chord("A", "Major");

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
});

function onRootChange() {
    currentChord = new Chord($(rootSelect).find(":selected").val(), currentChord.type);
    console.log(currentChord);
    $(output).text("Chord: " + currentChord.root + " " + currentChord.type +
            ". Notes in chord: "  + 
            currentChord.getNotes());
}

function onChordChange() {
    currentChord = new Chord(currentChord.root, $(chordSelect).find(":selected").val());
    console.log(currentChord);
    $(output).text("Chord: " + currentChord.root + " " + currentChord.type +
            ". Notes in chord: "  + 
            currentChord.getNotes());
}