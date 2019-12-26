const dropDown = document.getElementById('navbarDropdown')

dropDown.addEventListener('click',() =>{
  const dropMenu = document.querySelector('.dropdown-menu');
  dropMenu.style.display = dropMenu.style.display === 'block' ? 'none' : 'block'
})