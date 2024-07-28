# Setting Up debug.keystore

## Introduction

This guide provides instructions for setting up `debug.keystore` on Windows, Linux, and MacOS.<br>
This is needed to be able to setup the android application.

## Prerequisites

- This is done through the use of Visual Studio Code.
- The following documents assumes that you have properly cloned the remote repository (GitHub Repo) into your Computer on your local system.

## 1. Installing JDK/keytool Installation

The keytool is found in Java Developer Kit, so we will attempt to verify if we have the tools avaiable

### Windows

1. **Verify the Installation:**
   - Open our respective terminal and run:
     ```sh
     java -version
     javac -version
     keytool -help
     ```
   - If it is unable to recognize these commands, then JDK and/or keytool is not installed.<br>
     Otherwise, you may skip this section.
2. **Download and Install Java Development Kit (JDK):**
   - Go to the [Oracle JDK website](https://www.oracle.com/java/technologies/javase-downloads.html).
   - Download the installer for the latest JDK version for Windows.
   - Run the installer and follow the prompts to complete the installation.
3. **Locate the JDK Installation Path:**
   - Typically, the JDK is installed in `C:\Program Files\Java\jdk-<version>\bin`.
   - Add this path to the system's PATH environment variable:
     - Right-click on 'This PC' or 'Computer' on the desktop or in File Explorer, and then click on 'Properties'.
     - Click on 'Advanced system settings'.
     - In the System Properties window, click on the 'Environment Variables' button.
     - In the Environment Variables window, under 'System variables', find the `Path` variable, select it, and click 'Edit'.
     - Click 'New' and add the path to the JDK's `bin` directory, e.g., `C:\Program Files\Java\jdk-<version>\bin`.
     - Click 'OK' on all dialogs to apply the changes.
   - Open a new Command Prompt and verify `keytool`:
     ```sh
     keytool -help
     ```
4. **Restart Operating System:**<br>
   - This is let JDK and keytool to finish setting up.
     <br><br>
5. **Verify the Installation:**
   - Open Command Prompt (`cmd`) and run:
     ```sh
     keytool -help
     ```
   - If the command is recognized, `keytool` is installed successfully.

### Linux

1. **Verify the Installation:**
   - Open our respective terminal and run:
     ```sh
     java -version
     javac -version
     keytool -help
     ```
   - If it is unable to recognize these commands, then JDK and/or keytool is not installed.<br>
     Otherwise, you may skip this section.
2. **Update the package index:**
   ```sh
   sudo apt update
   ```
3. **Install OpenJDK:**
   ```sh
   sudo apt install openjdk-11-jdk
   ```
4. **Add JDK's `bin` Directory to PATH:**
   - Open your `.bashrc` or `.profile` file in a text editor:
     ```sh
     nano ~/.bashrc
     ```
   - Add the following line at the end of the file:
     ```sh
     export PATH=$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin
     ```
     (Adjust the path if your JDK is installed in a different location)
   - Save the file and apply the changes:
     ```sh
     source ~/.bashrc
     ```
   - Verify `keytool`:
     ```sh
     keytool -help
     ```
5. **Restart Operating System:**<br>
   - This is let JDK and keytool to finish setting up.
     <br><br>
6. **Verify the Installation:**
   ```sh
   keytool -help
   ```
   - If the command is recognized, `keytool` is installed successfully.

### MacOS

1. **Verify the Installation:**
   - Open our respective terminal and run:
     ```sh
     java -version
     javac -version
     keytool -help
     ```
   - If it is unable to recognize these commands, then JDK and/or keytool is not installed.<br>
     Otherwise, you may skip this section.
2. **Install Homebrew (if not already installed):**
   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. **Install OpenJDK using Homebrew:**
   ```sh
   brew install openjdk@11
   ```
4. **Add JDK's `bin` Directory to PATH:**
   - Open your `.bash_profile` or `.zshrc` file in a text editor:
     ```sh
     nano ~/.bash_profile
     ```
   - Add the following line at the end of the file:
     ```sh
     export PATH=$PATH:/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home/bin
     ```
     (Adjust the path if your JDK is installed in a different location)
   - Save the file and apply the changes:
     ```sh
     source ~/.bash_profile
     ```
   - Verify `keytool`:
     ```sh
     keytool -help
     ```
5. **Restart Operating System:**<br>
   - This is let JDK and keytool to finish setting up.
     <br><br>
6. **Verify the Installation:**
   ```sh
   keytool -help
   ```
   - If the command is recognized, `keytool` is installed successfully.

## 4. Generate debug.keystore

### All Operating Systems Windows/Linux/MacOS

1. **Run the following command to generate `debug.keystore`:**
   ```sh
   keytool -genkeypair -v -keystore ~/.android/debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android
   ```
   This command will provide prompt that you will need to fill out.

## 5. Place debug.keystore in the Appropriate Directory

### All Operating Systems Windows/Linux/MacOS

1. **Locate the directory where `debug.keystore.example` is present:**
   - Navigate to the directory using the file explorer or terminal.
   - Move the generated `debug.keystore` to this directory.

## Conclusion

By following this guide, you should have successfully set up `debug.keystore` on your system, ensuring it is placed in the appropriate directory for your project. This setup allows you to sign your Android applications in debug mode across different operating systems.

Here is the updated markdown document to include steps for activating or making `keytool` accessible if JDK is installed but `keytool` isn't activated or accessible:
