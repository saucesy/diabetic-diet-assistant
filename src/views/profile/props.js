/**
 * inputSort
 *
 * @type {[{readonly: boolean, disabled: boolean, type: string, key: string},{readonly: boolean, type: string, key: string},{readonly: boolean, type: string, key: string},{readonly: boolean, suffix: string, type: string, key: string},{readonly: boolean, suffix: string, type: string, key: string},null,null]}
 */
export const inputSort = [
  {
    key: 'username',
    readonly: true,
    type: 'text',
    disabled: true
  },
  {
    key: 'email',
    readonly: false,
    type: 'email'
  },
  {
    key: 'birthday',
    readonly: false,
    type: 'datepicker'
  },
  {
    key: 'height',
    suffix: '(cm)',
    readonly: false,
    type: 'number'
  },
  {
    key: 'weight',
    suffix: '(kg)',
    readonly: false,
    type: 'number'
  },
  {
    key: 'gender',
    readonly: false,
    type: 'text'
  },
  {
    key: 'remark',
    readonly: false,
    type: 'text'
  }
];