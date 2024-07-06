#!/bin/sh

# Start ADB server
adb start-server

# Wait for ADB device to be connected
echo "Waiting for ADB device to be connected..."
while [ "$(adb devices | grep -w 'device' | wc -l)" -eq 0 ]; do
  sleep 1
done

echo "ADB device connected."
