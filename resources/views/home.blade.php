<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 10-09-16
 * Time: 06:01
 */
?>
@extends('master')
@section('title', 'Home ny by Blok Not')



@section('content')
    <h1>Application bloc-notes</h1>
    <div>

        <ul>
            <li><a class="btn btn-large btn-primary openbutton app"
                   href="{{URL::to("note/list/0/1")}}">Bloc-notes,
                    gestionnaire de fichiers en ligne</a></li>
            <li><a class="btn btn-large btn-primary openbutton app" href="{{route("freezer") }}">Freezer</a></li>
        </ul>

    </div>
@endsection
