---
title: Deploying Eleventy to Github Pages using Travis CI
description: Taking a look at deploying an 11ty site to Github Pages Travis CI
date: 2019-07-25
tags: development
layout: layouts/post.njk
---
[Eleventy](https://www.11ty.io) is a great tool for building static websites using JavaScript. I've always been a fan of [Jekyll](https://jekyllrb.com), but Eleventy has been my go-to tool recently for static web builds; It's super simple to get started and includes some excellent documentation and starter projects to get you going.

One of the things I wanted to figure out was how to deploy Eleventy to [Github Pages](https://pages.github.com). A few years ago I might have written a Gulp task to build locally and push to a branch on Github, but it's 2019 and we can do better than that! The [Eleventy blog](https://github.com/11ty/eleventy-base-blog) starter project includes a helpful set of config files for setting up CI with either Travis or Netlify. In this post, I'll take a look at setting up a deployment pipeline in Travis.

## Create a repository on Github

The first thing you will need is an Eleventy installation pushed to a repository on Github. I used the [Eleventy blog](https://github.com/11ty/eleventy-base-blog) starter project for my site, which includes the helpful Travis settings file I mentioned. I called my repository `blog` and pushed the project code to the `master` branch. 

There are a few settings in Github which I also adjusted. In the repository settings, there's a section for Github Pages. In here, I selected "enable pages" and set up my custom domain name. 

<aside>If you're using a custom domain, you'll need to point your DNS to the Github Pages IPs, and also create a CNAME file in the base of your repository. More details about that can be found in the Github documentation.</aside>

One final step you will need to do is create a Github authentication key, which will be used by Travis to authenticate. In the developer menu in Github, set up a new key, and copy to your clipboard. You will use this key once Travis has been set up.

## Set up Travis

At this point, I signed up for Travis. On signing up, you should follow the on-screen instructions to integrate Travis with your Github account. There will be several steps and you will be asked to grant permissions to Travis so that it can access any repositories you want to build and deploy.

Once the setup process is complete, you should see your project repository in Travis. In the settings, you should add a new authentication key and paste in the key from the previous step. You should call this key `$GITHUB_TOKEN`. If you look inside the `travis.yml` file in your repo, you'll see there's a property called `github-token` which matches this key. This is what Travis uses to authenticate with Github when building and deploying.

While inside the `travis.yml` file, there are a few other settings which should be updated. I set the path prefix to "/". I also added my custom domain under the `fqdn` setting and set the build and deploy branches. These are set to `master` and `gh-pages`, respectively. Here's what my finalised `travis.yml` file looks like.

```text
language: node_js
node_js:
  - 8
before_script:
  - npm install @11ty/eleventy -g
script: eleventy --pathprefix="/"
deploy:
  fqdn: aaronmarr.co.uk
  local-dir: _site
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN  # Set in travis-ci.org dashboard, marked secure
  keep-history: true
  target_branch: gh-pages
  on:
    branch: master
```

At this point, you should be able to build and deploy to Github. In Travis, select "Build Now" and wait a minute or two for Travis to do its thing. Once Travis has finished building, you'll see a success message in the console indicating that your site is deployed.

One thing to bear in mind is Travis will conveniently deploy whatever you push to your `master` branch. For development, I set up a `develop` branch on Github, so that I only push/merge to `master` when I want to trigger a deployment.

If you head back over to Github, you should see that Travis has created a new branch, `gh-pages`, with the built site inside. You should also now be able to see your site live. I hope you've found this post useful, please get in touch if you have any questions or comments. Thanks for reading.
