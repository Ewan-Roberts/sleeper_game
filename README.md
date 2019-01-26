# sleeper_game


![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_1.png)


Currently in the process of building the game engine.

Work in progess, updates below:

## Update 26.01.19:
![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_9.png)

- Add basic user create
- Add basic user find by password
- Add database ability to do the above
- Add basic item find and refactored interface


## Update 20.01.19:
- Refactor:
  - animation management
  - keyboard and mouse interactions
  - bring the player into the mixin structure

## Update 13.01.19:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_8.png)

May not looks very pretty but an important landmark for the engine

- :tada: Full predator/prey system that can freely scale
- created more detailed inventory system
- complete refactor of how characters are constructed to make them very flaxable
- added basic damage from predator and equiping weapons
- added useful timer functions

## Update 06.01.19(2):

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_7.png)

- multi-prey pathfinding (lines show paths run)
- sprite direction and waiting states

## Update 06.01.19:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_6.png)

- created prey inventory management
- created a consolidated maths function

## Update 05.01.19:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_5.png)

- basic prey inventory
- basic item management
- basic death management


## Update 01.01.19:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_4.png)

- basic predator/prey pathfinding logic
- basic multiplayer server side location
- basic state management for hunger/thirst/sleep...
- replacing tween management system
- creating testing functions for ease of development
- major refactor (on-going)


## Update 16.12.18:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_3.png)

- auto-generating captions
- server-side inventory management (basic)
- cutscene npc models 
- cutscene fade-in/out
- cutscene sprite movement abstracted

## Update 09.12.18:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_2.png)

- large refactor and performance increase
- dialog for characters
- container UI
- HUD for player
- level loading
- OOP and models for most elements
- basic inventory management


## Update 12.11.18:

![alt text](https://github.com/Ewan-Roberts/sleeper_game/blob/master/update_information/update_1.png)

- pathfinding
- raycasting
- basic mask lights
- tweening on path

Key:
- priority = (low||medium||high||outsource)

# Roadmap:

## back-end: (high)
- Full server-side character state management
- Re-add multiplayer NOT ADDING
- Add register user DONE
- Add login user DONE

## items (medium)
#### junk
- create junk schema
- create junk search function
- create junk randomiser functions
- create junk rarity functions
- create junk database schema and save states

#### weapon
- create weapon degrading mechanic
- create weapon schema
- create weapon search function
- create weapon randomiser functions
- create weapon rarity functions
- create weapon database schema and save states

#### armour
- create armour degrading mechanic
- create armour schema
- create armour search function
- create armour randomiser functions
- create armour rarity functions
- create armour database schema and save states

#### items
- create items schema
- create items search function
- create items randomiser functions
- create items rarity functions
- create items database schema and save states

## player inventory (high)
- player visual model
- inventory slots
- primary weapon
- secondary weapon
- Move item from inventory to player inventory

## Effects (low)
- create rain effects DONE
- create fire effects
- create blood effects
- create arrow effects
- create gun effects

## cutscene (high)
- create cutscene management engine (stop keyboard inputs etc)
- create player best friend

## Sound; (low)
`later`

## GUI: (high)
- Start screen DONE
- error messages for user exists DONE
- NPC buy/sell etc
- Manage player inventory
- user info box

## ART: (outsource)
- Spine format replacement for spritesheet
- Large scale art replacement (may need artist)
- Loaders

## mechanics: (low)
- Add player inventory DONE
- Add scavenging
- Add starting fires
- Add condition management (thirst etc.) DONE
- create architype system
- buy sell/buy engine
- Level loader

# Infra:
- Create EC2 server (again)

# Needed for ALPHA
- register users DONE
- basic predetor/prey DONE
- login with user details DONE
- title screen DONE
- save game states
- prod server
- basic item/inventory management
- basic arrow management
- basic different graphics


# Needed for BETA
- secure register user
- Server-side rendered images
- CD
- Add email user

