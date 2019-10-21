import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo(): Promise<void> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
