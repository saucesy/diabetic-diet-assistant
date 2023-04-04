import {i18n} from "@/i18n";

/**
 * inputSort
 *
 * @type {[{readonly: boolean, disabled: boolean, type: string, key: string},{readonly: boolean, type: string, key: string},{readonly: boolean, type: string, key: string},{readonly: boolean, suffix: string, type: string, key: string},{readonly: boolean, suffix: string, type: string, key: string},null,null]}
 */
export const inputSort = [
    {
        label: i18n.t('profile.username'),
        key: 'username',
        readonly: true,
        type: 'text',
        disabled: true
    },
    {
        label: i18n.t('profile.email'),
        key: 'email',
        readonly: false,
        type: 'email'
    },
    {
        label: i18n.t('profile.birthday'),
        key: 'birthday',
        readonly: false,
        type: 'datepicker'
    },
    {
        label: i18n.t('profile.height'),
        key: 'height',
        suffix: '(cm)',
        readonly: false,
        type: 'number'
    },
    {
        label: i18n.t('profile.weight'),
        key: 'weight',
        suffix: '(kg)',
        readonly: false,
        type: 'number'
    },
    {
        label: i18n.t('profile.gender'),
        key: 'gender',
        readonly: false,
        type: "text"
        /*type: 'radio',
        options: [
            {
                label: "男",
                value: "1"
            },
            {
                label: "女",
                value: "0"
            },
            {
                label: "不设置",
                value: ""
            }
        ]*/
    },
    {
        label: i18n.t('profile.remark'),
        key: 'remark',
        readonly: false,
        type: 'text'
    }
];