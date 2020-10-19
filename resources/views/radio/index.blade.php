<?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 03-10-15
 * Time: 14:32
 */
?>
@extends("master")
@section('title', 'Radio')
@section('header')
    @parent
    <script type="text/javascript" src="/js/rdio.com/jquery.rdio.min.js" ></script>
    <script type="text/javascript">
        function search(terms)
        {
            var resourceEndpoint = "https://services.rdio.com/api/1/";
            $.ajax(resourceEndpoint, method;
        :
            "post",;

        )
            alert("Search ");
        }

        var duration = 1; // track the duration of the currently playing track
        $(document).ready(function() {
            $('#api').bind('ready.rdio', function() {
                $(this).rdio().play('a171827');
            });
            $('#api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
                if (playingTrack) {
                    duration = playingTrack.duration;
                    $('#art').attr('src', playingTrack.icon);
                    $('#track').text(playingTrack.name);
                    $('#album').text(playingTrack.album);
                    $('#artist').text(playingTrack.artist);
                }
            });
            $('#api').bind('positionChanged.rdio', function(e, position) {
                $('#position').css('width', Math.floor(100*position/duration)+'%');
            });
            $('#api').bind('playStateChanged.rdio', function(e, playState) {
                if (playState == 0) { // paused
                    $('#play').show();
                    $('#pause').hide();
                } else {
                    $('#play').hide();
                    $('#pause').show();
                }
            });
            // this is a valid playback token for localhost.
            // but you should go get your own for your own domain.
            $('#api').rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');
            $('#previous').click(function() { $('#api').rdio().previous(); });
            $('#play').click(function() { $('#api').rdio().play(); });
            $('#pause').click(function() { $('#api').rdio().pause(); });
            $('#next').click(function() { $('#api').rdio().next(); });
        });
    </script>

@stop
@parent
@stop
@section('content')

    @parent
    <div id="api"></div>
    <img id="art" src="" height="200" width="200" style="float:left;margin-right:20px;">
    <div>
        <div><b>Track: </b><span id="track"></span></div>
        <div><b>Album: </b><span id="album"></span></div>
        <div><b>Artist: </b><span id="artist"></span></div>
        <div><b>Position: </b>
      <span style="display:inline-block;width:200px;border:1px solid black;">
        <span id="position" style="display:inline-block;background-color:#666">&nbsp;</span>
      </span></div>
        <div>
            <button id="previous">&lt;&lt;</button>
            <button id="play">|&gt;</button>
            <button id="pause">||</button>
            <button id="next">&gt;&gt;</button>
        </div>
        <input type="text" id="search" onchange="search(this.value);" />
    </div>

@stop