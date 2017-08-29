# lol-recruit


Playing alone sucks, especially when you have to play a team based strategy game alone.  

## The APP

> League of Legends is a fast-paced, competitive online game that blends  the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes.  

Using this app you can find teammates or build your own team if you're into that kinda thing. Just post your profile up and keep an eye on your dash board for requests. OR send a request to someone that's looking for new people to play with. 

#Installation
You can find the live version [here](https://lol-recruit.herokuapp.com/). 

Cloning this repository to your server should work fine, just make sure to ```npm install``` and ```npm start``` if you need to. Also make sure to set an environment variable named ```RIOT_API``` with your API key for Riot Games (used to pull down player stats).  

## User Stories
* As a guest I would like to browse profiles of users on the home page. ✓
* As a guest I would like to leave a message for a user. ✓
* As a user I would like to post my mini profile. ✓
* As a user I would like to see my League of Legends stats automatically  in my profile. ✓
* As a user I would like to see requests on my user dashboard. ✓
* As a user I would like my profile to disappear from the front page if I accept a team request. ✓
* As a user when I get a request I would like to get an email notification. x

##### Bonus Features:

* A team section that users can create teams.  
* As a captain I would like to create a team and have it shown on the team roster. 
* As a captain I would like my team roster page to include the profile details of my team members.

##### TODO List

* Form Validation
* Allow users to delete their accounts in their profile. .
* Instructions and about section on the app itself. 
* More meaningful stats fromt he league api.
* Investigate why the api stopped responding. 
* Super admin view. 



## Wire Frame
![](http://i.imgur.com/eho5n5H.jpg)
<br>
[My flowcharts for my routes can be found here.](http://imgur.com/a/uNXkQ)

 Very rough sketch as usual.  
 
## Technology
The front end will be built with HTML, CSS, and JavaScript. It uses JQuery for manipulating the DOM elements as well as spawning new ones. It also uses Animate.css for some of the animations. The back end will be Express.js running on Node.js, along with MongoDB for storing data. 

Riot, the company that runs League of Legends, maintains a free API that allows developers to have access to vast amounts of player data. 


## Approach Taken
The data from the API will be handled by a model called ```riot.js``` this model will handle the operations to grab the statistics for the user on registration and save it for them as *middleware*. These statistics would be things that would affect a guest's decision to recruit them; such as amount of times they went **AFK**, or how well they performed in their particular **roles** (no one wants a support that doesn't *assist*). All of this information will appear on their summary on the front page. 

Messages will be stored using the ```user.js``` model. To populate the user's dashboard when guests respond to their posts. So each user would have an array of message objects(sender and message body).  

##### How will this look in theory?

A user would look like this:

```
{
	name: 'John Doe',
	email: 'john@fbi.com',
	username: 'player1',
	password_hash?,
	stats: [ to be decided ],
	messages: [{ from: 'fizal@hg.co', content: 'pls play with me'}],
	accepted:this.messages[0]	
}


```

My endpoints would be: 

|Endpoint|Description|   
|---|---|
|/|the root of the server, would display the homepage|   
|/user|the user's dashboard|   
|/user/register|the form to register a user |
|/user/login|to start a session for a user|


##Unsolved Problems

* My api would stop working after the 5th user registration.


