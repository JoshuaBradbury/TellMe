#!/bin/bash
docker build -t site nginx
docker stop site
docker rm $(docker ps -a -q)
docker run -d --name site -p 443:443 -p 80:80 -v /home/ubuntu/nginx/html:/etc/nginx/html -v /home/ubuntu/nginx/logs:/var/log/nginx/ -v /etc/letsencrypt/:/etc/letsencrypt site
