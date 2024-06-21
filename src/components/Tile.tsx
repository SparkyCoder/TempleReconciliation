import { Box, Center, Heading, Pressable } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";

const Tile = (props: any) => {
    return (
        <Pressable onPress={() => props.onClick()} >
            <Box style={styles.tile}>
                <Center style={styles.full}>
                    <Heading style={styles.tileText}>{props.title}</Heading>
                    {props.children}
                </Center>
            </Box>
        </Pressable>
    );
};

export default Tile;