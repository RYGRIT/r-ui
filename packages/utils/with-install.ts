import { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T) {
  // eslint-disable-next-line no-extra-semi
  ;(component as SFCWithInstall<T>).install = function (app) {
    const { name } = component as unknown as { name: string }
    // 注册全局组件
    app.component(name, component)
  }

  return component as SFCWithInstall<T>
}
