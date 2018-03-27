# TellMe Server

The entire backend of the TellMe application. The server runs containerised versions of MySQL 8.0.2 and Node.js 9.5.0, as well as it connects to a Firebase Cloud Messaging instance to send the push notifications.

# Contents
- [Setting up the server](https://github.com/JoshuaBradbury/TellMe/Backend/README.md#setting-up-the-server "Setting up the server")
- [Running the server](https://github.com/JoshuaBradbury/TellMe/Backend/README.md#running-the-server "Running the server")

## Setting up the server
All of the below are recommendations and any deviation is taken at the users own risk. These settings were used for the testing and demo platform but might not be appropriate for your own use. If you run into trouble feel free to contact the project owners for help or guidance.

The server runs Ubuntu 16.04 LTS with Docker CE 17.12.0 and the [lets encrypt certbot](https://certbot.eff.org/lets-encrypt/ubuntuxenial-other "Certbot installation instructions"). Once installed you will have to modify the nginx.conf to specify the new domain of your website.

## Running the server
The server is easy to run. It utilises Docker Compose 2 to increase the likelyhood of it running and to improve reliability and maintainability. To start, you need some ports opened so the server can communicate to the outside world.

Necessary:
- 443
- 80

Optional:
- 8080

The optional port is for running the adminer image if you want to view information in the database in a GUI format. Whenever you want to start the server just go to the folder that has the docker-compose.yml and run the following command.
```Bash
docker-compose build && docker-compose up -d
```
For further information about docker compose see the [docs](https://docs.docker.com/compose/ "Docker Compose Documentation"). 

You can view the logs by running the following command.
```Bash
docker-compose logs -f
```
You should then be able to see the requests being handled by the Node.js server.
