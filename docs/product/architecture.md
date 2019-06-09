When opening the app, user wants :
- track chunk
- check what is underused
- edit roles

# Chunk Tracking

Desktop: display current week.
Mobile: display current day. Swip to change date

How to edit default splitting? To avoid inadvertency edit current split configuration, it could be locked.
Unlock split config via an edit button. This shouldn't be a reccurent action.
When unlocked, user can split or join a chunk with a double click [desktop] / long press [mobile]. User can move chunk border (one border for two chunks). Then user can save it, discard it, or save it as default for the next weeks

How to assign role to chunks? Two ways:
1. tap on chunk, it opens a popup where you can choose the appropriate role. Tap on the role to assign it to the chunk
2. Preselect the role, then tap on the chunk to assign the role on it.
With 2. you can assign chunk easily if they use the same role. Otherwise it's cumbersome.
With 1. you can easily assign role to chunk but it's cumbersome if it's always the same role for multiple chunks.

To improve 1., we can highlight the last selected role.

# Goal Monitoring

How to show difference between current & target?
Set a default target to have all roles balanced
What happens to the target when adding/removing a role ? Adding then removing should restore the inital state.

User wants to monitor to adjust his role assignation: decrease some overused and increase the underused.
Use a bar chart to highlight roles to decrease and roles to increase
Use a edit button to toogle view from bar char use relative to goal to bar chart goal setting. Add a button to add a role.
Setting goal : use a default role with all 100% of usage - communicating vessels principle.
Add a way to change the time interval.
