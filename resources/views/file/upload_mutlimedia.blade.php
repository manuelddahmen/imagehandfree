<?php
/**
 * Created by PhpStorm.
 * User: Manuel Dahmen <manuel.dahmen@gmail.com>
 * Date: 26-02-16
 * Time: 03:20
 */
?>
<?php

if (!isset($folderId) || $folderId == 0) {
    $folderId = getRootForUser(\Illuminate\Support\Facades\Auth::user()->email);
}

?>
@extends('master')

@section('title', 'Formulaire d\'envoi de fichier pour stockage')

@section('header')
    @parent
    <meta name="_token" content="{!! csrf_token() !!}"/>
    <script src="/js/Capture/main.js" language="JavaScript"/>
    <script language="javascript">

        /**
         * Created by mary on 26-02-16.
         */

        var errorCallback = function (e) {
            console.log('Reeeejected!', e);
        };

        // Not showing vendor prefixes.
        navigator.getUserMedia({video: true, audio: true}, function (localMediaStream) {
            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(localMediaStream);

// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
// See crbug.com/110938.
            video.onloadedmetadata = function (e) {
// Ready to go. Do some stuff.
            };
        }, errorCallback);

        function hasGetUserMedia() {
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        if (hasGetUserMedia()) {
            console.write("You get it! (recorder or webcam");
        } else {
            alert('getUserMedia() is not supported in your browser');
        }
        if (Modernizr.getusermedia) {
            var gUM = Modernizr.prefixed('getUserMedia', navigator);
            gUM({video: true}, function (/**F FZ ... ???? */) {
            });
        }

        navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;


        function onTypeChange() {
            var video = document.querySelector('videoFlow');
            var isAudio = $("#audio").selected;
            var isVideo = $("#videoFow").selected;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({audio: isAudio, video: isVideo}, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                }, errorCallback);
            } else {
                video.src = 'somevideo.webm'; // fallback.// TODO MAJE A VIDEO FOR EXPLAINATION WHY VIDEO RECORDING MAY NOT WORK
            }
        }

        onTypeChange();
        /*
         var hdConstraints = {
         videoFlow: {
         mandatory: {
         minWidth: 1280,
         minHeight: 720
         }
         }
         };

         navigator.getUserMedia(hdConstraints, successCallback, errorCallback);

         ...

         var vgaConstraints = {
         videoFlow: {
         mandatory: {
         maxWidth: 640,
         maxHeight: 360
         }
         }
         };

         navigator.getUserMedia(vgaConstraints, successCallback, errorCallback);
         */
        MediaStreamTrack.getSources(function (sourceInfos) {
            var audioSource = null;
            var videoSource = null;

            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === 'audio') {
                    console.log(sourceInfo.id, sourceInfo.label || 'microphone');

                    audioSource = sourceInfo.id;
                } else if (sourceInfo.kind === 'video') {
                    console.log(sourceInfo.id, sourceInfo.label || 'camera');

                    videoSource = sourceInfo.id;
                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }

            sourceSelected(audioSource, videoSource);
        });

        function sourceSelected(audioSource, videoSource) {
            var constraints = {
                audio: {
                    optional: [{sourceId: audioSource}]
                },
                video: {
                    optional: [{sourceId: videoSource}]
                }
            };

            navigator.getUserMedia(constraints, successCallback, errorCallback);
        }

        // Not showing vendor prefixes or code that works cross-browser:

        function fallback(e) {
            video.src = 'fallbackvideo.webm';
        }

        function success(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        if (!navigator.getUserMedia) {
            fallback();
        } else {
            navigator.getUserMedia({video: true}, success, fallback);
        }

        var videoFlow = document.querySelector('videoFlow');
        var videoRecord = document.querySelector('videoRecord');
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        var localMediaStream = null;

        function snapshot() {
            if (localMediaStream) {
                ctx.drawImage(videoFlow, 0, 0);
// "image/webp" works in Chrome.
// Other browsers will fall back to image/png.
                document.querySelector('img').src = canvas.toDataURL('image/webp');
            }
        }

        videoFlow.addEventListener('click', snapshot, false);

        // Not showing vendor prefixes or code that works cross-browser.
        navigator.getUserMedia({video: true}, function (stream) {
            videoFlow.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, errorCallback);


        function recordAudio() {
            if (localMediaStream) {
                ctx.drawImage(videoFlow, 0, 0);
// "image/webp" works in Chrome.
// Other browsers will fall back to image/png.
                document.querySelector('img').src = canvas.toDataURL('image/webp');
            }
            navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
            navigator.getUserMedia(
                    {
                        audio: true
                    },
                    function (e) {
                        $(result).innerHTML += "Afficher début de l'enregistrement";
                    },
                    function (e) {
// error
                        console.error(e);
                    });
        }
        function recordVideo() {

        }
        navigator.getUserMedia({audio: true},
                function (e) {
// creates the audio context
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    context = new AudioContext();

// creates an audio node from the microphone incoming stream
                    mediaStream = context.createMediaStreamSource(e);
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
                    var bufferSize = 2048;
                    var numberOfInputChannels = 2;
                    var numberOfOutputChannels = 2;
                    if (context.createScriptProcessor) {
                        recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
                    } else {
                        recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
                    }
                    recorder.onaudioprocess = function (e) {
                        console.log("on audio progress");
                    };
// we connect the recorder with the input stream
                    mediaStream.connect(recorder);
                    recorder.connect(context.destination);
                });

        var leftchannel = [];
        var rightchannel = [];
        var recordingLength = 0;

        recorder.onaudioprocess = function (e) {
            leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
            rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
            recordingLength += bufferSize;

// stop recording
            recorder.disconnect(context.destination);
            mediaStream.disconnect(recorder);

// we flat the left and right channels down
// Float32Array[] => Float32Array
            var leftBuffer = flattenArray(leftchannel, recordingLength); // flattenArray is on GitHub (see below)
            var rightBuffer = flattenArray(rightchannel, recordingLength);

// we interleave both channels together
// [left[0],right[0],left[1],right[1],...]
            var interleaved = interleave(leftBuffer, rightBuffer); // interleave is on GitHub (see below)

// we create our wav file
            var buffer = new ArrayBuffer(44 + interleaved.length * 2);
            var view = new DataView(buffer);

// RIFF chunk descriptor
            writeUTFBytes(view, 0, 'RIFF');
            view.setUint32(4, 44 + interleaved.length * 2, true);
            writeUTFBytes(view, 8, 'WAVE');

// FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');
            view.setUint32(16, 16, true); // chunkSize
            view.setUint16(20, 1, true); // wFormatTag
            view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
            view.setUint32(24, sampleRate, true); // dwSamplesPerSec
            view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
            view.setUint16(32, 4, true); // wBlockAlign
            view.setUint16(34, 16, true); // wBitsPerSample

// data sub-chunk
            writeUTFBytes(view, 36, 'data');
            view.setUint32(40, interleaved.length * 2, true);

// write the PCM samples
            var index = 44;
            var volume = 1;
            for (var i = 0; i < interleaved.length; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

// our final blob
            var blob = new Blob([view], {type: 'audio/wav'});

            function replay() {
                var url = window.URL.createObjectURL(blob);
                var audio = new Audio(url);
                audio.play();
            }
        };
        /***
         *
         *
         * @param name
         * @param folder_id >1 folder id should be known. folder_id stocke dans répertoire par défaut
         */
        function save(name, folder_id) {

            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = "/file/";
            a.download = name + "wav";
            a.click();
            window.URL.revokeObjectURL(url);
        }


        /***********************************************************
         Avec Media Recorder API (proposal état 02-015)
         ************************************************************/
        if (getBrowser() == "Chrome") {
            var constraints = {
                "audio": false,
                "video": {
                    "mandatory": {"minWidth": 320, "maxWidth": 320, "minHeight": 240, "maxHeight": 240},
                    "optional": []
                }
            };
        } else if (getBrowser() == "Firefox") {
            var constraints = {
                audio: true,
                video: {width: {min: 320, ideal: 320, max: 1280}, height: {min: 240, ideal: 240, max: 720}}
            };
        }
        function onBtnRecordClicked() {
            if (typeof MediaRecorder === 'undefined' || !navigator.getUserMedia) {
                alert('Sorry! This demo requires Firefox 41 or Chrome 47 and up.');
            } else {
                navigator.getUserMedia(constraints, startRecording, errorCallback);
            }
        }
        function startRecording(stream) {
            log('Starting...');
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();

            var url = window.URL || window.webkitURL;
            videoElement.src = url ? url.createObjectURL(stream) : stream;
            videoElement.play();

            mediaRecorder.ondataavailable = function (e) {
//log('Data available...');
//console.log(e.data);
//console.log(e);

                chunks.push(e.data);
            };

            mediaRecorder.onerror = function (e) {
                log('Error: ' + e);
                console.log('Error: ', e);
            };


            mediaRecorder.onstart = function () {
                log('Started, state = ' + mediaRecorder.state);
            };

            mediaRecorder.onstop = function () {
                log('Stopped, state = ' + mediaRecorder.state);

                var blob = new Blob(chunks, {type: "video/webm"});
                chunks = [];

                var videoURL = window.URL.createObjectURL(blob);

                downloadLink.href = videoURL;
                videoElement.src = videoURL;
                downloadLink.innerHTML = 'Download video file';

                var rand = Math.floor((Math.random() * 10000000));
                var name = "video_" + rand + ".webm";

                downloadLink.setAttribute("download", name);
                downloadLink.setAttribute("name", name);

            };

            mediaRecorder.onwarning = function (e) {
                log('Warning: ' + e);
            };
        }
    </script>
@stop

@section('content')

    <h1>Enregistrer une image, un son, une vidéo.</h1>
    <h3>Choisissez un type de média</h3>
    <p>

    </p>
    <ul id="result"></ul>


    <form action="{{asset("file/record/$folderId")}}"
          id="form" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
        {!! method_field('POST') !!}
        <table border="1">
            <tr>
                <td><label for="type_image">Image de la webcam</label></td>
                <td><input id="type_image" type="checkbox" name="image" accept="image/**;capture=camera" capture
                           onclick="snapshot();"></td>
            </tr>
            <tr>
                <td><label for="type_audio">Sons de la webcam ou du micro</label></td>
                <td><input id="type_audio" type="checkbox" name="audio" accept="audio/**;capture=microphone" capture
                           onclick="recordAudio();" checked="checked"></td>
            <tr>
                <td><label for="type_video">Vidéo de la cam</label></td>
                <td><input id=="type_video" type="checkbox" name="video" accept="video/**;capture=camcorder" capture
                           onclick="recordVideo();" checked="checked"></td>

            <tr>
                <td></td>
                <td><input id="folder_id" name="folder_id" type="hidden" value="{{ $folderId }}"></td>
            </tr>
            <tr>
                <td><label for="filesystem">Ecrire les fichiers sur disque</label></td>
                <td><input id="filesystem" name="filesystem" type="checkbox" checked="checked"></td>
            </tr>
            <tr>
                <td><label for="upload-button">Upload</label></td>
                <td><input type="submit" id="upload-button" name="submitButton" value="Sauvegarder l'enregistrement"/>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <!-- <input type="button" id="reset" onclick="onBtnRecordClicked (); "/>-->
                    <input type="button" id="save" onclick="onBtnRecordClicked(); startRecording(mediaStream)"/>
                </td>
                <td>
                    <video autoplay controls="controls" id="videoFlow"></video>
                </td>
            </tr>
        </table>
    </form>
    <script language="JavaScript">
        storeFile();
        var formData = new FormData();

        formData.append("folderId", folderId);
        formData.append("filename", $("#filename_field").val());
        function storeFile() {
            formData.append("file", blob);

            var request = new XMLHttpRequest();
            request.open("POST", "{{ asset("file/record/$folderId") }}");
            request.send(formData);
        }

        var fd = new FormData(document.querySelector("form"));
        $.ajax({
            url: "{{asset("file/record/$folderId")}}",
            type: "POST",
            data: fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
        });
    </script>
@stop