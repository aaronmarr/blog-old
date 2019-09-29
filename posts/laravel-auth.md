---
title: Laravel User Authentication
description: Taking a look the authentication framework in Laravel 6
date: 2019-09-12
tags: development
layout: layouts/post.njk
---

User authentication in Laravel 6 is included out of the box, and it's quick and easy to set up in your applications. 

To get started, you'll need to install the `laravel/ui` package, which contains the Twitter Bootstrap framework. Bootstrap is used to provide some basic styling to the templates which are included with the  boilerplate. 

> The `laravel/ui` package also contains assets for React and Vue, but I'll be looking a more traditional approach using Blade in this post.

Don't worry, if you're not a fan of Bootstrap, all the styling can easily be replaced with your own, if that's what you want to do.

Go ahead and install the `laravel/ui` package:

``` bash
composer require laravel/ui --dev
```

Once that's installed, you'll have access to the `artisan ui` generator. For more information about which options can be passed, check the [Laravel documentation](https://laravel.com/docs/6.x/frontend). We can scaffold with Twitter Bootstrap using the following command:

``` bash
php artisan ui bootstrap --auth

Bootstrap scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
Authentication scaffolding generated successfully.
```

Follow the instructions in the output and run `npm install && npm run dev` to install dependencies and compile any assets. 

Let's take a quick look at what the scaffolding gives us:

``` bash
git status
...
	modified:   resources/js/bootstrap.js
	modified:   resources/sass/app.scss
	modified:   routes/web.php

Untracked files:
...
	app/Http/Controllers/HomeController.php
	resources/sass/_variables.scss
	resources/views/auth/
	resources/views/home.blade.php
	resources/views/layouts/
```

We can see that some files in the `resources/` directory have been updated. There's been a change to the `routes/web.php` file. The most significant change for us is the change to the routes file, so let's take a look at that.

``` php
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
```

`Auth::routes();` is a helper class which defines all the routes required for Laravel's authentication system. Run `php artisan route:list` to see exactly which routes have been added:

``` bash
+--------+----------+----------------------------+------------------+------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method   | URI                        | Name             | Action                                                                 | Middleware                                      |
+--------+----------+----------------------------+------------------+------------------------------------------------------------------------+-------------------------------------------------+
|        | GET|HEAD | /                          |                  | Closure                                                                | web                                             |
|        | POST     | _ignition/execute-solution |                  | Facade\Ignition\Http\Controllers\ExecuteSolutionController             | Facade\Ignition\Http\Middleware\IgnitionEnabled |
|        | GET|HEAD | _ignition/health-check     |                  | Facade\Ignition\Http\Controllers\HealthCheckController                 | Facade\Ignition\Http\Middleware\IgnitionEnabled |
|        | GET|HEAD | _ignition/scripts/{script} |                  | Facade\Ignition\Http\Controllers\ScriptController                      | Facade\Ignition\Http\Middleware\IgnitionEnabled |
|        | POST     | _ignition/share-report     |                  | Facade\Ignition\Http\Controllers\ShareReportController                 | Facade\Ignition\Http\Middleware\IgnitionEnabled |
|        | GET|HEAD | _ignition/styles/{style}   |                  | Facade\Ignition\Http\Controllers\StyleController                       | Facade\Ignition\Http\Middleware\IgnitionEnabled |
|        | GET|HEAD | api/user                   |                  | Closure                                                                | api,auth:api                                    |
|        | GET|HEAD | home                       | home             | App\Http\Controllers\HomeController@index                              | web,auth                                        |
|        | POST     | login                      |                  | App\Http\Controllers\Auth\LoginController@login                        | web,guest                                       |
|        | GET|HEAD | login                      | login            | App\Http\Controllers\Auth\LoginController@showLoginForm                | web,guest                                       |
|        | POST     | logout                     | logout           | App\Http\Controllers\Auth\LoginController@logout                       | web                                             |
|        | POST     | password/email             | password.email   | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail  | web,guest                                       |
|        | GET|HEAD | password/reset             | password.request | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm | web,guest                                       |
|        | POST     | password/reset             | password.update  | App\Http\Controllers\Auth\ResetPasswordController@reset                | web,guest                                       |
|        | GET|HEAD | password/reset/{token}     | password.reset   | App\Http\Controllers\Auth\ResetPasswordController@showResetForm        | web,guest                                       |
|        | GET|HEAD | register                   | register         | App\Http\Controllers\Auth\RegisterController@showRegistrationForm      | web,guest                                       |
|        | POST     | register                   |                  | App\Http\Controllers\Auth\RegisterController@register                  | web,guest                                       |
+--------+----------+----------------------------+------------------+------------------------------------------------------------------------+-------------------------------------------------+
```

You can see that routes have been added for `login`, `logout` and ` register`, as well as routes added for managing user passwords.

The `home` route will only be accessible by authenticated users. `HomeController@index` is protected by the authentication middleware that ships with Laravel. Check out the constructor in `HomeController.php` to see how this is set up:

``` php
    public function __construct()
    {
        $this->middleware('auth');
    }
```

> You might also see middleware added directly in the `routes` file, instead of inside the `controller`:

``` php
Route::get('/example', 'ExampleController@index')->middleware('awesome');
```

There are also a handful of new templates in `resources/views/auth/` and `resources/views/layouts/`. These templates are for the login, logout and register views, as well as reset and forgotten password forms. 

If you've run the boilerplate on a fresh Laravel install, go ahead and migrate your database.

``` bash
php artisan migrate
```

At this point, you should be able to create a new user and log in to your site. If you visit your site in your web browser, you should see the new `login` and `register` links which were added by Laravel for us.

That's all I really want to cover in this post. I suggest also taking a look at the template files to see how those work, and which directives have been added to show and hide the login links. I may cover the details of those in a future post.

I hope you've found this useful. Please don't hesitate to contact me if you have any questions or comments.