<?php

public

class TokenForRemoteConnection extends Model
{
    /***
     * Each response should be XML-formatted
     * */
    public static $prefix = "bn2_";
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;


    private $TOKEN_PREFIX = "BLOKNOT-INSTANCE0";

    private $TOKEN_MAX_DURATION = 60; // (seconds)
    private $token; // (pseudo)-Random and unique string
    private $user_id;

    public function __construct($user_id)
    {
        $this->user_id = $user_id;
        $this->token = md5(uniqid($this->TOKEN_PREFIX);
        /**
         * RECORD TOKEN:
         * - check if user is still connected from other device(s) or
         * - check if old sessions exist, in this case : delete and invalidate
         * - record token with username, date, device info (if needed for securtiy
         * or informations) -- > reckeck for username and password.
         *
         * */
    }

    /***
     * Invalid: should be deleted
     * Valid until
     */
    public function tokenState()
    {
        /***
         * <token name=""> <status="invalid|renewIn" serverTime=""/><token>
         */
    }
    public function storeToken()
    {
        // Store the token in database
        return "<token name=''><life state='stored'/></token>";
    }

    /***
     * Delete TOKEN from database
     * Reasons:
     * - Invalid credentials (changes)
     * - User has Disconnected from remote app
     */
    public function deleteToken()
    {
        // Delete the token from database

        return "<token name=''><life state=deleted='stored'/></token>";
    }

    /***
     * Should be called when token is not valid, no more
     * Next action should be "reconnect" or
     * "connect another account"
     */
    public function invalidateToken()
    {
        return "<token name=''><life state='invalidated'/></token>";
    }

    /***
     * Disconnect for the reason of password changes.
     */
    public function changeUsernameOrPasssword()
    {
        return "<token name=''><state='invalid_credentials'/></token>";

    }

    /***
     * Account is no more valid (credentials failure)
     * Access to data is blocked
     */
    public function invalidateAccessToData()
    {
        return "<token name=''><state='data_disconnected'/></token>";
    }
}