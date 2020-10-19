<?php
?>@extends('master')
@section('title', 'Partage de notes et de dossiers')

@section('header')

    @parent


    function listerLesContacts()
    {
    <?php
    $userContact = new \App\BlokNot\Contact();
    $contacts = $userContact->findByEmails(Auth::user()->email);

    foreach ($contacts as $contact)
    {
    ?>
    <input type="checkbox" name="contact"
           value="{{  $contact['id'] }}"/>
    <?php
    }
    ?>
    }

@show

@@section('sidebar')
@parent
@show

@show
@section('content')
        <!--{{ $noteId  }}--><?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 23/08/2015
 * Time: 18:33
 */

$user = Auth::user()->email;

?>
@include("note/menu", ["noteId", $noteId])
        <form action="{{asset("note/sharing/".$noteId) }}" method="post" name="choose_share">
    {{ csrf_field() }}
    <input type="hidden" name="noteId" value="{{ $noteId}}"/>
    <table>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="public"/>Entièrement pubic
        </tr>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="all contacts"/>Partager avec mes contacts (tous)
        </tr>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="contacts"/>Partager avec un ou plusieurs contact(s)
        </tr>
        <tr>
            <td></td>

            <td><input type="text" name="sharing_type_contact" value=""/>
        </tr>
        <tr>
            <td></td>
            <td><input disabled type="radio" name="sharing_type" value=""/>Partager avec les membres d'un groupe
        </tr>
        <tr>
            <td></td>

            <td><input disabled type="text" name="sharing_type_group" value=""/>
        </tr>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="email"/>Avec une personne par email</td>
        </tr>
        <tr>
            <td></td>

            <td><input type="text" name="email" value=""/>
        </tr>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="email_attached"/>Avec une personne par email (pièces
                jointes)
            </td>
        </tr>
        <tr>
            <td></td>

            <td><input type="text" name="email_attached" value=""/>
        </tr>
        <tr>
            <td></td>
            <td><input type="radio" name="sharing_type" value="confidential"/>Confidentiel (ne pas partager)
        </tr>
        <tr>
            <td><input type="submit" name="sharing_type_ok" value="Cancel"/>
            <td><input type="submit" name="sharing_type_ok" value="Envoyer"/>
        </tr>
    </table>
</form>
@stop