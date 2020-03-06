# How
Try to define reusable architecture, separate core logic with specific app needs
Target minimal bundle size to support low internet connection -> rely on web platform

## i18n
One app should be generated for each local -> increase space requirement on the server but decrease bundle size
put text on separate files

## HTML Components
Use default components/widgets for forms

# Root Component
Provide App/Router/Theme state & dispatcher
URL event listener that trigger action
Listen for states and save/sync

# App Component
Invoke AppBar, BottomBar , components
Listen for navigation change to focus on right component.

# Components
Each component is responsible for sub-route / query parameter.
Components can request a navigation guard to prevent data loss -> but default is: save change at each interaction.
For forms that require a batch submission, it could save user input in localStorage and rehydrate when switching back on it.