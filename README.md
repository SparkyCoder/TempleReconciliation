# TempleReconciliation

## Prerequisites

<B>Step 1:</b>
Start by cloning [this](https://github.com/SparkyCoder/TempleReconciliation) GitHub repo to your local machine.

<B>Step 2:</b>
Follow React Native's official documentation for setting up a developer environment [here](https://reactnative.dev/docs/set-up-your-environment). We don't want to make use of their Expo Framework as that would severly limit the developement capabilities of this project.

## Developement

<B>Step 1:</b> Plug an android device into your computer with a USB data cable.

<B>Step 3:</b> Ensure USB Debugging is enabled on your Android device and that you're a `developer`

<B>Step 3:</b> Verify the device is seen by running `adb devices` in your terminal.

<B>Step 4:</b> Launch the application by running `npm run android`. This will install and launch the app on your physical device.

## PR Approval

- Ensure there is no business logic in views. Only HTML elements and click events.
- All business logic is contained within custom hooks.
- State is managed within React's useReducer hook.
- Components are broken down into seperate basic functional components.
- Ensure views are supported by unit tests.
- Please test that changes work on your local device before committing to repo.
- Add a verbose and helpful commit messages.

## Architecture

![Architecture Diagram](https://github.com/SparkyCoder/TempleReconciliation/blob/main/Architecture.jpg)
