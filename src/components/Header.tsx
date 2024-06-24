import { Box, Center, HStack, Image, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { styles } from '../styles/styles';
import useDimensions from '../hooks/useDimensions';

function App(): React.JSX.Element {
    const {isVertical} = useDimensions();

  return (
  <Box style={styles.header}>
    <Center>
        {isVertical ? 
        <Box style={styles.full}>
            <Image alt='Logo' style={styles.autoScaledImage} source={require('../../src/media/Logo.gif')} />
        </Box> :
        <HStack style={styles.full}>
            <Image alt='Logo' style={styles.autoScaledImage} source={require('../../src/media/Logo.gif')} />
            <Image alt='Guang Ming Temple' style={styles.autoScaledImage} source={require('../../src/media/Name.png')} />
            <Image alt='BLIA' style={styles.autoScaledImage} source={require('../../src/media/Blia.png')} />
        </HStack>
        }
    </Center>
  </Box>
  );
}

export default App;
