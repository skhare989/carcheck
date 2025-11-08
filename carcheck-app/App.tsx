import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { en, registerTranslation } from 'react-native-paper-dates';
import { RootNavigator } from './src/navigation/RootNavigator';
import { theme } from './src/constants';
import { initPhotoDirectory } from './src/utils/photoStorage';

// Register date picker locale
registerTranslation('en', en);

export default function App() {
  // Initialize photo storage on app mount
  useEffect(() => {
    initPhotoDirectory();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style="light" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
