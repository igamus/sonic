# Sonic - Discord but Faster

Sonic Live Site [here](https://szonic.onrender.com/)!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributors](#contributors)


## Index

[Feature List](https://github.com/igamus/sonic/wiki/Features-List) | [Database Scheme](https://github.com/igamus/sonic/wiki/DB-Schema) | [API/Routes](https://github.com/igamus/sonic/wiki/Routes) | 

## Introduction

Sonic is a fast and dynamic communication platform inspired by Discord. It allows users to create servers and group channels to hang out with friends and explore various hobbies and areas of interest. Built using React, Websockets, and Flask, Sonic offers a real-time chatting experience that ensures seamless communication and efficient interactions.


## Getting started

1. Clone this repository: https://github.com/igamus/sonic.git
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
   * backend (In base of directory):
       * ` Pipenv install `
   * frontend :
       * ` npm install `
3. Create a .env file using the .envexample provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed (base directory):
   * ` Pipenv shell `
   * ` flask db init `
   * ` flask db migrate `
   * ` flask db upgrade `
   * ` flask seed all `
5. Start the app for both backend and frontend using:
   * backend :
       * ` pipenv run flask run `
   * frontend :
       * ` npm start `
## Amazon Web Services S3
   * For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

## Landing Page
![landing-page-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmdxcDZ6dWZyNmYwMG04NHZtc3JpY2R0N2k0ZmY0MjQwb2llcHltMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nIR1bwEAIkNx6XadbN/giphy.gif)

## Servers Page
![server-page-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZoMDkzbHJpM25iY3Q2YWJpZTBnM2Qxazhyc2ZkaWJjNGE1cTk4cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DhjZTCTcLY9wM1KUDH/giphy.gif)

## Features

- **Server Creation:** Users can create their own servers and invite friends to join, fostering a sense of community within specific interest groups.

- **Group Channels:** Within each server, users can create and participate in different group channels, making it easy to chat and share content with like-minded individuals.

- **Real-time Communication:** Sonic leverages Websockets to enable real-time messaging, ensuring instant delivery of messages and a smoother user experience.

- **User Authentication:** Secure user authentication allows individuals to create accounts, log in, and access their servers with confidence.

- **Sleek and Intuitive UI:** The user interface is designed to be user-friendly and visually appealing, enhancing the overall user experience.

- **User Profile Pictures:** Users can personalize their profiles with profile pictures, adding a personal touch to their presence on Sonic.

- **Server and Banner Images:** Servers can have custom server images and banners, allowing users to customize the look and feel of their communities.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Websockets: A communication protocol that enables real-time, full-duplex communication between the client and server.
- Flask: A lightweight and efficient web framework for Python.
  
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)


  
## Usage

1. **User Registration/Login:** Create an account or log in to an existing account to access the full functionality of Sonic.

2. **Server Creation:** Once logged in, you can create your own server and invite friends to join by sharing the server link/code.

3. **Group Channels:** Within each server, you can create multiple group channels for different discussions or topics.

4. **Real-time Chat:** Enjoy real-time communication with friends and community members in the group channels.

5. **Personalization:** Customize your user profile with a profile picture and your servers with unique server images and banners.

6. **Exploring Interests:** Discover and join servers related to various hobbies and areas of interest to connect with like-minded individuals.

## Contributors

- Brian Freese - [@brianfreese](https://github.com/IceLordUlmo)
- Isaac Gamus - [@isaacgamus](https://github.com/igamus)
- Oscar Alcantar - [@oscaralcantar](https://github.com/Oscar-999)
