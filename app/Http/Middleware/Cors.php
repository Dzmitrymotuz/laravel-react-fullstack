<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Cors
{
    
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/*')){

        
        $response =  $next($request);
        $response ->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
        $response->header('Access-Control-Allow-Credentials',' true');
        if ($request->isMEthod('OPTIONS')) {
            $response->setStatusCode(200);
            $response->setContent(null);
        }
        return $response;
    }
    return $next($request);
    }   
}
