<?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 05-10-15
 * Time: 15:47
 */

namespace App\Http\Controllers;


use App\Share;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

class ShareController extends Controller
{
    public $incrementing = true;
    public $primaryKey = 'id';
    public $timestamps = true;

    /***
     * Liste des élément partagés par l'utilisateur
     * (utilisateur courant)
     * Retourne collection de Note
     */
    function shares()
    {

    }

    /***
     * Liste des élément partagés avec l'utilisateur
     * (utilisateur courant)
     * Retourne SQL result array
     */
    function sharedWithMe()
    {
        $email = Auth::user()->email;

        return getSharedWithMe();
    }
    function sharedFromMe()
    {
        $email = Auth::user()->email;

        return getSharedFromMe();
    }

    /**
     * -- phpMyAdmin SQL Dump
     * -- version 3.5.8.1
     * -- http://www.phpmyadmin.net
     * --
     * -- Host: manudahmen.be.mysql:3306
     * -- Generation Time: Feb 23, 2017 at 10:55 PM
     * -- Server version: 5.5.53-MariaDB-1~wheezy
     * -- PHP Version: 5.4.45-0+deb7u7
     *
     * SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
     * SET time_zone = "+00:00";
     *
     * --
     * -- Database: `manudahmen_be`
     * --
     *
     * -- --------------------------------------------------------
     *
     * --
     * -- Table structure for table `bn2_share`
     * --
     *
     * CREATE TABLE IF NOT EXISTS `bn2_share` (
     * `id` int(11) NOT NULL AUTO_INCREMENT,
     * `note_id` int(11) NOT NULL,
     * `type` enum('CONFIDENTIAL','WITHFRIEND','WFRIENDBYEMAIL','WFRIENDBYEMAILWATTACHMENT','GROUP','ALLFRIENDS','PUBLIC') NOT NULL,
     * `givee` varchar(500) NOT NULL,
     * `share_id` int(11) NOT NULL,
     * `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     * `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
     * PRIMARY KEY (`id`),
     * KEY `note_id` (`note_id`,`givee`)
     * ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
     * updated_at
     * timestamp  on update CURRENT_TIMESTAMP No CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Change Change  Drop Drop  Show more actions More
     */
    function postForm($noteId)
    {
        echo "En cours de développement";

        $sharing_type = Input::get("sharing_type");
        $email = Input::get("email");
        $email_attached = Input::get("email_attached");
        $sharing_type_contact = explode(",", Input::get("sharing_type_contact"));

        if ($sharing_type == "email") {
            echo "Partager avec &lt;$email&gt;";
            $share = new Share(Auth::user()->email, "WFRIENDBYEMAIL", $noteId, 0, $email);
            /*if (User::findByEmail($adresse)) {
                $share->getLien();
                $share->envoyerLien();
                $share->save();
            } else {

            }*/
        } else if ($sharing_type == "email_attached") {
            echo "Partager avec &lt;$email_attached&gt; en pièces jointes";
            $share = new Share(Auth::user()->email, "WFRIENDBYEMAILWATTACHMENT", $noteId, 0, $email_attached);
            /*$share = new Share(Auth::user()->email, $noteId, $adresse);
            if (User::findByEmail($adresse)) {
                $share->getLien();
                $share->envoyerLien();
                $share->save();
            } else {

            }*/
        } else if ($sharing_type == "public") {
            echo "Publication entièrement publique";
            $share = new Share(Auth::user()->email, "PUBLIC", $noteId, 0, 'PUBLIC');
        } else if ($sharing_type == "all contacts") {
            echo "Publication avec tous les contacts";

        } else if ($sharing_type == "contacts") {
            echo "Publication avec un ou plusieurs contact(s): ";
            $contacts = $sharing_type_contact;
            print_r($contacts);
            $shares = array();
            $i = 0;
            foreach ($contacts as $contact) {
                if ($contact != NULL) {
                    $share = new Share(Auth::user()->email, "WITHFRIEND", $noteId, 0, $contact);
                    $shares[$i] = $share;
                }
            }
        } else if ($sharing_type == "group") {
            echo "Partager avec un groupe";
            $contacts = explode(",", Input::get("sharing_type_group"));
            print_r($contacts);

        } else if ($sharing_type == "confidential") {
            echo "Publication privée (confidentielle)";

        } else
            die("Choix non valide ou non fonctionnel");

        if (isset($shares)) {
            foreach ($shares as $s) {
                if (strlen($s) > 0) {
                    $s->save();
                }
            }
        } else {
            if (isset($share) && strlen($share) > 0) {
                $share->save();
            }
        }
    }
}