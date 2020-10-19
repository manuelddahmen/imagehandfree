@extends('master')
@section('master_begin_headers')
    @parent
@show
<?php
/**
 * Created by PhpStorm.
 * User: Manuel
 * Date: 13-04-2016
 * Time: 14:12
 */


?>
@section('header')
    @parent
    <script language="JavaScript">
        mixpanel.track("Recherche de note", {"User": "{{  Auth::user()->email }}", "note": noteId});
    </script>

@show
@section("master_begin_body")
    @parent
@show

@section('title', 'Rechercher dans l\'application')
@section('sidebar')
    @parent
    @include("menu", ["noteId", $noteId])


@show

@section("master_begin_content")
    @parent
@show

@section('content')
    @parent

    @include("note/list/vue_liste", array("noteId" => $noteId, "serialized_data" => $serialized_data, "filtre" => $filtre))

@show

@section("master_finish_body")
    @parent
@show
