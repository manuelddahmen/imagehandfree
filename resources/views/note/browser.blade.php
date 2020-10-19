@extends('master')
@section('header')
    <script language="JavaScript">
        mixpanel.track("Directory listing");
    </script>
@stop

@section('title', 'Parcourir les notes')

@section('content')
    <?php
    require_once(realpath(base_path("main_functions.php")));
    ?>
    @include("note/list/vue_liste",
        array("path" => $noteId))
@stop
