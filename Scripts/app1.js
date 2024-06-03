/* general functions to be decalred over here */

function handleGridRender() {
    document.querySelector('.js-game-board').innerHTML = '';
    let html = "";
    for(let i=0;i<=7;i++) {
        let html1='';
        html1 = `<div class="game-row-${i} game-row">`;
        let html2='';
        for(let j=0 ; j<=7 ; j++) {
            html2 = html2 + `<div class="game-column-${j} game-box game-box-${i}-${j} centre-x-${calculateXCenter(j,bulletHeight,bulletWidth)}-centre-y-${calculateYCenter(i,bulletHeight,bulletWidth)}" data-position="${i}${j}" data-centre-x="${calculateXCenter(j,bulletHeight,bulletWidth)}" data-centre-y="${calculateYCenter(i,bulletHeight,bulletWidth)}"></div>`;
        }
        html1 = html1+html2+"</div>";
        html+=html1;
    }
    document.querySelector('.js-game-board').innerHTML = html;
}

function handlePiecesRender() {
    // piecePositions = JSON.parse(localStorage.getItem('piecePosition'));

    piecePositions.forEach((row,i)=>{
        row.forEach((piece,j)=>{
            const pieceBox = document.querySelector(`.game-box-${i}-${j}`);
            pieceBox.innerHTML= piece ;

        });
    });

    rotatablePieces.forEach((piece,i)=>{
        document.querySelector(`.game-box-${piece.row}-${piece.column} div img`).style.transform = `rotate(${piece.angle}deg)`
        });
        
}

function handleAngleCheck() {
    rotatablePieces.forEach((piece)=>{
        if(piece.angle % 360 === 0) {
            piece.angle = 0;
        }
        else if ( piece.angle % 270 === 0) {
            if (piece.angle >0) {
                piece.angle = -90;
            }
            else {
                piece.angle = 90;
            }
        }
        else if ( piece.angle % 180 === 0) {
                piece.angle = 180;
        }
    });
}

function handleMove1(e) {

    document.querySelectorAll('.player1').forEach((piecenew,j)=>{
        piecenew.removeEventListener('click', handleMove1);
    }); 
    //test succesful - removal of event listener is also successful
    ////console.log('testing if click on pieces work');



    const targetId = parseInt(e.target.parentNode.dataset.id);

    currentMoveDetails.turn = 1;
    currentMoveDetails.id = parseInt(targetId);
    currentMoveDetails.from = [parseInt(e.target.parentNode.parentNode.dataset.position[0]),parseInt(e.target.parentNode.parentNode.dataset.position[1])];
    ////console.log(currentMoveDetails.from);
    ////console.log(parseInt(e.target.parentNode.dataset.id),'testing if id of elementis same as that of clicked element');
    //test successful - clicking anywhere inside the box gives the id of the object

    //console.log(e.target.parentNode.parentNode.dataset.position[0],'testing to remove touch piece');

    e.target.parentNode.addEventListener('click',()=>{
        gameEngine();
        var buttonLeft = document.querySelector('.left-rotate');
        var newButtonLeft = buttonLeft.cloneNode(true);
        buttonLeft.parentNode.replaceChild(newButtonLeft, buttonLeft); 

        var buttonRight = document.querySelector('.right-rotate');
        var newButtonRight = buttonRight.cloneNode(true);
        buttonRight.parentNode.replaceChild(newButtonRight, buttonRight);
    })

    //console.log(targetId,'test10000')

    if (targetId === 1) {
        handleTitanMove(everythingObject.titan1,1);
    }
    else if (targetId === 2) {
        handleTankMove(everythingObject.tank1,1);
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
    }
    else if (targetId === 3) {
        handleCannonMove(everythingObject.cannon1,1);
    }
    else if (targetId === 4) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleRicochetMove(everythingObject.ricochet11,1);
    }
    else if (targetId === 5) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleRicochetMove(everythingObject.ricochet12,1);
    }
    else if (targetId === 6) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleSemiRicochetMove(everythingObject.semiRicochet11,1);
    }
    else if (targetId === 7) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleSemiRicochetMove(everythingObject.semiRicochet12,1);
    }
}

function handleMove2(e) {
    document.querySelectorAll('.player2').forEach((piecenew,j)=>{
        piecenew.removeEventListener('click', handleMove2);
    }); 
    //test succesful - removal of event listener is also successful
    ////console.log('testing if click on pieces work');

    const targetId = parseInt(e.target.parentNode.dataset.id);

    currentMoveDetails.turn = 2;
    currentMoveDetails.id = parseInt(targetId);currentMoveDetails.from = [parseInt(e.target.parentNode.parentNode.dataset.position[0]),parseInt(e.target.parentNode.parentNode.dataset.position[1])]
    ////console.log(parseInt(e.target.parentNode.dataset.id),'testing if id of elementis same as that of clicked element');
    //test successful - clicking anywhere inside the box gives the id of the object

    e.target.parentNode.addEventListener('click',()=>{
        gameEngine();
        var buttonLeft = document.querySelector('.left-rotate');
        var newButtonLeft = buttonLeft.cloneNode(true);
        buttonLeft.parentNode.replaceChild(newButtonLeft, buttonLeft); 

        var buttonRight = document.querySelector('.right-rotate');
        var newButtonRight = buttonRight.cloneNode(true);
        buttonRight.parentNode.replaceChild(newButtonRight, buttonRight); 
    });

    if (targetId === 8) {
        handleTitanMove(everythingObject.titan2,2);
    }
    else if (targetId === 9) {
        handleTankMove(everythingObject.tank2,2);
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
    }
    else if (targetId === 10) {
        handleCannonMove(everythingObject.cannon2,2);
    }
    else if (targetId === 11) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleRicochetMove(everythingObject.ricochet21,2);
    }
    else if (targetId === 12) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleRicochetMove(everythingObject.ricochet22,2);
    }
    else if (targetId === 13) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleSemiRicochetMove(everythingObject.semiRicochet21,2);
    }
    else if (targetId === 14) {
        document.querySelector('.hidden-buttons').classList.add('hidden-buttons-visible');
        handleSemiRicochetMove(everythingObject.semiRicochet22,2);
    }
}

function handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer) {

    function handleSwapMove() {
        let row = PiecePlayer.row;
        let column = PiecePlayer.column;

        const originalPieceBox = document.querySelector(`.game-box-${row}-${column}`);

        swapablePieces.forEach((piece,i)=>{    
        // for( i=0; i< swapablePieces.length; i++) {
            if(PiecePlayer.id === piece.id)
            {
                0;
            }
            else {

            

            let rowNew = piece.row;
            let columnNew = piece.column;

            let gameBox = document.querySelector(`.game-box-${rowNew}-${columnNew}`);

            function swappingFunction(e) {

                for( i=0; i< swapablePieces.length; i++) {
                    if(PiecePlayer.id === swapablePieces[i].id)
                    {
                        continue;
                    }
                    let rowNew = swapablePieces[i].row;
                    let columnNew = swapablePieces[i].column;

                    let gameBox = document.querySelector(`.game-box-${rowNew}-${columnNew}`);
                    gameBox.removeEventListener('click',swappingFunction);
                }
                //console.log(e.target.parentNode);
                let targetPosition = e.target.parentNode.parentNode.dataset.position;
                
                let targetRow = parseInt(targetPosition[0]);
                let targetColumn = parseInt(targetPosition[1]);

                currentMoveDetails.to = [targetRow,targetColumn];
                currentMoveDetails.swapId = parseInt(e.target.parentNode.dataset.id);
                //console.log(currentMoveDetails.swapId,'test9988');

                PiecePlayer.row = targetRow;
                PiecePlayer.column = targetColumn;
                

                let originalPosition = originalPieceBox.dataset.position;

                let originalRow = parseInt(originalPosition[0]);
                let originalColumn = parseInt(originalPosition[1]);

                piece.row = originalRow;
                piece.column = originalColumn;

                let temp = piecePositions[originalRow][originalColumn];

                piecePositions[originalRow][originalColumn] = piecePositions[targetRow][targetColumn];

                piecePositions[targetRow][targetColumn] = temp;

                let swapHtml = originalPieceBox.innerHTML;
                originalPieceBox.innerHTML = gameBox.innerHTML;
                gameBox.innerHTML = swapHtml;

                document.querySelector('.left-rotate').removeEventListener('click',handleRotateLeft);

                document.querySelector('.right-rotate').removeEventListener('click',handleRotateRight);

                document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');

                gameEngine();

                if (flag===1) {

                    handleBulletShoot(everythingObject.cannon1,1);
                    //console.log('test4');
                }
                else if (flag === -1) {
                    handleBulletShoot(everythingObject.cannon2,2);
                }
                
            }
            gameBox.addEventListener('click',swappingFunction);
            }
        })

    }

    function handleRotateRight() {
        PiecePlayer.angle += 90;
        currentMoveDetails.rotate = 'right';
        // flag*=-1;

        document.querySelectorAll(`available-boxes-${f}`).forEach((availableBox)=>{
            availableBox.classList.add('game-box');
            availableBox.classList.remove(`available-boxes-${f}`);
        });
        document.querySelector('.right-rotate').removeEventListener('click',handleRotateRight);
        document.querySelector('.left-rotate').removeEventListener('click',handleRotateLeft);
        document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');

        gameEngine();

        // if(firstShootStop) {
            if (flag===1) {
                handleBulletShoot(everythingObject.cannon1,1);
                //console.log('test4');
            }
            else if (flag === -1) {
                handleBulletShoot(everythingObject.cannon2,2);
            }
        // }
        // firstShootStop++;
    }
    
    function handleRotateLeft() {
        PiecePlayer.angle -= 90;

        currentMoveDetails.rotate = 'left';
        // flag*=-1;

        document.querySelectorAll(`available-boxes-${f}`).forEach((availableBox)=>{
            availableBox.classList.add('game-box');
            availableBox.classList.remove(`available-boxes-${f}`);
        });
        document.querySelector('.right-rotate').removeEventListener('click',handleRotateRight);
        document.querySelector('.left-rotate').removeEventListener('click',handleRotateLeft);

        document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');



        gameEngine();

        // if(firstShootStop) {
            if (flag===1) {
                handleBulletShoot(everythingObject.cannon1,1);
                //console.log('test4');
            }
            else if (flag === -1) {
                handleBulletShoot(everythingObject.cannon2,2);
            }
        // }
        // firstShootStop++;
    }

    //console.log(availableSpaces,'test9998');
    availableSpaces.forEach(([rowNew,columnNew],i)=>{
        const gameBox = document.querySelector(`.game-box-${rowNew}-${columnNew}`);
        //console.log('test1');

        const originalPieceBox = document.querySelector(`.game-box-${row}-${column}`);
        gameBox.classList.remove('game-box')
        gameBox.classList.add(`available-boxes-${f}`)

        function movingFunction(e){
            let swapHtml = originalPieceBox.innerHTML;
            //console.log(swapHtml);
            gameBox.innerHTML = swapHtml;
            originalPieceBox.innerHTML = "";

            document.querySelectorAll(`.available-boxes-${f}`).forEach((availableBox)=>{
                availableBox.removeEventListener('click',movingFunction);
                //console.log('test3');
                availableBox.classList.add('game-box');
                availableBox.classList.remove(`available-boxes-${f}`);
                //console.log('test2')
            });

            // document.querySelectorAll(`.available-boxes-${f}`).forEach((availableBox)=>{
            //     availableBox.removeEventListener('click',movingFunction);
            // });

            let targetPosition = e.target.dataset.position;
            let targetRow = parseInt(targetPosition[0]);
            let targetColumn = parseInt(targetPosition[1]);

            currentMoveDetails.to = [targetRow,targetColumn];

            PiecePlayer.row = targetRow;
            PiecePlayer.column = targetColumn;

            let originalPosition = originalPieceBox.dataset.position;

            let originalRow = parseInt(originalPosition[0]);
            let originalColumn = parseInt(originalPosition[1]);

            let temp = piecePositions[originalRow][originalColumn];

            piecePositions[originalRow][originalColumn] = "";
            piecePositions[targetRow][targetColumn] = temp;

            // flag*=-1;

            document.querySelector('.left-rotate').removeEventListener('click',handleRotateLeft);

            document.querySelector('.right-rotate').removeEventListener('click',handleRotateRight);

            document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');
            gameEngine();

            // if(firstShootStop) {
                if (flag===1) {

                    handleBulletShoot(everythingObject.cannon1,1);
                    //console.log('test4');
                }
                else if (flag === -1) {
                    handleBulletShoot(everythingObject.cannon2,2);
                }
            // }
            // firstShootStop++;

        }

        gameBox.addEventListener('click',movingFunction);
        

    });

    if (PiecePlayer.id ===4 ||PiecePlayer.id ===5||PiecePlayer.id ===6||PiecePlayer.id ===7 |PiecePlayer.id ===11 ||PiecePlayer.id ===12||PiecePlayer.id ===13||PiecePlayer.id ===14 || PiecePlayer.id === 9 || PiecePlayer.id === 2) {
        document.querySelector('.left-rotate').addEventListener('click',handleRotateLeft);

        document.querySelector('.right-rotate').addEventListener('click',handleRotateRight);
        //console.log(PiecePlayer.id); //testing to see if condition is being satisfied here.
    }
    ////console.log(PiecePlayer.allow);

    if (PiecePlayer.id === 11 ||PiecePlayer.id === 12 ||PiecePlayer.id === 4 || PiecePlayer.id === 5 ) {
        handleSwapMove();
    }
}

function calculateAvailableSpaces(column,row) { // not for cannon
    //console.log(column,row);
    // testing if correct column, row is being inputted to this function
    let availableSpaces = [];
    let i,j;
    for(i=row-1;i<=row+1;i++){
        //console.log(i,'test for i and row');
        //console.log(row,'test for i and row')
        if(i<=7&&i>=0){
            for(j=column-1;j<=column+1;j++){
                //console.log(j);
                //console.log(column,'test for j and column')
                if(j<=7&&j>=0){
                    if(piecePositions[i][j] === "") {
                        availableSpaces.push([i,j]);
                    }
                }
            }
        }
    }

    //console.log(availableSpaces);
    return availableSpaces;
}

