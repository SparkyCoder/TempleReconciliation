# Installing Node.js and Using npm for Project Management

## Introduction

This guide provides instructions for installing Node.js and npm on Windows, Linux, and macOS.
Additionally, it covers how to use the `--legacy-peer-deps` option with npm to resolve peer dependency conflicts.

## Prerequisites

- This is done through the use of Visual Studio Code.
- The following documents assumes that you have properly cloned the remote repository (GitHub Repo) into your Computer on your local system.

## 1. Installing Node.js

### Windows

1. **Verify the Installation:**
   - Open Command Prompt (`cmd`) and run:
     ```sh
     node -v
     npm -v
     ```
     If it is unable to recognize the commands, then node and npm is not installed.<br>
     Otherwise, you may skip this section.
2. **Download Node.js Installer:**
   - Go to the [Node.js website](https://nodejs.org/).
   - Download the LTS (Long Term Support) version for Windows.<br>
     <img src="images\NODE_SETUP images\Node Website Snapshot.png" style="width:50%; height:auto;">
3. **Run the Installer:**
   - Open the downloaded Node.js installer file (e.g., `node-vxx.x.x-x64.msi`).
   - Follow the prompts in the installer. <br>
     Ensure that the option to install npm is checked and that Node.js is added to the PATH (This is typically done by default).<br>
     <img src="images\NODE_SETUP images\Node Setup Settings.png" style="width:50%; height:auto;">
4. **Verify the Installation:**
   - Open Command Prompt (`cmd`) and run:
     ```sh
     node -v
     npm -v
     ```
5. **Restart Operating System:**<br>
   - Though the Command Prompt recognizes the new path for node and npm, we will need to restart for VSCode to recognize the new software.
     <br><br>

### Linux

1. **Verify the Installation:**
   ```sh
   node -v
   npm -v
   ```
   If it is unable to recognize the commands, then node and npm is not installed.<br>
   Otherwise, you may skip this section.
2. **Update the package index:**
   ```sh
   sudo apt update
   ```
3. **Install Node.js and npm:**
   ```sh
   sudo apt install nodejs npm
   ```
4. **Verify the Installation:**
   ```sh
   node -v
   npm -v
   ```
5. **Restart Operating System:**<br>
   - Though the Linux recognizes the new path for node and npm, we will need to restart for VSCode to recognize the new software.
     <br><br>

### MacOS

1. **Verify the Installation:**
   ```sh
   node -v
   npm -v
   ```
   If it is unable to recognize the commands, then node and npm is not installed.<br>
   Otherwise, you may skip this section.
2. **Install Homebrew (if not already installed):**
   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. **Install Node.js and npm using Homebrew:**
   ```sh
   brew install node
   ```
4. **Verify the Installation:**
   ```sh
   node -v
   npm -v
   ```
5. **Restart Operating System:**<br>
   - Though the MacOS recognizes the new path for node and npm, we will need to restart for VSCode to recognize the new software.
     <br><br>

## 2. Setting Up Your Workspace

1. **Navigate to Your Project Directory:**

   - Open your terminal (Command Prompt on Windows, Terminal on Linux/macOS).
   - Navigate to your project directory using the `cd` command. For example:
     ```sh
     cd path/to/your/project
     ```
     Typically cd isn't necessary if you open the project in the correct directory in VSCode.

2. **Install Project Dependencies with --legacy-peer-deps:**

   - Run the following command to install all dependencies listed in your `package.json`, using the `--legacy-peer-deps` flag to resolve peer dependency conflicts:
     ```sh
     npm install --legacy-peer-deps
     ```
     This flag tells npm to install packages while ignoring peer dependency conflicts. It's especially useful when you encounter issues where different dependencies require conflicting versions of a package.

3. **Verify Installation:**

   - Ensure that all dependencies are installed correctly and that no errors are present. You should see a `node_modules` directory in your project with all dependencies installed.

## Conclusion

By following this guide, you should have Node.js and npm installed on your system, and be able to manage dependencies in your project using the `--legacy-peer-deps` option. This setup helps resolve common peer dependency conflicts, ensuring a smoother development experience.

## Troubleshooting

### Common Issues

- **Command not found:** Ensure that Node.js and npm are added to your system's PATH. If you encounter issues, revisit the installation steps to verify that everything is set up correctly.

- **Permission issues (Linux/macOS):** If you encounter permission issues when installing packages globally, you might need to use `sudo`:

  ```sh
  sudo npm install -g <package-name>
  ```

- **Node Version Manager (nvm):** If you frequently switch between different Node.js versions, consider using `nvm` (Node Version Manager):

  #### Linux/MacOS:

  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  source ~/.bashrc
  nvm install node
  nvm use node
  ```

  #### Windows:

  1. **Download nvm-windows:** Go to the [nvm-windows releases page](https://github.com/coreybutler/nvm-windows/releases) and download the latest installer.
  2. **Run the Installer:** Follow the installation instructions.
  3. **Install Node.js:**
     ```sh
     nvm install lts
     nvm use lts
     ```
  4. **Verify Installation:**
     ```sh
     node -v
     npm -v
     ```

- **Peer dependency conflicts:** Using the `--legacy-peer-deps` flag should resolve most conflicts. If issues persist, manually adjust your `package.json` to specify compatible versions of dependencies. For example, you can add specific versions of `react` and `react-dom` that are compatible with your other dependencies.

### Helpful Commands

- **Check Node.js version:**

  ```sh
  node -v
  ```

- **Check npm version:**

  ```sh
  npm -v
  ```

- **Install dependencies with --legacy-peer-deps:**

  ```sh
  npm install --legacy-peer-deps
  ```

- **Update npm to the latest version:**

  ```sh
  npm install -g npm@latest
  ```

- **List globally installed npm packages:**

  ```sh
  npm list -g --depth=0
  ```

- **Uninstall a globally installed package:**
  ```sh
  npm uninstall -g <package-name>
  ```

### Additional Resources

- **Node.js Documentation:** [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **npm Documentation:** [https://docs.npmjs.com/](https://docs.npmjs.com/)
- **Visual Studio Code:** [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **nvm (Node Version Manager) for Linux/macOS:** [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- **nvm-windows (Node Version Manager for Windows):** [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
