export type QuillToolbarConfig = Array<Array<
  string | {
    indent?: string
    list?: string
    direction?: string
    header?: number | Array<boolean | number>
    color?: string[]
    background?: string[]
    align?: string[]
    script?: string
    font?: string[]
    size?: Array<boolean | string>
  }
>>

export interface QuillHistoryConfig {
  delay: number,
  maxStack: number,
  userOnly: true
};

export interface QuillModules {
  toolbar: QuillToolbarConfig,
  history: QuillHistoryConfig
}

export interface QuillConfig {
  modules?: QuillModules
}
