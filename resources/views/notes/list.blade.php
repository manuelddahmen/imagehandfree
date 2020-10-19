<?php
/**
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 *
 * Reçu
 * "noteId" => $noteId, "page" => $page
 */
?>
@extends("master")
@section('title', "Parcourir dans {{$noteId}}")
@section('content')
    @parent
    <p>Note/dossier à regarder: $noteId = {{$noteId}}</p>
    @include("note/list/vue_liste",
        array("noteId" => $noteId, "json" => $json))
@show
