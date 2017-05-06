#! /bin/bash

#install docker
sudo apt-get update
sudo apt-get install curl
curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker vagrant

#install docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
