/**
 * 关于系统
 * 主要包括检测更新、版本说明、反馈三个部分
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Linking,
} from 'react-native';
//页面
import FeedBackPage from './FeedBackPage';
import WebViewPage from '../WebViewPage';  //内嵌网页

import RepositoryUtils from '../../expand/dao/RepositoryUtils';
import ViewUtils from '../../util/ViewUtil';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import config from '../../../res/datas/Config.json';
import {MORE_MENU} from '../../common/MoreMenu';
import AboutCommon from '../my/AboutCommon' ;

export default class AboutSystemPage extends Component {
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
            case MORE_MENU.CheckUpdate:   //检测更新，暂时无操作
                break;
            case MORE_MENU.VersionDesc:     //版本说明，使用网页组件
                TargetComponent = WebViewPage;
                params.title='HotelMarketingApp';
                let url=!this.repositories[0]? config.info.html_url:this.repositories[0].homepage;
                params.url=url;
                break;
            case MORE_MENU.FeedBack:   //反馈
                Linking.openURL('mailto://2685331701@qq.com');
                break;

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
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.CheckUpdate), require('../../../res/images/my/ic_contacts.png'),'检测更新', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.VersionDesc), require('../../../res/images/my/ic_insert_emoticon.png'), '版本说明', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.FeedBack), require('../../../res/images/my/ic_insert_emoticon.png'), '反馈', this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
        </View>
        return this.aboutCommon.render(content, {
            'name': 'HotelMarketingApp',
            'description': '普惠酒店专属移动金融理财应用',
            'avatar':this.state.author.avatar1,
            'backgroundImg':this.state.author.backgroundImg,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}); 