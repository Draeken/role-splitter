export type RouterAction = RouterActionURLChanged;

export class RouterActionURLChanged {
  constructor(public path: string[]) {}
}