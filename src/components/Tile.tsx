import { Box, Center, Heading, Image, Pressable } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import useDimensions from "../hooks/useDimensions";
import React from "react";

const Tile = (props: any) => {
    const {isVertical} = useDimensions();
    
    const getCenter = () => {
return ( 
        <Center style={styles.full}>
            <Box style={styles.tilePreviewArea}>
                <Image alt={props.title} style={styles.autoScaledImage} source={props.image} />
            </Box>
            <Heading style={styles.tileText}>{props.title}</Heading>
            <Heading style={styles.tileText}>{props.subText}</Heading>
            {props.children}
        </Center>)
    }

    return (
        <Pressable onPress={() => props.onClick()} style={styles.pressable}>
            {isVertical ? 
            <Box style={[styles.tile, {height: 200, width: 250, marginTop:'8%'}]}>
                {getCenter()}
            </Box>
            :
            <Box style={[styles.tile, {height: 200, width: 200, marginTop:'2%'}]}>
                {getCenter()}
            </Box>}
        </Pressable>
    );
};

export default Tile;