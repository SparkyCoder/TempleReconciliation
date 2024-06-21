import {Dimensions} from 'react-native';
import { useEffect, useState } from "react";

const useDimensions = () => {
    const [isVertical, setIsVertical] = useState<boolean>(false);

    useEffect(() => {
        Dimensions.addEventListener('change', () => determineScreenOrientation());
    }, [])

    const determineScreenOrientation = () => {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        setIsVertical(screenHeight > screenWidth);
    }

    return {isVertical};
};

export default useDimensions;
