import { html, TemplateResult } from 'lit-element';
import '@material/mwc-list/mwc-check-list-item';
import '../src/oscd-filtered-list';
import { OscdFilteredList } from '../src/OscdFilteredList.js';

const itemType = { prim: 'item1', sec: 'item1sec', disabled: false };

const listItems = [
  { prim: 'item1prim', sec: 'item1sec', disabled: false },
  { prim: 'item2prim', sec: 'item2sec', disabled: false },
  { prim: 'item3prim', sec: 'item3sec', disabled: false },
  { prim: 'item4prim', sec: 'item4sec', disabled: true },
];

export default {
  title: 'oscd-filtered-list',
  component: 'OscdFilteredList',
  argTypes: {
    list: { control: 'array', option: listItems },
  },
};

class SBOscdFilteredList extends OscdFilteredList {}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  list?: (typeof itemType)[];
}

const Template: Story<ArgTypes> = ({ list = listItems }: ArgTypes) => {
  if (customElements.get('sb-oscd-filtered-list') === undefined)
    customElements.define('sb-oscd-filtered-list', SBOscdFilteredList);
  return html`<sb-oscd-filtered-list multi
    >${Array.from(list).map(
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
    ><mwc-list-item value="valueItem7">valueItem7</mwc-list-item>
  </sb-oscd-filtered-list>`;
};
export const Regular = Template.bind({});