function handleTitanMove(PiecePlayer,f) {
    let column = PiecePlayer.column;
    let row = PiecePlayer.row;

    let availableSpaces = calculateAvailableSpaces(column,row);
    //console.log(availableSpaces);
    // checking if algorithm for available spaces is correct

    handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer);
}
function handleCannonMove(PiecePlayer,f) {
    let column = PiecePlayer.column;
    let row = PiecePlayer.row;

    let availableSpaces = [];
    if (column-1 >=0 ) {
        if (piecePositions[row][column-1] === "") {
            availableSpaces.push([row,column-1])
        }
    }
    if (column+1 <=7) {
        if(piecePositions[row][column+1] === "") {
            availableSpaces.push([row,column+1])
        }
    }
    //console.log(availableSpaces);
    // checking if algorithm for available spaces is correct

    handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer);
}
function handleRicochetMove(PiecePlayer,f) {
    //console.log('called here');
    let column = PiecePlayer.column;
    let row = PiecePlayer.row;

    let availableSpaces = calculateAvailableSpaces(column,row);
    //console.log(availableSpaces);
    // checking if algorithm for available spaces is correct

    handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer);
}
function handleSemiRicochetMove(PiecePlayer,f) {
    let column = PiecePlayer.column;
    let row = PiecePlayer.row;

    let availableSpaces = calculateAvailableSpaces(column,row);
    //console.log(availableSpaces);
    // checking if algorithm for available spaces is correct

    handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer);
}
function handleTankMove(PiecePlayer,f) {
    let column = PiecePlayer.column;
    let row = PiecePlayer.row;

    let availableSpaces = calculateAvailableSpaces(column,row);
    //console.log(availableSpaces);
    // checking if algorithm for available spaces is correct

    handleAvailableSpaces(availableSpaces,f,row,column,PiecePlayer);
}

function gameEngine() {

    document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');

    handleAngleCheck();
    handleGridRender();
    handlePiecesRender();

    if(flag === 1) {
        document.querySelectorAll('.player1').forEach((piece,i)=>{
            piece.addEventListener('click', handleMove1);
        });
    }
    else if(flag === -1) {
        document.querySelectorAll('.player2').forEach((piece,i)=>{
            piece.addEventListener('click', handleMove2);
        });
    }

    handlePlayerTurn(flag);

    tanks.forEach((tank)=>{
        if (tank.angle === 0) {
            tank.allow = 'left';
        }
        else if (tank.angle === 90) {
            tank.allow = 'up';
        }
        else if (tank.angle === -90) {
            tank.allow = 'down';
        }
        else {
            tank.allow = 'right';
        }
    });
    //console.log(tanks);

    localStorage.setItem('everything',JSON.stringify(everythingObject));
    localStorage.setItem('piecePosition',JSON.stringify(piecePositions));
    localStorage.setItem('flag',flag);
    localStorage.setItem('removedSemiRicochetsList',JSON.stringify(removedListIds));
    
    localStorage.setItem('spellList',JSON.stringify(spellList));

    localStorage.setItem('movesHistory',JSON.stringify(movesHistory));
    
}

function handlePlayerTurn(flag) {
    let turn;
    if (flag === 1) {
        turn = 1;
    }
    else {
        turn = 2;
    }
    document.querySelector('.player').innerHTML = `Player ${turn}`;
}

function handleBulletShoot(PiecePlayer,f) {

    
    const bulletImg = document.createElement('img');
    bulletImg.classList.add('bullet');
    bulletImg.src = '../Images/directional-bullet.png';

    let bulletHeight = bulletImg.naturalHeight;
    let bulletWidth = bulletImg.naturalWidth;
    
    //"<img class='bullet' src='./Images/bullet.png'>"
    document.querySelector('.js-game-board').appendChild(bulletImg);

    const bullet = document.querySelector('.bullet');

    x=calculateXCenter(PiecePlayer.column,bulletHeight,bulletWidth);
    y=calculateYCenter(PiecePlayer.row,bulletHeight,bulletWidth);

    //console.log(x,y);

    bullet.style.left = x + 'px'; 
    bullet.style.top = y + 'px'; 

    let ricochets = [
        {
            listId: 4,
            x:calculateXCenter(everythingObject.ricochet11.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.ricochet11.row,bulletHeight,bulletWidth),
            angle: everythingObject.ricochet11.angle,
            row: everythingObject.ricochet11.row,
            column: everythingObject.ricochet11.column
        },
        {
            listId: 5,
            x:calculateXCenter(everythingObject.ricochet12.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.ricochet12.row,bulletHeight,bulletWidth),
            angle: everythingObject.ricochet12.angle,
            row: everythingObject.ricochet12.row,
            column: everythingObject.ricochet12.column
        },
        {
            listId: 11,
            x:calculateXCenter(everythingObject.ricochet21.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.ricochet21.row,bulletHeight,bulletWidth),
            angle: everythingObject.ricochet21.angle,
            row: everythingObject.ricochet21.row,
            column: everythingObject.ricochet21.column
        },
        {
            listId: 12,
            x:calculateXCenter(everythingObject.ricochet22.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.ricochet22.row,bulletHeight,bulletWidth),
            angle: everythingObject.ricochet22.angle,
            row: everythingObject.ricochet22.row,
            column: everythingObject.ricochet22.column
        }
    ]

    let semiRicochets = [
        {
            listId: 6,
            x:calculateXCenter(everythingObject.semiRicochet11.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.semiRicochet11.row,bulletHeight,bulletWidth),
            angle: everythingObject.semiRicochet11.angle,
            row: everythingObject.semiRicochet11.row,
            column: everythingObject.semiRicochet11.column
        },
        {
            listId: 7,
            x:calculateXCenter(everythingObject.semiRicochet12.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.semiRicochet12.row,bulletHeight,bulletWidth),
            angle: everythingObject.semiRicochet12.angle,
            row: everythingObject.semiRicochet12.row,
            column: everythingObject.semiRicochet12.column
        },
        {
            listId: 13,
            x:calculateXCenter(everythingObject.semiRicochet21.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.semiRicochet21.row,bulletHeight,bulletWidth),
            angle: everythingObject.semiRicochet21.angle,
            row: everythingObject.semiRicochet21.row,
            column: everythingObject.semiRicochet21.column
        },
        {
            listId: 14,
            x:calculateXCenter(everythingObject.semiRicochet22.column,bulletHeight,bulletWidth),
            y:calculateYCenter(everythingObject.semiRicochet22.row,bulletHeight,bulletWidth),
            angle: everythingObject.semiRicochet22.angle,
            row: everythingObject.semiRicochet22.row,
            column: everythingObject.semiRicochet22.column
        }
    ]

    let absorbers = [
        {
            x: calculateXCenter(everythingObject.tank1.column,bulletHeight,bulletWidth),
            y: calculateYCenter(everythingObject.tank1.row,bulletHeight,bulletWidth),
            allow: everythingObject.tank1.allow
        },
        {
            x: calculateXCenter(everythingObject.tank2.column,bulletHeight,bulletWidth),
            y: calculateYCenter(everythingObject.tank2.row,bulletHeight,bulletWidth),
            allow: everythingObject.tank2.allow
        }
    ]

    let titans = [
        {
            x: calculateXCenter(everythingObject.titan1.column,bulletHeight,bulletWidth),
            y: calculateYCenter(everythingObject.titan1.row,bulletHeight,bulletWidth),
            temp:1
        },
        {
            x: calculateXCenter(everythingObject.titan2.column,bulletHeight,bulletWidth),
            y: calculateYCenter(everythingObject.titan2.row,bulletHeight,bulletWidth),
            temp:2
        } 
    ]

    rotatableobject = [semiRicochets,ricochets]

    if (f===1) {
        path = 'down';
        bullet.style.transform = 'rotate(180deg)'
    }
    else if ( f===2) {
        path= 'up';
        bullet.style.transform = 'rotate(0deg)'
    }
    
    handleListModification();
    request = setInterval(()=>{
        shoot(absorbers,titans,ricochets,semiRicochets);
    },refreshRate);
    playAudio(shootingAudio);
    shooting=1;
    clickBlocker.style.display = 'block';
}

