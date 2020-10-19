<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    public $timestamps = true;
    public $table = "share";
    public $id;
    public $givee;
    public $type;
    public $noteId;

    public function __construct($username, $type, $noteId, $id = 0, $givee = NULL)
    {
        $this->id = $id;
        $this->noteId = $noteId;
        $this->givee = $givee;
        $this->type = $type;

        $this->setAttribute("note_id", $noteId);
        $this->setAttribute("givee", $givee);
        $this->setAttribute("type", $type);

        if ($id != 0)

        {
            $this->load($id);
        }

    }

    public function load($id)
    {
        global $mysqli;
        $this->id = $this->id = $id;
        $res = simpleQ($mysqli, "select * from " . "bn2_" . "share where id=" . ((int)$id));
        $row = mysqli_fetch_assoc($res);
        if ($row != NULL)
        {
            $this->noteId = $row["note_id"];
            $this->id = $row["id"];
            $this->givee = $row["givee"];
            $this->type = $row["type"];

            $this->setAttribute("note_id", $row["note_id"]);
            $this->setAttribute("id", $row["id"]);
            $this->setAttribute("givee", $row["givee"]);
            $this->setAttribute("type", $row["type"]);

        } else {
            $this->id = 0;
        }
    }




}
