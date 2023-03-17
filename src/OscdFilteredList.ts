import {
  css,
  LitElement,
  html,
  property,
  query,
  state,
  TemplateResult,
  unsafeCSS,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import '@material/mwc-list';
import { TextField } from '@material/mwc-textfield';
import '@material/mwc-list/mwc-list-item-base';
import { ListItem } from '@material/mwc-list/mwc-list-item';

function slotItem(item: Element): Element {
  if (!item.closest('oscd-filtered-list') || !item.parentElement) return item;
  if (item.parentElement instanceof OscdFilteredList) return item;
  return slotItem(item.parentElement);
}

function hideFiltered(item: ListItem, searchText: string): void {
  const itemInnerText = item.innerText + '\n';
  const childInnerText = Array.from(item.children)
    .map(child => (<HTMLElement>child).innerText)
    .join('\n');
  const value = item.value;

  const filterTarget: string = (
    itemInnerText +
    childInnerText +
    value
  ).toUpperCase();

  const terms: string[] = searchText
    .toUpperCase()
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .trim()
    .split(/\s+/g);

  (terms.length === 1 && terms[0] === '') ||
  terms.every(term => {
    // regexp escape
    const reTerm = new RegExp(
      `*${term}*`.replace(/\*/g, '.*').replace(/\?/g, '.{1}'),
      'i'
    );
    return reTerm.test(filterTarget);
  })
    ? slotItem(item).classList.remove('hidden')
    : slotItem(item).classList.add('hidden');
}

/**
 *
 */
export class OscdFilteredList extends LitElement {
  /** search mwc-textfield label property */
  @property({ type: String })
  searchFieldLabel?: string;
  /** Whether the check all option (checkbox next to search text field) is activated */
  @property({ type: Boolean })
  disableCheckAll = false;

  @property({ type: String })
  filter?: string;

  @property({ type: Boolean })
  wrapFocus = false;

  @property({ type: Boolean })
  multi = false;

  @property({ type: Boolean })
  activatable = false;

  @query('mwc-list')
  list!: List;

  //selectedType from mwc-list
  get selected() {
    return this.list.selected;
  }

  @property()
  items: Array<ListItem> = [];

  @state()
  private get existCheckListItem(): boolean {
    return this.items.some(item => item instanceof CheckListItem);
  }

  @state()
  private get isAllSelected(): boolean {
    return this.items
      .filter(item => !item.disabled)
      .filter(item => item instanceof CheckListItem)
      .every(checkItem => checkItem.selected);
  }

  @state()
  private get isSomeSelected(): boolean {
    return this.items
      .filter(item => !item.disabled)
      .filter(item => item instanceof CheckListItem)
      .some(checkItem => checkItem.selected);
  }

  @query('mwc-textfield') searchField!: TextField;

  private onCheckAll(): void {
    const select = !this.isAllSelected;
    this.items
      .filter(item => !item.disabled && !item.classList.contains('hidden'))
      .forEach(item => (item.selected = select));
  }

  onFilterInput(): void {
    Array.from(
      this.querySelectorAll(
        'mwc-list-item, mwc-check-list-item, mwc-radio-list-item'
      )
    ).forEach(item => hideFiltered(item as ListItem, this.searchField.value));
  }

  firstUpdated(): void {
    this.items = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements({ flatten: true }) as ListItem[];
  }

  constructor() {
    super();
    this.addEventListener('selected', ev => {
      this.requestUpdate();
      this.shadowRoot?.dispatchEvent(
        new CustomEvent('selected', { bubbles: true })
      );
    });
  }

  private renderCheckAll(): TemplateResult {
    return this.existCheckListItem && !this.disableCheckAll
      ? html`<mwc-formfield class="checkall"
          ><mwc-checkbox
            ?indeterminate=${!this.isAllSelected && this.isSomeSelected}
            ?checked=${this.isAllSelected}
            @change=${() => {
              this.onCheckAll();
            }}
          ></mwc-checkbox
        ></mwc-formfield>`
      : html``;
  }

  render(): TemplateResult {
    return html`<div id="tfcontainer">
        <abbr title="${this.searchFieldLabel ?? translate('filter')}"
          ><mwc-textfield
            label="${this.searchFieldLabel ?? ''}"
            iconTrailing="search"
            outlined
            @input=${() => this.onFilterInput()}
          ></mwc-textfield
        ></abbr>
        ${this.renderCheckAll()}
      </div>
      <mwc-list
        multi=${this.multi}
        activatable=${this.activatable}
        wrapFocus=${this.wrapFocus}
      >
        <slot />
      </mwc-list>`;
  }

  static styles = css`
    ${unsafeCSS(List.styles)}

    #tfcontainer {
      display: flex;
      flex: auto;
    }

    ::slotted(.hidden) {
      display: none;
    }

    abbr {
      display: flex;
      flex: auto;
      margin: 8px;
      text-decoration: none;
      border-bottom: none;
    }

    mwc-textfield {
      width: 100%;
      --mdc-shape-small: 28px;
    }

    mwc-formfield.checkall {
      padding-right: 8px;
    }

    .mdc-list {
      padding-inline-start: 0px;
    }
  `;
}
