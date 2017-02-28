/**
 * 密码设置
 */
import React,{Component} from 'react';
import{
    View,Text,Alert,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
  
//引入自定义NavigationBar组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import ThemeDao from "../../expand/dao/ThemeDao";
import CustomThemePage from "./CustomThemePage";

//引入全局样式
import GlobalStyles from '../../../res/styles/GlobalStyles';

export default class PasswordSettingPage extends Component {

    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();//更换主题
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.state = {
            customThemeViewVisible: false,  //主题是否更改参数
            theme: this.props.theme,
        };
    }
    
    componentDidMount() {
        this.aboutCommon.componentDidMount();  //处理物理返回键
    }
    componentWillUnmount(){
        this.aboutCommon.componentWillUnmount();  //处理物理返回键
    }
    updateState(dic){
        this.setState(dic);  //处理物理返回键
    }

    renderCustomThemeView() {
        return (
            <CustomThemePage
                visible={this.state.customThemeViewVisible}
                {...this.props}
                onClose={()=> {
                    this.setState({customThemeViewVisible: false})
                }}/>
        )
    }


    render() {
        let navigationBar = 
                <NavigationBar
                    style={this.state.theme.styles.navBar}
                    leftButton={ViewUtil.getLeftButton(()=>this.props.navigator.pop())}
                    title='设置' />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <TextInput style={styles.inputText} placeholder='请输入原密码' 
                        secureTextEntry={true} underlineColorAndroid="transparent" 
                        autoFocus={true} />
                <View style={{height:1,backgroundColor:'#f4f4f4'}} />
                <TextInput style={styles.inputText} placeholder='请输入新密码' secureTextEntry  underlineColorAndroid="transparent" />
                <View style={{height:1,backgroundColor:'#f4f4f4'}} />
                <TextInput style={styles.inputText} placeholder='请再次输入新密码' secureTextEntry underlineColorAndroid="transparent" />
                <TouchableOpacity onPress={()=>Alert.alert(
                    '系统提示',
                    '修改成功，请使用新密码登录'
                    )}>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.passwordBtnTitle}>修改密码</Text>
                    </View>
                </TouchableOpacity>
                {this.renderCustomThemeView()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    inputText:{
        padding:0,
        height: 60, 
        fontSize: 16,
        backgroundColor:'#fff',
        textAlign:'center',
        placeholderTextColor:'#cccccc'
    },
    passwordContainer:{
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordBtnTitle:{
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    }
})