function shoot(absorbers,titans,ricochets,semiRicochets) {
    const bullet = document.querySelector('.bullet');
    ////console.log(interval);
    absorbers.forEach((absorber)=>{
        if (( x=== absorber.x && y === absorber.y) && (absorber.allow !== path) ){
            if (detectSpelluse()=== 0) {
                //console.log('satisfied2');
                playAudio(absorbingAudio);
                clearInterval(request);
                handleHistoryStore();
                clickBlocker.style.display = 'none';
                bullet.style.display = 'none'; 
                bullet.remove();
                shooting = 0;
                flag*=-1;
                gameEngine();
            }
            
        }
    });

    titans.forEach((titan)=>{
        if ( x=== titan.x && y === titan.y) {
            //console.log(x,y,titan.x,titan.y,'wow',titan.temp);
            clearInterval(request);
            handleHistoryStore();
            clickBlocker.style.display = 'none';
            bullet.style.display = 'none';
            bullet.remove();
            shooting = 0;
            flag*=-1;
            gameEngine();
            handleWinWindow(titan.temp === 1?2:1);
            
        }
    });

    if(path === 'down') {
        y+=velocity;
        bullet.style.top = y + 'px';
        
        ricochets.forEach((ricochet,i)=>{
            //console.log(x,y)
            //console.log(ricochet.x, ricochet.y,i)
            if ( x=== ricochet.x && y === ricochet.y) {
                //console.log('satisfied1');
                if(ricochet.angle === 0 || ricochet.angle%180 === 0) {
                    path = 'left';
                    bullet.style.transform = 'rotate(-90deg)'
                    playAudio(reflectionAudio);
                }
                else {
                    path = 'right';
                    bullet.style.transform = 'rotate(90deg)'
                    playAudio(reflectionAudio);
                }
            }
        });

        semiRicochets.forEach((semiRicochet,i)=>{
            if ( x=== semiRicochet.x && y === semiRicochet.y) {
                if(!(removedListIds.includes(semiRicochet.listId))) {
                    if(semiRicochet.angle === 0) {
                        path = 'right';
                        bullet.style.transform = 'rotate(90deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else if (semiRicochet.angle === -90) {
                        path = 'left';
                        bullet.style.transform = 'rotate(-90deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else {
                        
                        if (detectSpelluse()=== 0) {
                            const originalPieceBox = document.querySelector(`.game-box-${semiRicochet.row}-${semiRicochet.column}`);
                            originalPieceBox.innerHTML = '';
                            piecePositions[semiRicochet.row][semiRicochet.column] = '';
                            removedListIds.push(semiRicochet.listId);
                            handleListIdRemoval();
                            //console.log(rotatablePieces);
                            //console.log(pieces);
                            currentMoveDetails.lostId = semiRicochet.listId;
    
                            clearInterval(request);
                            handleHistoryStore();
                            clickBlocker.style.display = 'none';
                            bullet.style.display = 'none';
                            bullet.remove();
                            shooting = 0;
                            flag*=-1;
                            gameEngine();
                        }

                    }
                }
            }
        });
        
    }
    else if(path === 'up') {
        y-=velocity;
        bullet.style.top = y + 'px';

        ricochets.forEach((ricochet,i)=>{
            if ( x=== ricochet.x && y === ricochet.y) {
                if(ricochet.angle === 0 || ricochet.angle%180 === 0) {
                    path = 'right';
                    bullet.style.transform = 'rotate(90deg)'
                    playAudio(reflectionAudio);
                }
                else {
                    path = 'left';
                    bullet.style.transform = 'rotate(-90deg)'
                    playAudio(reflectionAudio);
                }
            }
        });

        semiRicochets.forEach((semiRicochet,i)=>{
            if ( x=== semiRicochet.x && y === semiRicochet.y) {
                if(!(removedListIds.includes(semiRicochet.listId))) {
                    if(semiRicochet.angle === 180) {
                        path = 'left';
                        bullet.style.transform = 'rotate(-90deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else if (semiRicochet.angle === 90) {
                        path = 'right';
                        bullet.style.transform = 'rotate(90deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else {
                        if (detectSpelluse()=== 0) {
                            const originalPieceBox = document.querySelector(`.game-box-${semiRicochet.row}-${semiRicochet.column}`);
                            originalPieceBox.innerHTML = '';
                            piecePositions[semiRicochet.row][semiRicochet.column] = '';
                            removedListIds.push(semiRicochet.listId);
                            handleListIdRemoval();
                            currentMoveDetails.lostId = semiRicochet.listId;
    
                            clearInterval(request);
                            handleHistoryStore();
                            clickBlocker.style.display = 'none';
                            bullet.style.display = 'none';
                            bullet.remove();
                            shooting = 0;
                            flag*=-1;
                            gameEngine();
                        }

                    }
                }
            }
        });

    }
    else if (path === 'right') {
        x+=velocity;
        bullet.style.left = x +'px';

        ricochets.forEach((ricochet,i)=>{
            if ( x=== ricochet.x && y === ricochet.y) {
                if(ricochet.angle === 0 || ricochet.angle%180 === 0) {
                    path = 'up';
                    bullet.style.transform = 'rotate(0deg)'
                    playAudio(reflectionAudio);
                }
                else {
                    path = 'down';
                    bullet.style.transform = 'rotate(180deg)'
                    playAudio(reflectionAudio);
                }

            }
        });

        semiRicochets.forEach((semiRicochet,i)=>{
            if ( x=== semiRicochet.x && y === semiRicochet.y) {
                if(!(removedListIds.includes(semiRicochet.listId))) {
                    if(semiRicochet.angle === 180) {
                        path = 'down';
                        bullet.style.transform = 'rotate(180deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else if (semiRicochet.angle === -90) {
                        path = 'up';
                        bullet.style.transform = 'rotate(0deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else {
                        if (detectSpelluse()=== 0) {
                            const originalPieceBox = document.querySelector(`.game-box-${semiRicochet.row}-${semiRicochet.column}`);
                            originalPieceBox.innerHTML = '';
                            piecePositions[semiRicochet.row][semiRicochet.column] = '';
                            
                            removedListIds.push(semiRicochet.listId);
                            handleListIdRemoval();
                            currentMoveDetails.lostId = semiRicochet.listId;
    
                            clearInterval(request);
                            handleHistoryStore();
                            clickBlocker.style.display = 'none';
                            bullet.style.display = 'none';
                            bullet.remove();
                            shooting = 0;
                            flag*=-1;
                            gameEngine();
                        }

                    }
                }
                
            }
        });

    }
    else if (path === 'left') {
        x-=velocity;
        bullet.style.left = x +'px';

        ricochets.forEach((ricochet,i)=>{
            if ( x=== ricochet.x && y === ricochet.y) {
                if(ricochet.angle === 0 || ricochet.angle%180 === 0) {
                    path = 'down';
                    bullet.style.transform = 'rotate(180deg)'
                    playAudio(reflectionAudio);
                }
                else {
                    path = 'up';
                    bullet.style.transform = 'rotate(0deg)'
                    playAudio(reflectionAudio);
                }

            }
        });

        semiRicochets.forEach((semiRicochet,i)=>{
            if ( x=== semiRicochet.x && y === semiRicochet.y) {
                if(!(removedListIds.includes(semiRicochet.listId))) {
                    if(semiRicochet.angle === 0) {
                        path = 'up';
                        bullet.style.transform = 'rotate(0deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else if (semiRicochet.angle === 90) {
                        path = 'down';
                        bullet.style.transform = 'rotate(180deg)'
                        playAudio(reflectionAudio);
        
                    }
                    else {
                        if (detectSpelluse()=== 0) {
                            const originalPieceBox = document.querySelector(`.game-box-${semiRicochet.row}-${semiRicochet.column}`);
                            originalPieceBox.innerHTML = '';
                            piecePositions[semiRicochet.row][semiRicochet.column] = '';
                            
                            removedListIds.push(semiRicochet.listId);
                            currentMoveDetails.lostId = semiRicochet.listId;
                            handleListIdRemoval();
    
                            clearInterval(request);
                            handleHistoryStore();
                            clickBlocker.style.display = 'none';
                            bullet.style.display = 'none';
                            bullet.remove();
                            shooting = 0;
                            flag*=-1;
                            gameEngine();
                        }

                    }
                }
            }
        });


    }

    if(y>=boardBorderBottom || y<=boardBorderTop || x<=boardBorderLeft|| x>= boardBorderRight) {
        clearInterval(request);
        handleHistoryStore();
        clickBlocker.style.display = 'none';
        bullet.style.display = 'none';
        bullet.remove();
        shooting = 0;
        flag*=-1;
        gameEngine();
    }
    //console.log('welcome');
    

}

