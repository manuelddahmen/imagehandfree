<?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 21-10-15
 * Time: 01:39
 */
namespace App;

class Reminder extends \Illuminate\Database\Eloquent\Model
{
    public $timestamps = true;
    protected $table = 'reminderpwd';
    private $id;
    private $user_id;
    private $hasBeenUsed;
    private $hache;

    /**
     * @param array $username
     */
    function __construct($userId = NULL)
    {
        parent::__construct();
        if ($userId == NULL) {
        } else {
            $this->hache = md5(date(time()) . "" . pi() . "Manuel Dahmen est très intelligent, beau, fort, et ... inquiet!");
            $this->setAttribute('user_id', $userId);
            $this->setAttribute('hache', $this->hache);
            $this->save();
        }
    }

    static function findByHache($hache)

    {
        return Reminder::where('hache', 'like', $hache)->get()->first();
    }

    static function findByUserId($uid)

    {
        return Reminder::where('user_id', '=', $uid)->get();
    }

    function isValidToken()
    {
        if (($this->getAttribute('id') > 0) and ($this->getAttribute('hasBeenUsed') == 0)) {

            return true;
        } else {
            return false;
        }
    }

    function getLink()
    {
        return asset('password/newpassword/' . $this->hache);
    }

    function findUserByHache($hache)
    {

        $userId = Reminder::where("hache", "like", $hache)->get()->first()->getAttribute('user_id');
        return $userId;

    }
}