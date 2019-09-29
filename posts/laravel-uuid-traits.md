---
title: Implementing UUIDs in Laravel
description: Implementing UUIDs in Laravel models using PHP Traits
date: 2019-09-15
tags: development
layout: layouts/post.njk
---

In a previous post, I looked at using Laravel's authentication scaffolding. While this provides a lot out-of-the box, you may want to use `uuids` for primary keys in the `User` model, instead of `bigIncrements`.

> `Uuid` fields are more secure than `bigIncrements` because they're much, *much* harder to guess than incrementing integer values.

In this post, I'll look at implementing `uuid` fields for Eloquent models. I'll also look at sharing this functionality between multiple models using PHP Traits.

To start, modify the `create_users` migration, updating the `id` field type to become `uuid`.

``` php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Next, we'll override `boot`, and hook into Eloquent's `creating` lifecycle method in the `User` model. We'll return a `uuid` for the primary key when creating new `User` records. 

``` php
// User.php

protected static function boot()
{
    parent::boot();

    static::creating(function ($user) {
        $user->{$user->getKeyName()} = (string) Str::uuid();
    });
}
```

We'll also disable incrementing `ids` and specify a key type of `string` (instead of `bigInteger`):

``` php
// User.php

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
```

With our migration and model updated, go ahead and run the migrations:

``` bash
php artisan migrate
```

At this point, authentication should be working and you'll be able to create a new user via the UI. Go ahead and create a new user account now.

Once you've registered a new user, take a look at the `id` field in Tinker. This should now be set to a `uuid` string, instead of the default `bigIncrements` value:

``` bash
php artisan tinker

App\User::all()
=> Illuminate\Database\Eloquent\Collection {#3027
     all: [
       App\User {#3028
         id: "183273bc-cf61-45ff-8e56-13b7253411c2",
         name: "Aaron Example",
         email: "aaron@example.com",
         email_verified_at: null,
         created_at: "2019-09-21 08:56:13",
         updated_at: "2019-09-21 08:56:13",
       },
     ],
   }
```

While this approach is fine in a simple application with only a couple of models, you may find yourself wanting to share this functionality between more models, and it could become an overhead. This is a good use case for PHP Traits, which allow you to easily share code between independent classes. Let's take a look:

``` php
// Traits/HasUuid.php

<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasUuid
{
    protected static function bootHasUuid()
    {
        static::creating(function ($model) {
            if (! $model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
```

As you can see, we've moved the `boot` method override, `getIncrementing` and `getKeyType` methods into the Trait. The boot method override is also renamed to `bootHasUuid`. This is an example of implementing Laravel's bootable Traits, which enable us to override Eloquent's boot method in any models which inherit the Trait. Nice.

In the User model we can remove the boot method override, `getIncrementing` and `getKeyType` methods and implement the Trait for our model using `use Traits\HasUuid;` in the class:

``` php
// User.php

<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    use Traits\HasUuid;

    ...
}
```

Let's migrate our database again and double check once more that the `uuid` is still being set.

``` bash
php artisan migrate:fresh
```

Be sure to create a new account, then check the database again:

``` bash
>>> App\User::all()
=> Illuminate\Database\Eloquent\Collection {#3029
     all: [
       App\User {#3030
         id: "a7fbf694-8356-4ace-9b0b-525b35e71ed7",
         name: "Aaron Example",
         email: "aaron@example.com",
         email_verified_at: null,
         created_at: "2019-09-20 20:53:43",
         updated_at: "2019-09-20 20:53:43",
       },
     ],
   }
```

Awesome! The `uuid` is set, but this time the implementation uses Traits, meaning we can share this functionality with other models, as and when required. 

I hope you've found this post useful. I can certainly see myself using this pattern when developing applications in the future. Thanks for reading.
