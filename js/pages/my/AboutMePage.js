/**
 * 个人信息
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
//个人信息页,包括个人信息，我的银行卡，我的二维码，我的消息，我的客服
import MyInfoPage from './MyInfoPage';
import MyBankCardPage from './MyBankCardPage';
import MyQRCodePage from './MyQRCodePage';
import MyMessagePage from './MyMessagePage';
import MyServicePage from './MyServicePage';

import RepositoryUtils from '../../expand/dao/RepositoryUtils';
import ViewUtils from '../../util/ViewUtil'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import config from '../../../res/datas/Config.json'
import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon from './AboutCommon'

export default class AboutMePage extends Component {

    constructor(props) {
        super(props);
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.repositories=[];
        this.state = {
            projectModels: null,
            author:config.author
        }
    }

    componentDidMount() {
        this.initCurrentRepository();
        this.aboutCommon.componentDidMount();
    }
    componentWillUnmount(){
        this.aboutCommon.componentWillUnmount();
    }
    async initCurrentRepository() {
        let data=await RepositoryUtils.init().fetchCurrentRepository();
        if(!data)return;
        this.repositories.push(data);
        this.aboutCommon.updateFavorite(this.repositories);
    }
    async getConfig() {
        let data = await RepositoryUtils.init().getConfig();
        if (!data)data = config;
        this.setState({
            author: data.author,
        })
    }
    updateState(dic){
        this.setState(dic);
    }
    onClick(tab) {
        let TargetComponent, params = {...this.props,menuType:tab};
        switch (tab) {
            case MORE_MENU.MyInfo:
                TargetComponent=MyInfoPage;
                break;
            case MORE_MENU.BankCard:
                TargetComponent=MyBankCardPage;
                break;
            case MORE_MENU.QRCode:
                TargetComponent=MyQRCodePage;
                break;
            case MORE_MENU.Message:
                TargetComponent=MyMessagePage;
                break;
            case MORE_MENU.CustomerService:
                TargetComponent=MyServicePage;
                break;
            /*case MORE_MENU.Website:
                TargetComponent = WebViewPage;
                params.title='GitHubPopular';
                let url=!this.repositories[0]? config.info.html_url:this.repositories[0].homepage;
                params.url=url;
                break;
            case MORE_MENU.Feedback:
                Linking.openURL('mailto://crazycodeboy@gmail.com');
                break;*/

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    render() {
        let content=<View>
            {/* 
                {this.aboutCommon.renderRepository(this.state.projectModels)}
            */}
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.MyInfo), require('../../../res/images/my/ic_contacts.png'),'我的信息', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.BankCard), require('../../../res/images/my/ic_insert_emoticon.png'), '我的银行卡', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.QRCode), require('../../../res/images/my/ic_insert_emoticon.png'), '我的二维码', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Message), require('../../../res/images/my/ic_feedback.png'), '我的消息', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.CustomerService), require('../../../res/images/my/ic_feedback.png'), '我的客服', this.props.theme.styles.tabBarSelectedIcon)}
        </View>
        return this.aboutCommon.render(content, {
            'name': 'Kiss灬Luckystar',
            //'description': 'This is a GitHub most popular repositories and trending repositories viewer with React Native.',
            'avatar':this.state.author.avatar1,
            'backgroundImg':this.state.author.backgroundImg1,
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}); 