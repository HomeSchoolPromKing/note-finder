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
 * as divs of class (think html and css class, not js) songBlock(n), where n is 
 * the number of beats for that block. Blocks have a Chord (in the context of this 
 * applicaiton/site, chords can be one note), a duration, and optional lyrics. 
 * 
 * Chords are really just a group of notes, but they also have a toor and type 
 * that determines their name. If you want to know what a chord is musically, 
 * take a music theory class. If you want to know how a Chord is defined 
 * logically, check out chord.js in the js folder.
 * 
 * The Song is continuously built as a javascript object. It's gonna get passed
 * to a PHP script or something, I dunno.
 * 
 * The lyrics are the one thing that is NOT updated continuously. That's gotta
 * be parsed on save or something. I'll figure it out later.
 */


/* global chordList */

//Define song object
var currentSong = new Song();

//Helper debug method
//Shows me the song
//No it doesn't
var debugSong = function() {
    console.log("Current Song :");
    for (x = 0; x < currentSong.blockArray.length; x++) {
        console.log("Block: " + x);
        console.log("Chord: " + currentSong.blockArray[x].root + " " + currentSong.blockArray[x].type);
        console.log("Beats: " + currentSong.blockArray[x].duration);
    }
};
    
//Helper method
//Define output update function for all song block divs
//Needs block index and updated chord to work. 
var updateChordOutput = function(blockIndex, chord) {
    $('#chordDisplay' + blockIndex).text(chord.root + " " + chord.type);
    $('#notesDisplay' + blockIndex).text("Notes in chord: " + chord.noteNames);
};

//Helper method
//Define chords used update. Updates the currentSong's chords used on every 
//chord type or root update.
var updateChordsUsedView = function() {
    currentSong.updateChordsUsed();
    $('#chordsUsedDisplay').text("Chords used: ");
    console.log("Chords used list:" + currentSong.chordsUsed.entries());
    for (i = 0; i < currentSong.chordsUsed.length; i++) {
       $('#chordsUsedDisplay').append(currentSong.chordsUsed[i].root.toString() + " " + currentSong.chordsUsed[i].type.toString() + ", ");
    }
};


//Define lyrics input/output binding for all song block divs
//This makes the lyrics input output to some other shit
var onLyricsChange = function () {
    var currentBlockIndex = $(this.parentNode).index();
    $('#lyricsDisplay' + currentBlockIndex).text($(this).val());
    //console.log("Sumpin got typed in me");
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
    updateChordsUsedView();
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
    updateChordsUsedView();
};

//Define listener for beats select
//Changes duration of block and class of div
var onBeatsChange = function () {
    var newBeatNum = $(this).find(":selected").val();
    var currentBlockIndex = $(this.parentNode).index();
    
    //Change class number so we can do css later
    //This removes all classes that start with "songBlock" and then have 
    //one or more non whitespace characters after that. It SHOULDN'T delete a class named just 
    //"songBlock". I think.
    $(this.parentNode).removeClass(function(index, className) {
        return (className.match(/\bsongBlock\S+/g) || []).join(' ');
    });
    
    //Add new songBlock class
    $(this.parentNode).addClass("songBlock" + newBeatNum);
    console.log($(this.parentNode).attr('class'));
    
    //TODO: Update current chord
    currentSong.blockArray[currentBlockIndex].duration = newBeatNum;
    //console.log("Duration of that block is now: " + currentSong.blockArray[currentBlockIndex].duration);
};

