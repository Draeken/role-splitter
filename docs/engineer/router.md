
url event trigger an action, the reducer can cancel (guard/error) or commit navigation.
If user change the url, it reloads the app, then the app catch the current url and could trigger an action (fromUrl: true). If the user wants to navigate through the app, it uses a special handler (not a `<a>`) that use Web History API to push state or prevent/guard

It may be compsed of :
- a location listener that trigger action (handle URL direct change)
- a switch that display the correct components -> could use a POJO that describe relation between components. The unique switch will then tackle all possible routes -> implies that components are 1/ specific leaves or 2/ generic container (eg: steam's store)

Should the router be integrated to app state or have its own store?
Protected routes needs user status.
Router state is composed of:
- current route
- route history for breadcrumb
this embedde generic logic. Guard or protected route logic shouldn't be in the reducer, but in the switch, or from a server's response
url changed -> trigger action to update router state -> trigger render -> switch retrieve components from component graph; if main component has a guard preventing him to be displayed, redirect to login/signup form (push history, so that after completion, it can redirect to previous router state). Assistive component could be hidden due to guard, when main component is permitted. Routes aren't guarded, only components are.

If we use a recursive schema : each component has a list of primary & secondary components, it means that:
steam store list of primary component are ~~the games ?~~ or **the category** (best sales, trending, for you, played by your friend, ...) ?

It's a better idea to have category as primary component for a store because they could be focused, and each category manage what kind of game have to be displayed. Also, the store give the component a list of primary component. All in the same bag. It may be cumbersome to categorize / differentiate them afterward.

The host component has the responsibility to display its children components in its own way (it could be placed in placeholder area). If we are consistent with the way that "root" component display its primary & secondary children, assistive components should be displayed within the boundaries of the primary component. So in a physic-based auto-layout, how the layout is computed?

if it's the game and filter / pagination change, it updates the component graph which cause a re-render?
How the graph is generated? If it's only a view of what is displayable?
root -> graph -> main comp & primary for each of the main comp
focus on A : root -> A -> primary & secondary of A (discard other main)
but if there is still room for other main comp to be displayed: root -> [A, B, C] -> primary & secondary of A, primary of B & C
This is the current, in-use graph of components, used by canvas component to layout the app.
Actions that mutate this graph are:
- focus change -> router
- app state change like: (eg: user is authentified) -> app state
- local change: (eg: filter, pagination, sort) -> should only trigger a layout re-render for the change's author.

***
url: [compA]/[compB]

- graph -> root & main comp -> compA ~~& main comp~~ -> compB ~~& main/secondary comp~~
- synchrone resolution of permissions (root's main comp, compA, comB).
- if compA deny access, it'll prevent access to compB. -> display the last authorized component with an error message or redirect to login

comp have size requirements, if it can't be displayed, don't bother loading it or fetch other data related to it.
when canvas find what to display, call comp async method to retrieve primary and / or secondary components, recursively. It can respond from static data or fetch it from database response (eg: friend list, product list)
