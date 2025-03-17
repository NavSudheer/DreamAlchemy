# Dream Alchemy - Jungian Dream Analysis App

Dream Alchemy is a mobile application that helps you analyze and interpret your dreams using principles from Jungian psychology and AI. The app allows you to record your dreams, receive detailed analyses of the symbols and archetypes present in your dreams, and save your dream interpretations for future reference.

## Features

- **Dream Input**: Record your dreams through text input or voice-to-text
- **Voice Recognition**: Speak your dreams aloud and have them transcribed automatically
- **AI-Powered Analysis**: Get detailed interpretations of your dreams using OpenAI's GPT-4o model
- **Jungian Psychology**: Analysis based on Carl Jung's theories of archetypes and the collective unconscious
- **Symbol Identification**: Identifies key symbols in your dreams and their meanings
- **Archetype Recognition**: Recognizes Jungian archetypes present in your dreams
- **Dream History**: Save and review your past dreams and their analyses
- **Dark Mode Support**: Comfortable viewing in any lighting condition

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS or Android device/emulator

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/DreamAlchemy.git
   cd DreamAlchemy
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your OpenAI API key:
   ```
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the App

```
npx expo start
```

Then, scan the QR code with the Expo Go app on your mobile device or press 'a' to open in an Android emulator or 'i' for iOS simulator.

## Important Notes

### Voice Recognition in Expo Go

The voice recognition feature requires native modules that are not supported in Expo Go. When running the app in Expo Go, the voice recording button will not be displayed.

To use the voice recognition feature, you need to create a development build of the app:

1. Install EAS CLI:
   ```
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```
   eas login
   ```

3. Configure the build:
   ```
   eas build:configure
   ```

4. Create a development build:
   ```
   eas build --profile development --platform android
   ```
   or
   ```
   eas build --profile development --platform ios
   ```

5. Install the development build on your device and run the app.

## Usage

1. **Record a Dream**: On the home screen, enter the details of your dream in the text input area or use the voice recording feature.
2. **Voice Recording**: Tap the "Voice" button to start recording your dream description. Speak clearly and tap "Stop" when finished.
3. **Analyze**: Tap the "Analyze" button to get an AI-powered Jungian interpretation of your dream.
4. **Save**: After receiving the analysis, you can save it to your dream history.
5. **Review**: Access your saved dreams and their analyses in the Dream History tab.

## Voice Recognition

The voice-to-text feature requires microphone permissions:
- On iOS, you'll be prompted to allow microphone access when you first use the feature.
- On Android, the app will request microphone permission when needed.

Voice recognition works best in a quiet environment with clear speech. The transcribed text will appear in the input field and can be edited before analysis.

## Technologies Used

- React Native
- Expo
- TypeScript
- OpenAI API
- React Native Voice for speech recognition
- AsyncStorage for local data persistence
- React Navigation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Carl Jung for his pioneering work in dream analysis and analytical psychology
- OpenAI for providing the AI capabilities that power the dream interpretations
- Expo team for the excellent React Native development platform
