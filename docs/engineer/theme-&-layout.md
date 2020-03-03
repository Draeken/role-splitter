Should it support landscape and tabloid format?

useReactiveTheme hook? -> have to listen to some event like: ambiant luminosity (switch dark/light theme), viewport (phone/tablet), portrait or landscape (assistive component bar could be positionned on a left side instead of bottom side).
These settings are overwritted by user's settings that are in the app state (dark/light preference, interface density). Theme should be a merge of both values
Adding theme in app state would make it difficult to reuse, due to the high specificity of app state. Plus there is a clear distinction between app state & theme state, with no interaction between them. -> dedicated store - theme state, which include user's preferences, and actions triggered by device event or user preference change.