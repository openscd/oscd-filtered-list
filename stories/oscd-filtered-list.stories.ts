import { html, TemplateResult } from 'lit-element';
import '@material/mwc-list/mwc-check-list-item';
import '../src/OscdFilteredList';

const itemType = { prim: 'item1', sec: 'item1sec', disabled: false };

const listItems = [
  { prim: 'item1prim', sec: 'item1sec', disabled: false },
  { prim: 'item2prim', sec: 'item2sec', disabled: false },
  { prim: 'item3prim', sec: 'item3sec', disabled: false },
  { prim: 'item4prim', sec: 'item4sec', disabled: true },
];

export default {
  title: 'OscdFilteredList',
  component: 'oscd-filtered-list',
  argTypes: {
    list: { control: 'array', option: listItems },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  list?: (typeof itemType)[];
}

const Template: Story<ArgTypes> = ({ list = listItems }: ArgTypes) => {
  return html` <link
      href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
      rel="stylesheet"
    /><oscd-filtered-list multi>
      ${Array.from(list).map(
        item =>
          html`<mwc-check-list-item twoline ?disabled=${item.disabled}
            ><span>${item.prim}</span
            ><span slot="secondary">${item.sec}</span></mwc-check-list-item
          >`
      )}
    </oscd-filtered-list>`;
};
export const Regular = Template.bind({});
