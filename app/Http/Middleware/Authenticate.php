<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class Authenticate extends \Illuminate\Auth\Middleware\Authenticate
{

    protected function redirectTo($request)
    {
       return redirect(asset("note/0/1"));
    }
}
