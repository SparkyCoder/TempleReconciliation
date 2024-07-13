# Docker Setup for Android Development in Windows Systems

## Introduction

This how to set to set up Docker to be used in Android Development for Windows Systems. <br>
This is done in attempt to help streamline the installation process and to help ensure a consistent setup that everyone shared.

## Prerequisites

- This is done through the use of Visual Studio Code.
- The following documents assumes that you have properly cloned the remote repository (GitHub Repo) into your Computer on your local system.

## 1. Setting up Prettier & ESLint in VSCode

1. **Setup Node Project Manager for Prettier & ESLint Configurations:**
   - Refer to [NODE_SETUP.md](NODE_SETUP.md) for Setup Instructions.
2. **Enabling Prettier & ESLint in VSCode:**
   - Refer to [ESLINT_PRETTIER_SETUP.md](ESLINT_PRETTIER_SETUP.md) for Setup Instructions.

## 2. Setting Up Docker Environement

1. **Setup WSL-2 into your Windows System:**
   - Refer to [WSL_SETUP.md](WSL_SETUP.md) for Setup Instructions.
2. **Install Docker Desktop:**
   - Go to [Docker Desktop Website](https://www.docker.com/products/docker-desktop/) and install Docker Desktop
   - After Installation, go to Docker Desktop's Settings<br>
     <img src="images\_WIN_SETUP images\Docker Desktop Settings Button.png" style="width:40%; height:auto;">
   - Under Resources>WSL Integration:<br>
     **Enable** Integration with my Default WSL Distro<br>
     **Enable** Integration with Addition Distro for **Ubuntu** or whichever Distro you are using for this project.<br>
     <img src="images\_WIN_SETUP images\Docker Desktop WSL Integration.png" style="width:80%; height:auto;">
   - Under Docker Engine, change "experimental" to true:
     <img src="images\_WIN_SETUP images\Docker Desktop Docker Engine.png" style="width:80%; height:auto;">

## 3. Setting Up USBIPD for USB Connection to Docker

1. **Setup USBIPD for Prettier & ESLint Configurations:**
   - Refer to [USBIPD_SETUP.md](USBIPD_SETUP.md) for Setup Instructions.

## 4. Creating Debug Keystore for Android Development

1. **Setup Debug Keystore for Android Development:**
   - Refer to [DEBUG_KEYSTORE_SETUP.md](DEBUG_KEYSTORE_SETUP.md) for Setup Instructions.
     <br>

# Useful Docker Commands

## Building Docker Environemnt

Used to build the Docker Conatiners.<br>
No Cache can be used to ensure you build with no preexisting caches

```
docker-compose build --no-cache
docker-compose build
```

## Running Docker Environemnt

Used to Run the Docker Container based on docker-compose.yml.<br>

```
docker-compose up
```

## Getting into Linux Terminal of Docker Environment

After Docker Container is up, you can access

```
docker exec -it <container_name_or_id> <Directory>
docker-compose exec <container_name_or_id> <Command>
```

# Docker Workflow

This is the workflow once everything has been set up properly

1. **Connect USBIPD to WSL:**

```
usbipd attach -w --auto-attach --busid <BUSID>
```

2. **Have Docker Container Up:**

```
docker-compose up
```

3. **Execute in Docker Command to Start the Android App:**

```
docker-compose exec reactnative npm run android --verbose
```
