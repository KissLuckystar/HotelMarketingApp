/**
 * APP启动页
 */

import React,{ Component } from 'react';
import {
    Navigator
} from 'react-native';

//引入包
import RepositoryUtils from '../expand/dao/RepositoryUtils'
import WelcomePage from './WelcomePage';

function StartUp(){

    //初始化数据
    RepositoryUtils.init(true);
    
    class Root extends Component {
        constructor(props) {
            super(props);
            this.state={};
        }

        _renderScene(route,navigator) {
            let component = route.component;
            return (
                <Component {...route.params} navigator={navigator} />
            );
        }

        render() {
            return (
                <Navigator
                    initialRoute = {{
                        id:'WelcomePage',
                        name:'WelcomePage',
                        component:WelcomePage
                    }}
                    //配置场景动画
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    //渲染场景
                    //renderScene = {(e,i) => this._renderScene(e,i)}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                />
            );
        }
    }

    return <Root />;
}

module.exports = StartUp;