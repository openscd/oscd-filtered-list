# Don't rely on third party dependencies for the filtered-list

Date: 2023-05-15

## Status

Accepted

## Context

In Open-SCD we use the integrated filtered-list as an extension of @material/mwc-list, therefor the filtered-list gets cast to a mwc-list element and an import for that is needed.
Because of this, both Open-SCD and the filtered-list rely on this third-party dependency, and therefor both need to be maintained accordingly.
This is inefficient and can be time-consuming.

This repository contains the oscd-filtered-list, which is based on, and will eventually replace, the integrated filtered-list inside Open-SCD. The oscd-filtered-list is intended to be a stand-alone component that also needs to be a solution to the above stated problem.

## Decision

To make sure that users of the oscd-filtered-list will no longer need to rely on third-party components used by the oscd-filtered-list, it can no longer be an extension of a third-party component and should therefor encapsulate this component inside the render function.
This would mean that the oscd-filtered-list will use third-party software (mwc-list) itself, but users of the oscd-filtered list don't need to import that anymore. If there were to be API changes to the third-party software, then this should be dealt with solely in the oscd-filtered-list.

## Consequences

- Because the oscd-filtered-list will no longer extend third-party software but encapsulate it in the render function, the oscd-filtered-list will be loaded differently compared to the (for now) integrated filtered-list in OpenSCD. This can result in an empty list.

- Casting to a mwc-list will no longer work. Because it is not an extension anymore, it is not of the same type.

These decisions will result in a more robust implementation usage, because users of the oscd-filtered-list don't have to keep track of API changes in the third-party software. It will, however, take time and effort to implement the oscd-filtered-list into Open-SCD in its current state (because it still relies on mwc-list casts and loads as a direct implementation of that component). This doesn't apply to future use of the oscd-filtered-list.
