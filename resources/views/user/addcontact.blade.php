@extends('master')
@section('title', 'Ajouter un contact')
@section('master_begin_headers')
@show



@section('header')
    <script language="JavaScript">
        mixpanel.track("Ajouter un contact", {"User": "{{  Auth::user()->email }}"});
    </script>

@show


@section("master_begin_body")
@show

@section('sidebar')
@show


@section('master_finish_sidebar')
@show


@section("master_begin_content")
@show


@section("content")
    <h1>Ajouter un contact à ma liste</h1>

    <ul>
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
    <form action="contact_store" class='form' method="POST">
        <input type="hidden" name="_token" value="{{csrf_token()}}"/>

        <div class="form-group">
        <label>Nom</label>
        <input type="text" name="name" required class='form-control' placeholder='Your name'/>
    </div>

    <div class="form-group">
        <label>Adresse E-mail </label>
        <input type='text' name="email" required class='form-control' placeholder='Your e-mail address'/>
    </div>

    <div class="form-group">
        <label>Le message à envoyer</label>
        <textarea name="message" required class='form-control' placeholder='Your message'></textarea>
    </div>

    <div class="form-group">
        <input type="submit" value="Ajouter contact" class='btn btn-primary'/>
    </div>
    </form>
@endsection






@section("master_finish_body")
@show

