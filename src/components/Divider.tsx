import { Text, View } from "@gluestack-ui/themed";
import React from "react";

const Divider = ({text}:{text:string}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%', marginTop:'5%'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: 140, textAlign: 'center'}}>{text}</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
    )
}

export default Divider;