function handleWinWindow(f) {
    //note that here f is which player won and not which player the ball was struck on
    playAudio(gameOverAudio);

    winnerPopUpOpen = 1;
    if(f === 1) {
        document.querySelector('.winner-image').innerHTML = everythingObject.titan1.imgTag;
    }
    else if (f === 2) {
        document.querySelector('.winner-image').innerHTML = everythingObject.titan2.imgTag;
        document.querySelector('.winner-image img').style.transform = `rotate(180deg)`
        document.querySelector('.pop-up').style.background = 'rgba(245, 87, 130,0.467)';
    }

    clickBlocker.style.backgroundColor = 'rgba(0, 0, 0,0.5)';
    clickBlocker.style.display = 'block';
    document.querySelector('.pop-up').style.display = 'block';
    document.querySelector('.close-button').addEventListener('click',()=>{
        handleResetButton();
    });

    clearInterval(timerRequest);


}

function handleResetButton() {
    localStorage.removeItem('everything');
    localStorage.removeItem('flag');
    localStorage.removeItem('piecePosition');
    localStorage.removeItem('timerList');
    localStorage.removeItem('movesHistory');
    localStorage.removeItem('removedSemiRicochetsList');
    localStorage.removeItem('spellList');
    location.reload();
}

function formatTwoDigits(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

function handleTimer() {
    let shootingInclude = document.querySelector('.switch input').checked;
    document.querySelector('.player-1-timer span').innerHTML = `00:${formatTwoDigits(Math.floor(timerList[0]/60))}:${formatTwoDigits(timerList[0]%60)}`;
    document.querySelector('.player-2-timer span').innerHTML = `00:${formatTwoDigits(Math.floor(timerList[1]/60))}:${formatTwoDigits(timerList[1]%60)}`;

    if(shootingInclude) {
        if(flag===1) {
            timerList[0]-=1;
        }
        else if (flag === -1) {
            timerList[1]-=1;
        }
    }
    else {
        if(!shooting) {
            if(flag===1) {
                timerList[0]-=1;
            }
            else if (flag === -1) {
                timerList[1] -=1;
            }
        }
    }

    if(timerList[0] ===0) {
        handleWinWindow(2);
    }
    else if (timerList[1] === 0) {
        handleWinWindow(1);
    }
    localStorage.setItem('timerList',JSON.stringify(timerList));

    //testing 
    ////console.log(everythingObject.tank1.allow);
    ////console.log(everythingObject.tank2.allow);
    //console.log(movesHistory);

}

function runTimer() {
    document.removeEventListener('click',runTimer);
    timerRequest = setInterval(handleTimer,1000);
}

function calculateXCenter(box,height, width) {
    const marginLeft = 30;
    const boxSize = 64;
    const gap = 4;
    let left = marginLeft - gap- (width/2);

    for(i=0;i<=box;i++){
        left+=(gap+boxSize);
    }
    return left-(boxSize/2);

}

function calculateYCenter(box,height,width) {
    const marginTop = 15;
    const boxSize = 64;
    const gap = 4;

    let top = marginTop - gap- (height/2);

    for(i=0;i<=box;i++){
        top+=(gap+boxSize);
    }
    return top-(boxSize/2);
}

function handlePauseButton() {
    continueBlockerOpen = 1;
    playAudio(popUpOpenAudio);
    clickBlocker.style.display = 'block';
    clickBlocker.style.backgroundColor = 'rgba(0,0,0,0.5)';
    clearInterval(request);
    clearInterval(timerRequest);
    let pauseButton = document.querySelector('.js-pause-button');
    pauseButton.removeEventListener('click',handlePauseButton)
    
    pauseButton.classList.add('js-continue-button');
    pauseButton.innerHTML = 'Continue';
    pauseButton.classList.remove('js-pause-button');
    document.querySelector('.js-continue-button').addEventListener('click',handleContinueButton);
    document.querySelector('.bullet') == null?0:document.querySelector('.bullet').remove();
}

function handleContinueButton() {
    continueBlockerOpen = 0;
    playAudio(popUpCloseAudio);
    if(winnerPopUpOpen === 0) {
        clickBlocker.style.display = 'none';
        clickBlocker.style.backgroundColor = 'rgba(0,0,0,0)';
    }
        
    runTimer();

    let continueButton = document.querySelector('.js-continue-button');

    continueButton.removeEventListener('click',handleContinueButton)
    continueButton.classList.add('js-pause-button');
    continueButton.innerHTML = 'Pause';
    continueButton.classList.remove('js-continue-button');
    document.querySelector('.js-pause-button').addEventListener('click', handlePauseButton);
    if(shooting===1) {
        if(flag===1) {
            handleBulletShoot(everythingObject.cannon1,1);
            //console.log('test4');
        }
        else if (flag === -1) {
            handleBulletShoot(everythingObject.cannon2,2);
        }
    }

}

function handleHistoryStore() {
    movesHistory[0]++;
    movesHistory[movesHistory[0]] = JSON.parse(JSON.stringify(currentMoveDetails));
    localStorage.setItem('movesHistory',JSON.stringify(movesHistory));
    //console.log(movesHistory);

    currentMoveDetails.turn= null;
    currentMoveDetails.id= null;
    currentMoveDetails.from= [null,null];
    currentMoveDetails.to= [null,null];
    currentMoveDetails.rotate= null
    currentMoveDetails.swapId = null;
    currentMoveDetails.lostId = null;
  
}

function handleHistoryDisplay() {
    playAudio(popUpOpenAudio);

    const displaySection = document.querySelector('.history-of-moves');

    displaySection.innerHTML = '';
    let html;
    let historyOfMoves = JSON.parse(localStorage.getItem('movesHistory'));
    if(historyOfMoves != null) {
        html = `<p>No of Moves: ${historyOfMoves[0]}</p>`
    }
    else {
        html =  `<p>No of Moves: 0</p>`;
    }
    let c=1;
    let list = [];

    //console.log(historyOfMoves);
    
    const toggleButton = document.querySelector('.history-button');
    toggleButton.removeEventListener('click',handleHistoryDisplay)
    clickBlocker.style.backgroundColor = 'rgba(0, 0, 0,0.5)';
    clickBlocker.style.display = 'block';
    document.querySelector('.history-pop-up').style.display = 'block';

    toggleButton.addEventListener('click',handleHistoryClose)

    if(historyOfMoves != null) {
        for(i=1;i<=historyOfMoves[0];i++) {
            switch (historyOfMoves[i].id) {
                case 8:
                case 1:
                    list.push('Titan');
                    break;
                case 9:
                case 2:
                    list.push('Tank');
                    break;
                case 10:
                case 3:
                    list.push('Cannon');
                    break;
                case 4:
                case 5:
                case 11:
                case 12:
                    list.push('Ricochet');
                    break;
                case 6:
                case 7:
                case 13:
                case 14:
                    list.push('Semi Ricochet');
                    break;
            }
            if (historyOfMoves[i].rotate === null &&  historyOfMoves[i].swapId === null) {
                html += `<p>Player ${c}: ${list.pop()} moves from ${historyOfMoves[i].from} to ${historyOfMoves[i].to}</p>`
            }

            else if (historyOfMoves[i].swapId !== null) {
                switch (historyOfMoves[i].swapId) {
                    case 8:
                    case 1:
                        list.push('Titan');
                        break;
                    case 9:
                    case 2:
                        list.push('Tank');
                        break;
                    case 10:
                    case 3:
                        list.push('Cannon');
                        break;
                    case 4:
                    case 5:
                    case 11:
                    case 12:
                        list.push('Ricochet');
                        break;
                    case 6:
                    case 7:
                    case 13:
                    case 14:
                        list.push('Semi Ricochet');
                        break;
                }
                html += `<p>Player ${c}: ${list[0]} swaps from ${historyOfMoves[i].from} to ${historyOfMoves[i].to} with ${list[1]}</p>`
            }

            else {
                html += `<p>Player ${c}: ${list.pop()} rotates to the ${historyOfMoves[i].rotate}</p>`
            }
    
            c===1?c=2:c=1;
        }
    }

    

    
    displaySection.innerHTML = html;

    document.querySelector('.history-close-button').addEventListener('click',handleHistoryClose)

    
}

function handleHistoryClose() {
    playAudio(popUpCloseAudio);
    const toggleButton = document.querySelector('.history-button');
    toggleButton.removeEventListener('click',handleHistoryClose)

    if( winnerPopUpOpen ===0 && continueBlockerOpen===0 && popUpOpen === 0) {
        clickBlocker.style.backgroundColor = 'rgba(0, 0, 0,0)';
        clickBlocker.style.display = 'none';
    }
    document.querySelector('.history-pop-up').style.display = 'none';

    toggleButton.addEventListener('click',handleHistoryDisplay)
    document.querySelector('.history-close-button').removeEventListener('click',handleHistoryClose);
}

function playAudio(audio) {
    for (var i = 0; i < audios.length; i++) {
            audios[i].pause();
    }
    audio.play();
}

function handleListIdRemoval() {
    //console.log('successful test 39');
    //console.log(removedListIds);
    for (let i = 0; i < pieces.length; i++) {
        if (removedListIds.includes(pieces[i].id)) {
            pieces.splice(i, 1);
            //console.log('removal successful test 40')
            i--; // Adjust the index to account for the removed element
        }
    }
    for (let i = 0; i < rotatablePieces.length; i++) {
        if (removedListIds.includes(rotatablePieces[i].id)) {
            rotatablePieces.splice(i, 1);
            //console.log('removal successful test 41')
            i--; // Adjust the index to account for the removed element
        }
    }

    for (let i = 0; i < swapablePieces.length; i++) {
        if (removedListIds.includes(swapablePieces[i].id)) {
            swapablePieces.splice(i, 1);
            //console.log('removal successful test 41')
            i--; // Adjust the index to account for the removed element
        }
    }
}

function handleUndoButton() {
    let currentPointer = movesHistory[0];
    if(currentPointer !== 0) {
        
        let moveToUndo = movesHistory[currentPointer];
        //console.log(moveToUndo.lostId);
        if(moveToUndo.lostId !== null) {
            let lostObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.lostId);
            const originalPieceBox = document.querySelector(`.game-box-${lostObject.row}-${lostObject.column}`);
            originalPieceBox.innerHTML = lostObject.img;
            piecePositions[lostObject.row][lostObject.column] = lostObject.img;
            removedListIds.pop();
            pieces.push(lostObject);
            rotatablePieces.push(lostObject);
            swapablePieces.push(lostObject);
        }
        if(moveToUndo.rotate === null) {
            if(moveToUndo.swapId === null) {
                //console.log('test9999')
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.id);
                //console.log(everythingObject.ricochet11);
                //console.log(fromObject);
                //console.log(typeof moveToUndo.from[0])
                fromObject.row = moveToUndo.from[0];
                fromObject.column = moveToUndo.from[1];
                //console.log(everythingObject.ricochet11);

                let temp = piecePositions[moveToUndo.to[0]][moveToUndo.to[1]];
                //console.log(temp);
                piecePositions[moveToUndo.to[0]][moveToUndo.to[1]] = "";
                //console.log(piecePositions[moveToUndo.to[0]][moveToUndo.to[1]])
                piecePositions[moveToUndo.from[0]][moveToUndo.from[1]] = temp;
                flag*=-1;
                movesHistory[0]--;
                gameEngine();
                //handleRicochetMove(everythingObject.ricochet11,1);

                // let innerDiv = document.querySelector(`.game-box-${}-${}`);
                // let clone = innerDiv.cloneNode(true);
                // innerDiv.parentNode.insertBefore(clone, innerDiv);
                // innerDiv.remove();
                
            }
            else {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.id);
                let swapObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.swapId);

                fromObject.row = moveToUndo.from[0];
                fromObject.column = moveToUndo.from[1];

                swapObject.row = moveToUndo.to[0];
                swapObject.column = moveToUndo.to[1];

                let temp = piecePositions[moveToUndo.to[0]][moveToUndo.to[1]];
                //console.log(temp);
                piecePositions[moveToUndo.to[0]][moveToUndo.to[1]] = piecePositions[moveToUndo.from[0]][moveToUndo.from[1]] ;
                //console.log(piecePositions[moveToUndo.to[0]][moveToUndo.to[1]])
                piecePositions[moveToUndo.from[0]][moveToUndo.from[1]] = temp;
                flag*=-1;
                movesHistory[0]--;
                gameEngine();
            }
        }
        else {
            if(moveToUndo.rotate === 'left') {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.id);
                fromObject.angle += 90;
                flag*=-1;
                movesHistory[0]--;
                gameEngine();
                
                

            }
            else {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToUndo.id);
                fromObject.angle -= 90;
                movesHistory[0]--;
                flag*=-1;
                gameEngine();
            }
        }
    }
    
}

