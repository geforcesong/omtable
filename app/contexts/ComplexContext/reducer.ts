import { ActionBase, ActionType } from "./actions";

export type State = {
  name: string;
  age: number;
};

const initialState: State = {
  name: "George",
  age: 40,
};

const reducer = (state: State, action: ActionBase): State => {
  if (action.type === ActionType.UpdateAge) {
    return {
      ...state,
      age: action.payload,
    };
  }

  if (action.type === ActionType.UpdateName) {
    return {
      ...state,
      name: action.payload,
    };
  }

  return state;
};

export { initialState };

export default reducer;
