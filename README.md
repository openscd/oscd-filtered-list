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

### Icon font

Material Icons are being used for the icons. This font needs to be added in the html first.
You can add it like so:

```html
<link
  href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
  rel="stylesheet"
/>
```

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`


## `src/oscd-filtered-list.ts`:

### class: `OscdFilteredList`, `oscd-filtered-list`

#### Superclass

| Name         | Module | Package     |
| ------------ | ------ | ----------- |
| `LitElement` |        | lit-element |

#### Fields

| Name               | Privacy | Type                  | Default | Description                                                                                                                                                                                                                                                   | Inherited From |
| ------------------ | ------- | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `searchFieldLabel` |         | `string \| undefined` |         | search mwc-textfield label property                                                                                                                                                                                                                           |                |
| `disableCheckAll`  |         | `boolean`             | `false` | Whether the check all option (checkbox next to search text field) is activated                                                                                                                                                                                |                |
| `filter`           |         | `string \| undefined` |         | The current input value of the filter textbox                                                                                                                                                                                                                 |                |
| `wrapFocus`        |         | `boolean`             | `false` | When \`true\`, pressing \`up\` on the keyboard when focused on the first item will focus the last item and \`down\` when focused on the last item will focus the first item.                                                                                  |                |
| `multi`            |         | `boolean`             | `false` | When \`true\`, enables selection of multiple items. This will result in \`index\` being of type \`Set\<number>\` and selected returning \`ListItemBase\[]\`.                                                                                                  |                |
| `activatable`      |         | `boolean`             | `false` | Sets activated attribute on selected items which provides a focus-persistent highlight.                                                                                                                                                                       |                |
| `list`             |         | `List`                |         |                                                                                                                                                                                                                                                               |                |
| `selected`         |         |                       |         | Currently-selected list item(s). When \`multi\` is \`true\`, \`selected\` is of type \`ListItemBase\[]\` and when \`false\`, \`selected\` is of type \`ListItemBase\`. \`selected\` is \`null\` when no item is selected.                                     |                |
| `index`            |         |                       |         | Index / indices of selected item(s). When \`multi\` is \`true\`, \`index\` is of type \`number\` and when \`false\`, \`index\` is of type \`Set\<number>\`. Unset indicies are \`-1\` and empty \`Set\<number>\` for single and multi selection respectively. |                |
| `items`            |         | `Array<ListItem>`     | `[]`    | All list items that are available for selection. Eligible items have the \`\[mwc-list-item]\` attribute which \`ListItemBase\` applies automatically.                                                                                                         |                |
| `searchField`      |         | `TextField`           |         |                                                                                                                                                                                                                                                               |                |

#### Methods

| Name            | Privacy | Description | Parameters | Return | Inherited From |
| --------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `onFilterInput` |         |             |            | `void` |                |

#### Events

| Name       | Type            | Description                                                                                                                                                                                                                                                        | Inherited From |
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `action`   | `ActionEvent`   | Fired when a selection has been made via click or keyboard action.                                                                                                                                                                                                 |                |
| `selected` | `SelectedEvent` | Fired when a selection has been made. \`index\` is the selected index (will be of type \`Set\<number>\` if multi and \`number\` if single), and \`diff\` (of type \`IndexDiff\`\\\*\\\*) represents the diff of added and removed indices from previous selection. |                |

<hr/>

### Functions

| Name              | Description | Parameters                          | Return |
| ----------------- | ----------- | ----------------------------------- | ------ |
| `redispatchEvent` |             | `element: LitElement, event: Event` |        |

<hr/>

### Exports

| Kind | Name               | Declaration      | Module                    | Package |
| ---- | ------------------ | ---------------- | ------------------------- | ------- |
| `js` | `redispatchEvent`  | redispatchEvent  | src/oscd-filtered-list.ts |         |
| `js` | `OscdFilteredList` | OscdFilteredList | src/oscd-filtered-list.ts |         |

## `src/OscdFilteredList.ts`:

### Exports

| Kind                        | Name                 | Declaration      | Module                     | Package |
| --------------------------- | -------------------- | ---------------- | -------------------------- | ------- |
| `custom-element-definition` | `oscd-filtered-list` | OscdFilteredList | /src/oscd-filtered-list.js |         |
| `js`                        | `OscdFilteredList`   | OscdFilteredList | src/OscdFilteredList.ts    |         |





&copy; 2023 Alliander N.V.
