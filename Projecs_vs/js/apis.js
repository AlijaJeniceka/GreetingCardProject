
async function getNames() {
    try {
      const response = await fetch('https://nameday.abalin.net/api/V1/today');
      const data = await response.json();

      const nameday = data.nameday;
      const namesList = Object.entries(nameday).map(([country, names]) => ({ country, names }));

      return namesList;
    } catch (error) {
      console.error(error);
    }
  }

  async function getNamesOnSpecificDate(day, month) {
    try {

      const response = await fetch('https://nameday.abalin.net/api/V1/getdate?day=${day}&month=${month}');
      const data = await response.json();

      const nameday = data.nameday;
      const namesList = Object.entries(nameday).map(([country, names]) => ({ country, names }));

      return namesList;
    } catch (error) {
      console.error(error);
    }
  }

  function generateCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
  
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
  
    const calendarRows = Math.ceil((lastDayDate + firstDayIndex) / 7);
  
    let date = 1;
  
    for (let i = 0; i < calendarRows; i++) {
      const row = document.createElement('tr');
  
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
  
        if (i === 0 && j < firstDayIndex) {
          // Empty cell before the first day of the month
          cell.textContent = '';
        } else if (date > lastDayDate) {
          // Empty cell after the last day of the month
          cell.textContent = '';
        } else {
          // Day cell with a clickable date
          cell.textContent = date;
  
          if (date === today.getDate() && month === today.getMonth()) {
            cell.classList.add('selected-date');
          }
  
          cell.addEventListener('click', () => {
            // Handle the click event for the date
            const selectedDate = new Date(year, month, date);
            handleDateClick(selectedDate);
          });
  
          date++;
        }
  
        row.appendChild(cell);
      }
  
      calendarBody.appendChild(row);
    }
  }
  
  function setMonthText() {
    const monthText = document.getElementById('month');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  
    monthText.textContent = `${months[month]} ${year}`;
  }
  
  async function handleDateClick(date) {
    const namedaysContainer = document.getElementById('namedaysContainer');
  const namedaysList = document.getElementById('namedaysList');

  // Clear previous namedays list
  namedaysList.innerHTML = '';

  // Add green background to the selected date
  const selectedDateCell = document.querySelector('.selected-date');
  if (selectedDateCell) {
    selectedDateCell.classList.remove('selected-date');
  }

  const calendarTable = document.getElementById('calendarTable');
  const selectedDateCellNew = calendarTable.rows[date.getDate() + 1].cells[date.getDay()];

  selectedDateCellNew.classList.add('selected-date');

  // Retrieve the namedays for the selected date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const namedays = await getNamesOnSpecificDate(day, month);

  // Populate the namedays list
  namedays.forEach(({ country, names }) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${country}: ${names}`;
    namedaysList.appendChild(listItem);
  });

  namedaysContainer.style.display = 'block';
}
  
  async function generateContent() {
    setMonthText();
    generateCalendar();
    const date = new Date();
    handleDateClick(date);
  }
  
  async function getNameToday() {
    const namedays = await getNames();
    const namedaysList = document.getElementById('namedaysList');
  
    namedaysList.innerHTML = ''; // Clear existing list
  
    namedays.forEach(({ country, names }) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${country}: ${names}`;
      namedaysList.appendChild(listItem);
    });
  }
  
  window.onload = function () {
    setMonthText();
    generateCalendar();
    getNameToday();
  };

  async function searchByName() {
  const nameInput = document.getElementById('nameInput');
  const resultContainer = document.getElementById('resultContainer');
  const resultList = document.getElementById('resultList');
  
  const name = nameInput.value.trim();
  
  if (name === '') {
    alert('Please enter a name.');
    return;
  }
  
  const url = new URL("https://nameday.abalin.net/api/V1/getname");
  const params = {
    "name": name,
    "country": "lv"
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        const namedays = data[0]; // Access the array of nameday objects
        if (namedays.length > 0) {
          resultList.innerHTML = ''; // Clear previous results
          namedays.forEach(nameday => {
            const { day, month, name } = nameday;
            const date = `${day}/${month}`;
            const result = `${name}'s nameday in Latvia: ${date}`;
            const listItem = document.createElement('li');
            listItem.textContent = result;
            resultList.appendChild(listItem);
          });
        } else {
          resultList.textContent = `No nameday information found for ${name} in Latvia`;
        }
      
        resultContainer.style.display = 'block';
      } else {
        alert('An error occurred. Please try again.');
      }
  }
  catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
}
