
// 表单组件类型
export type IFornItemTypes = 'InputComp' |
    'SelectComp' |
    'DateComp'
export type IValueTypes = number | boolean | string

// select 下拉选项类型
export type ISelectOptionsItem = {
    label: string
    value: IValueTypes
    disabled?: boolean
}

// 表单组件单个组件接收参数
export interface IFormConfItem {
    label: string
    key: string
    type: IFornItemTypes
    compType?: string // 各个组件内部类型，如： input:type = text || input:type=textarea
    labelWidth?: string
    size?: string
    placeholder?: string
    options?: Array<ISelectOptionsItem>
    defaultValue?: IValueTypes
    itemCol?: number // 由于使用 el-row/el-col来排列
    cascadeKey?: string[] // 顺序存放级联key
    clearable?: boolean
}

// 表单组件单个校验字段
export interface IFormRulesItemObj {
    pattern?: RegExp
    required: boolean,
    message: string,
    trigger: string | Array<string>,
}

// 表单组件校验规则
export interface IFormRulesItem {
    [key: string]: Array<IFormRulesItemObj>
}