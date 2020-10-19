<?php

$folderId = 140;
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 08-04-16
 * Time: 02:06
 */
?>
<html lang="en">
<head>
</head>
<body><!--
<video id=”display”>
    <audio id=”speaker”>
        <device id=”camera” type=”video”>
            <device id=”microphone” type=”audio”>
                <script>
                    var configstring = [
                        { "urls": "stun:stun1.example.net" },
                        { "urls": ["turns:turn.example.org", "turn:turn.example.net"],
                            "username": "user",
                            "credential": "myPassword",
                            "credentialType": "password" }
                    ];

                    var factory = new RtcSessionFactory(configstring);
                    var connection = factory.CreateSession();
                    connection.onOutgoingNegotiationItem = function (session, item) {
// Not specified: How to transmit the negotiation item
                    };
                    connection.onOutgoingNegotiationBlob = sendToServer;
                    connection.addOutgoingMedia(“camera”, camera.data )
                    connection.addOutgoingMedia(“microphone”, microphone.data)
                    )
                    display.src = connection.expectIncomingMedia(videoconfig).url;
                    speaker.src = connection.expectIncomingMedia(audioconfig).url;
                    // At this point, we have the information needed to perform
                    // the negotiation.
                    connection.Connect();

                    connection.onConnect = StartSendingMedia();
                    StartSendingMedia();

                        alert(“Your camera and microphone will now be turned on”);
                        connection.OutgoingMedia(“camera”).unmute();
                        connection.OutgoingMedia(“microphone”).unmute();
                    function incomingNegotiationHandler(item) {
                        connection.IncomingNegotiationItem(item)
                    }

         </script>
       </device>
            </device>
       </audio>
    </video>-->
<form action="{{asset("file/record/$folderId")}}"
      id="formVideo" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    {!! method_field('POST') !!}
    <table border="1">
        <tr>
            <td></td>
            <td><input id="type_image" type="file" name="image" accept="image/**;capture=camera" capture
                       onclick="snapshot();"></td>
        </tr>
        <td>
            <video autoplay controls="controls" id="mycam"></video>
        </td>
        <td><input type="submit" value="Upload">
        </td>
        </tr>
    </table>
</form>
<canvas></canvas>
<script>
    $("form#formVideo").preventDefault();

    var input = document.querySelector('input#mycam[type=file]'); // see Example 4

    input.onchange = function () {
        var file = input.files[0];

        upload(file);
        drawOnCanvas(file);   // see Example 6
        displayAsImage(file); // see Example 7
    };

    function upload(file) {
        var form = new FormData(),
                xhr = new XMLHttpRequest();

        form.append('file', file);
        xhr.open('post', '{{asset("file/record/$folderId")}}', true);
        xhr.send(form);
    }
    function drawOnCanvas(file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var dataURL = e.target.result,
                    c = document.querySelector('canvas'), // see Example 4
                    ctx = c.getContext('2d'),
                    img = new Image();

            img.onload = function () {
                c.width = img.width;
                c.height = img.height;
                ctx.drawImage(img, 0, 0);
            };

            img.src = dataURL;
        };

        reader.readAsDataURL(file);
    }
    function displayAsImage(file) {
        var imgURL = URL.createObjectURL(file),
                img = document.createElement('img');

        img.onload = function () {
            URL.revokeObjectURL(imgURL);
        };

        img.src = imgURL;
        document.body.appendChild(img);
    }
</script>

<input type="button" value="Start" onclick="start()" id="startBtn">
<script>
    var startBtn = document.getElementById('startBtn');

    function start() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(gotStream).catch(logError);
        startBtn.disabled = true;
    }

    function gotStream(stream) {
        stream.oninactive = function () {
            startBtn.disabled = false;
        };
    }

    function logError(error) {
        log(error.name + ": " + error.message);
    }
</script>
</body>
</html>