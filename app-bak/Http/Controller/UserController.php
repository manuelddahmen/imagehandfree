<?php
/**
 * Created by PhpStorm.
 * User: Win
 * Date: 10-01-16
 * Time: 20:57
 */

namespace App\Http\Controllers;

use App\BlokNot\Contact;
use App\Http\Requests\ContactFormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;

class UserController extends Controller
{
    public function __construct()
    {

    }

    public function init()
    {

    }
    public function postSignUp(Request $request)
    {
        $email = $request['email'];
        $first_name = $request['first_name'];
        $password = bcrypt($request['password']);


        $user = new User();
        $user->email = $email;
        $user->frist_name = $first_name;
        $user->password = $password;

        $user->save();

        return redirect()->back();
    }
    public function saveContactForm(ContactFormRequest $request)
    {

        $c0 = new Contact();
        if (($contact = $c0->findByEmails(Auth::user()->email, $request->get('email'))) == NULL) {
            $c = new Contact();
        } else {
            $c = $contact;
        }
        $u = Auth::user();
        $c->owner_id = $u->id;
            $c->contact_name = $request->get('name');
            $c->email = $request->get('email');
        $c->save();
        /*            \Mail::send('emails.contact',
                        array(
                            'name' => $request->get('name'),
                            'email' => $request->get('email'),
                            'user_message' => $request->get('message')
                        ), function ($message) {
                            global $request;
                            $message->from('info@manudahmen.be');
                            $message->to($request->get('email'), 'Admin')->subject('Join ' . Auth::user()->email . ' on BlokNot at ');
                        });
        */
        $seats = false;
        if (!isset($noteId) || ($noteId == 0)) {
            $noteId = getRootForUser();
        }

        if (!isset($filtre)) {
            $filtre = "";
        }
        $ser = \App\Note::toXMLString(\App\User::getContacts(Auth::user()->email));
        return View::make("user/contacts", ["seats" => $seats,
            "noteId" => $noteId, "page" => 1,
            "serialized_data" => $ser, "contacts" => $ser, "filtre" => $filtre, "message" => "Contact ajout&eacute;"]);
    }

    public function getHTMLOfView()
    {

    }
}