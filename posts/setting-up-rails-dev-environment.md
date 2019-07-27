---
title: Setting up a Rails Development Environment on MacOS 
description: Taking a look at setting up a Rails development environment on MacOS.
date: 2019-07-01
tags:
  - another-tag
layout: layouts/post.njk
---
This week I've been given the perfect excuse to brush up on my Rails skills, so I thought a quick post on setting up a Rails development environment was in order. 

There are many ways to set up a Rails development environment. I've gone for an approach using Homebrew to manage system dependencies and `rbenv` for managing my Ruby installation. Let's get going!

## Install Homebrew

If you haven't already got Homebrew installed, you should do that now:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

To test Homebrew was installed, run the `brew` command:

```bash
brew
Example usage:
  brew search [TEXT|/REGEX/]
  brew info [FORMULA...]
  brew install FORMULA...
  brew update
...
```

## Install RBEnv and Ruby build

We'll install `rbenv` and `ruby-build` now. `Rbenv` is a lightweight tool for managing Ruby versions on your system. We'll use `rbenv` and the `ruby-build` extension to build the exact Ruby version for our system.

```bash
brew install rbenv ruby-build 
```

Once you've installed `rbenv` and `ruby-build`, run the following bash script which starts `rbenv` when you open a new terminal window.

```bash
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
```

Make sure to load the updated bash profile so that changes take effect.

```bash
source ~/.bash_profile
```

Install Ruby

Now let's go ahead and install Ruby. I'm opting to install version 2.3.7, which is a version compatible with the Rails version I want to install, which is 5.1.6.

```bash
rbenv install 2.3.7
```

Once that's installed, you should tell rbenv to use that version using the following:

```bash
rbenv global 2.3.7

# See which Ruby version we're using
ruby -v

ruby 2.3.7p456 (2018-03-28 revision 63024) [x86_64-darwin18]
```

## Install Rails 

Next we'll install Rails. The latest stable version is 5.1.6, so we'll install that.

```bash
gem install rails -v 5.1.6
```

At this point, we've installed Rails, but it might not be available to you to use. To check Rails is installed correctly run:

```bash
rails -v
# Rails 5.1.6
```

If the preceeding command fails you may need to refresh your rbenv:

```bash
rbenv rehash

rails -v
# Rails 5.1.6
```

## Create a test Rails project

Now, we're finally ready to create our brand new Rails project, using the `rails new` command:

```bash
rails new example 
      create  
      create  README.md
      create  Rakefile
      create  .ruby-version
      create  config.ru
      create  .gitignore
      create  Gemfile
```

Once built, change into the project directory:

```bash
cd example
```

Now for the good stuff. We're ready to run our rails server:

```bash
bin/rails server       


=> Booting Puma
=> Rails 6.0.0.rc1 application starting in development 
=> Run `rails server --help` for more startup options
Puma starting in single mode...
* Version 3.12.1 (ruby 2.6.3-p62), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://localhost:3000
Use Ctrl-C to stop
```

You'll notice that the server is listening on localhost:3000. If you open that URL in your web browser, you should see the Rails welcome screen, indicating that everything is set up and ready to go!

Thanks for reading and happy hacking!

