<?php

namespace App;

use App\BlokNot\UserRight;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


$LONGUEUR_APPERCU = 50;


class Note extends Model
{
    public static $prefix = "bn2_";
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;
    /*public $noteId = 0;
    public $folder_id = 1;
    public $filename  = "";
    public $filename_on_disk = "";
    public $content_file = "";
    public $mime ="text/plain";
    public $LongData ="";
    public $username = "";
    public $isDirectory = 0;*/
    public $primaryKey  = 'id';
    public $key = 'id';
    public $incrementing = true;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'filesdata';

    function __construct($noteId = 0)
    {
        parent::__construct();

        //$this->load($noteId);

        /**
         * Instantiate a new UserController instance.
         */
        //$this->beforeFilter('@checkRights');
    }


    function load($noteId)
    {
        $this->id = $this->noteId = $noteId;


        if (($noteId > 0) && (($row = getDocRow($noteId)) !== NULL)) {
            $this->folder_id = $row["folder_id"];
            $this->filename = $row["filename"];
            $this->content_file = $row["content_file"];
            $this->mime = $row["mime"];
            $this->username = $row["username"];
            $this->filename_on_disk = $row["filename_on_disk"];

            $this->setAttribute("folder_id", $row["folder_id"]);
            $this->setAttribute("filename", $row["filename"]);
            $this->setAttribute("content_file", $row["content_file"]);
            $this->setAttribute("mime", $row["mime"]);
            $this->setAttribute("username", $row["username"]);
            $this->setAttribute("filename_on_disk", $row["filename_on_disk"]);

        } else {
            $this->id = 0;
            $this->folder_id = Auth::check() ? getRootForUser(Auth::user()->email) : 0;
            $this->filename = "Nouveau fichier";
            $this->content_file = "Nouvelle note";
            $this->mime = "text/plain";
            $this->filename_on_disk = "";

            $this->setAttribute('id', 0);
            $this->setAttribute("folder_id", $this->folder_id);
            $this->setAttribute("filename", $this->filename);
            $this->setAttribute("content_file", $this->content_file);
            $this->setAttribute("mime", $this->mime);
            $this->setAttribute("filename_on_disk", "");
        }
    }

    public static function getFolder($noteId, $filtre)
    {
        global $prefix;
        return Note::getDocumentsFiltered($filtre, false
            /* variable inutile dans la fonction, sauf mise à jour de la fonction
pour recherche), false /* Mettre à jour quand l'association de fichiers sera effective
 dans l'interface, mais l'interface c'est ici ! :) */, $noteId, Auth::user()->email);

    }

    private static function getDocumentsFiltered($filtre, $composedOnly, $pathId, $user)
    {
        global $mysqli;

        if ($pathId == 0) {
            $pathId = getRootForUser($user);
        }
        $deleted = 0;
        if ($pathId == -1) {
            $deleted = 1;
        }
        global $sqlStmt;
        $sqlStmt = "SELECT * FROM bn2_filesdata " .
            "WHERE username='" . mysqli_real_escape_string($mysqli, $user) .
            "' and ((filename like '%" . mysqli_real_escape_string($mysqli, $filtre) .
            "%') or (content_file like'%" . mysqli_real_escape_string($mysqli, $filtre) .
            "%') and (content_file like '%" . mysqli_real_escape_string($mysqli, $filtre) .
            "%' " .
            ($composedOnly ? "{{" : "") . " )) " . " and isDeleted=" .
            ((int)$deleted)
            . " " . (($pathId == "") ? "" : " and folder_id=" . ((int)$pathId));

        $result = simpleQ($mysqli, $sqlStmt);
        // echo $sqlStmt;

        return $result;
    }

    public static function getTrash()
    {

        global $mysqli;
        //return DB::select("select * from filesdata where (isDeleted=1 or (id<=0 or email is null)) and email='" . Auth::user()->email)."'";
        $res = simpleQ("select * from " . Note::$prefix . "filesdata where isDeleted = 1 and where username='" . mysqli_real_escape_string($mysqli, Auth::user()->email) . "'", $mysqli);
        echo $res;
        return $res;
    }

    public static function getSharedWithMe()
    {
        global $mysqli;
        //return DB::select("select *  from guests as g inner join filesdata as d on g.user_owner_id where g.user_guest_id=" . Auth::user()->id);
        $realSQL = "select *," . Note::$prefix . "guests.user_guest_id as ownerId from " . Note::$prefix . "filesdata inner join " . Note::$prefix . "users on " .
            Note::$prefix . "filesdata.username = " . Note::$prefix . "users.email
         inner join " . Note::$prefix . "guests on " . Note::$prefix . "guests.user_owner_id =" . Note::$prefix . "users.id inner join "
            . Note::$prefix . "users as guests_user on " . Note::$prefix . "guests.user_owner_id=" . Note::$prefix . "users.id" .
            " where " .
            Note::$prefix . "users.id='" . mysqli_real_escape_string($mysqli, Auth::user()->email) . "' and guests_user.email <> " .
            Note::$prefix . "users.email " .
            "  and  " . Note::$prefix . "filesdata.isDeleted=1";
        $res = simpleQ($mysqli, $realSQL);
        return $res;
    }

