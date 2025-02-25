import React from "react";

type elo = { time: string };
const Time: React.FC<elo> = ({ time }) => {
  const newTime = time.split(":");
  return <div>{`${newTime[0]}h${newTime[1]}min${newTime[2]}s`}</div>;
};

export default Time;
