
url event trigger an action, the reducer can cancel (guard/error) or commit navigation.
If user change the url, it reloads the app, then the app catch the current url and could trigger an action (fromUrl: true). If the user wants to navigate through the app, it uses a special handler (not a <a>) that use Web History API to push state or prevent/guard

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
