import { IConfig } from 'ngx-mask';

// https://www.npmjs.com/package/ngx-mask
export const GlobalMaskConfig: Partial<IConfig> = {
  validation: false,
  dropSpecialCharacters: true,
  showMaskTyped: false
};
