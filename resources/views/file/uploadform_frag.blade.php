<p>Uploaded</p>
<ol id="uploaded"></ol>
<p>Result</p>
<ol id="result"></ol>
<form action="{{asset(config("app.pathToRootDir")."file/upload/$folderId")}}"
      id="form" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    {!! method_field('POST') !!}
    <table>
        <tr>
            <td><label for="file">Fichiers</label></td>
            <td><input id="file" name="file[]" type="file" value="Choisir le fichier" multiple></td>
        </tr>
        <tr>
            <td></td>
            <td><input id="folder_id" name="folder_id" type="hidden" value="{{ $folderId }}"></td>
        </tr>
        <tr>
            <td><label for="filesystem">Ecrire les fichiers sur disque</label></td>
            <td><input id="filesystem" name="filesystem" type="checkbox"></td>
        </tr>
        <tr>
            <td><label for="upload-button">Upload</label></td>
            <td><input type="submit" id="upload-button" name="submitButton" value="Envoyer les fichiers"/></td>
        </tr>
        <tr>
            <td>
                <div id="progress"></div>
            </td>
            <td>
                <div id="result"></div>
            </td>
        </tr>
    </table>
</form>
<script language="JavaScript">
    $.ajaxSetup({
        headers: {'X-CSRF-Token': $('meta[name=_token]').attr('content')}
    });

    $('#form').submit(function (e) { // capture submit
        e.preventDefault();
        var fd = new FormData(this); // XXX: Neex AJAX2

        // You could show a loading image for example...

        $.ajax({
            url: "{{asset(config("app.pathToRootDir")."file/upload/$folderId")}}",
            xhr: function () { // custom xhr (is the best)

                var xhr = new XMLHttpRequest();
                var total = 0;

                // Get the total size of files
                $.each(document.getElementById('file').files, function (i, file) {
                    total += file.size;
                });

                // Called when upload progress changes. xhr2
                xhr.upload.addEventListener("progress", function (evt) {
                    // show progress like example
                    var loaded = ((int)((evt.loaded / total).toFixed(2) * 100); // percent

                    $('#progress').text('Uploading... ' + loaded + '%');
                }, false);

                return xhr;
            },
            processData: false, type: 'post',

            contentType: false,
            data: fd,
            success: function (data) {
                $('#result').html(data);
            },
            fail: function (data) {
                $('#result').html(data);
            },
            always: function (data) {
                $('#result').html(data);
            }
        });
    });
</script>