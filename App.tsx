import React from 'react';
import { SafeAreaView} from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { styles } from './src/styles/styles';
import ContentArea from './src/components/ContentArea';
import Header from './src/components/Header';


function App(): React.JSX.Element {
  return (
  <GluestackUIProvider config={config}>
    <SafeAreaView  style={styles.droidSafeArea}>
      <Header />
      <ContentArea />
    </SafeAreaView>
   </GluestackUIProvider>
  );
}

export default App;
