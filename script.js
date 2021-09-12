const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');
const sidenav = document.getElementById('sidenav');
const main = document.getElementById('main');

open.addEventListener('click', () => {
  sidenav.style.width = '250px';
  main.style.marginLeft = '200px';
  container.style.opacity = 0.7;
  open.style.display = 'none';
  close.style.display = 'flex';
});

close.addEventListener('click', () => {
  sidenav.style.width = '0';
  main.style.marginLeft = '0';
  container.style.opacity = '1';
  open.style.display = 'flex';
  close.style.display = 'none';
});
