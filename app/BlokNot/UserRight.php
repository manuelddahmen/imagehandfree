<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 23-04-16
 * Time: 04:17
 */

namespace App\BlokNot;


class UserRight extends Model
{
    private $RIGHTS = NULL;
    private $id;


    function __construct($user_id, $note_id = 0)
    {
        if (Auth::user()->email == $user_id) {

        }
        if ($this->RIGHTS == NULL) {
            $rights_res = DB::select("select * from bn2_status");

            while (($row = mysqli_fetch_assoc($rights_res)) !== FALSE) {
                $this->RIGHTS[$row['id']] = $row['id'];
                $this->RIGHTS[$row['name']] = $row['name'];
                $this->RIGHTS[$row['description']] = $row['description'];
            }
        }


    }

    public function getNote()
    {

    }

    public function getRights()
    {

    }
}