function handleRedoButton() {
    let currentPointer = movesHistory[0];
    
    if(currentPointer != movesHistory.length -1) {
        currentPointer++;
        let moveToRedo = movesHistory[currentPointer];
        //console.log(moveToRedo.lostId);
        if(moveToRedo.lostId !== null) {
            let lostObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.lostId);
            const originalPieceBox = document.querySelector(`.game-box-${lostObject.row}-${lostObject.column}`);
            originalPieceBox.innerHTML = '';
            piecePositions[lostObject.row][lostObject.column] = "";
            removedListIds.push(lostObject.id);
            handleListIdRemoval();
        }
        if(moveToRedo.rotate === null) {
            if(moveToRedo.swapId === null) {
                //console.log('test9999')

                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.id);

                //console.log(everythingObject.ricochet11);
                //console.log(fromObject);
                //console.log(typeof moveToRedo.from[0])

                fromObject.row = moveToRedo.to[0];
                fromObject.column = moveToRedo.to[1];
                //console.log(everythingObject.ricochet11);

                let temp = piecePositions[moveToRedo.from[0]][moveToRedo.from[1]];
                //console.log(temp);
                piecePositions[moveToRedo.from[0]][moveToRedo.from[1]] = "";
                //console.log(piecePositions[moveToRedo.to[0]][moveToRedo.to[1]])
                piecePositions[moveToRedo.to[0]][moveToRedo.to[1]] = temp;
                flag*=-1;
                movesHistory[0]++;
                gameEngine();
                //handleRicochetMove(everythingObject.ricochet11,1);

                // let innerDiv = document.querySelector(`.game-box-${}-${}`);
                // let clone = innerDiv.cloneNode(true);
                // innerDiv.parentNode.insertBefore(clone, innerDiv);
                // innerDiv.remove();
                
            }
            else {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.id);
                let swapObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.swapId);

                fromObject.row = moveToRedo.to[0];
                fromObject.column = moveToRedo.to[1];

                swapObject.row = moveToRedo.from[0];
                swapObject.column = moveToRedo.from[1];

                let temp = piecePositions[moveToRedo.to[0]][moveToRedo.to[1]];
                //console.log(temp);
                piecePositions[moveToRedo.to[0]][moveToRedo.to[1]] = piecePositions[moveToRedo.from[0]][moveToRedo.from[1]] ;
                //console.log(piecePositions[moveToRedo.to[0]][moveToRedo.to[1]])
                piecePositions[moveToRedo.from[0]][moveToRedo.from[1]] = temp;
                flag*=-1;
                movesHistory[0]++;
                gameEngine();
            }
        }
        else {
            if(moveToRedo.rotate === 'left') {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.id);
                fromObject.angle -= 90;
                flag*=-1;
                movesHistory[0]--;
                gameEngine();
                
                

            }
            else {
                let fromObject = Object.values(everythingObject).find(obj => obj.id === moveToRedo.id);
                fromObject.angle += 90;
                movesHistory[0]--;
                flag*=-1;
                gameEngine();
            }
        }
    }
}

