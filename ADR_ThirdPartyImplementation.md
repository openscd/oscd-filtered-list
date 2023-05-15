# Don't rely on third party dependencies for the filtered-list

Date: 2023-05-15

## Status

Accepted

## Context

In Open-SCD we use the integrated filtered-list as an extension of @material/mwc-list, therefor the filtered list gets cast to a mwc-list element and an import fpr that is needed.
Because of this both Open-SCD and the filtered-list rely on this third party dependency and therefor both need to be maintained accordingly.
This is inefficient and can be time consuming.

## Decision

The filtered-list is moved out of Open-SCD to oscd-filtered-list and is intended to be stand-alone component that's to be used by Open-SCD core. The oscd-filtered-list uses third party software (mwc-list). If there were to be API changes to this software, then this should be dealt with in the oscd-filtered-list component and no longer in Open-SCD itself. To make sure that can happen, the oscd-filtered-list can no longer be an extension of a third party component and should therfor incapsulate the needed component element inside the render function.

## Consequences

- Because the oscd-filtered-list will no longer extend third party software but incapsualte it in the render function, the oscd-filtered-list will be loaded differently compared to the (for now) implemented filtered-list in OpenSCD. This can result in an empty list.

- Casting to a mwc-list will no longer work. Because it is not an extension any more it is not of the same type.

These decisions will result in a more robust implementation usage in Open-SCD core, because Open-SCD core itself doesn't have to keep track of API changes in the third party software. It will, however, take time and effort to implement the oscd-filtered-list into Open-SCD in it's current state (because it still relies on mwc-list casts and loads as a direct implementation of that component). This doesn't apply to future use of the oscd-filtered-list.
