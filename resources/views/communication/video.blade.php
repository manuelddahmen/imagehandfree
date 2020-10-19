<html>
<body>
<p>
    <canvas id="frame"></canvas>
</p>
<button onclick="stopFunction()">Stop frame grab</button>
<script>
    var canvas = document.getElementById('frame');
    navigator.getUserMedia({video: true}, gotMedia, failedToGetMedia);

    function gotMedia(mediastream) {
        //Extract video track.
        var videoDevice = mediastream.getVideoTracks()[0];
        // Check if this device supports a picture mode...
        var captureDevice = new ImageCapture(videoDevice);
        var frameVar;
        if (captureDevice) {
            frameVar = setInterval(captureDevice.grabFrame().then(processFrame()), 1000);
        }
    }

    function processFrame(e) {
        imgData = e.imageData;
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        canvas.getContext('2d').drawImage(imgData, 0, 0, imgData.width, imgData.height);
    }

    function stopFunction(e) {
        clearInterval(myVar);
    }
</script>
</body>
</html>