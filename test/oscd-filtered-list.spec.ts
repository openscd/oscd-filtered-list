import { expect, fixture, html } from '@open-wc/testing';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-radio-list-item';

import '../src/OscdFilteredList.js';
import { OscdFilteredList } from '../src/OscdFilteredList.js';

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
  });

  it('looks like its latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('allows items to be activated when selected', async () => {
    element.activatable = true;
    await element.updateComplete;
    element.children[0].setAttribute('selected', '');
    element.requestUpdate();
    await element.updateComplete;
    expect(element.items[0].activated).to.be.true; //added this line
    //expect(element.children[0].getAttribute('activated')).to.be.true;
  });

  describe('has a check all checkbox that', () => {
    it('is indeterminate if one but not all check-list-items are selected', async () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('indeterminate');

      element.items[0].click();
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.have.attribute('indeterminate');
    });

    it('is selected if all check-list-items are selected', async () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('checked');
      element.items
        .filter(item => !item.disabled)
        .forEach(item => {
          item.click();
        });
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.have.attribute('checked');
    });

    it('is none of the above if no check-list-item is selected', () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('checked');
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('indeterminate');
    });

    it('can be disabled with disableCheckAll property', async () => {
      expect(element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')).to
        .not.be.null;
      element.disableCheckAll = true;
      await element.requestUpdate();
      expect(element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')).to
        .be.null;
    });

    it('selects all enabled and visible check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      element.items
        .filter(
          item =>
            !item.disabled &&
            !item.classList.contains('hidden') &&
            item.disabled !== undefined //Added this line
        )
        .forEach(item => {
          expect(item).to.have.attribute('selected');
        });
    });

    it('does not select disabled check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      expect(element.items[3]).to.not.have.attribute('selected');
    });

    it('unselects all check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      element.items
        .filter(item => !item.disabled)
        .forEach(item => {
          expect(item).to.not.have.attribute('selected');
        });
    });
  });

  describe('allows to filter on', () => {
    it('directly slotted mwc-check-list-item', async () => {
      element.searchField.value = 'item1';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;

      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[0].classList.contains('hidden')).to.be.false;
    });

    it('directly slotted twoline mwc-check-list-item', async () => {
      element.searchField.value = 'item2sec';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;

      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[1].classList.contains('hidden')).to.be.false;
    });

    it('uses space as logic AND ', async () => {
      element.searchField.value = 'item item3sec';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[2].classList.contains('hidden')).to.be.false;
    });

    it('nested mwc-list-item elements', async () => {
      element.searchField.value = 'nesteditem5';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[4].classList.contains('hidden')).to.be.false;
    });

    it('nested mwc-radio-list-item elements', async () => {
      element.searchField.value = 'nesteditem6';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[5].classList.contains('hidden')).to.be.false;
    });

    it('items value attribute', async () => {
      element.searchField.value = 'item7';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(1);
      expect(element.children[6].classList.contains('hidden')).to.be.false;
    });

    it('allows filtering with a ? wildcard', async () => {
      element.searchField.value = 'item?';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const hiddenItems = element.querySelectorAll('.hidden').length;
      expect(hiddenItems).to.equal(0);
    });

    it('allows filtering with a * wildcard', async () => {
      element.searchField.value = 'te*sec';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const hiddenItems = element.querySelectorAll('.hidden').length;

      expect(hiddenItems).to.equal(3);

      expect(element.children[4].classList.contains('hidden')).to.be.true;
      expect(element.children[5].classList.contains('hidden')).to.be.true;
      expect(element.children[6].classList.contains('hidden')).to.be.true;
    });

    it('allows filtering with two ? wildcards', async () => {
      element.searchField.value = 'nest??item';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(2);

      expect(element.children[4].classList.contains('hidden')).to.be.false;
      expect(element.children[5].classList.contains('hidden')).to.be.false;
    });

    it('allows filtering with a * and ? wildcard', async () => {
      element.searchField.value = 'n*tem?';
      await element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      const visibleItems =
        element.children.length - element.querySelectorAll('.hidden').length;

      expect(visibleItems).to.equal(2);

      expect(element.children[4].classList.contains('hidden')).to.be.false;
      expect(element.children[5].classList.contains('hidden')).to.be.false;
    });
  });
});
