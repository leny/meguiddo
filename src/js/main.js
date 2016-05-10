( function() {

    var oAudio,
        iCurrentTrackIndex = -1,
        fChangeTrack,
        $playPauseButton,
        aTracks = [
            "assets/audio/meguiddo-01-black-sea.mp3",
            "assets/audio/meguiddo-02-world.mp3",
            "assets/audio/meguiddo-03-stardust.mp3"
        ];

    if ( !window.Audio ) {
        document.querySelector( ".controls" ).remove();
        return;
    }

    oAudio = new Audio();
    oAudio.addEventListener( "ended", function() {
        fChangeTrack();
    } );

    fChangeTrack = function( bPrev ) {
        var _ref;

        if ( bPrev ) {
            ( --iCurrentTrackIndex < 0 ) && ( iCurrentTrackIndex = aTracks.length - 1 );
        } else {
            ( ++iCurrentTrackIndex === aTracks.length ) && ( iCurrentTrackIndex = 0 );
        }

        oAudio.pause();
        oAudio.src = aTracks[ iCurrentTrackIndex ];
        oAudio.play();
        $playPauseButton.classList.remove( "play" );
        $playPauseButton.classList.add( "pause" );
        ( _ref = document.querySelector( "li.active" ) ) && _ref.classList.remove( "active" );
        document.querySelectorAll( "li" )[ iCurrentTrackIndex ].classList.add( "active" );
    };

    ( $playPauseButton = document.querySelector( ".play-pause" ) ).addEventListener( "click", function( e ) {
        e.preventDefault();

        if ( !oAudio.src ) {
            return fChangeTrack();
        }

        oAudio[ this.classList.contains( "pause" ) ? "pause" : "play" ]();

        this.classList.toggle( "pause" );
        this.classList.toggle( "play" );
    } );

    document.querySelector( ".prev" ).addEventListener( "click", function( e ) {
        e.preventDefault();
        fChangeTrack( true );
    } );

    document.querySelector( ".next" ).addEventListener( "click", function( e ) {
        e.preventDefault();
        fChangeTrack();
    } );

} )();
