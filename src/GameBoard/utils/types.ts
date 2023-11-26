import React from "react";

enum Values {
  x = 'x',
  o = 'o',
  empty = 0,
  tie = -1
}

type CellProps = {
  value: Values;
  x?: number;
  y?: number;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

export type { CellProps };
export { Values };