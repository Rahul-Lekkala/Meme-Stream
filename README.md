
# Project Title

XMeme 

---

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#running">Running the project</a>
      <ul>
        <li><a href="#get-the-project">Get the project</a></li>
      </ul>
      <ul>
        <li><a href="#running-the-backend">Running the backend</a></li>
        <li><a href="#running-the-frontend">Running the frontend</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![product-screenshot]](https://relaxed-williams-a8eb5e.netlify.app/)

XMeme is a simple full stack web application where a user can upload and view the memes. It uses Mongo as the database to store the information related to memes with NodeJS providing the APIs to the frontend which is made using html, css, and vanilla js.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Bootstrap](https://getbootstrap.com)
* [NodeJS](https://nodejs.org/en/)
* [Mongo](https://www.mongodb.com/cloud/atlas)
* [Express](https://expressjs.com/)

## Requirements

For development, you will only need Node.js and a node package, npm, installed in your environement.

### Installation
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Running the project

## Get the project

    $ git clone https://gitlab.crio.do/COHORT_ME_BUILDOUT_XMEME_ENROLL_1612436694845/rahul-lekkala97-me_buildout_xmeme.git
    $ cd rahul-lekkala97-me_buildout_xmeme/backend
    $ npm install

## Run the project

## Running the backend

    $ cd backend/
    $ MONGODB_URI=mongodb://localhost:27017/memesDB npm start


## Running the frontend

    $ cd frontend/
    Run index.html

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/frontend.PNG