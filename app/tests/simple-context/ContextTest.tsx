"use client";

import { useUserContext } from "@/app/contexts/SimpleContext";

export default function ContextTest() {
  const { user, setName, setAge } = useUserContext();

  return (
    <div className="flex flex-col p-10">
      <h1>Simple Context</h1>
      <h2>User: {JSON.stringify(user)}</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={user.age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
        />
      </div>
    </div>
  );
}
