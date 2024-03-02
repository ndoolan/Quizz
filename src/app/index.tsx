import React from "react";

interface Props {
  name: string;
}

export const App = ({ name }: Props) => {
  return (
    <div>
      <h1>Great job {name}!</h1>
    </div>
  );
};
