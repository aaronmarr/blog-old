---
title: Deploying Eleventy to Github Pages using Travis
description: Taking a look at deploying an Eleventy static site to Github Pages using Travis CI
date: 2019-09-12
tags: development
layout: layouts/post.njk
---

Getting Started with Django 3 Development.

In this post I'm going to take a super-quick look at setting up a Django 3 site.
I use an Ubuntu-based distribution for Web development, so instructions will be
geared towards that. Please consult the relevant documentation for your
operating system.

Django 3 requires at least Python version 3. Python 3 is installed on Ubuntu as
standard. This can be verified by running:

python3 --version
Python 3.6.9



sudo apt install python3-pip

pip3 install pipenv

echo "PATH=$HOME/.local/bin:$PATH" >> ~/.bashrc

source ~/.bashrc

mkdir django

cd django

pipenv shell

pipenv install django==3.0

django-admin startproject example_project .

python manage.py runserver

You may have noticed that when we run the django-admin command to create the
project, we're running it using `python`, rather than `python3`. This is because
we installed the Python 3 version of pipenv using `pip3`. Exit out of the pipenv
shell using `exit`. Now you can verify that python still refers to the older version.

python --version
Python 2.7.17

