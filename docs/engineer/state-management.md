https://blog.nrwl.io/managing-state-in-angular-applications-22b75ef5625f

- reducer function should be able to dispatch action (allow async work)
- sync store with backend - use last state, with a timestamp, in case of conflict (server has more recent change than local non-pushed state)
- optimistic updates needs an action in case of error
- url is the source of thruth
- url event trigger an action, the reducer can cancel (guard/error) or commit navigation.
If user change the url, it reloads the app, then the app catch the current url and could trigger an action (fromUrl: true). If the user wants to navigate through the app, it uses a special handler (not a <a>) that use Web History API to push state or prevent/guard