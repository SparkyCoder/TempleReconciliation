# Local Repository Setup/Reset

## Overview

This guide provides instructions on how to incorporate's VSCode's Extnesions of ESLint and Prettier for better formating and consistency.

## Prerequisites

- This guide assumes you have properly cloned the remote repository (GitHub Repo) to your local system.
- You should have npm installed and set up (Refer to [NODE_SETUP.md](NODE_SETUP.md)).

## Installing Prettier & ESLint

This Project will be using Prettier & ESLint to ensure proper formating and coding style.<br>
This is beneficial since it will:

- Ensure that Style is Consistent
- Flag Poor Coding Practices to Fix
- Help Flag Bug's Potential Issues
- Flag Reduntant Code
- Ensure Better Readability

1. Install Prettier & ESLint from Visual Studio Code Extensions<br>
   <img src="images\ESLINT_PRETTIER_SETUP images\Prettier_Extension_Install.png" alt="Shows Prettier Extension on VSCode's Extension Section" style="width:40%; height:auto;">
   <img src="images\ESLINT_PRETTIER_SETUP images\ESLint_Extension_Install.png" alt="Shows ESLint Extension on VSCode's Extension Section" style="width:40%; height:auto;">
2. Restart Visual Studio by either closing and reopening or by typing ">reload" on VSCode
   <img src="images\ESLINT_PRETTIER_SETUP images\Reload_Command.png" alt="Shows Visual Studio Code's Top Taskbar Command to Quickly Reload Window" style="width:100%; height:auto;">

## Afterwards:

- Prettier will Auto Format **After You Save** the File
- ESLint will display warnings and errors of poor coding style<br>
  <img src="images/ESLINT_PRETTIER_SETUP images\ESLint_Flags.png" alt="Shows Problems that ESLint 'warns' from where the Terminal is located" style="width:100%; height:auto;"><br>
