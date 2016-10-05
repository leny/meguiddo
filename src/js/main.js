/* leny/meguiddo
 *
 * /main.js - Main page script
 *
 * coded by leny@flatLand!
 * started at 06/10/2016 (es2016 rewriting)
 */

/* eslint-disable no-invalid-this */

const TRACKS = [
    "assets/audio/meguiddo-01-black-sea.mp3",
    "assets/audio/meguiddo-02-world.mp3",
    "assets/audio/meguiddo-03-stardust.mp3",
];

let oAudio,
    iCurrentTrackIndex = -1,
    fChangeTrack, fPlayTrack,
    $playPauseButton;

if ( !window.Audio ) {
    document.querySelector( ".controls" ).remove();

    throw new Error( "Audio isn't supported!" );
}

( oAudio = new Audio() ).addEventListener( "ended", () => fChangeTrack() );

fPlayTrack = function( iTrackNumber = 0 ) {
    let $ref;

    oAudio.pause();
    oAudio.src = TRACKS[ iTrackNumber ];
    oAudio.play();
    $playPauseButton.classList.remove( "play" );
    $playPauseButton.classList.add( "pause" );

    ( $ref = document.querySelector( "li.active" ) ) && $ref.classList.remove( "active" );
    document.querySelectorAll( "li" )[ iCurrentTrackIndex ].classList.add( "active" );
};

fChangeTrack = function( bPrev ) {
    if ( bPrev ) {
        ( --iCurrentTrackIndex < 0 ) && ( iCurrentTrackIndex = TRACKS.length - 1 );
    } else {
        ( ++iCurrentTrackIndex === TRACKS.length ) && ( iCurrentTrackIndex = 0 );
    }

    fPlayTrack( iCurrentTrackIndex );
};

Array.from( document.querySelectorAll( "li" ) ).forEach( ( $elt, iIndex ) => {
    $elt.addEventListener( "click", ( e ) => {
        e.preventDefault();
        fPlayTrack( iCurrentTrackIndex = iIndex );
    } );
} );

( $playPauseButton = document.querySelector( ".play-pause" ) ).addEventListener( "click", function( e ) {
    e.preventDefault();

    if ( !oAudio.src ) {
        return fChangeTrack();
    }

    oAudio[ this.classList.contains( "pause" ) ? "pause" : "play" ]();

    this.classList.toggle( "pause" );
    this.classList.toggle( "play" );

    return null;
} );

document.querySelector( ".prev" ).addEventListener( "click", ( e ) => {
    e.preventDefault();
    fChangeTrack( true );
} );

document.querySelector( ".next" ).addEventListener( "click", ( e ) => {
    e.preventDefault();
    fChangeTrack();
} );
