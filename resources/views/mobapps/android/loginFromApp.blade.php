<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 23-04-16
 * Time: 09:46
 */
/**
 * 1) Vérifier si l'utilsateur est présent dans la base de données et renvoyer une réponse:
 *
 * OK 200
 * NOT FOUND 403 (OU FORBIDDEN?)
 */
if (User::where('email', '=', Input::get('email'))->count() > 0) {
    // user found
    $ac = new App\Http\Controllers\Auth\AuthController();
    Or even nic

        $resp = new HttpResponse();
        $resp->status(200);
        echo "<OK>";
} else {
    $resp = new HttpResponse();
    $resp->status(404);
    echo "<ERRORS>";
}
