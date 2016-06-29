# lol-recruit


Playing alone sucks, especially when you have to play a team based strategy game alone.  

## The APP

> League of Legends is a fast-paced, competitive online game that blends  the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes.  

Using this app you can find teammates or build your own team if you're into that kinda thing. Just post your profile up and keep an eye on your dash board for requests. OR send a request to someone that's looking for new people to play with. 

#Installation
You can find the live version [here](#). 

Cloning this repository to your server should work fine, just make sure to ```npm install``` and ```npm start``` if you need to. Also make sure to set an environment variable named ```RIOT_API``` with your API key for Riot Games (used to pull down player stats).  

## User Stories
* As a guest I would like to browse profiles. 
* As a guest I would like to leave a message for a user. 
* As a user I would like to post my mini profile. 
* As a user I would like to see my League of Legends stats automatically  in my profile.
* As a user I would like to see requests on my user dashboard.
* As a user I would like my profile to disappear from the front page if I accept a team request. 
* As a user when I get a request I would like to get an email notification.

#####Bonus Features:

* A team section that users can create teams.  
* As a captain I would like to create a team and have it shown on the team roster. 
* As a captain I would like my team roster page to include the profile details of my team members.



## Wire Frame
![](http://i.imgur.com/eho5n5H.jpg)

 Very rough sketch as usual.  
 
##Technology Used
The front end will be built with HTML, CSS, and JavaScript. It uses JQuery for manipulating the DOM elements as well as spawning new ones. It also uses Animate.css for some of the animations.

The back end will be Express.js running on Node.js, along with MongoDB for storing data. 

Riot, the company that runs League of Legends, maintains a free API that allows developers to have access to vast amounts of player data. This will be key in player profiles since it would provide their recent match data instead of them having them type it into the app. 

##Aproach Taken


##Unresolved Problems




## Some of the Important Notes:


