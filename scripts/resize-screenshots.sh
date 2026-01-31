#!/bin/bash

# Script to resize screenshots for App Store submission
# Resizes iPhone 17 Pro screenshots (941x2048) to iPhone 6.7" (1290x2796)

SOURCE_DIR="../assets"
OUTPUT_DIR="../screenshots/app-store"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Target dimensions for iPhone 6.7"
TARGET_WIDTH=1290
TARGET_HEIGHT=2796

echo "Resizing screenshots for App Store submission..."
echo "Source: $SOURCE_DIR"
echo "Output: $OUTPUT_DIR"
echo "Target size: ${TARGET_WIDTH}x${TARGET_HEIGHT}"
echo ""

# Counter for renamed files
counter=1

for file in "$SOURCE_DIR"/Simulator_Screenshot_*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        output_file="${OUTPUT_DIR}/screenshot-${counter}.png"
        
        echo "Processing: $filename"
        echo "  -> screenshot-${counter}.png"
        
        # Resize using sips (macOS built-in)
        sips -z $TARGET_HEIGHT $TARGET_WIDTH "$file" --out "$output_file" > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo "  ✓ Resized successfully"
            counter=$((counter + 1))
        else
            echo "  ✗ Failed to resize"
        fi
        echo ""
    fi
done

echo "Done! Resized screenshots saved to: $OUTPUT_DIR"
echo ""
echo "Note: Resizing may reduce quality. For best results, retake screenshots"
echo "using iPhone 15 Pro Max simulator (6.7\") which outputs 1290x2796 natively."
