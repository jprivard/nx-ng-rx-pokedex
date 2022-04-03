import 'jest-preset-angular/setup-jest';

const style = global['document'].createElement('style');
style.innerHTML = `
  .mat-theme-loaded-marker {
    display: none;
}`;
global['document'].head.appendChild(style);

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
);
