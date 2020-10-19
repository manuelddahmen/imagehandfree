<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

Class FileSystemController extends Controller
{
    private $rootPath = "datafiles";
    private $username;

    public function __construct()
    {
    	if(Auth::user()!=NULL) {
		    $this->username = Auth::user()->username;
	    }
    }

    /**methods:
     * En cas d'upload
     */
    public function postAddFile($filename, $folderId, $mime, $tempFile = null, $forceContentToDatabase = FALSE)
    {

    }

    public function postAddFolder($filename, /* $mime='directory', isDirectory*/
                                  $folderId)
    {

    }

    public function postCreateRoot($filename)
    {

    }

    /**
     * En cas d'utilisation du navigation Verify qu'on ne déplace ou copie le fichier /
     * A priority: move, copy: on move de db à db et de fs à fs.
     *
     * /**
     * //getId(???)
     * copy($fileOrDirectory_id, $directory_id)
     * move($fileOrDirectory_id, $directory_id)
     * /*
     * Actions multi-users
     **/

    public function getCopy($fileOrDirectory_id, $directory_id)
    {

    }

    public function getMove($fileOrDirectory_id, $directory_id)
    {

    }
    public function postCopyTo($fileOrDirectory_id, $user_id)
    {

    }

    public function postDelete($fileOrDirectory_id)
    {

    }
}
