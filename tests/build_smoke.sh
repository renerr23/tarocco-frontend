#!/bin/bash

# Run the webpack command
echo "Running build..."
npm run client --silent &
    PID=$! # Store the PID of the last background command

# Capture the exit code
BUILD_EXIT_CODE=$?

# Check if the webpack failed
if [ $BUILD_EXIT_CODE -ne 0 ]; then
  echo "ERROR: Webpack build failed."
  exit 1
fi

# Additional checks (optional)
echo "Verifying build artifacts..."
if [ ! -f dist/client/bundle.js ]; then
  echo "ERROR: Missing expected output file dist/client/bundle.js"
  exit 1
fi

kill -9 $PID

echo "Smoke test passed successfully!"
exit 0
