<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
require_once(base_path()."/main_functions.php");


Route::get("/", ["as" => "root", "uses" => function () {
		return view("home");
	}
	]
);


Route::get('profile', ["middleware" => "auth", "uses" => function () {

	return view("profile");
}]);

Route::resource('filesystem', 'FileSystemController');
Route::get('profile/save', ["middleware" => "auth", "uses" => 'ProfileController@save']);

Route::get('auth/login', ["as" => "login_form", "uses" =>
		function()
		{
			return view("auth/login");
		}]
);

Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');


Route::post('auth/checkregistered', [
        function(){
            return view("auth/checkregistered");
        }]
);
Route::get('auth/checkregistered', [
        function(){
            return view("auth/checkregistered");
        }]
);

Route::post('post_images', function () {
	require_once("../app_tinymce_file_acceptor.php");
});


Route::get('auth/register', ["as" => "signup", "uses" =>
	function() {
		return view('auth/register');
	}]);

Route::post('auth/register', ['as' => 'register_submit', 'uses' => 'Auth\AuthController@create']);

Route::get('radio', ['middleware' => "auth", "uses" => function () {
	return view('radio.index');
}]);

Route::get("note/view/{noteId}", [
	'middleware' => "auth",
	"uses" => function ($noteId) {
		return View::make('note/view', ["noteId" => $noteId]);
	}])->where('noteId', '[0-9]+');


Route::get('note/edit/{noteId}', ['middleware' => "auth", "uses" => function ($noteId) {
	return view('note/edit', ["noteId" => $noteId]);
}])->where('id', '[0-9]+');
Route::get('note/joint/new/{noteId}', ['middleware' => "auth", "uses" => function ($noteId) {
	return view('note/joint/new', ["noteId" => $noteId]);
}])->where('id', '[0-9]+');
Route::get('note/new/{folderId}', ['middleware' => "auth",
                                   "uses" => function ($folderId) {
	                                   return view('note/new', ["folderId" => $folderId]);
                                   }])->where('id', '[0-9]+');

Route::post("note/save/txt/{noteId}", [
		'middleware' => "auth",
		'uses' => "NoteController@saveTxt",
		"before" => "csrf"
	]
);
Route::post("note/media", [
		'middleware' => "auth",
		'uses' => "NoteController@addMedia"
	]
);

Route::post("note/addData", [
		'middleware' => "auth",
		'uses' => "NoteController@addData"
	]
);

Route::get("about", function () {
	return view("about");
});
Route::get("apropos", function () {
	return view("about");
});

Route::get("home", function () {

	return view("home");
});

Route::get("freezer", ["as" => "freezer", "uses" => function () {
	return View::make("freezer");
}]);

Route::get("note/list/{noteId}/{page}", [
	'middleware' => 'auth',
	'uses' => function ($noteId = 0, $page = 1) {
		if (!isset($noteId) || ($noteId == 0)) {
			$noteId = getRootForUser();
		}

		if (!isset($filtre)) {
			$filtre = "";
		}
		$ser = App\Note::toXMLString(\App\Note::getFolder($noteId, $filtre));

		return view("note/list", ["noteId" => $noteId, "page" => $page, "serialized_data" => $ser, "filtre" => $filtre]);
	}
]);

Route::post("note/sharing/{noteId}",
	[
		'before' => 'csrf',
		"middleware" => "auth",
		"uses" => "\\App\\Http\\Controllers\\ShareController@postForm"
	]);


Route::get('note/share/from', ["middleware" => "auth",
                               "uses" => function () {
	                               if (!isset($noteId) || ($noteId == 0)) {
		                               $noteId = getRootForUser();
	                               }

	                               if (!isset($filtre)) {
		                               $filtre = "";
	                               }
	                               $ser = \App\Note::toXMLString(getSharedFromMe());

	                               return View::make("note/list", ["noteId" => $noteId, "page" => 1, "serialized_data" => $ser, "filtre" => $filtre]);
                               }
]);
Route::get('note/share/to', ["middleware" => "auth",
                             "uses" => function () {
	                             if (!isset($noteId) || ($noteId == 0)) {
		                             $noteId = getRootForUser();
	                             }

	                             if (!isset($filtre)) {
		                             $filtre = "";
	                             }
	                             $ser = \App\Note::toXMLString(getSharedWithMe());

	                             return View::make("note/list", ["noteId" => $noteId, "page" => 1, "serialized_data" => $ser, "filtre" => $filtre]);
                             }
]);

