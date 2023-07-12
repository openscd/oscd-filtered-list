import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { visualDiff } from '@web/test-runner-visual-regression';

import '../src/OscdFilteredList.js';
import type { OscdFilteredList } from '../src/OscdFilteredList.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe('oscd-filtered-list', () => {
  let element: OscdFilteredList;
  const listItems = [
    { prim: 'item1', sec: 'item1sec', disabled: false },
    { prim: 'item2', sec: 'item2sec', disabled: false },
    { prim: 'item3', sec: 'item3sec', disabled: false },
    { prim: 'item4', sec: 'item4sec', disabled: true },
  ];

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-filtered-list multi
        >${Array.from(listItems).map(
          item =>
            html`<mwc-check-list-item twoline ?disabled=${item.disabled}
              ><span>${item.prim}</span
              ><span slot="secondary">${item.sec}</span></mwc-check-list-item
            >`
        )}<abbr
          ><mwc-list-item><span>nestedItem5</span></mwc-list-item></abbr
        ><abbr
          ><div>
            <mwc-radio-list-item><span>nestedItem6</span></mwc-radio-list-item>
          </div></abbr
        ><mwc-list-item value="valueItem7"></mwc-list-item>
      </oscd-filtered-list>`
    );
    document.body.prepend(element);
  });

  afterEach(() => element.remove());

  it('displays default view with items', async () => {
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, 'oscd-filtered-list');
  });

  it('select all enabled checkboxes', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
    )).click();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, 'oscd-filtered-list-checked');
  });
  it('select all enabled checkboxes', async () => {
    element.searchField.value = 'item1';
    element.onFilterInput();
    element.requestUpdate();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, 'oscd-filtered-list-filtered');
  });
});
