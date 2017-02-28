/**
 * 账户与安全
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

//引入自定义NavigationBar组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import CustomThemePage from "../my/CustomThemePage";
import AboutCommon from "../my/AboutCommon";

export default class AccountsSecuurityPage extends Component {
    constructor(props) {
        super(props);
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
                    title='账户与安全' />;
        return (
            <View style={styles.container}>
                {navigationBar}
                {/*在这里增加页面内容*/}
                {this.renderCustomThemeView()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
})