Route::get('note/share/{noteId}', ["middleware" => "auth", "uses" => function ($noteId) {

	return View::make("note/share", ["noteId" => $noteId]);
}])->where(['noteId' => '[0-9]+']);


Route::get('note/trash', ["middleware" => "auth", "uses" => function () {
	return View::make("note/list/trash", []);
}
]);

Route::get("note/ed_browser", [
	'middleware' => "auth",
	'uses' => function () {
		return View::make("note/ed_browser");
	}
]);
Route::get("notes", ["as" => "notes", "uses" => function () {
	return View::make("notes");
}
]);
/**
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 */
Route::get("file/mime-type/{id}", ['middleware' => "auth",
                                   'uses' => function ($id) {
	                                   $user = Auth::user()->email;
	                                   $doc = getDocRow(Input::get("id", 0) != "" ? Input::get("id", 0) != "" : $id, $user);
	                                   if ($doc != FALSE) {
		                                   $mime = $doc['mime'];


		                                   $response = Response::make($mime, 200);
		                                   $response->header('Content-Type', "text/plain");
		                                   return $response;
	                                   }
                                   }
	]
);


/**
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 */
Route::get("file/view/{id}", ['middleware' => "auth",
                              'uses' => function ($id) {
	                              $user = Auth::user()->email;
	                              $note = getDBDocument(Input::get("id", 0) != "" ? Input::get("id", 0) != "" : $id, $user);
	                              //if ($result != NULL) {
	                              if ($note->id != 0) {
		                              $filename = $note->filename;
		                              if ($note->filename_on_disk != "") {
			                              $filenameOnDisk = $note->filename_on_disk;
			                              $content = file_get_contents(asset("datafiles/" . $note->folder_id . "/" . $filenameOnDisk));
			                              $ext = getExtension($note->filename);
		                              } else {
			                              $content = $note->content_file;
			                              $ext = getExtension($filename);
		                              }


		                              if (isImage($ext, $note->mime)) {
			                              $response = Response::make($content, 200);
			                              $response->header('Content-Type', imgSelf($content, $filename));
			                              return $response;
		                              } else if (isVideo($ext, $note->mime)) {
			                              $response = Response::make($content, 200);
			                              $response->header('Content-Type', vidSelf($content, $filename));
			                              $response->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
			                              return $response;
		                              } else if (isAudio($ext, $note->mime)) {
			                              $response = Response::make($content, 200);
			                              $response->header('Content-Type', audioSelf($content, $filename));
			                              $response->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
			                              return $response;
		                              } else if (isTexte($ext, $note->mime)) {
			                              $content = str_replace("[[", "<a target='NEW' href='", $content);
			                              $content = str_replace("]]", "'>Lien</a>", $content);
			                              $content = str_replace("{{", "<img src='" . asset("file/view/"), $content);
			                              $content = str_replace("}}", "'/>", $content);
			                              $content = str_replace("((", "<span class='included_doc'>include doc n0", $content);
			                              $content = str_replace("))", "</span>", $content);

			                              $response = Response::make("<p><em>" . $filename . "</em></p>" . $content, 200);
			                              $response->header('Content-Type', "text/html");
			                              return $response;

		                              } else {
			                              $response = Response::make($content, 200);
			                              $response->header('Content-Type', $note->mime);
			                              return $response;

		                              }
	                              }
	                              //} else {
	                              $response = Response::make("404 NOT FOUND ...", 404);
	                              return $response;
	                              //}


                              }]);


