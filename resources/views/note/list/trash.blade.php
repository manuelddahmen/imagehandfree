<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 04-04-16
 * Time: 10:36
 */



$json_str = \App\Note::toXMLString(\App\Note::getTrash());


?>
@extends("master")
@section("title", "Corbeille")
@section("content")
    @parent
    @include("note/list/vue_liste", array("json" => "{{$json_str}}"))
@show    @stop

