<?php
namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
//use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\ExtraRegisterOperations;

class AuthController extends Controller
{
    protected $email;
    protected $hach;
    protected $password;
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    *//*
	use /*AuthenticatesUsers, RegistersUsers {
		AuthenticatesUsers::redirectPath insteadof RegistersUsers;
		AuthenticatesUsers::guard insteadof RegistersUsers;
	}*/
use RegistersUsers;
	protected function redirectTo()

    {
        return asset('auth/checkregistered');
    }

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
        $this->redirectPath = asset('auth/checkregistered');
    }

	public function throwValidationException(Request $request, $validator)
	{
		echo "Erreur lors de l'enregistrement de l'utilisateur";
		$this->redirectPath = asset('auth/checkregistered');
    throw new Exception("erreur enregisyrement");
	}

    public function remoteLogin($id, $hach)
    {

        if (($user = User::find($id)) !== NULL) {

            $this->email = $email = $user->email;
            $this->password = $this->hach = $hach;

            $this->getLogin($email, $hach);

            if ($this->authenticateWORedirect()) {


                $token = new Token($hach, Auth::user()->email);

                $resp = new Response("<OK token='" . "'></OK>", 200);
                echo "<OK>";
                return $resp;
            } else {
                $resp = new Response("<ERRORS>Username or password mismatch</ERRORS>", 403);
                echo "<ERRORS>";
                return $resp;
            }
        } else {
            $resp = new Response("<ERRORS>User not found</ERRORS>", 403);
            echo "<ERRORS>";
            return $resp;
        }
    }

    /**
     * Handle an authentication attempt.
     *
     * @return Response
     */
    public function authenticateWORedirect()
    {
        if (Auth::attempt(['email' => $this->email, 'password' => $this->password])) {

            return true;
        } else {
            return false;
        }
    }

	/**
	 * @param Request $request
	 */
	public function postLogin(Request $request)
	{
		if($login = $this->attemptLogin($request)!=NULL) {


			$email = $request->email;
			$user  = \Auth::user();

			if(($user->username)!= NULL)
			{
				redirect('auth/loggedin');
			}
		}

		
		
			
			return $login;
		

		
	}
    /**
     * Handle an authentication attempt.
     *
     * @return Response
     */
    public function authenticate()
    {
        if (Auth::attempt(['email' => $this->email, 'password' => $this->password])) {
            // Authentication passed...
            return redirect()->intended('list/0/1');
        }
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        $res = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
	    
        if ($res != NULL) {
            ExtraRegisterOperations::createRootFolder($data["email"]);
            ExtraRegisterOperations::sendRegisteredUserEmail($data["email"]);

            $res->save();
            echo "User created";
        } else {   
		echo "User creation error";
	
	}
        return $res;

    }
}
