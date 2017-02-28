import React from 'react';
import {
    View,
    Alert,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Text
} from 'react-native';

import HomePage from './HomePage';
import MainPage from './MainPage';

var Dimensions=require('Dimensions');
//获取屏幕宽度
var screenWidth=Dimensions.get('window').width;
import LoginPage from './LoginPage';

export default class SecondLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    _enterHomePage() {
        const { navigator } = this.props;
        navigator.resetTo({   //默认进入登录页，未作判断
            component: HomePage,
            name: 'HomePage',
            params:{
                theme:this.state.theme
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/**上半部区域，放置Logo */}
                <View style={styles.topViewContainer}>
                    <Image source={require('../../res/images/login_large_logo.png')} 
                        style={styles.topImageStyle}/>
                </View>

                {/*下半部区域，登录输入*/}
                <View style={styles.bottomViewContainer}>
                    <TextInput placeholder='请输入账号' />
                    {/*<View style={styles.dividerView}><Text style={styles.divider}></Text></View>*/}
                    <TextInput placeholder='请输入密码' secureTextEntry />
                    {/*登录*/}
                    <TouchableOpacity onPress={()=>Alert.alert(
                        '登录提示',
                        '正在登录',
                        [
                            {text:'确定',onPress:() => {
                                const { navigator } = this.props;
                                navigator.resetTo({   //默认进入登录页，未作判断
                                    component: HomePage,
                                    name: 'HomePage',
                                    params:{
                                        theme:this.state.theme
                                    }
                                });
                            }},
                            {text:'取消',onPress:() => console.log('cancel pressed!')},
                        ]
                        )}>
                        <View style={styles.loginBtnContainer}>
                            <Text style={styles.loginBtnTitle}>登录</Text>
                        </View>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>无法登录？</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({

    container:{
        backgroundColor:'#ffffff',
        flex:1
    },

    topViewContainer:{
        flex:2,
        marginTop:22,
        alignItems:'center',
        justifyContent:'center'
    },
    topImageStyle:{
        width:screenWidth * 0.3,
        height:screenWidth * 0.3,
        resizeMode: 'contain',
        tintColor:'#fe3232'
    },

    bottomViewContainer:{
        flex:3
    },
    TextInput:{
        flex: 1,
        fontSize: 16,
    },
    dividerView:{
        flexDirection:'row'
    },
    divider:{
        flex:1,
        height:1,
        backgroundColor:'#ecedf1'
    },
    loginBtnContainer:{
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBtnTitle:{
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },

    errorContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    errorText:{
        color:'#4a90ea',
        fontSize:13,
    }
})