function handleListModification() { //used when the undo button is placed and some other move is performed it deletes all the other unwanted moves afterwards
    if (movesHistory[0] === movesHistory.length - 1) {
        0;
    }
    else {
        movesHistory = movesHistory.slice(0, movesHistory[0]+1);
    }
    
}

function detectSpelluse() {
    if(flag ===1) {
        if (spellList[0]>0 && document.querySelector('.player-1-spell-use').checked) {
            spellList[0]--;
            document.querySelector('.player-1-spell-left').innerHTML = `Spell Left: ${spellList[0]}`;
            return flag;
        }
    }
    else if (flag === -1) {
        if (spellList[1]>0 && document.querySelector('.player-2-spell-use').checked) {
            spellList[1]--;
            document.querySelector('.player-2-spell-left').innerHTML = `Spell Left: ${spellList[1]}`;
            return flag;
        }
    }
    return 0;
}

function handleRandomizeStartingPosition() {
    let list1 = generateUniquePairs();
    let list2 = generateComplementaryPairs(list1);
    combinedList = [...list1, ...list2];

    //console.log(combinedList);
    Object.values(everythingObject).forEach((piece,i)=>{
        piece.row = combinedList[i][0];
        piece.column = combinedList[i][1];
    })

    Object.values(everythingObject).forEach((piece,i)=>{
        piecePositions[piece.row][piece.column] = piece.img;
    })
    

}

function generateUniquePairs() {
    const pairs = new Set();
    let zeroCount = 0;

    while (pairs.size < 7) {
        const firstNumber = (zeroCount < 2) ? 0 : Math.floor(Math.random() * 2);
        const secondNumber = Math.floor(Math.random() * 8);

        // Ensure the first number is 0 for the first two pairs
        if (firstNumber === 0) {
            zeroCount++;
        }

        const pair = `${firstNumber},${secondNumber}`;
        pairs.add(pair);

        // If we already have enough pairs, but we don't have 2 pairs with the first number as 0, we need to adjust
        if (pairs.size === 7 && zeroCount < 2) {
            pairs.delete(pair);
            zeroCount--;
        }
    }

    // Convert set of strings back to array of pairs
    return Array.from(pairs).map(pair => pair.split(',').map(Number));
}

function generateComplementaryPairs(listOfPairs) {
    list=[];
    listOfPairs.forEach(([row,column],i)=>{
        list.push([7-row,7-column]);
    })
    return list;
}

function callHandleReplay() {
    document.querySelector('.pop-up').style.display = 'none';
    moveHistoryDeppCopy = JSON.parse(JSON.stringify(movesHistory));
    moveHistoryDeppCopy[0]=1;
    piecePositions = [
        
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""]
   
    ]
    //console.log(combinedList);
    Object.values(everythingObject).forEach((piece,i)=>{
        piece.row = combinedList[i][0];
        piece.column = combinedList[i][1];
    })

    Object.values(everythingObject).forEach((piece,i)=>{
        piecePositions[piece.row][piece.column] = piece.img;
    })
    handleReplay();
}

