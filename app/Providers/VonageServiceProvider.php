<?php

use Illuminate\Support\ServiceProvider;
use Vonage\Client\Credentials\Basic;
use Vonage\Client\Credentials\Container;
use Vonage\Client;

class VonageServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Client::class, function ($app) {
            $basic = new Basic("00d0b075", "om3qmVaXKeXVVSZK");
            return new Client(new Container($basic));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
