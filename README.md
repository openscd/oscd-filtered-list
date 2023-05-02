# \<oscd-filtered-list>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i @openscd/oscd-filtered-list
```

## Usage

```html
<script type="module">
  import 'oscd-filtered-list';
</script>

<oscd-filtered-list></oscd-filtered-list>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## `OscdFilteredList.ts`:

### class: `OscdFilteredList`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Properties/Attributes

| Name               | Type           | Default | Inherited From       | Description                                                                                                                                                                                                                               |
| ------------------ | -------------- | ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `searchFieldLabel` | `string        | null`   | `null`               |                                                                                                                                                                                                                                           | Default text on the filter textbox            |
| `disableCheckAll`  | `boolean`      | `false` |                      | When `true`, disables the "check all" button                                                                                                                                                                                              |
| `filter`           | `string        | null`   | `null`               |                                                                                                                                                                                                                                           | The current input value of the filter textbox |
| `wrapFocus`        | `boolean`      | `false` |                      | When `true`, pressing `up` on the keyboard when focused on the first item will focus the last item and `down` when focused on the last item will focus the first item.                                                                    |
| `multi`            | `boolean`      | `false` |                      | When `true`, enables selection of multiple items. This will result in `index` being of type `Set<number>` and selected returning `ListItemBase[]`.                                                                                        |
| `activatable`      | `boolean`      | `false` |                      | Sets activated attribute on selected items which provides a focus-persistent highlight.                                                                                                                                                   |
| `items`            | `ListItem[]`   | `[]`    |                      | All list items that are available for selection. Eligible items have the `[mwc-list-item]` attribute which `ListItemBase` applies automatically.                                                                                          |
| `selected`         | `SelectedType` | `null`  | `@material/mwc-list` | Currently-selected list item(s). When `multi` is `true`, `selected` is of type `ListItemBase[]` and when `false`, `selected` is of type `ListItemBase`. `selected` is `null` when no item is selected.                                    |
| `index`            | `MWCListIndex` | `-1`    | `@material/mwc-list` | Index / indices of selected item(s). When `multi` is `true`, `index` is of type `number` and when `false`, `index` is of type `Set<number>`. Unset indicies are `-1` and empty `Set<number>` for single and multi selection respectively. |

#### Events

| Event Name | Target               | Detail               | Inherited From       | Description                                                                                                                                                                                                                                         |
| ---------- | -------------------- | -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`   | `oscd-filtered-list` | `ActionDetail`\*     | `@material/mwc-list` | Fired when a selection has been made via click or keyboard aciton.                                                                                                                                                                                  |
| `selected` | `oscd-filtered-list` | `SelectedDetail`\*\* | `@material/mwc-list` | Fired when a selection has been made. `index` is the selected index (will be of type `Set<number>` if multi and `number` if single), and `diff` (of type `IndexDiff`\*\*) represents the diff of added and removed indices from previous selection. |

<hr/>

### Exports

| Kind | Name               | Declaration      | Module              | Package |
| ---- | ------------------ | ---------------- | ------------------- | ------- |
| `js` | `OscdFilteredList` | OscdFilteredList | OscdFilteredList.ts |         |

&copy; 2023
