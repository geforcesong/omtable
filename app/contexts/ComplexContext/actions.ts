export interface ActionBase<T = string> {
  type: T;
  payload: any;
}

export enum ActionType {
  UpdateName = "UpdateName",
  UpdateAge = "UpdateAge",
}

export const updateName = (name: string) => ({
  type: ActionType.UpdateName,
  payload: name,
});

export const updateAge = (age: number) => ({
  type: ActionType.UpdateAge,
  payload: age,
});
