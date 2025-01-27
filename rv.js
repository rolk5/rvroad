// Элемент формы
//const rangeInput = document.querySelector('#textR');
const rangeInput = document.querySelector('#range_Input');
const valueInput = document.querySelector('#value_Input');
const valueR = document.querySelector('#textR');
console.log(rangeInput.value)

rangeInput.addEventListener('input', function() {
    valueInput.value = rangeInput.value
}
)
valueInput.addEventListener('input', function() {
    rangeInput.value = valueInput.value
}
)