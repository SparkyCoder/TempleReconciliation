# Installing Windows Subsystem for Linux (WSL-2) and Setting Up with Visual Studio Code

## Introduction

This guide provides instructions for installing WSL-2 (Windows Subsystem Linux) for Windows

## URL Reference

The following instructions are based on the official documentation:

- [Windows Subsystem for Linux Installation Guide](https://learn.microsoft.com/en-us/windows/wsl/install)

## Prerequisites

- This is meant to be for Windows Operating Systems ONLY

## Setting Up WSL-2 with Visual Studio Code

1. **Open Windows PowerShell or Windows Command Prompt in Administrator Mode**

   - This can be done by using the start button and searching for either "PowerShell" or "Command Prompt" and selecting "Run as Administrator".<br>
     <img src="images\WSL_SETUP images\00_Windows_PowerShell_Admin.png" alt="Windows PowerShell Search Containing Run as Administrator" style="width:40%; height:auto;">
     <img src="images\WSL_SETUP images\01_Command_Prompt_Admin.png" alt="Command Prompt Search Containing Run as Administrator" style="width:40%; height:auto;">

2. **Install WSL-2 and Ubuntu:**

   - In the Shell/Command Line, paste the following command. By default, it should install Ubuntu:

     ```bash
     wsl --install
     ```

     If Ubuntu is not installed by default, you can specify it explicitly:

     ```bash
     wsl --install -d Ubuntu
     ```

     - If you encounter an error such as “Failed to attach disk 'LocalState\\ext4.vhdx' to WSL2: The system cannot find the file specified,” you can resolve it by unregistering and reinstalling Ubuntu:
       ```bash
       wsl --unregister Ubuntu
       wsl --install -d Ubuntu
       ```

   - We will then check if Ubuntu is set to Version 2:
     ```bash
     wsl -l -v
     ```
     <img src="images\WSL_SETUP images\Ubuntu Version Check.png" alt="Command Prompt Search Containing Run as Administrator" style="width:40%; height:auto;"><br>
     - If you encounter Ubuntu not being in Version 2, we can change the Version Through:
       ```bash
       wsl --set-version Ubuntu 2
       ```

3. **Create a UNIX Username and Password:**

   - Linux will ask you to create a new UNIX username and password. Use whatever username and password you prefer, but remember the credentials for using sudo privileges in Linux.

4. **Restart Your Computer:**

   - Restart your computer to allow WSL to complete the setup.

## OPTIONAL: VSCode Connecting to WSL Directory

5. **Install the WSL Extension in Visual Studio Code:**

   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl+Shift+X`.
   - Search for "WSL" and install the WSL extension.
     <img src="images\WSL_SETUP images\02_WSL_VSCode_Extension.png" alt="WSL Extensions Found in Extensions" style="width:50%; height:auto;">

6. **Open a Remote Window in VS Code:**

   - Once the extension is installed, on the bottom left corner of the VS Code window, select the option to "Open a Remote Window."
   - On the top center of the screen, it will ask which remote windows to open. Select "Connect to WSL to Distro" > "Ubuntu."
     <img src="images\WSL_SETUP images\03_Open_Remote_Window.png" alt="Bottom-Left Corner of VSCode will have a Blue Button to be able to Open a Remote Window" style="width:20%; height:auto;">
     <img src="images\WSL_SETUP images\04_Connect_to_WSL.png" alt="VSCode Top Taskbar will ask for options to open a Remote Window" style="width:100%; height:auto;">
     <img src="images\WSL_SETUP images\05_Connect_to_Ubuntu.png" alt="VSCode Top Taskbar will ask which WSL distro to use for Remote Window" style="width:100%; height:auto;">

7. **Verify Connection to WSL:**

   - Once the new window is finished loading, check the bottom left corner to confirm you are using WSL. If you do not see “WSL:Ubuntu,” it means you are editing using Windows, which is slower than using WSL.
     <img src="images\WSL_SETUP images\06_Running_in_Ubuntu_WSL_2.png" alt="Hovering the Blue Button on Bottom-Left Should be updated based on WSL Distro" style="width:40%; height:auto;">

8. **Open the Explorer Tab and Open a Folder:**
   - Open the Explorer tab (found on the left taskbar) and click "Open Folder."
   - Open the folder to the default path `/home/UNIXUsername/` (replace `UNIXUsername` with your actual username).
     <img src="images\WSL_SETUP images\07_Open_Folder.png" alt="VSCode Top Taskbar will ask for specific location for the directory to access" style="width:80%; height:auto;">
   - You are now in the home directory of your Linux environment.

## Conclusion

By following this guide, you should have WSL-2 installed and set up with Ubuntu.
Additionally, you will have configured Visual Studio Code to work with your WSL environment, allowing you to take advantage of the speed and efficiency of developing within a Linux environment directly from Windows. (Though this may not be used for this project)
