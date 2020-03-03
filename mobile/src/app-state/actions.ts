export type Action = ActionURLChanged;

export class ActionURLChanged {
  constructor(public path: string[]) {}
}