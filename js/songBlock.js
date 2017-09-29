/* 
 * Block Script 
 * Zack Elliott
 * 09/27/2017
 * 
 * This script defines a "song block." These blocks are used to build songs, 
 * defined in the song.js file
 */

//Constructor
function Block (chord = new Chord("A"), duration = 1, lyrics = "") {
    this.chord = chord;
    this.duration = duration;
    this.lyrics = lyrics;
};