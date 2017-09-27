/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global chordList */

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
