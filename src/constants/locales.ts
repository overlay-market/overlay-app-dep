export const SUPPORTED_LOCALES = [
  // order as they appear in the language dropdown
  'en-US',
  'fr-FR',
  'vi-VN',
  'zh-CN',
] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'fr-FR': 'Français',
  'vi-VN': 'Tiếng Việt',
  'zh-CN': '中文',
}
