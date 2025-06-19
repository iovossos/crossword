export function printGrid(grid, rows, cols) {
  let result = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      result += grid[index];
    }
    if (row < rows - 1) result += "\n";
  }
  console.log(result);
}
    