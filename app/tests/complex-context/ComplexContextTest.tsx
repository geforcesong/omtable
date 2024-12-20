"use client";

import { useComplexContext } from "@/app/contexts/ComplexContext";
import { updateAge, updateName } from "@/app/contexts/ComplexContext/actions";

export default function ComplexContextTest() {
  const { state, dispatch } = useComplexContext();

  return (
    <div className="flex flex-col p-10">
      <h1>Complex Context</h1>
      <div>
        name: {state.name}, age: {state.age}
        <div className="flex gap-2">
          <button onClick={() => dispatch(updateName("Updated Name"))}>
            Change Name
          </button>
          <button onClick={() => dispatch(updateAge(666))}>Change Age</button>
        </div>
      </div>
    </div>
  );
}
