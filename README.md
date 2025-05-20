In theory, call the security microservice via
Send the txt file of failed login attempts over to a local machine running the SecurityTestProgram
SecurityTestProgram will read this, and send it over to Max's main program.

Max would likely read the contents, and see if something seems suspicious
A list of suspisious usernames is sent back to SecurityTestProgram, which sends it back to main
Suspisious usernames are temporarily locked.

