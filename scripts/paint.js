const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const toolbarHeight = document.getElementById('toolbar').offsetHeight;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8 - toolbarHeight;

let drawing = false;
let tool = 'brush';
let color = '#000000';

// Change tool
function changeTool(selectedTool) {
  tool = selectedTool;
}

// Change color
function changeColor(newColor) {
  color = newColor;
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Mouse event handlers
canvas.addEventListener('mousedown', () => { drawing = true; });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  if (tool === 'brush') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
});

// Generate color palette
const colorPalette = document.getElementById('colorPalette');
const colors = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFD700', '#800000', '#1E90FF', '#4169E1', '#9370DB', '#8B4513', '#708090'
];
colors.forEach(c => {
  const colorSquare = document.createElement('div');
  colorSquare.className = 'color-square';
  colorSquare.style.backgroundColor = c;
  colorSquare.onclick = () => changeColor(c);
  colorPalette.appendChild(colorSquare);
});