    public static function getSharedFromMe()
    {
        global $mysqli;
        //return DB::select("select *  from guests as g inner join filesdata as d on g.user_owner_id where g.user_guest_id=" . Auth::user()->id);
        $realSQL = "select " . Note::$prefix . "filesdata.*, type from " . Note::$prefix . "filesdata inner join " . Note::$prefix . "share on " .
            Note::$prefix . "filesdata.username=" .
            Note::$prefix . "share.givee and " . Note::$prefix . "filesdata.id=" . Note::$prefix . "share.note_id where " . Note::$prefix . "share.givee='" . Auth::user()->email .
            "' union select " . Note::$prefix . "filesdata.*, type " .
            " from " . Note::$prefix . "filesdata " .
            "inner join " . Note::$prefix . "share on " . Note::$prefix . "filesdata.id=" . Note::$prefix . "share.note_id where " . Note::$prefix . "share.type='PUBLIC';";
        //echo $realSQL;
        $res = simpleQ($mysqli, $realSQL);

        return $res;
    }
    public static function toXMLString($results)
    {
        if (is_string($results)) {
            return $results;
        }
        if (is_array($results)) {
            return serialize($results);
        }


        global $LONGUEUR_APPERCU;
        $arr = array();
        $i = 0;
        if ($results != false) {
            while (($row = mysqli_fetch_assoc($results)) != NULL) {
                /*$arr[$i] = array();
                $arr[$i]['filename'] = $row['filename'];
                $arr[$i]['content'] = $row['content_file'];
                $arr[$i]['id'] = (int)$row['id'];
                $arr[$i]['folder_id'] = (int)$row['folder_id'];
                $arr[$i]['mimeType'] = $row['mime'];
                $arr[$i]['isDirectory'] = (int)$row['isDirectory'];
                $arr[$i]['ownerId'] = "Not implemented yet";//(int)$row['guests_user.email'];
                */
                foreach ($row as $key => $value) {
                    $arr [$i][$key] = $row[$key];
                }
                $i++;
            }
            //print_r($arr);

            mysqli_free_result($results);

            return serialize($arr);
        }
        return NULL;
    }

    public function checkUserRights($user)
    {
        $current_user = userAuth::user()->email;


    }

    function initGetData()
    {
        $sql = "select content_file from bn2_filesdata where id=" . ((int)$this->id);
        $stmt = mysqli_stmt_init();
        $this->LongData = $stmt->prepare($sql);
    }

    function getDataInPieces($offset)
    {
        return mysqli_stmt_fetch($this->LongData);

        /*
         * int mysql_stmt_fetch_column(MYSQL_STMT *stmt, MYSQL_BIND *bind, unsigned int column, unsigned long offset)

Description

Fetch one column from the current result set row. bind provides the buffer where data should be placed. It should be set up the same way as for mysql_stmt_bind_result(). column indicates which column to fetch. The first column is numbered 0. offset is the offset within the data value at which to begin retrieving data. This can be used for fetching the data value in pieces. The beginning of the value is offset 0.

Return Values

Zero for success. Nonzero if an error occurred.
         */
    }

    function initSetData()
    {
        $sql = "update bn2_filesdata set content_file='?'";
        $stmt = mysqli_stmt_init();
        $this->LongData = $stmt->prepare($sql);


    }

    function setDataInPieces($data)
    {
        return ($this->LongData->send_long_data($this->LongData, 0, $data));

        /*
         * my_bool mysql_stmt_send_long_data(MYSQL_STMT *stmt, unsigned int parameter_number, const char *data, unsigned long length)

    Description

    Enables an application to send parameter data to the server in pieces (or �chunks�). Call this function after mysql_stmt_bind_param() and before mysql_stmt_execute(). It can be called multiple times to send the parts of a character or binary data value for a column, which must be one of the TEXT or BLOB data types.

    parameter_number indicates which parameter to associate the data with. Parameters are numbered beginning with 0. data is a pointer to a buffer containing data to be sent, and length indicates the number of bytes in the buffer.

    Note
    The next mysql_stmt_execute() call ignores the bind buffer for all parameters that have been used with mysql_stmt_send_long_data() since last mysql_stmt_execute() or mysql_stmt_reset().

    If you want to reset/forget the sent data, you can do it with mysql_stmt_reset(). See Section 20.6.11.21, �mysql_stmt_reset()�.

    Return Values

    Zero for success. Nonzero if an error occurred.
         */

    }


    public function checkRights()
    {
        return new UserRight(Auth::user()->id, $this->noteId);
    }


    public function getUserRights($user_id)
    {

    }
}

?>