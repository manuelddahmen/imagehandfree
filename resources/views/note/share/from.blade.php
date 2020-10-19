@extends('master')
@section('title', 'Navigation dans les fichiers')
@section('master_begin_headers')
    @parent
@show

@section('header')
    @parent
    <script language="JavaScript">
        mixpanel.track("Regarder fichiers partag&eacute;s", {"User": "{{  Auth::user()->email }}", "note": noteId});
    </script>

@show

@section("master_begin_body")
    @parent
@show

@section('sidebar')
    @parent
    @include("../menu", ["noteId" =>$noteId])


@show
@section('master_finish_sidebar')
    @parent
@show

@section("master_begin_content")
    @parent
@show

@section('content')
    @parent
    <?php
    @include("note/list/vue_liste", array("noteId" => $noteId,  "serialized_data" => $serialized_data, "filtre" => $filtre))

@show


@section("master_finish_body")
    @parent
@show
