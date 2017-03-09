/**
 * 产品页
 * @flow
 * Created by smk on 2017/2/23
 */
import React,{ Component } from 'react';
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'

//每个产品项
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from "./RepositoryDetail";
import FavoriteDao from '../expand/dao/FavoriteDao'
//数据来源
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
//搜索页
import SearchPage from "./SearchPage"
import ProjectModel from '../model/ProjectModel'

import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'
import GlobalStyles from '../../res/styles/GlobalStyles'
import Utils from '../util/Utils'

const API_URL = 'http://10.141.93.82:3000/product/app_product?q='
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_product)
var dataRepository = new DataRepository(FLAG_STORAGE.flag_product);


export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            languages: [],
            theme: this.props.theme,
        };
    }

    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);
        this.loadLanguage();
    }

    componentWillUnmount() {
        this.props.homeComponent.removeSubscriber(this.onSubscriber);
    }

    onSubscriber = (preTab, currentTab)=> {
        var changedValues = this.props.homeComponent.changedValues;
        if (changedValues.my.themeChange && preTab.styles) {
            this.setState({
                theme: preTab
            })
            return;
        }
    }

    loadLanguage() {
        this.languageDao.fetch().then((languages)=> {
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error)=> {

        });
    }

    //顶部搜索button
    renderMoreButton() {
        return (
            <View style={{flexDirection: 'row',}}>
                <TouchableHighlight
                    ref='button'
                    underlayColor='transparent'
                    onPress={()=>{
                        this.props.navigator.push({
                            component: SearchPage,
                            params: {
                                theme:this.state.theme,
                                ...this.props,
                            },
                        });
                    }}>
                    <View style={{padding:5}}>
                        <Image
                            style={{width: 24, height: 24}}
                            source={require('../../res/images/ic_search_white_48pt.png')}
                        />
                    </View>
                </TouchableHighlight>
                {/*
                {ViewUtil.getMoreButton(()=>this.refs.moreMenu.open())}
                */}
            </View>)
    }
    
    
    render() {
        //页面列表内容
        var content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineColor='#e7e7e7'
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor={this.state.theme.themeColor}
                ref="scrollableTabView"
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth:0,elevation:2}} tabStyle={{height: 39}}
                                                      underlineHeight={2}/>}
            >
                {this.state.languages.map((result, i, arr)=> {
                    var language = arr[i];
                    //console.log(arr[i]);
                    return language && language.checked ?
                        <ProductTab key={i} {...this.props} theme={this.state.theme}
                                    tabLabel={language.name} tabLabelSearch={language.short_name} /> : null;
                })}
            </ScrollableTabView>
            : null;
        var statusBar={
            backgroundColor:this.state.theme.themeColor,
        }

        //导航条
        let navigationBar =
            <NavigationBar
                title='产品'
                style={this.state.theme.styles.navBar}
                rightButton={this.renderMoreButton()}
                statusBar={statusBar}
                hide={false}/>;

        return (
            <View style={styles.container}>
                {navigationBar}
                {content}
            </View>
        )      
    }
}



class ProductTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingFail: false,
            favoritKeys: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2,
            }),
            filter: '',
            theme: this.props.theme,
        };
    }

    onSubscriber = (preTab, currentTab)=> {
        var changedValues = this.props.homeComponent.changedValues;
        if (changedValues.my.themeChange && preTab.styles) {
            this.setState({
                theme: preTab
            })
            this.updateFavorite();
            return;
        }
    }

    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);
        this.loadData(true);
    }

    componentWillUnmount() {
        this.props.homeComponent.removeSubscriber(this.onSubscriber);
    }

    updateFavorite() {
        this.getFavoriteKeys();
    }


    flushFavoriteState() {//更新ProjectItem的Favorite状态
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i],this.state.favoritKeys)));
        }
        this.updateState({
            isLoading: false,
            isLoadingFail: false,
            dataSource: this.getDataSource(projectModels),
        });
    }

    getFavoriteKeys() {//获取本地用户收藏的ProjectItem
        favoriteDao.getFavoriteKeys().then((keys)=> {
            if (keys) {
                this.updateState({favoritKeys: keys});
            }
            this.flushFavoriteState();
        }).catch((error)=> {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    genFetchUrl(category) {
        return API_URL + category;
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    loadData(isRefresh) {
        this.updateState({
            isLoading: true,
            isLoadingFail: false,
        });
        let url = this.genFetchUrl(this.props.tabLabelSearch);{/*this.props.tabLabel*/}
        dataRepository.fetchRepository(url).then((wrapData)=> {
            console.log(wrapData);//打印本地或者网络数据
            this.items = wrapData && wrapData.items ? wrapData.items : wrapData ? wrapData : [];
            this.getFavoriteKeys();
            if (isRefresh && wrapData && wrapData.date && !dataRepository.checkDate(wrapData.date))return dataRepository.fetchNetRepository(url);
        }).then((items)=> {
            if (!items || items.length === 0)return;
            this.items = items;
            this.getFavoriteKeys();
        }).catch((error)=> {
            console.log(error);
            alert('err');
            this.updateState({
                isLoading: false,
                isLoadingFail: true,
            });
        })
    }

    onRefresh() {
        this.loadData(true);
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    //产品页面点击进入产品详情
    onSelectRepository(projectModel) {
        var item = projectModel.item;
        this.props.navigator.push({
            title: item.full_name,
            component: RepositoryDetail,
            params: {
                projectModel: projectModel,
                parentComponent: this,
                flag: FLAG_STORAGE.flag_product,
                ...this.props
            },
        });
    }

    renderRow(projectModel, sectionID, rowID) {
        let {navigator}=this.props;
        return (
            <RepositoryCell
                key={projectModel.item.id}
                onSelect={()=>this.onSelectRepository(projectModel)}
                theme={this.state.theme}
                {...{navigator}}
                projectModel={projectModel}
                onFavorite={(item, isFavorite)=>this.onFavorite(item, isFavorite)}/>
        );
    }

    render() {
        var content =
            <ListView
                ref="listView"
                style={styles.listView}
                renderRow={(e)=>this.renderRow(e)}
                renderFooter={()=> {
                    return <View style={{height: 50}}/>
                }}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onRefresh()}
                        tintColor={this.props.theme.themeColor}
                        title="Loading..."
                        titleColor={this.props.theme.themeColor}
                        colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                    />}
            />;
        return (
            <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                {content}
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});