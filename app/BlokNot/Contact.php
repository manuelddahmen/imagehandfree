<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 18-02-16
 * Time: 06:07
 */

namespace App\BlokNot;

use App\Note;
use Illuminate\Database\Eloquent\Model;


class Contact extends Model
{
    public $prefix = "bn2_";
    public $primaryKey = 'id';
    public $fillable = ["id", "list_id", "owner_id", "email", "contact_name"
    ];
    public $table = "contacts";
    public $timestamps = true;

    function __construct($noteId = 0)
    {
        parent::__construct();

        $this->load($noteId);

        /**
         * Instantiate a new UserController instance.
         */
        //$this->beforeFilter('@checkRights');
    }


    function load($id = NULL)
    {
        global $mysqli;

        $this->id = $id;

        $res = simpleQ($mysqli, "select c.id as cid, contact_name as name, email as email, owner_id from " . Note::$prefix . "contacts where id=" . $id);
        if ($res != NULL) {
            $row = mysqli_fetch_assoc($res);
        } else {
            $row = NULL;
        }
        if (($id > 0) && (($row !== NULL))) {
            $this->id = $row['id'];
            $this->contact_name = $row["name"];
            $this->email = $row["email"];
            $this->owner_id = $row["owner_id"];

            $this->setAttribute('id', $row["id"]);
            $this->setAttribute("contact_name", $row["name"]);
            $this->setAttribute("email", $row["email"]);
            $this->setAttribute("owner_id", $row["owner_id"]);


        } else {
            $this->id = 0;
            $this->contact_name = $row["name"];
            $this->email = $row["email"];
            $this->owner_id = $row["owner_id"];


            $this->setAttribute('id', 0);
            $this->setAttribute("contact_name", $row["name"]);
            $this->setAttribute("email", $row["email"]);
            $this->setAttribute("owner_id", $row["owner_id"]);

        }
    }

    public function findByEmails($email)
    {
        global $mysqli;
        $sql = "select ct.* from " . $this->prefix .
            $this->table . " as ct inner join " . $this->prefix . "users as ut on 
        ct.owner_id=ut.id where ut.email='" . $email . "'";

        $contacts = array();

        if (($res = simpleQ($mysqli, $sql)) != NULL) {
            $row = mysqli_fetch_assoc($res);
            if ($row != NULL) {
                $contacts[$row["id"]] = $row;
            }

        }
        return $contacts;
    }
}