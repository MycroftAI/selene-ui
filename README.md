[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.md) 
[![CLA](https://img.shields.io/badge/CLA%3F-Required-blue.svg)](https://mycroft.ai/cla) 
[![Team](https://img.shields.io/badge/Team-Mycroft_Backend-violetblue.svg)](https://github.com/MycroftAI/contributors/blob/master/team/Mycroft%20Backend.md) 
![Status](https://img.shields.io/badge/-Production_ready-green.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Join chat](https://img.shields.io/badge/Mattermost-join_chat-brightgreen.svg)](https://chat.mycroft.ai)


Selene -- Mycroft's Web Backend
===============================

Selene provides the services used by [Mycroft Core](https://github.com/mycroftai/mycroft-core) to manage devices, skills
and settings.  It consists of two repositories.  This one contains GUI web applications built using the Angular framework. 
data access layer, APIs and scripts.  The second repository, [Selene Backend](https://github.com/mycroftai/selene-backend), 
contains Python and SQL representing the database definition,data access layer, APIs and scripts that 
support the web applications defined in this repository.

There are three web applications defined in this repository, account management single sign on, and skill marketplace.
Each application is designed to run independently of the others. This repository also includes two libraries containing code 
common to each of the applications. 

# Installation
These instructions assume that the APIs and databases in the Selene Backend repository have been installed. The README file
in that repository contains the necessary instructions.  As with the Selene Backend repository, these instructions will also assume
that each application (API & GUI) will run on an independent server or virtual machine.  Running Selene on a single server is possible.
Many of the instructions below are also applicable to running on a single server.  The biggest difference being that all the
compiled code will live on the same server. 

To eliminate redundantly downloading and building the code on each server, it is recommended to do so on a build host. Once the 
build is complete, copy the compiled code to the servers that will run the applications.  This repository includes a Jenkinsfile 
that builds the code and deploys it via ssh.  It can be altered to work with any Jenkins instance.

* Install Angular 7 and node.js on your build host.
* Download this repository to your build host. The simplest method is via git 
([git installation instructions](https://gist.github.com/derhuerst/1b15ff4652a867391f03))
```
cd <directory of your choice>
git clone https://github.com/MycroftAI/selene-ui.git
cd selene-ui
```
* Install the required node.js packages
```
npm install
```
* Compile the Angular Typescript code.  By default the code is compiled into the `selene-ui/dist` directory
```
ng build --project shared
ng build --project globalnav
ng build --project account --prod
ng build --project market --prod
ng build --project sso --prod
```
* Copy the compiled code to the `/var/www` directory on the servers.  The `shared` and `globalnav` modules are libraries that need to be 
copied to all servers. The `account`, `market` and `sso` modules need only be copied to their respective servers.

# Running the Web Applications

* Install a web server on each of the application servers.  Configure the web server to serve the `index.html` file of the web application.  
Instructions on how to do this will vary depending on web server used.  See the software provider's documentation for detailed instructions.
* Add the web applications to the reverse proxy that is already being used for the APIs in the Selene Backend repository.

# Getting Involved

This is an open source project and we would love your help. We have prepared a [contributing](.github/CONTRIBUTING.md) guide to help you get started.

If this is your first PR or you're not sure where to get started,
say hi in [Mycroft Chat](https://chat.mycroft.ai/) and a team member would be happy to mentor you.
Join the [Mycroft Forum](https://community.mycroft.ai/) for questions and answers.
