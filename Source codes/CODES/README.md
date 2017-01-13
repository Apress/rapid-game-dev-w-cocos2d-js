# Rapid Game Development Using Cocos2d-Js

This repository contains code samples for the book "Rapid Game Development Using Cocos2d-Js" available for sale at https://www.apress.com/

## Instructions

## Basic Setup

* Setup the cocos2d-js development environment by following the below link
  http://cocos2d-x.org/docs/manual/framework/html5/v2/cocos-console/en

## Running The Sample

## Running the code examples
There are many ways in which you can get the code examples up and running, We found the below steps are easy to get it up and running the code examples quickly for your convenience,
To run the code examples provided in this book, run following commands in the terminal.

### Steps

* Create a new cocos2d-js project.

      cocos new codeexamples -l js

* Navigate to the project folder in the terminal.

      cd codeexamples

* Initialize an empty git repository.

      git init

* Delete all the files and folders in current folder except frameworks/ folder

![Hello World](images/chapter1/fmfolder.png)

* Add the remote(code samples repository) to the local git repository, use any one of the below command.

      (if you use ssh)
      git remote add origin git@github.com:nutcrackify/Rapid_Game_Development_Using_Cocos2d-js.git

      (if you use https)
      git remote add origin https://github.com/nutcrackify/Rapid_Game_Development_Using_Cocos2d-js.git

* Pull the repository

      git pull origin master

* Run the example

      cocos run -p web
