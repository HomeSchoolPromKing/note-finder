/* 
 * Song Builder View Script
 * Zack Elliott
 * 9/29/2017
 */

/* global chordList */

//Define helper variables
var currentSong = new Song();
var blockDivCount = 0;

//Define listener for root select
var onRootChange = function () {
    var newRoot = $(this).find(":selected").val();
    console.log($(this.parentNode).index() + ": " + newRoot);
};

//Definle listener for chord select


//Define listener for add block buttons
var addBlockDiv = function() {
    alert("adding a block, boss");
    $("#songBlocksContainer").append(
        '<div id="songBlock'+ blockDivCount +'" class="songBlock" style="border-style: solid;">\
            <label for="rootSelect' + blockDivCount +'">Select Root:</label> \
            <select id="rootSelect' + blockDivCount +'" class="rootSelect" onchange="onRootChange">\
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
            <label for="chordSelect' + blockDivCount +'">Select Chord Type:</label>\
            <select id="chordSelect' + blockDivCount +'" class="chordSelect" onchange="onChordChange">\
                <!--Controller fills options.-->\
            </select>\
            <br>\
            <label for="lyricBox' + blockDivCount +'">Lyrics: </label>\
            <input type="text" id="lyricBox' + blockDivCount +'" class="lyricBox">\
            <label for="beatsSelect' + blockDivCount +'">Beats: </label> \
            <select id="beatsSelect' + blockDivCount +'" onchange="onBeatsChange">\
            <input type="button" id="btnAddBlock' + blockDivCount +'" class="btnAddBlock" onclick="addBlockDiv" value="Add New Block">\n\
        </div>');
    
    //Populate chord type select options
    for (i = 0; i < chordList.length; i++){
        $('select.chordSelect' + blockDivCount).append($("<option></option>")
                .attr("value", chordList[i].type)
                .text(chordList[i].type));
    };
    
    //Add listeners
    $('#rootSelect' + blockDivCount).change(onRootChange);
    //$('#chordSelect' + blockDivCount).change(onChordChange);
    console.log('#btnAddBlock' + blockDivCount)
    $('#btnAddBlock' + blockDivCount).click(addBlockDiv);
    
    //Hide last add block button
    $('#btnAddBlock' + (blockDivCount -1)).hide();
    
    //Add empty block to current song
    currentSong.addBlock();
    
    //Increment block form div count
    blockDivCount++;
};

//TODO: make listener for add block button 

//Create first block on ready
$(document).ready(function (){
    //console.log(currentChord);
    addBlockDiv();
});