import { Box, Center, HStack, Image, Pressable, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { styles } from '../styles/styles';
import useDimensions from '../hooks/useDimensions';
import useStorage from '../hooks/useStorage';

const Header = () => {
  const {clearAllData} = useStorage();
  const {isVertical} = useDimensions();

  return (
    <Pressable onPress={() => clearAllData()} style={styles.header}>
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
    </Pressable>
    );
}

export default Header;
