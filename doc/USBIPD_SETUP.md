# Setting Up USBIPD for Windows

## Introduction

This guide provides instructions for setting up USBIPD on Windows to connect to WSL (Windows Subsystem for Linux).

## Prerequisites

- This is done through the use of Visual Studio Code.
- The following documents assumes that you have properly cloned the remote repository (GitHub Repo) into your Computer on your local system.
- Ensure you have WSL installed and set up. (Refer to [Setting Up WSL-2](https://learn.microsoft.com/en-us/windows/wsl/install))

## 1. Install USBIPD

### Windows

1. **Open Windows PowerShell or Windows Command Prompt in Administrator Mode**

   - This can be done by using the start button and searching for "Command Prompt" and selecting "Run as Administrator".<br>
     <img src="images\USBIPD_SETUP images\01_Command_Prompt_Admin.png" alt="Command Prompt Search Containing Run as Administrator" style="width:40%; height:auto;">

2. **Install USBIPD-WIN:**
   - In the Shell/Command Line, paste the following command to install USBIPD-WIN:
     ```sh
     winget install usbipd
     ```
   - Follow the prompts to complete the installation.

## 2. Verify USBIPD Installation

### Windows

1. **Verify the Installation:**
   - Open Command Prompt (`cmd`) and run:
     ```sh
     usbipd -h
     ```
   - If the command is recognized and shows the help message, USBIPD is installed successfully.

## 3. Connect USB Device to WSL

1. **Connect Device by USB:**
2. **List Available USB Devices:**

   - In Command Prompt or PowerShell, run:
     ```sh
     usbipd list
     ```
   - This command lists all available USB devices that can be attached to WSL.
     - If it is not found, then this there may be an issue with the Device or the USB Cable

3. **Enable USB Device Sharing:**

   - Identify the BUSID of the USB device you want to attach from the list generated in the previous step.
   - Enable Sharing of the Device by running:
     ```sh
     ubspid bind --busid <BUSID>
     ```
   - Replace `<BUSID>` with the actual BUSID of your USB device.

4. **Attach USB Device to WSL:**

   - Identify the BUSID of the USB device you want to attach from the list generated in the previous step.
   - Attach the USB device to WSL by running:
     ```sh
     usbipd attach -w --auto-attach --busid <BUSID>
     ```
   - Replace `<BUSID>` with the actual BUSID of your USB device.
   - Since we enabled --auto-attach while the command prompt is running, it will auto attach to WSL

5. **Verify USB Device Attachment in WSL:**
   - Open your WSL terminal and verify the USB device is attached by running:
     ```sh
     lsusb
     ```
   - You should see your USB device listed.
6. **Repeat Step 4 (Attach USB Device to WSL) For USBIPD with WSL:**
   - When restarting your Operating System, the connection from Windows to WSL will be severed completely.
   - <BUSID> should always be the same, but you do not need to reverify the number and or need to enable sharing.

## Conclusion

By following this guide, you should have successfully set up USBIPD on Windows and connected a USB device to WSL. This setup allows you to use USB devices within your WSL environment, enhancing your development and testing capabilities.
