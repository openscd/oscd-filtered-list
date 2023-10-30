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
import { msg } from '@lit/localize';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import '@material/mwc-list';
import { TextField } from '@material/mwc-textfield';
import '@material/mwc-list/mwc-list-item-base';
import { ListItem } from '@material/mwc-list/mwc-list-item';

function debounce(callback: () => void, delay = 250): Promise<void> {
  let timeout: any;
  return new Promise(resolve => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
}

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

export function redispatchEvent(element: LitElement, event: Event) {
  element.requestUpdate();
  // For bubbling events in SSR light DOM (or composed), stop their propagation  // and dispatch the copy.
  const copy = Reflect.construct(event.constructor, [event.type, event]);
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation();
    copy.stopPropagation();
  }

  const dispatched = element.dispatchEvent(copy);
  if (!dispatched) {
    event.preventDefault();
  }
  return dispatched;
}

/**
 * @fires {ActionEvent} action - Fired when a selection has been made via click or keyboard action.
 * @fires {SelectedEvent} selected - Fired when a selection has been made. `index` is the selected index (will be of type `Set<number>` if multi and `number` if single), and `diff` (of type `IndexDiff`\*\*) represents the diff of added and removed indices from previous selection.
 * @summary A list with a textfield that filters the list items for given or separated terms.
 * @tag oscd-filtered-list
 */
export class OscdFilteredList extends LitElement {
  /** search mwc-textfield label property */
  @property({ type: String })
  searchFieldLabel?: string;
  /** Whether the check all option (checkbox next to search text field) is activated */
  @property({ type: Boolean })
  disableCheckAll = false;
  /** The current input value of the filter textbox */
  @property({ type: String })
  filter?: string;
  /** When `true`, pressing `up` on the keyboard when focused on the first item will focus the last item and `down` when focused on the last item will focus the first item. */
  @property({ type: Boolean })
  wrapFocus = false;
  /** When `true`, enables selection of multiple items. This will result in `index` being of type `Set<number>` and selected returning `ListItemBase[]`. */
  @property({ type: Boolean })
  multi = false;
  /** Sets activated attribute on selected items which provides a focus-persistent highlight. */
  @property({ type: Boolean })
  activatable = false;

  @query('mwc-list')
  list!: List;

  /** Currently-selected list item(s). When `multi` is `true`, `selected` is of type `ListItemBase[]` and when `false`, `selected` is of type `ListItemBase`. `selected` is `null` when no item is selected. */
  get selected() {
    return this.list.selected;
  }
  /** Index / indices of selected item(s). When `multi` is `true`, `index` is of type `number` and when `false`, `index` is of type `Set<number>`. Unset indicies are `-1` and empty `Set<number>` for single and multi selection respectively. */
  get index() {
    return this.list.index;
  }
  /** All list items that are available for selection. Eligible items have the `[mwc-list-item]` attribute which `ListItemBase` applies automatically. */
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

  public async onFilterInput(): Promise<void> {
    return debounce(() => {
      Array.from(
        this.querySelectorAll(
          'mwc-list-item, mwc-check-list-item, mwc-radio-list-item'
        )
      ).forEach(item => hideFiltered(item as ListItem, this.searchField.value));
    }, 500);
  }

  firstUpdated(): void {
    this.items = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements({ flatten: true }) as ListItem[];
  }

  constructor() {
    super();
    this.addEventListener('selected', event => {
      redispatchEvent(this, event);
    });
    this.addEventListener('action', event => {
      redispatchEvent(this, event);
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
        <abbr title="${this.searchFieldLabel ?? msg('Filter')}"
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
        .multi=${this.multi}
        .activatable=${this.activatable}
        .wrapFocus=${this.wrapFocus}
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