/**
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 */
Route::get("file/share/{id}", ['middleware' => "auth",
                               'uses' => function ($id) {


	                               $user = Auth::user()->email;
	                               $note = getSharedDocument(Input::get("id", 0) != "" ? Input::get("id", 0) != "" : $id, $user);
	                               //if ($result != NULL) {
	                               if ($note->id != 0) {
		                               $filename = $note->filename;
		                               if ($note->filename_on_disk != "") {
			                               $filenameOnDisk = $note->filename_on_disk;
			                               $content = file_get_contents(asset("datafiles/" . $note->folder_id . "/" . $filenameOnDisk));
			                               $ext = getExtension($note->filename);
		                               } else {
			                               $content = $note->content_file;
			                               $ext = getExtension($filename);
		                               }


		                               if (isImage($ext, $note->mime)) {
			                               $response = Response::make($content, 200);
			                               $response->header('Content-Type', imgSelf($content, $filename));
			                               return $response;
		                               } else if (isVideo($ext, $note->mime)) {
			                               $response = Response::make($content, 200);
			                               $response->header('Content-Type', vidSelf($content, $filename));
			                               $response->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
			                               return $response;
		                               } else if (isAudio($ext, $note->mime)) {
			                               $response = Response::make($content, 200);
			                               $response->header('Content-Type', audioSelf($content, $filename));
			                               $response->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
			                               return $response;
		                               } else if (isTexte($ext, $note->mime)) {
			                               $content = str_replace("[[", "<a target='NEW' href='", $content);
			                               $content = str_replace("]]", "'>Lien</a>", $content);
			                               $content = str_replace("{{", "<img src='" . asset("file/view/"), $content);
			                               $content = str_replace("}}", "'/>", $content);
			                               $content = str_replace("((", "<span class='included_doc'>include doc n0", $content);
			                               $content = str_replace("))", "</span>", $content);

			                               $response = Response::make("<p><em>" . $filename . "</em></p>" . $content, 200);
			                               $response->header('Content-Type', "text/html");
			                               return $response;

		                               } else {
			                               $response = Response::make($content, 200);
			                               $response->header('Content-Type', $note->mime);
			                               return $response;

		                               }
	                               }
	                               //} else {
	                               $response = Response::make("404 NOT FOUND ...", 404);
	                               return $response;
	                               //}


                               }]);
/**
 *
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 */
Route::get("icone/{id}/{taille}", ['middleware' => "auth",
                                   'uses' => function ($id, $taille) {
	                                   $user = Auth::user()->email;
	                                   $note = getDBDocument(Input::get("id", 0) != "" ? Input::get("id", 0) != "" : $id);
	                                   if ($note->id != 0) {
		                                   $filename = $note->filename;
		                                   $content = $note->content_file;
		                                   $ext = getExtension($filename);
		                                   $mime = $note->mime;


		                                   if (isImage($ext, $mime)) {
			                                   // Output and free from memory
			                                   header('Content-Type: ' . $mime . "\n");
			                                   $res = redimAndDisplay($content, $mime, $taille);
		                                   } else if (isTexte($ext, $mime)) {
			                                   // TODO
			                                   $content = str_replace("[[", "<a target='NEW' href='", $content);
			                                   $content = str_replace("]]", "'>Lien</a>", $content);
			                                   $content = str_replace("{{", "<img src='" . asset("file/view/"), $content);
			                                   $content = str_replace("}}", "'/>", $content);
			                                   $content = str_replace("((", "<span class='included_doc'>include doc n0", $content);
			                                   $content = str_replace("))", "</span>", $content);

			                                   $response = Response::make("<p><em>" . $filename . "</em></p>" . $content, 200);
			                                   $response->header('Content-Type', "text/plain");
			                                   return $response;

		                                   } else {
			                                   //TODO
			                                   $response = Response::make($content, 200);
			                                   $response->header('Content-Type', $mime);
			                                   return $response;

		                                   }
	                                   } else {
		                                   $response = Response::make("404 NOT FOUND ...", 404);
		                                   return $response;
	                                   }


                                   }]);

Route::get("file/download/{noteId}", [
	"middleware" => "auth",
	"uses" => function ($noteId) {
		$doc = getDocRow($noteId);
		if ($doc != FALSE) {
			$doc_content = getField($doc, "content_file");
			$response = Response::make($doc_content, 200);
			$response->header('Content-Type', $doc["mime"]);
			$response->header("Content-Disposition", "attachment; filename=" . $doc["filename"] . "");
			$response->header("Content-length", strlen($doc_content));
			$response->header("Cache-control", "private.php");
			return $response;
		}

	}]);

