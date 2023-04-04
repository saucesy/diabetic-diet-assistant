import {i18n} from "@/i18n";

/**
 * tabOptions
 *
 * @type {[{days: number, label: string},{days: number, label: string},{days: number, label: string},{days: number, label: string},{days: number, label: string}]}
 */
export const tabOptions = [
  {
    label: i18n.t('charts.time.d7'),
    days: 7
  },
  {
    label: i18n.t('charts.time.d14'),
    days: 14
  },
  {
    label: i18n.t('charts.time.m1'),
    days: 30
  },
  {
    label: i18n.t('charts.time.m3'),
    days: 90
  },
  {
    label: i18n.t('charts.time.custom'),
    days: 0
  }
];


/**
 * faces
 *
 * @type {{'0': {text: string, url: *}, '1': {text: string, url: *}, '2': {text: string, url: *}, '3': {text: string, url: *}, '4': {text: string, url: *}}}
 */
export const faces = {
  '4': {
    url: require('@/assets/images/face-4.svg'),
    text: i18n.t('charts.face.great')
  },
  '3': {
    url: require('@/assets/images/face-3.svg'),
    text: i18n.t('charts.face.good')
  },
  '2': {
    url: require('@/assets/images/face-2.svg'),
    text: i18n.t('charts.face.normal')
  },
  '1': {
    url: require('@/assets/images/face-1.svg'),
    text: i18n.t('charts.face.worse')
  },
  '0': {
    url: require('@/assets/images/face-0.svg'),
    text: i18n.t('charts.face.unknown')
  }
};