const countriesList = document.getElementById('countriesList');
const checkBtn = document.getElementById('check');

// Array of largest countries
const list = [
    {
        country: 'Russia',
        flag: './flgs/russia.jpg'
    },
    {
        country: 'Canada',
        flag: './flgs/canada.jpg'
    },
    {
        country: 'USA',
        flag: './flgs/usa.jpg'
    },
    {
        country: 'China',
        flag: './flgs/china.jpg'
    },
    {
        country: 'Brazil',
        flag: './flgs/brazil.jpg'
    },
    {
        country: 'Australia',
        flag: './flgs/australia.jpg'
    },
    {
        country: 'India',
        flag: './flgs/india.jpg'
    },
    {
        country: 'Argentina',
        flag: './flgs/argentina.jpg'
    },
    {
        country: 'Kazakhstan',
        flag: './flgs/kazakhstan.jpg'
    },
    {
        country: 'Algeria',
        flag: './flgs/algeria.jpg'
    }
];

let listItems = [];

let dragStartIndex;

// Function to create list of largest countries

function createList() {
    [...list]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((country, index) => {
        const listItem = document.createElement('li')

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `

          <i class="fas fa-bars fa-2x"></i>
          <div class="draggable" draggable="true">
            <h2> ${country.country}</h2>
            <img src="${country.flag}">
          </div>
            `;
          listItems.push(listItem)
          countriesList.appendChild(listItem)
        })
  
        addEventListener()
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  this.classList.add('dragging');
}

function dragEnter() {
    this.classList.add('dragging');
  }
  
  function dragLeave() {
    this.classList.remove('dragging');
  }
  
  function dragOver(e) {
    e.preventDefault();
    this.classList.add('dragging');
  }
  
  function dragDrop() {
    const dragEndIndex = +this.closest('li').getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex); 
  
    this.classList.remove('dragging');
  }

  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }

function addEventListener() {
    const drag = document.querySelectorAll('.draggable')
    const draggables = document.querySelectorAll('.countriesList li');

    drag.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
      });
         
    draggables.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
      });
  }

// Functon to check if the countries are in correct order

function checkOrder() {
    listItems.forEach((listItem, index) => {
      const countryName = listItem.querySelector('.draggable').innerText.trim();
  
      if(countryName !== list[index].country) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }

createList()

// Event listener on check button

checkBtn.addEventListener('click', checkOrder);



