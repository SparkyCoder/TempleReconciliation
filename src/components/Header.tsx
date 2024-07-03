import { Box, Center, HStack, Image, Pressable } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/styles';
import useDimensions from '../hooks/useDimensions';
import useStorage from '../hooks/useStorage';
import { DefaultProps } from '../interfaces/state';

const Header = ({state} : DefaultProps) => {
  const {clearAllData} = useStorage();
  const {isVertical} = useDimensions();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    resetCache()
  },[count])

  const resetCache = () => {
    if(count < 3) return;
    state.showSuccess('Cache Cleared', 'All local storage has been reset')
    clearAllData()
    setCount(0);
  }

  const onPress = () => {
    setCount(count+1);
  }

  return (
    <Pressable onPress={() => onPress()} style={styles.header}>
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
