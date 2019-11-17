const allElems = document.querySelector('body');
const darkBtn = document.querySelector('.dark-mode');

darkBtn.addEventListener('click',async()=>{
    if(darkBtn.innerHTML==='Dark Mode'){
        
        darkBtn.innerHTML = 'Light Mode';
        allElems.classList.add('test');
    }
    else
    {
        darkBtn.innerHTML = 'Dark Mode';
        allElems.classList.remove('test');
    }
})