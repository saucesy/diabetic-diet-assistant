/**
 * Created by PhpStorm.
 * User: Devmc
 * Date: 2023/3/22
 * Time: 14:45
 */

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import zhCN from './lang/zhCN';
import en from './lang/en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: 'zh-cn',
    legacy: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    globalInjection: true,
    fallbackLocale: 'en',
    messages: {
        'zh-cn': zhCN,
        'en': en
    },
});
