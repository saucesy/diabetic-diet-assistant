/**
 * tabOptions
 *
 * @type {[{days: number, label: string},{days: number, label: string},{days: number, label: string},{days: number, label: string},{days: number, label: string}]}
 */
export const tabOptions = [
  {
    label: 'Recent 7 days',
    days: 7
  },
  {
    label: 'Recent 14 days',
    days: 14
  },
  {
    label: 'Recent 1 month',
    days: 30
  },
  {
    label: 'Recent 3 months',
    days: 90
  },
  {
    label: 'Custom',
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
    text: 'great'
  },
  '3': {
    url: require('@/assets/images/face-3.svg'),
    text: 'good'
  },
  '2': {
    url: require('@/assets/images/face-2.svg'),
    text: 'normal'
  },
  '1': {
    url: require('@/assets/images/face-1.svg'),
    text: 'worse'
  },
  '0': {
    url: require('@/assets/images/face-0.svg'),
    text: 'unknown'
  }
};