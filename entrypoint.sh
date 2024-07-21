#!/bin/sh

# Start the Metro bundler in the background
npm start -- --port 8081 &

# Store the PID of the Metro bundler process
METRO_PID=$!

# Function to check if Metro bundler is running
check_metro_server() {
  until curl --output /dev/null --silent --head --fail http://localhost:8081; do
    echo "Waiting for Metro bundler to start..."
    sleep 1
  done
  echo "Metro bundler is running."
}

# Start the ADB server
adb start-server

# Wait for an ADB device to be connected
while [ -z "$(adb devices | grep -w device)" ]; do
    echo "Waiting for device..."
    sleep 1
done

echo "Device connected"

# Check if Metro bundler is up
check_metro_server

# Run the npm command for the Android build
npm run android --verbose

# Wait for the Metro bundler process to finish
wait $METRO_PID

# Keep the container running
tail -f /dev/null
