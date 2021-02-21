#!/bin/bash

cd backend
# Setup DB or any other environment variables you want to setup.
npm install

MONGODB_URI=mongodb://localhost:27017/memesDB npm start