//Define listener for add block buttons
//Currently hard coded for beat options as 1-4. I'll worry about it later.
var addBlockDiv = function() {
    console.log("adding a block, boss");
    
    //index of button CLICKED
    //Defaults to 0 if not called by a button
    var index = $(this.parentNode).index();
    console.log(index);
    if (index === -1) {
        console.log("Index was undefined. This should only happen once");
        index = 0;
    }
    if (currentSong.blockArray.length === 0 && index === 0) {
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
                    <!--View fills options.-->\
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
                <input type="button" id="btnAddBlock' + index +'" class="btnAddBlock" onclick="addBlockDiv" value="Add Block">\n\
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
        $('#beatsSelect' + index).change(onBeatsChange);
        $('#btnAddBlock' + index).click(addBlockDiv);
        $('#lyricsBox' + index).on('input', onLyricsChange);
        
        //Add block to song object
        currentSong.insertBlock(0);
        
        //Initialize chord output
        updateChordOutput(index, currentSong.blockArray[index].chord);
    }
    else {
        
        //Iterates through exisitng divs after this one and changes indices
        for (i = (index + 1); i < (currentSong.blockArray.length + 1); i++) {
            $('#songBlock' + (i + 1)).id = ("songBlock" + (i + 2));
            $('#chordDisplay' + (i + 1)).id = ("chordDisplay" + (i + 2));
            $('#notesDisplay' + (i + 1)).id = ("notesDisplay" + (i + 2));
            $('#lyricsDisplay' + (i + 1)).id = ("lyricsDisplay" + (i + 2));
            $('#rootSelect' + (i + 1)).id = ("rootSelect" + (i + 2));
            $('#chordSelect' + (i + 1)).id = ("chordSelect" + (i + 2));
            $('#lyricsBox' + (i + 1)).id = ("lyricsBox" + (i + 2));
            $('#beatsSelect' + (i + 1)).id = ("beatsSelect" + (i + 2));
            $('#btnAddBlock' + (i + 1)).id = ("btnAddBlcok" + (i + 2));
        }
        
        $("#songBlock" + index).after(
            '<div id="songBlock'+ (index + 1) +'" class="songBlock4" style="border-style: solid;">\
                <h3 id="chordDisplay' + (index + 1) +'"></h3>\
                <h4 id="notesDisplay' + (index + 1) +'"></h4>\
                <h4 id="lyricsDisplay' + (index + 1) +'"></h4>\
                <label for="rootSelect' + (index + 1) +'">Select Root:</label>\
                <select id="rootSelect' + (index + 1) +'" class="rootSelect" onchange="onRootChange">\
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
                <label for="chordSelect' + (index + 1) +'">Select Chord Type:</label>\
                <select id="chordSelect' + (index + 1) +'" class="chordSelect" onchange="onChordChange">\
                    <!--View fills options.-->\
                </select>\
                <br>\
                <label for="lyricsBox' + (index + 1) +'">Lyrics: </label>\
                <input type="text" id="lyricsBox' + (index + 1) +'" class="lyricBox">\
                <label for="beatsSelect' + (index + 1) +'">Beats: </label> \
                <select id="beatsSelect' + (index + 1) +'" onchange="onBeatsChange">\
                    <option value="1">1</option>\
                    <option value="2">2</option>\
                    <option value="3">3</option>\
                    <option value="4" selected="selected">4</option>\
                </select>\
                <input type="button" id="btnAddBlock' + (index + 1) +'" class="btnAddBlock" onclick="addBlockDiv" value="Add Block">\n\
            </div>');
        //Populate chord type select options
        for (i = 0; i < chordList.length; i++){
            //console.log('select.chordSelect: ' + (index + 1);
            $('#chordSelect' + (index + 1)).append($("<option></option>")
                    .attr("value", chordList[i].type)
                    .text(chordList[i].type));
            //console.log("Option populated, boss");
        };
        
        //Add listeners
        $('#rootSelect' + (index +1)).change(onRootChange);
        $('#chordSelect' + (index +1)).change(onChordChange);
        $('#beatsSelect' + (index +1)).change(onBeatsChange);
        $('#btnAddBlock' + (index +1)).click(addBlockDiv);
        $('#lyricsBox' + (index +1)).on('input', onLyricsChange);
        
        //Insert block in song object
        currentSong.insertBlock(index + 1);
        
        //Initialize chord output
        updateChordOutput((index + 1), currentSong.blockArray[index + 1].chord);
    }
    updateChordsUsedView();
    
    //I done fucked up now
    debugSong();
};

//Create first block on ready
$(document).ready(function (){    
    //Creat first block
    addBlockDiv();
    //TODO: add listeners for song (non-songBlock-specific) options
});