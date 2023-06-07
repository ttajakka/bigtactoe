export const changeInstruction = (message) => {
  document.getElementById("instruction").innerText = message;
};

export const toNodeId = ({ x, y }) => "node" + x.toString() + y.toString();

export const toSquareId = ({ xsmall, ysmall }) =>
  "square" + xsmall.toString() + ysmall.toString();

export const toid = (type, { x, y }) => {
  return type + x.toString() + y.toString();
};
