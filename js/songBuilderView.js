/* 
 * Song Builder View Script
 * Zack Elliott
 * 9/29/2017
 */

/*
 * Holy shit this script is a bitch.
 * 
 * The idea here is that the user is building a Song (capital "S" so you know 
 * it's an object). Songs are made of Blocks, which are represented in the DOM 
 * as, well, blocks. Blocks have a Chord (in the context of this 
 * applicaiton/site, chords can be one note), a duration, and optional lyrics. 
 * 
 * Chords are chords. If you want to know what a chord is musically, take a 
 * music theory class. If you want to know how a Chord is defined logically, 
 * check out chord.js in the js folder.
 * 
 * The Song is continuously built as a javascript object. It's gonna get passed
 * to a PHP script or somethiing, I dunno.
 * 
 * The lyrics are the one thing that is NOT updated continuously. That's gotta
 * be parsed on save or something. I'll figure it out later.
 */


/* global chordList */

//Define song object
var currentSong = new Song();

//Define output update function for all song block divs
//Needs block index and updated chord to work. Don't fuck this up
var updateChordOutput = function(blockIndex, chord) {
    $('#chordDisplay' + blockIndex).text(chord.root + " " + chord.type);
    $('#notesDisplay' + blockIndex).text("Notes in chord: " + chord.noteNames);
};

//TODO: Define lyrics input/output binding for all song block divs
//This makes the lyrics input output to some other shit
var onLyricsChange = function () {
    var currentBlockIndex = $(this.parentNode).index();
    $('#lyricsDisplay' + currentBlockIndex).text($(this).val());
    console.log("Sumpin got typed in me");
};

//Define listener for root select
//Changes chord of block that the select is in based on root note
var onRootChange = function () {
    var newRoot = $(this).find(":selected").val();
    var currentBlockIndex = $(this.parentNode).index();
    var currentChord = currentSong.blockArray[currentBlockIndex].chord;
    currentChord = new Chord(newRoot, currentChord.type);
    currentSong.blockArray[currentBlockIndex].chord = currentChord;
    console.log("Current chord for block " + currentBlockIndex + ": " + currentChord.root + " " + currentChord.type);
    updateChordOutput(currentBlockIndex, currentChord);
};

//Define listener for chord select
//Changes chord of block that the select is in based on chord type
var onChordChange = function() {
    var newType = $(this).find(":selected").val();
    var currentBlockIndex = $(this.parentNode).index();
    var currentChord = currentSong.blockArray[currentBlockIndex].chord;
    currentChord = new Chord(currentChord.root, newType);
    currentSong.blockArray[currentBlockIndex].chord = currentChord;
    console.log("Current chord for block " + currentBlockIndex + ": " + currentChord.root + " " + currentChord.type);
    updateChordOutput(currentBlockIndex, currentChord);
};

//Define listener for beats select
//Changes duration of block and class of div
var onBeatsChange = function () {
    var newBeatNum = $(this).find(":selected").val();
    
    //Change class number so we can do css later
    /*
     *DON'T FUCK WITH THE SONGBLOCK CLASS 
     *YOU WANNA MAKE IT LOOK DIFFERENT, PUT EVERY SONG BLOCK IN A DIV
     *GIVE THAT SHIT WHATEVER CLASS YOU WANT
     *EXCEPT DON"T DO THAT BECAUSE THE STRUCTURE OF THE HTML IS DEFINED HERE
     *
     *JUST DON'T FUCK WITH IT
     *
     *YOU CAN FORK IT OR WHATEVER, THOUGH
     *
     *I WILL CUT YOU, THOUGH
     */
   
    //Sorry for the profanity. Just know that this method removes all classes from the blockDiv before assigning a new one.
    $(this.parentNode).removeClass();
    $(this.parentNode).addClass("songBlock" + newBeatNum);
    console.log($(this.parentNode).attr('class'));
};

//Define listener for add block buttons
//Currently hard coded for beat options as 1-4. I'll worry about it later.
var addBlockDiv = function() {
    var index = currentSong.blockArray.length;
    alert("adding a block, boss");
    $("#songBlocksContainer").append(
        '<div id="songBlock'+ index +'" class="songBlock4" style="border-style: solid;">\
            <h3 id="chordDisplay' + index +'"></h3>\
            <h4 id="notesDisplay' + index +'"></h4>\
            <h4 id="lyricsDisplay' + index +'"></h4>\
            <label for="rootSelect' + index +'">Select Root:</label>\
            <select id="rootSelect' + index +'" class="rootSelect" onchange="onRootChange">\
                <option value="A">A</option>\
                <option value="A#/Bb">A#/Bb</option>\
                <option value="B">B</option>\
                <option value="C">C</option>\
                <option value="C#/Db">C#/Db</option>\
                <option value="D">D</option>\
                <option value="D#/Eb">D#/Eb</option>\
                <option value="E">E</option>\
                <option value="F">F</option>\
                <option value="F#/Gb">F#/Gb</option>\
                <option value="G">G</option>\
                <option value="G#/Ab">G#/Ab</option>\
            </select>\
            <label for="chordSelect' + index +'">Select Chord Type:</label>\
            <select id="chordSelect' + index +'" class="chordSelect" onchange="onChordChange">\
                <!--Controller fills options.-->\
            </select>\
            <br>\
            <label for="lyricsBox' + index +'">Lyrics: </label>\
            <input type="text" id="lyricsBox' + index +'" class="lyricBox">\
            <label for="beatsSelect' + index +'">Beats: </label> \
            <select id="beatsSelect' + index +'" onchange="onBeatsChange">\
                <option value="1">1</option>\
                <option value="2">2</option>\
                <option value="3">3</option>\
                <option value="4" selected="selected">4</option>\
            </select>\
            <input type="button" id="btnAddBlock' + index +'" class="btnAddBlock" onclick="addBlockDiv" value="Add New Block">\n\
        </div>');
    
    //Populate chord type select options
    for (i = 0; i < chordList.length; i++){
        //console.log('select.chordSelect: ' + index);
        $('#chordSelect' + index).append($("<option></option>")
                .attr("value", chordList[i].type)
                .text(chordList[i].type));
        //console.log("Option populated, boss");
    };
    
    //Add listeners
    $('#rootSelect' + index).change(onRootChange);
    $('#chordSelect' + index).change(onChordChange);
    //console.log('#btnAddBlock' + index);
    $('#beatsSelect' + index).change(onBeatsChange);
    $('#btnAddBlock' + index).click(addBlockDiv);
    $('#lyricsBox' + index).on('input', onLyricsChange);
    
    //Hide last add block button
    $('#btnAddBlock' + (index -1)).hide();
    
    //Add empty block to current song
    currentSong.addBlock();
    //console.log("Song length in blocks: " + currentSong.blockArray.length);
    
    //Intialize output with update cuz we fancy
    updateChordOutput(index, currentSong.blockArray[index].chord);
};

//Create first block on ready
$(document).ready(function (){    
    //Creat first block
    addBlockDiv();
});