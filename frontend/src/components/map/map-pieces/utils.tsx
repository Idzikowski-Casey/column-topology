export function randomColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

export function colorAttribute(colGroups) {
  let newColGroups = colGroups.map((col) => {
    let color = randomColor();
    return { ...col, color };
  });
  return newColGroups;
}

export function createMapboxPaintConditional(colGroups) {
  let predicate = [];
  colGroups.map((col) => {
    let color = col.color;
    let col_group_id = col.col_group_id;
    let pred = [["==", ["get", "col_group_id"], col_group_id], color];
    predicate = [...predicate, ...pred];
  });
  return [
    "case",
    ...predicate,
    ["==", ["get", "col_group_id"], null],
    "#F95E5E",
    "#0BDCB9",
  ];
}
