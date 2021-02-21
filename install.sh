#!/bin/bash

# Any installation related commands
#sudo apt-get install -y abc

sudo apt update

#sudo apt install -y build-essential checkinstall libssl-dev

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

node -v
npm -v

sudo apt update

echo "Node & npm installed successfully"

curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org

# Start the mongo
sudo systemctl start mongod.service
sudo systemctl status mongod

sudo systemctl enable mongod
mongo --eval 'db.runCommand({ connectionStatus: 1 })'

echo "Mongo installed successfully"