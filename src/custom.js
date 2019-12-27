const dropDown = document.querySelector('.navbar-toggler')

dropDown.addEventListener('click',() =>{
  const dropMenu = document.getElementById('navbarSupportedContent');
  dropMenu.style.display = dropMenu.style.display === 'block' ? 'none' : 'block'
})