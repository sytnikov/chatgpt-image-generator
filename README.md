# AI Image Generator

The Chrome extension creates AI-generated images based on the user prompt.

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Image Generation Model](#image-generation-model)
- [Technology](#technology)
- [Deployment](#deployment)

## Intro

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
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19.2-green?style=for-the-badge&logo=express&logoColor=white)
![React.js](https://img.shields.io/badge/React-18.3.1-orange?style=for-the-badge&logo=react&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-5.93.0-blue?style=for-the-badge&logo=webpack&logoColor=white)
![MaterialUI](https://img.shields.io/badge/MaterialUI-5.16.7-blue?style=for-the-badge&logo=materialui&logoColor=white)

## Deployment

This Chrome extension is published in the [Google Chrome Webstore](https://chromewebstore.google.com/detail/chatgpt-image-generator/nnpdeoblieaeppbbemdbdbpajcpoogcp?hl=en-US&utm_source=ext_sidebar). The backend proxy server is deployed on [Vercel](https://vercel.com).
