{
    "graph": [
            { "id": "entrance", "name": "Entrance", "north": { "node": "1stroom", "distance": 1 } },
     { "id": "1st room", "name": "1st Room", "south": {"node": "entrance", "distance": 1} , "north": { "node": "bigroom", "distance": 1} } ,
     { "id": "bigroom",
       "name": "Big room",
       "south": { "node": "1stroom", "distance": 1},
       "north": { "node": "bossroom", "distance": 2},
       "east":  { "node": "rightwing", "distance": 3} ,
       "west":  { "node": "leftwing", "distance": 3}
     },
     { "id": "bossroom", "name": "Boss room", "south": {"node": "bigroom", "distance": 2} }
     { "id": "leftwing", "name": "Left Wing", "east": {"node": "bigroom", "distance": 3} }
     { "id": "rightwing", "name": "Right Wing", "west": { "node": "bigroom", "distance": 3 } }
    ],
    "game": {
     "win-condition": {
       "source": "finalboss",
       "condition": {
         "type": "comparison",
         "left": "hp",
         "right": "0",
         "symbol": "<="
       }
     },
     "lose-condition": {
       "source": "player",
       "condition": {
         "type": "comparison",
         "left": "hp",
         "right": "0",
         "symbol": "<="
       }
     }
    },
    "rooms": {
     "entrance": {
       "description": {
         "default": "You're at the entrance of the dungeon. There are two lit torches on each wall (one on your right and one on your left). You see only one path: ahead."
       },
       "items": [
         {
           "id": "littorch1",
           "name": "Lit torch on the right",  
           "triggers": [
             {
               "action": "grab", //grab Lit torch on the right
               "effect":{
                 "statusUpdate": "has light",
                 "target": "game",
               }
             }
           ] ,
           "destination": "hand"
         },
         {
           "id": "littorch2",
           "name": "Lit torch on the left",  
           "triggers": [
             {
               "action": "grab", //grab Lit torch on the left
               "effect":{
                 "statusUpdate": "has light",
                 "target": "game",
               }
             }
           ] ,
           "destination": "hand"

         }
       ]
     },
     "1stroom": {
       "description": {
         "default": "You're in a very dark room. There are no windows and no source of light, other than the one at the entrance. You get the feeling you're not alone here.",
         "conditionals": {
           "has light": "The room you find yourself in appears to be empty, aside from a single chair in the right corner. There appears to be only one way out: deeper into the dungeon."
         }
       },
       "items": [
         {
           "id": "chair",
           "name": "Wooden chair",
           "details": "It's a wooden chair, nothing fancy about it. It appears to have been sitting here, untouched, for a while now.",
           "subitems": [
             {    "id": "woodenleg",  
               "name": "Wooden leg",
               "triggeractions": [
                 { "action": "break", "target": "chair"},  //break 
                 { "action": "throw", "target": "chair"} //throw 
               ],
               "destination": "inventory",
               "damage": 2
             }
           ]
         }
       ]
     },
     "bigroom": {
       "description": {
         "default": "You've reached the big room. On every wall are torches lighting every corner. The walls are painted white, and the ceiling is tall and filled with painted white stars on a black background. There is a gateway on either side and a big, wooden double door in front of you."
       },
       "exits": {
         "north": { "id": "bossdoor",  "name": "Big double door", "status": "locked", "details": "A aig, wooden double door. It seems like something big usually comes through here."}
       },
       "items": []
     },
     "leftwing": {
       "description": {
         "default": "Another dark room. It doesn't look like it's that big, but you can't really tell what's inside. You do, however, smell rotten meat somewhere inside.",
         "conditionals": {
           "has light":  "You appear to have found the kitchen. There are tables full of meat everywhere, and a big knife sticking out of what appears to be the head of a cow."
         }
       },
       "items": [
         { "id": "bigknife", "name": "Big knife", "destination": "inventory", "damage": 10}
       ]
     },
     "rightwing": {
       "description": {
         "default": "This appear to be some sort of office. There is a wooden desk in the middle, torches lighting every wall, and a single key resting on top of the desk."
       },
       "items": [
         {     "id": "key",
           "name": "Golden key",
           "details": "A small golden key. What use could you have for it?",
           "destination": "inventory",
           "triggers": [{
             "action": "use", //use  on north exit (contextual)
             "target": {
               "room": "bigroom",
               "exit": "north"
             },
             "effect": {
               "statusUpdate": "unlocked",
               "target": {
                 "room": "bigroom",
                 "exit": "north"
               }
             }
           }
         ]
         }
       ]
     },
     "bossroom": {
       "description": {
         "default": "You appear to have reached the end of the dungeon. There are no exits other than the one you just came in through. The only other thing that bothers you is the hulking giant looking like it's going to kill you, standing about 10 feet from you."
       },
       "npcs": [
         {
           "id": "finalboss",
           "name": "Hulking Ogre",
           "details": "A huge, green, muscular giant with a single eye in the middle of his forehead. It doesn't just look bad, it also smells like hell.",
           "stats":  {
             "hp": 10,
             "damage": 3
           }
         }
       ]
     }
    }
}