/*
function printImgSelf($content, $filename)
{
	header('Content-type:image/' . getExtension($filename));



	echo $content;
}

function imgSelf($content, $filename)
{
	return 'image/' . getExtension($filename);

//    echo $content;

}

function vidSelf($content, $filename)
{
	return 'videoFlow/' . getExtension($filename);

//    echo $content;

}

function audioSelf($content, $filename)
{
	return 'audio/' . getExtension($filename);

//    echo $content;

}*/

Route::get("note/save/txt/{noteId}", ['before' => 'csrf',
                                      "middleware" => "auth",
                                      "uses" => "NoteController@saveTxt"]);
Route::get("note/save/img/{noteId}", ['before' => 'csrf',
                                      "middleware" => "auth",
                                      "uses" => "NoteController@saveImg"]);
Route::get("note/save/other/{noteId}", [
	"middleware" => "auth",
	"uses" => "NoteController@saveOther"]);
Route::get("note/delete/{noteId}", ['before' => 'csrf',
                                    "middleware" => "auth",
                                    "uses" => "NoteController@delete"]);

Route::get("file/uploadform/{folderId}", ["middleware" => "auth",
                                          "uses" => function ($folderId) {
	                                          return View::make("file/uploadform", ["folderId" => $folderId]);
                                          }]);
Route::post("file/upload/{folderId}", ['before' => 'csrf',
                                       "middleware" => "auth",
                                       "uses" => "NoteController@uploadMultiple"]);

Route::get("note/joint/new/{noteId}", ["middleware" => "auth",
                                       "uses" => function ($noteId) {
	                                       return View::make("note/joint/new")->with("noteId", $noteId);
                                       }]);

Route::get("note/joint/edit/{jointId}", ["middleware" => "auth",
                                         "uses" => function ($jointId) {
	                                         return View::make("note/joint/edit", ["jointId" => $jointId]);
                                         }]);
Route::get("note/joint/list/{noteId}", ["middleware" => "auth",
                                        "uses" => function ($noteId) {
	                                        return View::make("note/joint/list", ["noteId" => $noteId]);
                                        }]);
Route::post("note/joint/save/{jointId}", ["middleware" => "auth",
                                          "uses" => "LienController@save"]);
Route::get("search", [
	'middleware' => "auth",
	"uses" => "NoteController@search"
]);
Route::get("folder/new/{folderId}", ["middleware" => "auth",
                                     "uses" => function ($folderId) {
	                                     return View::make("folder/new", ["folderId" => $folderId]);
                                     }]);
Route::post("folder/create/{folderId}", ["middleware" => "auth",
                                         "uses" => "NoteController@createFolder"]);

Route::get
  
 ("email/lost", ['uses' => function () {
	return View::make("auth/lost");
}]);
Route::post("email/reset", ['before' => 'csrf', 'uses' => "Auth\\ForgotPasswordController@__invoke"

  

    

	
] 

);

Route::get('password/newpassword/{hache}', function ($hache) {
	$reminder = \App\Reminder::findByHache($hache);
	if ($reminder->isValidToken()) {
		$userId = $reminder->findUserByHache($hache);
		$user = \App\User::findOrFail($userId);
		return View::make("password/newpassword")->with('user', $user);
	} else {
		return View::make('password/invalidtoken');
	}
});

Route::post('password/reset',
	['before' => 'csrf',
	 "uses" => "\\App\\Http\\Controllers\\Auth\\PasswordController@postReset"]


);
Route::get("guests/offer_place", [
		"middleware" => "auth",
		'uses' => function () {
			return View::make("guests/offer_place");
		}
	]
);
Route::get("user/myseats", [
		"middleware" => "auth",
		'uses' => function () {
			$seats = \App\BlokNot\Seat::seatsFor(Auth::user()->email);
			return View::make("user/myseats", ["seats" => $seats]);
		}
	]
);


/*
Route::get("guest_offer_pieces", []
);
*/

Route::post("guests/offer_place_submitting", [
		"middleware" => "auth",
		'before' => 'csrf',
		"uses" => "\\App\\Http\\Controllers\\GuestController@postGuest"
	]
);

/**
 * Should return JS code : var instanceId and an JS object with class definition
 * to manage from JS : 1) L'apparence, le dossier courant, la navigation entre
 * les fichiers partagé et l'espace personnel, la copie de fichier partagés, le déplacement
 * de fichiers, la suppression de fichier personnel.
 */
