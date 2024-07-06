#!/bin/sh

# Start the ADB server
adb start-server

# List connected devices
devices=$(adb devices | grep -w "device")

# Check if any devices are connected
if [ -z "$devices" ]; then
  echo "No ADB devices found. Please connect your device and ensure USB debugging is enabled."
  exit 1
else
  echo "ADB devices found:"
  echo "$devices"
  # Run the npm command
  npm run android
fi