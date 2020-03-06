https://blog.nrwl.io/managing-state-in-angular-applications-22b75ef5625f

- reducer function should be able to dispatch action (allow async work)
- sync store with backend - use last state, with a timestamp, in case of conflict (server has more recent change than local non-pushed state)
- optimistic updates needs an action in case of error
- url is the source of thruth

With 3 stores:
- router
- theme
- app

What have to be sync?
- router tackle only current navigation and has no interest to be saved.
- theme contains some user's preference (dark/light theme or density mode) that should be sync
- a majority of properties in app store have to be sync, but some don't, like modal state or other small things

an app specific effect listen for state change and sync it