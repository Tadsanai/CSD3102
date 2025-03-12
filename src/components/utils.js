export function getWheelPaths(numSegments, colors) {
  const paths = [];
  const angle = 360 / numSegments;

  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * angle;
    const endAngle = (i + 1) * angle;

    const x1 = 150 * Math.cos((startAngle - 90) * (Math.PI / 180));
    const y1 = 150 * Math.sin((startAngle - 90) * (Math.PI / 180));
    const x2 = 150 * Math.cos((endAngle - 90) * (Math.PI / 180));
    const y2 = 150 * Math.sin((endAngle - 90) * (Math.PI / 180));

    const path = `M0,0 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z`;

    paths.push({ path, color: colors[i % colors.length] });
  }

  return paths;
}
