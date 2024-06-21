import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { styles } from './src/styles/styles';
import ContentArea from './src/components/ContentArea';


function App(): React.JSX.Element {
  return (
  <GluestackUIProvider config={config}>
    <SafeAreaView  style={styles.droidSafeArea}>
      <ImageBackground style={styles.full} source={require('./src/media/background.png')}>
         <ContentArea />
      </ImageBackground>
    </SafeAreaView>
   </GluestackUIProvider>
  );
}

export default App;
