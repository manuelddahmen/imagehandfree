<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 10-09-16
 * Time: 06:18
 */
/**
 * Created by PhpStorm.
 * User: Manuel
 * Date: 13-04-2016
 * Time: 14:12
 */


?>
@extends('master')
@section('title', 'Navigation dans les fichiers')
@section('header')
    <script language="JavaScript">
        mixpanel.track("Navigation dans l'application", {"User": "{{  Auth::user()->email }}", "note": noteId});
    </script>
@section('menuitems')
    @include("menu", ["noteId", $noteId])
@endsection
@section('content')

    @include("note.list.vue_liste", array("noteId" => $noteId, "serialized_data" => $serialized_data, "filtre" => $filtre))
@endsection