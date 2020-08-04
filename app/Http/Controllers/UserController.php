<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Auth as FacadesAuth;
use App\User ;
use SebastianBergmann\Environment\Console;
use Validator;
class UserController extends Controller
{
    public function index(){
        $user = User::with(['orders'])->get() ; 

        return response()->json($user , 200) ; 
    }
    public function login(Request $request){
        $status = 200;
        $response = ['error' => 'Unauthorised'];

        
        try{

            if (Auth::attempt($request->only(['email', 'password']))) {
                $status = 200;
                $response = [
                    'user' => Auth::user(),
                    'token' => Auth::user()->createToken('bigStore')->accessToken,
                ];
            }
        }catch(\Exception $e){
            return $e->getMessage() ; 
        }
        return response()->json($response, $status);

    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ]);
        ///return 'herer' ; 
        if($validator->fails()){
            return response()->json(['error' => $validator->error()] , 401) ; 
        }
        $data = $request->only(['name', 'email', 'password']);
        $data['password'] = bcrypt($data['password']);
        //var_dump($data) ; 
        if(User::where('email' , '=' , $data['email'])->exists() ){
        
            return response()->json(['error' => 'email already exists'] , 200) ; 
        }  
        $user = User::create($data);
        $user->is_admin = 0;

        try {
            $token = $user->createToken('bigStore')->accessToken ; 

           
            return response()->json([ 
                'user' => $user,
                'token' => $token
            ] ,200);
          
        } catch (\Exception $e) {
        
            return $e->getMessage();
        }
            
        
    }
    public function showOrders(User $user)
    {
        return response()->json($user->orders()->with(['product'])->get());
    }
}
