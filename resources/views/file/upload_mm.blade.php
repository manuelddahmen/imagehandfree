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
    <script src="/lib/recordVideo/recordvideo.js" language="JavaScript"></script>


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
                <td><label for="filename_field">Nom de fichier</label></td>
                <td><input id="filename_field" name="filename_field" type="hidden"
                           value="{{ isset($filename)?$filename:"Nouvelle video" }}"></td>
            </tr>
            <tr>
                <td><label for="filesystem">Ecrire les fichiers sur disque</label></td>
                <td><input id="filesystem" name="filesystem" type="checkbox" checked="checked"></td>
            </tr>
            <tr>
                <td>
                    <!-- <input type="button" id="reset" onclick="onBtnRecordClicked (); "/>-->
                    <input type="button" id="save"
                           onclick="onBtnRecordClicked(); startRecording(mediaStream); storeFile();"
                           value="Sauvegarder l'enregistrement"/>
                </td>
                <td>
                    <video autoplay controls="controls" id="videoFlow"></video>
                </td>
            </tr>
        </table>
    </form>
    <script language="JavaScript">


        function storeFile() {



            var fd = new FormData(document.querySelector("form"));
            formData.append("folderId", {{ $folderId}});
            formData.append("filename", $("#filename_field").val());
            formData.append("file", blob);
            $.ajax({
                url: "{{asset("file/record/$folderId")}}",
                type: "POST",
                data: fd,
                processData: false,  // tell jQuery not to process the data
                contentType: false   // tell jQuery not to set contentType
            });
        }
    </script>

    <div id="webcamcontrols">
        <button class="recordbutton" onclick="startRecording();">RECORD</button>
    </div>
