/**
 * RespositoryDao
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';
import langsData from '../../../res/datas/langs.json'
import keysData from '../../../res/datas/keys.json'

export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}

export default class LanguageDao{
    constructor(flag) {
        this.flag = flag;
    }
    //获取本地默认的选择项，显示在产品页面导航
    fetch(){
        //清除界面默认的导航条，如不清除，则推荐、全部项不会变
        AsyncStorage.removeItem(this.flag,(error,result)=>{
            console.log('1');
        });
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                console.log('result'+result);
                if (!result){
                    var data=this.flag===FLAG_LANGUAGE.flag_language? langsData:keysData;
                    this.save(data);
                    resolve(data);
                }else {
                    try {
                        resolve(JSON.parse(result));    //取出结果
                    } catch (e) {
                        reject(error);
                    }
                }
        });
        });
    }
    save(objectData){
        var stringData=JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        });
    }
}