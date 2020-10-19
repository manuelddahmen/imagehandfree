<?php
/**
 * Created by PhpStorm.
 * User: Manuel
 * Date: 2016-09-09
 * Time: 17:18
 */

$contacts = unserialize($contacts);

?>
@extends('master')
@section('title', 'Navigation dans les fichiers')
@section('master_begin_headers')
    @parent
@show



@section('header')
    @parent
    <script language="JavaScript">
        mixpanel.track("My Seats", {"User": "{{  Auth::user()->email }}"});
    </script>

@show


@section("master_begin_body")
    @parent
@show

@section('sidebar')
    @parent


@show


@section('master_finish_sidebar')
    @parent
@show


@section("master_begin_content")
    @parent
@show


@section("files")
    @parent

    <!-- Vue Container -->
    <div class="SeatContainer">

        <ul>
            @if($message!= false)
                <li>{{ $message}}</li>
            @endif
        </ul>
        @if($seats != false)
            @foreach($seats as $tab)
                @include("file/note/".$tab['id'], ["shared" => "as_guest"])
            @endforeach
        @else
            @append <strong>Pas de r&eacute;sultat dans cette vue.</strong>
        @endif
        @if($contacts!= false)
                    @foreach($contacts as $num)
                <div class="contact view">
                    @foreach($num as $value)
                        <p>{{$value}}</p>
                    @endforeach
                </div>
            @endforeach
        @else
            @append <strong>Pas de résultat dans cette vue.</strong>
        @endif
    </div>
@show




@section('content')
    @parent

@show


@section("master_finish_body")
    @parent
@show

