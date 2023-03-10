# \<oscd-filtered-list>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-filtered-list
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


## `oscd-filtered-list.ts`:

### class: `OscdComponent`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name      | Privacy | Type     | Default       | Description                                     | Inherited From |
| --------- | ------- | -------- | ------------- | ----------------------------------------------- | -------------- |
| `title`   |         | `string` | `'Hey there'` | The counter's title                             |                |
| `counter` |         | `number` | `5`           | Another description without information content |                |

#### Methods

| Name          | Privacy | Description | Parameters | Return | Inherited From |
| ------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `__increment` |         |             |            |        |                |

#### Events

| Name         | Type          | Description                                | Inherited From |
| ------------ | ------------- | ------------------------------------------ | -------------- |
| `fake-event` | `CustomEvent` | This is just to show off README generation |                |

#### CSS Properties

| Name                              | Default | Description               |
| --------------------------------- | ------- | ------------------------- |
| `--oscd-filtered-list-text-color` |         | Controls the color of foo |

#### Slots

| Name        | Description                |
| ----------- | -------------------------- |
| `something` | You can put something here |

<hr/>

### Exports

| Kind | Name            | Declaration   | Module                | Package |
| ---- | --------------- | ------------- | --------------------- | ------- |
| `js` | `OscdComponent` | OscdComponent | oscd-filtered-list.ts |         |



&copy; 1970 THE AUTHORS
