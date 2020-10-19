<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 09-09-16
 * Time: 16:49
 */

namespace App\BlokNot;


use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public $incrementing = true;
    public $primaryKey = 'id';
    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'seat';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'sittee', 'thing'];
    private $owner = 0;
    private $thing = 0;

    public function __construct($owner, $thing)
    {
        super();

        setOwner($owner);
        setThing($thing);
    }

    public static function seatsFor($user)
    {
        global $mysqli;

        $sql = "select * from seat inner join bn2_filesdata where bn2_seat.thing=bn2_filesdata.id and bn2_seat.owner='" . mysqli_escape_string($mysqli, $user) . "'";

        $results = simpleQ($mysqli, $sql);

        $arr = array();
        $i = 0;
        if ($results != false) {
            while ($row = mysqli_fetch_assoc($results)) {
                $arr[$i] = array();
                $arr[$i]['id'] = $row['id'];
                $arr[$i]['owner_id'] = $row['owner'];
                $arr[$i]['thing_id'] = (int)$row['thing'];

                /// ...

                $i++;
            }
            //print_r($arr);

            mysqli_free_result($results);

            return serialize($arr);
        }

    }

    public function setOwner($owner)
    {
        $this->owner = $owner;
    }

    public function setThing($thing)
    {
        $this->thning = $thing;
    }


}