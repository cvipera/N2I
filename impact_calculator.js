const inputs= document.querySelectorAll('input[type="text"]')
let result = document.getElementById("result");



document.addEventListener('keydown', (event) => {
      // Check if the Delete key is pressed
    if(event.key==="Backspace" || event.key==="Delete") {
        event.preventDefault();  // Prevent the default action (deleting text)
        event.stopPropagation();
    }
});

inputs.forEach(text => {text.addEventListener('click', (event) => {
    text.innerText= text.innerText.replace(/\D/g, '_');
});});

const button = document.getElementById('submit');

button.addEventListener('click', () => {
    const answers =["You short", "N'as-tu pas honte ?", "Tu pourrais faire plus", "C'est écoeurant"];
    result.innerText=answers[1]+answers[2]+answers[3];
    inputs.forEach(value => {value.value=""});
})