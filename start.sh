#!/bin/sh

# Verify if adb devices is showing any connected devices
devices=$(adb devices | grep -w "device")

if [ -z "$devices" ]; then
  echo "No devices found. Please ensure your device is connected and USB debugging is enabled."
  exit 1
else
  echo "Device(s) found:"
  echo "$devices"
fi

# Run npm android command
npm run android
