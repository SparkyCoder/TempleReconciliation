import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import { Box, GluestackUIProvider, Heading } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { styles } from './src/styles/styles';


function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
    <SafeAreaView  style={styles.droidSafeArea}>
      <ImageBackground style={styles.container} source={require('./src/media/background.png')}>
         
      </ImageBackground>
    </SafeAreaView>
  </GluestackUIProvider>
  );
}

export default App;
