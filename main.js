/* Presets */
const colors = [
    'red',
    'blue',
    'white',
    'green',
    'yellow',
    'grey',
    'purple',
];
const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* Main functions */
function validate(logic) {

    logic.isVin();
    console.info('validate');
 
    //
}
function action(eventObj,logicGame) {
    console.info('action');
    logicGame.handler(eventObj)
    //
}

function save() {
    console.info('save');
    //
}

function reset(arena, size = 3,logicGame) {
    
    arena.innerHTML = '';
    arena.setAttribute('data-size', size);

    const squares = generateSquares(size);

    for (const square of squares) {
        arena.appendChild(square);
    }
   
    logicGame.reset();
}

/* Entry */
(function main() {
  
    const arena = document.querySelector('#arena');
    const size = 5;
    const blockClass = 'square';
    const pickBoxElClass  = 'origin'; 
    const colorAtribute = 'data-color';
    const logic = new GameLogic(size,blockClass,pickBoxElClass,colorAtribute)
    
    reset(arena, size,logic);

    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', () => reset(arena, size,logic));

    const saveButton = document.querySelector('#save');
    saveButton.addEventListener('click', () => save());

    arena.addEventListener('click', (event) => {
        if (event.target.classList.contains('square') === false) {
            return;
        }

        action(event,logic);
        validate(logic);
    })
})();

/* Private */
function square(color) {
    const result = document.createElement('div');
    result.classList.add('square');
    result.setAttribute('data-color', color);

    return result;
}

function generateSquares(size = 3) {
    const result = [];

    for (let l = 0; l < size * size; ++l) {
        const _color = colors.find(c => Math.random() > (1 - 1 / colors.length)) || colors[l % colors.length];
        const _square = square(_color);
        result.push(_square);

        if (l === 0) {
            _square.classList.add('origin');
        }
    }

    return result;
}
