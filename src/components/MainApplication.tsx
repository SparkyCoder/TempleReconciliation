import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import React from "react";
import ContentArea from "./ContentArea";
import { config } from "@gluestack-ui/config";
import { styles } from "../styles/styles";

const MainApplication = () => {  
  return (
  <GluestackUIProvider config={config}>
    <SafeAreaView  style={styles.droidSafeArea}>
      <ContentArea />
    </SafeAreaView>
   </GluestackUIProvider>
  );
}

export default MainApplication;
