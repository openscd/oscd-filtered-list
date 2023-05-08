# Don't rely on third party dependencies for the filtered-list

Date: 2023-05-04

## Status

Open

## Context

While starting to move components we started with the filterd-list, which is now published on npm.
Functional wise the filterd-list works fine, but replacing the integrated filtered-list with the newly published stand alone filtered-list comes with unforseen complications.

In Open-SCD we use the integrated filtered-list as an extension of @material/mwc-list, because of this the filtered list gets cast to mwc-list.
In the newly stand-alone components we made a decision to no longer extend the components from material webcomponents but use the material webcomponent in the render function.
This is why casting to a mwc-list will no longer work.

Because the material web component will be implemented in the render function it also gets loaded differently, which can result in an empty list if it's called in the same
manner as we do now in Open-SCD.

## Decision

While implementing components in the future, be sure not to rely on third party dependencies. In case of the filtered-list this would be mwc-list.
This means:

- no longer cast to the third party dependency
- be sure to load the new stand-alone components asynchronously and use the requestUpdate/updateComplete.

## Consequences

These decisions will not result in drastic consequences, but it is something to take into account. It will take time and effort to implement these decisions into Open-SCD in it's current state (with the integrated filtered-list that's an extension of mwc-list), but that doesn't apply to future use of the filtered-list.
