<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 10-09-16
 * Time: 06:10
 */
?>
@extends('master')

@section('title', 'Home ny by Blok Not')

@section("header.master")
    <script language="JavaScript">
        mixpanel.track("Navigation dans l'application", {"User": "{{  Auth::user()->email }}", "note": noteId});
    </script>
@endsection

@section("menuitems.master")
    @include("menu", ["noteId", $noteId])
@endsection

@section('content')
    @include("note.list.vue_liste", array("noteId" => $noteId, "serialized_data" => $serialized_data, "filtre" => $filtre))
@endsection