function handleReplay() {
    
    miniGameEngine();
    setTimeout(()=>{
        //console.log(moveHistoryDeppCopy[0]);
        document.querySelector(`[data-id="${moveHistoryDeppCopy[moveHistoryDeppCopy[0]].id}"]`).firstElementChild.click();
        setTimeout(()=>{
            if(moveHistoryDeppCopy[moveHistoryDeppCopy[0]].rotate === null) {
                if(moveHistoryDeppCopy[moveHistoryDeppCopy[0]].swapId === null) {
                    const gameBox = document.querySelector(`.game-box-${moveHistoryDeppCopy[moveHistoryDeppCopy[0]].to[0]}-${moveHistoryDeppCopy[moveHistoryDeppCopy[0]].to[1]}`).click();
                }
                else {
                    document.querySelector(`[data-id="${moveHistoryDeppCopy[moveHistoryDeppCopy[0]].swapId}"]`).firstElementChild.click();
                }
            }
            else {
                let click = moveHistoryDeppCopy[moveHistoryDeppCopy[0]].rotate;
                if (click === 'right') {
                    document.querySelector('.right-rotate').click();
                }
                else {
                    document.querySelector('.left-rotate').click();
                }
            }
            setTimeout(()=>{
                let replayRequest = setInterval(()=>{
                    if(shooting === 0) {
                        clearInterval(replayRequest);
                        //console.log('increment over here');
                        moveHistoryDeppCopy[0]++;
                        handleReplay();
                    }
                },1000);
            },500)
            
        },1000)
    },1000)
    

}

function miniGameEngine() {

    document.querySelector('.hidden-buttons').classList.remove('hidden-buttons-visible');

    
    handleGridRender();
    handleAngleCheck();
    handlePiecesRender();
    

    tanks.forEach((tank)=>{
        if (tank.angle === 0) {
            tank.allow = 'left';
        }
        else if (tank.angle === 90) {
            tank.allow = 'up';
        }
        else if (tank.angle === -90) {
            tank.allow = 'down';
        }
        else {
            tank.allow = 'right';
        }
    });

    if(flag === 1) {
        document.querySelectorAll('.player1').forEach((piece,i)=>{
            piece.addEventListener('click', handleMove1);
        });
    }
    else if(flag === -1) {
        document.querySelectorAll('.player2').forEach((piece,i)=>{
            piece.addEventListener('click', handleMove2);
        });
    }

    handlePlayerTurn(flag);

    localStorage.setItem('everything',JSON.stringify(everythingObject));
    localStorage.setItem('piecePosition',JSON.stringify(piecePositions));
    localStorage.setItem('flag',flag);
    localStorage.setItem('removedSemiRicochetsList',JSON.stringify(removedListIds));
    localStorage.setItem('spellList',JSON.stringify(spellList));
}

function handleReplayNextMove() {
    
}

/* general variables to be declared over here */
const absorbingAudio = new Audio('../Audio/post-edit/absorbing-sound.wav');
const gameOverAudio = new Audio('../Audio/post-edit/game-over-sound.wav');
const popUpCloseAudio = new Audio('../Audio/post-edit/pop-up-close-sound.wav');
const popUpOpenAudio = new Audio('../Audio/post-edit/pop-up-open-sound.wav');
const reflectionAudio = new Audio('../Audio/post-edit/reflection-sound.wav');
const shootingAudio = new Audio('../Audio/post-edit/shooting-sound.wav');

const audios = [gameOverAudio, popUpCloseAudio, popUpOpenAudio, reflectionAudio,shootingAudio,absorbingAudio];

const gameBoard = document.querySelector('.game-board');
const playerDisplay = document.querySelector('.player');
const clickBlocker = document.querySelector('.click-blocker');

let flagTemp = localStorage.getItem('flag');
let flag;
if(flagTemp == null ) {
    flag = 1;
}
else {
    flag = parseInt(flagTemp);
}
////console.log(flagTemp);
let refreshRate = 5;
let request;
let velocity = 4;
let path;
let x,y;
let shooting = 0;
let firstShootStop = 0;
let bulletHeight = 15;
let bulletWidth = 15;
let combinedList;
let moveHistoryDeppCopy;

let timerList;
var timerListTemp = localStorage.getItem('timerList');

if (timerListTemp == null ) {
    timerList = [600,600];
}
else {
    timerList = JSON.parse(timerListTemp);
}

let timerRequest;


const boardBorderLeft = calculateXCenter(0,15,15) - 30;
const boardBorderRight = calculateXCenter(7,15,15) + 30;
const boardBorderTop = calculateYCenter(0,15,15) - 15;
const boardBorderBottom = calculateYCenter(7,15,15) + 15;
//console.log(boardBorderBottom,boardBorderLeft,boardBorderRight,boardBorderTop)

let currentMoveDetails = {
    turn: null,
    id: null,
    from: [null,null],
    to: [null,null],
    rotate: null,
    swapId: null,
    lostId: null
}

let movesHistory;
var movesHistoryTemp = localStorage.getItem('movesHistory');
//console.log(movesHistoryTemp);

let spell1Checked=0;
let spell2Checked=0;

if (movesHistoryTemp == null ) {
    movesHistory = [0];
}
else {
    movesHistory = JSON.parse(movesHistoryTemp);
}

let removedListIds;
var removedListIdsTemp = localStorage.getItem('removedSemiRicochetsList');
//console.log(removedListIdsTemp);

if (removedListIdsTemp == null ) {
    removedListIds = [];
}
else {
    removedListIds = JSON.parse(removedListIdsTemp);
    //console.log('test999');
}

let continueBlockerOpen = 0;
let popUpOpen = 0;
let historyPopUpOpen = 0;
let winnerPopUpOpen = 0;




//

/* general variables to be declared over here */

//--------------------------------


/* general functions to be called over here */
document.querySelector('.player-1-timer span').innerHTML = `00:${formatTwoDigits(Math.floor(timerList[0]/60))}:${formatTwoDigits(timerList[0]%60)}`;
document.querySelector('.player-2-timer span').innerHTML = `00:${formatTwoDigits(Math.floor(timerList[1]/60))}:${formatTwoDigits(timerList[1]%60)}`;
runTimer();

document.querySelector('.js-pause-button').addEventListener('click',handlePauseButton);

document.querySelector('.reset-button').addEventListener('click',handleResetButton)

document.querySelector('.history-button').addEventListener('click',handleHistoryDisplay);

document.querySelector('.undo-button').addEventListener('click',handleUndoButton);

document.querySelector('.redo-button').addEventListener('click',handleRedoButton);

handleListIdRemoval();

if (piecePositionsTemp == null ) {
    handleRandomizeStartingPosition();
}

gameEngine();

document.querySelector('.replay-button').addEventListener('click',callHandleReplay)



// let test = setInterval(()=>{
//     //console.log(flag);
// },500)

/* general functions to be called over here */