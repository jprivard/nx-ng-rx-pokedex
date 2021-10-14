import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

export class ComponentInspector {
  public fixture;
  public loader: HarnessLoader;

  constructor(fixture: any) {
    this.fixture = fixture;
    this.loader = TestbedHarnessEnvironment.loader(this.fixture);
  }

  element = (selector: string) => {
    const el = this.fixture.debugElement.query(By.css(selector));
    if (el) {
      return el.nativeElement;
    }
    return el;
  }

  queryAll = (selector: string) => {
    return this.fixture.debugElement.queryAll(By.css(selector));
  }

  getComponent = <T>(selector: string, component: any, parent = this): T  => {
    const el = parent.queryAll(selector);
    return el.length > 0 ? el[0].injector.get(component) : undefined;
  }
}