Route::get("browser/folder/html/{folderId}/{typeOf}", [
		"middleware" => "auth",
		'before' => 'csrf',
		"uses" => "\\App\\Http\\Controllers\\BrowserController@getHTMLOfView"
	]
);
Route::get("browser/guest/html/{guestId}/{typeOf}", [
		"middleware" => "auth",
		'before' => 'csrf',
		"uses" => "\\App\\Http\\Controllers\\BrowserController@getHTMLOfView"
	]
);
Route::get("browser/guest/selection/", [
		"middleware" => "auth",
		'before' => 'csrf',
		"uses" => "\\App\\Http\\Controllers\\BrowserController@getHTMLOfView"
	]
);
/*
 * Route::controller("wppost");
Route::controller("wordpressInstallation");
*/


Route::get("contacts", function () {
	return View::make("contact/list");
}
);


Route::get("record_something", function () {
	return View::make("note/record");
});

Route::post("file/record/{folderId}", "NoteController@saveVideoFromWebcam");

Route::get("remote/oauth-2.0/examples/api.php",
	function () {
		require_once(realpath(base("remote/oauth-2.0/examples/api.php")));
	}
);
Route::get("dessin",
	function () {
		return View::make("apps/Simple-HTML5-Drawing-App-master/html5-canvas-drawing-app");
	}
);

Route::get("note/list/search/{filtre}",
	function ($filtre) {
		return View::make("note/list/search", ["filtre", $filtre]);
	}
);
Route::get("communication/video", [
		"middleware" => "auth",
		function () {
			return View::make("communication/video");
		}
	]
);
Route::get("communication/audio", [
		"middleware" => "auth",
		function () {
			return View::make("communication/audio");
		}
	]
);
Route::get("communication/texto", [
		"middleware" => "auth",
		function () {
			return View::make("communication/text");
		}
	]
);
Route::get("communication/sandbag", [
		"middleware" => "auth",
		function () {
			return View::make("communication/sandbag");
		}
	]
);

Route::get("mobapps/android/loginFromApp/{email}", [
		"uses" => function ($email) {
			return View::make("mobapps/android/loginFromApp")->with('email', $email);
		}
	]
);
Route::get("mobapps/android/checkAndLog/{email}/{hach}", [
		"middleware" => "guest",
		"uses" => "\\App\\Http\\Controllers\\Auth\\AuthController@remoteLogin"/*function ($email, $hasches) {
            return View::make("mobapps/android/checkAndLog", ['email' => $email, 'hasches' => $hasches]);
        }*/

	]
);
Route::get("statistics/totale", [
		"middleware" => "auth",
		"uses" => function () {
			return View::make("stats/totale");
		}
	]
);
Route::get("statistics/personal", [
		"middleware" => "auth",
		"uses" => function () {
			return View::make("stats/personal");
		}
	]
);
Route::get("user/addcontact", [
	"middleware" => "auth",
	'before' => 'csrf',
	"uses" => function () {
		return View::make("user/addcontact");
	}
]);
//storeStoreContactForm
Route::post("user/contact_store", [
	"middleware" => "auth",
	'before' => 'csrf',
	"uses" => "\\App\\Http\\Controllers\\UserController@saveContactForm"

]);

Route::match(['get', 'post'], "user/contacts", ["middleware" => "auth",
                                                "uses" => function () {
	                                                $seats = false;
	                                                if (!isset($noteId) || ($noteId == 0)) {
		                                                $noteId = getRootForUser();
	                                                }
	                                                if (!isset($filtre)) {
		                                                $filtre = "";
	                                                }
	                                                $ser = App\Note::toXMLString(\App\User::getContacts(Auth::user()->email));
	                                                return View::make("user/contacts", ["seats" => $seats, "noteId" => $noteId, "page" => 1, "serialized_data" => $ser, "contacts" => $ser, "filtre" => $filtre
		                                                , "message" => "Contact ajout&eacute;"]);
                                                }
]);

//Route::get("ft", "\\App\\Http\\Controllers\\FiletypeController@index");

//Route::get('wordpress/page/{page}', [function($page){return view("wp/wordpress_page")->with("page", $page);}]);
//Route::get('wordpress/id/{id}', [function($id){return view("wp/wordpress_id")->with("id", $id);}]);
