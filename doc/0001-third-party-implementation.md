# Encapsulate third party components instead of extending it

Date: 2023-05-15

## Status

Accepted

## Context

In Open-SCD we use the integrated filtered-list as an extension of @material/mwc-list, therefore the filtered-list gets cast to a mwc-list element and an import for that is needed.
Because of this, both Open-SCD and the filtered-list rely on this third-party dependency, and therefore both need to be maintained accordingly.
This is inefficient and can be time-consuming.

This repository contains the oscd-filtered-list, which is based on, and will eventually replace, the integrated filtered-list inside Open-SCD. The oscd-filtered-list is intended to be a stand-alone component that also needs to be a solution to the above stated problem.

## Decision

To make sure that users of the oscd-filtered-list will no longer need to rely on third-party components used by the oscd-filtered-list, it can no longer be an extension of a third-party component and should therefore encapsulate this component inside the render function.
This would mean that the oscd-filtered-list will use third-party software (mwc-list) itself, but users of the oscd-filtered list don't need to import that anymore. If there were to be API changes to the third-party software, then this should be dealt with solely in the oscd-filtered-list. This would mean that the exposed API of the oscd-filtered-list will remain the same, eventhough the third-party software it depends on changes their API. The internal code of the oscd-filtered-list will be changed to accomodate the API changes of the third party software.

## Consequences

- Because the oscd-filtered-list will no longer extend third-party software but encapsulate it in the render function, the oscd-filtered-list will be loaded differently compared to the (for now) integrated filtered-list in OpenSCD. This can result in an empty list.

- Casting to a mwc-list will no longer work. Because it is not an extension anymore, it is not of the same type.

These decisions will result in a more robust implementation usage, because users of the oscd-filtered-list don't have to keep track of API changes in the third-party software. It will, however, take time and effort to implement the oscd-filtered-list into Open-SCD in its current state (because it still relies on mwc-list casts and loads as a direct implementation of that component). This doesn't apply to future use of the oscd-filtered-list.

## More information

Some examples to clarify the context:
In these examples the UpdateDescriptionSel.ts file is used.

- A mwc-list type parameter for the WizardDialog where the query searches for mwc-list:
  ![ListParameter](https://github.com/openscd/oscd-filtered-list/assets/35229971/a0f66c5a-2f23-4ab6-ad9d-e145c179c3f8)
- A mwc-list type parameter for the WizardActor in a foundation file:
  ![ListParameter1](https://github.com/openscd/oscd-filtered-list/assets/35229971/10e4e40e-b5f6-4974-935c-4848c6f10c55)

- An example of what happens when implementing the oscd-filtered-list (when mwc-list is rendered instead of extended):
  ![WithoutWait](https://github.com/openscd/oscd-filtered-list/assets/35229971/60091e11-6c94-4d2e-9c8b-7a69c947efc9)
- An example of correctly updating the oscd-filtered-list content:
  ![WithWait](https://github.com/openscd/oscd-filtered-list/assets/35229971/37c30462-eb75-4488-8e5b-2cd53b710710)
