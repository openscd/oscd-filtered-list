import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './oscd-filtered-list.js';
import type { OscdComponent } from './oscd-filtered-list.js';

describe('OscdComponent', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<OscdComponent>(
      html`<oscd-filtered-list></oscd-filtered-list>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<OscdComponent>(
      html`<oscd-filtered-list></oscd-filtered-list>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<OscdComponent>(
      html`<oscd-filtered-list title="attribute title"></oscd-filtered-list>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<OscdComponent>(
      html`<oscd-filtered-list></oscd-filtered-list>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
