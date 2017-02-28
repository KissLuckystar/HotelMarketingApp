/**
 * 客户已购买产品界面
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    BackAndroid
} from 'react-native';

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    //监听Android物理设备返回键事件
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
    }
    ComponentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid);
    }
    onBackAndroid = () => {
        //返回到上一层级的页面
        this.props.navigator.pop();
        return true;        
    }
    
    
    render(){
        return (
            <View>
                <Text>CustomProduct</Text>
            </View>
        )
    }
} 