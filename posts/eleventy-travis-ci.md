---
title: Statically Deploy Eleventy to Github Pages using Travis
description: Taking a look at deploying an Eleventy static site to Github Pages using Travis CI
date: 2019-07-25
tags: development
layout: layouts/post.njk
---
In this post I'll look at deploying a static website built using [Eleventy](https://www.11ty.io/) to [Github Pages](https://pages.github.com/) using [Travis CI](https://travis-ci.com/).

### Set up Eleventy

The first thing you will need is an Eleventy site running on your local machine. There are some brilliant [starter projects](https://www.11ty.io/docs/starter/) provided by the community. In this post, I'll use [Eleventy base blog](https://github.com/11ty/eleventy-base-blog) as a starting point. Clone the repository and then change into the directory:

``` bash
git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
cd my-blog-name
```

Inside the project directory, `npm install` dependencies and then run `eleventy` – this will compile the starter project locally into a new `_site` directory. The `_site` folder contains the static markup and assets which we'll deploy to Github Pages using Travis:

``` bash
npm install
npx eleventy
```

You should see output like the following, indicating the compilation was successful:

``` bash
...
Writing _site/about/index.html from ./about/index.md.
Writing _site/tags/another-tag/index.html from ./tags.njk.
Writing _site/tags/number-2/index.html from ./tags.njk.
Copied 2 items and Processed 16 files in 0.34 seconds (21.3ms each, v0.9.0)
```

### Set up Git

Next, we'll push the Eleventy code to Github. You'll need to create a new repository on github (e.g., in this example the repository name is `my-blog-name`).

Once the repository is set up on Github, create a new repository locally and then push the code.

``` bash
# First, remove the existing Eleventy repo
rm -rf .git

# Next, create a new repo and push to Github
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/[your git username]/my-blog-name.git
git push -u origin master
```

Now we'll set up Github Pages. Create a new branch called `gh-pages` in Github, and enable Pages by going to Settings / Github Pages and selecting `gh-pages` as the source branch.

We'll also need to create a new access token so Travis can push your site to the `gh-pages` branch. In Settings / Developer Settings / Personal Access Tokens select "Generate new token." When prompted, provide a note for this key (e.g., Travis key) and then grant access to your public repositories by checking `public_repo`. 

Next, select "Generate token." On the next page you will be able to see you new token. Copy / paste this to a safe place (you'll need this handy in the next step).

### Set up Travis

Now we'll set up Travis. If you don't have an account, sign up for one now on the [Travis website](https://travis-ci.com). Follow the on-screen instructions to integrate Travis with your Github account. There will be several steps and you will be asked to grant permissions to Travis so that it can access any repositories you want to build and deploy.

Once the setup process is complete, head back to Github and configure the [Github Travis app](https://github.com/apps/travis-ci). Scroll down to the Repositories section, and select your Eleventy repository (e.g., `my-blog-name`). Once this is complete, you'll be redirected back to Travis, where you'll see your repository listed under your account.

Next, in the repository settings in Travis, you should add a new authentication key. Paste in the GitHub key you created earlier, name it `$GITHUB_TOKEN`. This will then be populated by Travis when it reads the `travis.yml` file in your Git repository. If you take a look at that file you'll see a property named `github-token`, the value of which matches the variable name we just created in Travis.

Let's take a quick look at the `travis.yml` file now. I've set the path prefix to "/". I also set the build and deploy branches to `master` and `gh-pages`, respectively. Here's what my finalised `travis.yml` file looks like.

``` yaml
language: node_js
node_js:
  - 8
before_script:
  - npm install @11ty/eleventy -g
script: eleventy --pathprefix="/"
deploy:
  local-dir: _site
  provider: pages
  skip-cleanup: true
  # Set in travis-ci.org dashboard
  github-token: $GITHUB_TOKEN  
  keep-history: true
  # Deploy branch
  target_branch: gh-pages
  on:
    # Build branch
    branch: master
```

Now you can build and deploy. In Travis, select "Build Now", waiting a moment for Travis to build and deploy. On Completion, you'll notice a success message in the console indicating that your site has been deployed.

One thing to bear in mind is Travis will conveniently deploy whatever you push to your `master` branch. For development, I set up a `develop` branch on Github, so that I only push/merge to `master` when I want to trigger a deployment.

If you head back over to Github, you should see that Travis has populated the `gh-pages` branch with the built site. You should also now be able to see your site live at `https://[your user name].github.com/my-blog-name`. 

I hope you've found this post useful. Please get in touch if you have any questions or comments. Thanks for reading.
