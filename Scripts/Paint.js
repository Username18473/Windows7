const canvas = document.getElementById('CANVAS');
const ctx = canvas.getContext('2d');
const toolbarHeight = document.getElementById('toolbar').offsetHeight;
console.log(ctx);

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8 - toolbarHeight;

let drawing = false;
let tool = 'brush';
let color = '#000000';

function changeTool(selectedTool) {
  tool = selectedTool;
}

function changeColor(newColor) {
  color = newColor;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

const colorPalette = document.getElementById('colorPalette');
const colors = [ 
  '#000000', '#828282', '#7e1111', '#ea0b0b', '#fa7d3f', '#FFFF00', '#2bbf53', '#1aa3c1',
  '#2e49cf', '#9c57b5', '#ffffff', '#c6c5c6', '#ba8b5d', '#FFAEC9', '#FFC90E', '#EFE4B0',
  '#B5E61D', '#99D9EA', '#7092BE', '#C8BFE7'
];
colors.forEach(c => {
  const colorSquare = document.createElement('div');
  colorSquare.className = 'color-square';
  colorSquare.style.backgroundColor = c;
  colorSquare.onclick = () => changeColor(c);
  colorPalette.appendChild(colorSquare);
});