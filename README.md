# Azur Lane DPS and CD Calculator

This a simple, or it started that way, Angular App to modify equipment and check their new DPS/CD.
Later I added Ships so that equipment were affected by the Stats of the ship.

## So, until I edit this thing again, the APP does:
* Calculate Max Enhancement DPS for each equipment. 
  * This is without OpSi buffs, you can add them manually if you care.
* Modify actual stats of each equipment 
  * Aircraft you only can modify actual slots, adding or removing would change the plane too much
    * That is my excuse, go and make a fork if you want to add that.
* Equip AUTO and MANUAL equipment to Ships
  * AUTO is equipment at +10, +6 or + whatever the wiki says is Max Enhancement without OpSi buffs
  * MANUAL is equipment that you modified before equipping, even if you edited nothing but clicked Update the APP will think that is MANUAL
    * FYI it changes nothing if is AUTO or MANUAL
* Modify ship stats, modifiers, buffs and mounts
  * All ships are considered to have 1 Mount, I'm not scrapping text to get the values :shrug:

## Things that the APP doesn't do and probably will never do:
* Tell you what ship is OP. I don't care if you are going to use the App for that but don't use it to make claims like: A ship is better than B because A ship calcs are better than B ship calcs.
  * This is because the APP does the math in perfect case
* Skills, too much work to parse all skills, so I'm letting you manually change Stats, Buffs and Modifiers.
* Timings, anything related to this you could use "Airstrike Timing Calculator" or "Battleship Cooldown Calculator"
* Modifying Aircraft Loadout, you can change their stats but not add another or remove loads.
  * You can change Load damage.
  * You can change Load number.
  * You can change Load modifiers.
  * You can't add a new Load.
  * You can't remove a Load.
* Plane AA, too much work for something that I don't care :shrug:
* Be updated to last Event.
  * Will try my best, but I'm using scrapped data.
  * Is that or manual, and I'm too lazy to copy everything from the wiki.
    * Will do manual only if scrappers stop doing it or really want to math with an equipment/ship and don't want to wait.

# Disclaimer

This APP is for Personal Use, I'm letting the Github-page be online, only so that I don't need to run it each time I need it. 

The moment that Github asks me for money to maintain it, I will shut down the page for a few months.

I will not accept payment to maintain the page, if someone offers do that kudos to them and I will try to continue maintaining the APP but start thinking of forking it and make your own In case I can't.

### Things left to do:

* Make README better --- Someday, probably never
* Add Light/Medium/Heavy modifiers to Ship - Calculation Advanced Aviation


# Credits

### AzurApi
https://github.com/AzurAPI/azurapi-js

For the Ship and Equipment Database, even if I'm not using it directly is faster to scrap their JSON than to manually type everything from the Wiki.

So my thanks to them for the good work!

# Links

### Airstrike Timing Calculator
https://thebombzen.com/azur-lane/airstrike-reload.html

### Battleship Cooldown Calculator
https://thebombzen.com/azur-lane/battleship-reload.html
