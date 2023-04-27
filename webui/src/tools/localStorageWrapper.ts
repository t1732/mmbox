type Setting = {
  colorMode: 'light' | 'dark';
};

class LocalStorageWrapper {
  key: string;

  json: string;

  constructor() {
    this.key = 'mmboxSetting';
    this.json = JSON.stringify({});
  }

  set(setting: Setting) {
    localStorage.setItem(this.key, JSON.stringify(setting));
  }

  get(): Setting {
    return JSON.parse(localStorage.getItem(this.key) ?? '{}') as Setting;
  }
}

const instance = new LocalStorageWrapper();

export { instance as LocalStorageWrapper };
