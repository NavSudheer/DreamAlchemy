# App Store Screenshot Guide

## Current Situation

Your screenshots are from **iPhone 17 Pro** simulator at **941 x 2048 pixels**, but App Store Connect requires:
- **iPhone 6.7"**: 1290 x 2796 pixels (required)
- **iPhone 6.1"**: 1179 x 2556 pixels (optional but recommended)

## Solution Options

### Option 1: Retake Screenshots (Recommended - Best Quality)

Use an iPhone 15 Pro Max simulator (6.7") which outputs the correct resolution natively.

#### Steps:

1. **Open Xcode Simulator**
   ```bash
   open -a Simulator
   ```

2. **Create/Select iPhone 15 Pro Max Device**
   - In Simulator: **File → New Simulator**
   - Device: **iPhone 15 Pro Max**
   - iOS Version: Latest available
   - Click **Create**

3. **Run Your App**
   ```bash
   npx expo run:ios --device "iPhone 15 Pro Max"
   ```

4. **Take Screenshots Using Xcode**
   - With simulator running, in Xcode: **Device → Screenshot**
   - Or press `Cmd + S` while simulator is focused
   - This captures at native resolution (1290 x 2796)

5. **Alternative: Command Line**
   ```bash
   xcrun simctl io booted screenshot screenshot-1.png
   ```
   This saves at the device's native resolution.

#### Required Screenshots (5 minimum):

1. **Trial Offer Screen** - "3 FREE DREAM ANALYSES" prominently displayed
2. **Analysis Results** - Show completed dream analysis with symbols/archetypes
3. **Dream History** - List of saved dreams with "View Full Analysis" buttons
4. **Symbol Dictionary** - Grid of dream symbols with search functionality
5. **Subscription Value** - Free vs Premium comparison with pricing

### Option 2: Resize Existing Screenshots (Quick Fix)

Use the provided script to resize your current screenshots:

```bash
cd scripts
bash resize-screenshots.sh
```

**Note**: Resizing may reduce quality. The script resizes 941x2048 → 1290x2796, which involves upscaling and may look slightly blurry.

### Option 3: Use Different Device Size

If you prefer iPhone 6.1" screenshots (1179 x 2556):
- Use **iPhone 15 Pro** simulator (6.1")
- Follow the same steps above

## Verification

After taking/resizing screenshots, verify dimensions:

```bash
# Check dimensions
sips -g pixelWidth -g pixelHeight screenshot.png
```

Should show:
- iPhone 6.7": `pixelWidth: 1290` and `pixelHeight: 2796`
- iPhone 6.1": `pixelWidth: 1179` and `pixelHeight: 2556`

## App Store Connect Upload

1. Go to **App Store Connect → Your App → App Store → Screenshots**
2. Select **iPhone 6.7" Display** (or 6.1")
3. Upload your 5 screenshots
4. Add captions if desired (optional but recommended)

## File Format Requirements

- **Format**: PNG or JPEG (PNG recommended)
- **Color Space**: RGB
- **Max File Size**: 10MB per screenshot
- **Content**: Must be actual app screens (no mockups, no device frames)

## Tips

- **Take screenshots in light mode** (unless your app is dark-mode only)
- **Remove any debug overlays** before capturing
- **Use real content** - show actual dream analyses, not placeholder text
- **Ensure UI is polished** - no test data, proper formatting
- **Test on real device** if possible for best quality
