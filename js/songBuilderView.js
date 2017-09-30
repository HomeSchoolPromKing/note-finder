/* 
 * Song Builder View Script
 * Zack Elliott
 * 9/29/2017
 */

/* global chordList */

//Define helper variables
var currentSong = new Song();

//Define output update function for all song block divs
//Needs block index and updated chord to work. Don't fuck this up
var updateOutput = function(blockIndex, chord) {
    $('#chordDisplay' + blockIndex).text(chord.root + " " + chord.type);
    $('#notesDisplay' + blockIndex).text("Notes in chord: " + chord.noteNames);
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
    updateOutput(currentBlockIndex, currentChord);
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
    updateOutput(currentBlockIndex, currentChord);
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
            <label for="lyricBox' + index +'">Lyrics: </label>\
            <input type="text" id="lyricBox' + index +'" class="lyricBox">\
            <label for="beatsSelect' + index +'">Beats: </label> \
            <select id="beatsSelect' + index +'" onchange="onBeatsChange">\
                <option value="1">1</option>\
                <option value="2">2</option>\
                <option value="3">3</option>\
                <option value="4">4</option>\
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
    
    //Hide last add block button
    $('#btnAddBlock' + (index -1)).hide();
    
    //Add empty block to current song
    currentSong.addBlock();
    //console.log("Song length in blocks: " + currentSong.blockArray.length);
    
    //Intialize output with update cuz we fancy
    updateOutput(index, currentSong.blockArray[index].chord);
};

//Create first block on ready
$(document).ready(function (){    
    //Creat first block
    addBlockDiv();
});