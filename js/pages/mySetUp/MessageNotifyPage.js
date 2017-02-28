/**
 * 新消息通知
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Switch,
    ScrollView
} from 'react-native';

//引入自定义NavigationBar组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import ThemeDao from "../../expand/dao/ThemeDao";
import CustomThemePage from "../my/CustomThemePage";
import AboutCommon from "../my/AboutCommon";
//引入全局样式
import GlobalStyles from '../../../res/styles/GlobalStyles';

export default class MessageNotifyPage extends Component {
    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();//更换主题
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.state = {
            customThemeViewVisible: false,  //主题是否更改参数
            theme: this.props.theme,
            switchStatus_1:true,      //开关按钮状态，默认打开
            switchStatus_2:true,
            switchStatus_3:true,
            switchStatus_4:true,
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
                    title='新消息通知' />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {/* 新消息通知*/}
                    <Text style={styles.groupTitle}></Text>
                    <View style={[styles.item,]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text>接收业务消息提醒</Text>
                        </View>
                        <Switch 
                            style={{marginRight: 10,alignSelf: 'center'}} 
                            value={this.state.switchStatus_1}
                            onValueChange={(value)=>{this.setState({switchStatus_1: value})}} />
                    </View>
                    <View style={GlobalStyles.line}/>
                    <View style={[styles.item,]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text>通知显示消息详情</Text>
                        </View>
                        <Switch 
                            style={{marginRight: 10,alignSelf: 'center'}} 
                            value={this.state.switchStatus_2} 
                            onValueChange={(value)=>{this.setState({switchStatus_2: value})}} />
                    </View>

                    {/* 声音、震动*/}
                    <Text style={styles.groupTitle}></Text>
                    <View style={[styles.item,]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text>声音</Text>
                        </View>
                        <Switch 
                            style={{marginRight: 10,alignSelf: 'center'}} 
                            value={this.state.switchStatus_3} 
                            onValueChange={(value)=>{this.setState({switchStatus_3: value})}} />
                    </View>
                    <View style={GlobalStyles.line}/>
                    <View style={[styles.item,]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text>震动</Text>
                        </View>
                        <Switch 
                            style={{marginRight: 10,alignSelf: 'center'}} 
                            value={this.state.switchStatus_4} 
                            onValueChange={(value)=>{this.setState({switchStatus_4: value})}} />
                    </View>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
})