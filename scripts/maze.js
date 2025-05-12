 const player = document.getElementById('player');
        const goal = document.getElementById('goal');
        const maze = document.getElementById('maze');

        // Starting positions
        player.style.top = '0px';
        player.style.left = '15px';
        goal.style.top = '270px';
        goal.style.left = '285px';

        // Define wall objects
        const wallData = [
            { top: 50, left: 50, width: 20, height: 60 },
            { top: 50, left: 70, width: 130, height: 20 },
            { top: 100, left: 100, width: 20, height: 200 },
            { top: 280, left: 50, width: 150, height: 20 },
            { top: 200, left: 200, width: 20, height: 170 },
            { top: 300, left: 210, width: 150, height: 20 },
            { top: 50, left: 300, width: 20, height: 250 },
            { top: 80, left: 320, width: 50, height: 20 },
            { top: 100, left: 50, width: 150, height: 20 },
            { top: 0, left: 100, width: 20, height: 70 },
            { top: 140, left: 350, width: 50, height: 20 },
            { top: 250, left: 350, width: 50, height: 20 },
            { top: 190, left: 320, width: 50, height: 20 },
            { top: 150, left: 120, width: 140, height: 20 },
            { top: 340, left: 120, width: 20, height: 60 },
            { top: 350, left: 320, width: 20, height: 50 },
            { top: 25, left: 350, width: 50, height: 20 },
            { top: 210, left: 50, width: 20, height: 70 },
            { top: 160, left: 0, width: 50, height: 20 },
            { top: 0, left: 240, width: 20, height: 70 },
            { top: 100, left: 250, width: 50, height: 20 },
            { top: 235, left: 250, width: 50, height: 20 },
            { top: 170, left: 150, width: 20, height: 80 },
            { top: 340, left: 0, width: 90, height: 20 },
            { top: 194, left: 200, width: 70, height: 19 },
            { top: 350, left: 250, width: 90, height: 20 }
        ];

        // Create wall elements
        wallData.forEach(w => {
            const wall = document.createElement('div');
            wall.classList.add('wall');
            wall.style.top = `${w.top}px`;
            wall.style.left = `${w.left}px`;
            wall.style.width = `${w.width}px`;
            wall.style.height = `${w.height}px`;
            maze.appendChild(wall);
        });

        const walls = document.querySelectorAll('.wall');

        document.addEventListener('keydown', function(event) {
            let top = player.offsetTop;
            let left = player.offsetLeft;
            let newTop = top;
            let newLeft = left;

            // Movement input
            if (event.key === 'ArrowUp') {
                newTop -= 10;
            } else if (event.key === 'ArrowDown') {
                newTop += 10;
            } else if (event.key === 'ArrowLeft') {
                newLeft -= 10;
            } else if (event.key === 'ArrowRight') {
                newLeft += 10;
            }

            // Stay within bounds
            if (
                newTop < 0 ||
                newLeft < 0 ||
                newTop + player.offsetHeight > maze.clientHeight ||
                newLeft + player.offsetWidth > maze.clientWidth
            ) return;

            // Check collisions
            if (!checkCollisions(newTop, newLeft)) {
                player.style.top = `${newTop}px`;
                player.style.left = `${newLeft}px`;
            }

            // Check win
            checkWin();
        });

        function checkCollisions(newTop, newLeft) {
            const futurePlayerRect = {
                top: newTop,
                bottom: newTop + player.offsetHeight,
                left: newLeft,
                right: newLeft + player.offsetWidth
            };

            for (let wall of walls) {
                const wallTop = wall.offsetTop;
                const wallLeft = wall.offsetLeft;
                const wallBottom = wallTop + wall.offsetHeight;
                const wallRight = wallLeft + wall.offsetWidth;

                if (
                    futurePlayerRect.top < wallBottom &&
                    futurePlayerRect.bottom > wallTop &&
                    futurePlayerRect.left < wallRight &&
                    futurePlayerRect.right > wallLeft
                ) {
                    return true;
                }
            }
            return false;
        }

        function checkWin() {
            const playerRect = player.getBoundingClientRect();
            const goalRect = goal.getBoundingClientRect();

            if (
                playerRect.top < goalRect.bottom &&
                playerRect.bottom > goalRect.top &&
                playerRect.left < goalRect.right &&
                playerRect.right > goalRect.left
            ) {
                alert('🎉 You reached the goal!');
                resetPlayer();
            }
        }

        function resetPlayer() {
            player.style.top = '0px';
            player.style.left = '15px';
        }