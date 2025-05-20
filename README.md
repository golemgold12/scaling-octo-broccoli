In theory, call the security microservice via
Send the txt file of failed login attempts over to a local machine running the SecurityTestProgram
SecurityTestProgram will read this, and send it over to Max's main program.

Max would likely read the contents, and see if something seems suspicious
A list of suspisious usernames is sent back to SecurityTestProgram, which sends it back to main
Suspisious usernames are temporarily locked.

![Screenshot 2025-05-20 134923](https://github.com/user-attachments/assets/6e2f719d-a209-415f-983a-3c511a242a22)
