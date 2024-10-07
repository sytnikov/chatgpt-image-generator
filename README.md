# AI Image Generator

The Chrome extension creates AI-generated images based on the user prompt.

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Image Generation Model](#image-generation-model)
- [Technology](#technology)
- [Installation](#installation)
- [Deployment](#deployment)

## Introduction

This Chrome extension allows users to input a prompt and receive a set of AI-generated images based on the description. The extension communicates with the image generation model through a backend proxy server using a REST API for seamless and secure processing and delivery of the images.

## Features

- Customizable options for the quantity, size, and style of the pictures
- Input field being able to take relatively long descriptions from a user
- Enlaged preview of the pictures
- Downloading images

## Image Generation Model

- **SDXL text-to-image model from stability.ai**: [SDXL & SD1.6](https://platform.stability.ai/docs/api-reference#tag/SDXL-and-SD1.6)

## Technology

![Node.js](https://img.shields.io/badge/Node.js-22.1.0-green?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19.2-green?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-5.7.0-orange?style=for-the-badge&logo=mqtt&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.12.0-blue?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize--typescript-2.1.6-blue?style=for-the-badge&logo=sequelize&logoColor=white)

## Installation

1. Clone repository
```sh
git clone https://github.com/sytnikov/dev-challenge-transport.git
```

2. Install dependencies
```sh
npm install
```

3. Create .env file and setup the database and environment variables in it
```sh
PORT=<yourPort>

POSTGRES_DB=<yourDbName>
POSTGRES_HOST=<yourDbHost>
POSTGRES_PORT=<yourDbPort>
POSTGRES_USERNAME=<yourDbUsername>
POSTGRES_PASSWORD=<yourDbPassword>
```

4. Start the service in the dev mode
```sh
npm run start-dev
```

## Deployment

The backend proxy server is deployed on Vercel.
