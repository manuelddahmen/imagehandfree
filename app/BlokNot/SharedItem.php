<?php
/**
 * Created by PhpStorm.
 * User: mary
 * Date: 16-02-16
 * Time: 02:13
 */

namespace app\BlokNot;

use Illuminate\Database\Eloquent\Model;

class SharedItem extends Model
{
    public $incrementing = true;
    public $primaryKey = 'id';
    public $timestamps = true;
    protected $table = "share";
    protected $guarded = array('id');
    protected $fillable = ["id",
        "note_id",
        "givee",
        "share_id"

    ];

    function __construct($id = -1, $fields = array())
    {

    }

    function load($id)
    {

    }
}