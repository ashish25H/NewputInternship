const day = document.getElementById('week-days');
const date = document.getElementById('month-dates');
const monthText = document.getElementById('month');
const yearText = document.getElementById('year');
const monthDropdown = document.getElementById('month-dropdown');
const yearDropdown = document.getElementById('year-dropdown');
const showCurrentDate = document.getElementById('show-current-date');
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EMPTY = '';

let startDate = EMPTY;
let endDate = EMPTY;
let incrementDecrementFlag = 0; //when you click on right arrow button it will increase and it will decrease when you click on left arrow button.
let selectedMonth = new Date().getMonth();
let selectedYear = new Date().getFullYear();

// function getMonthDifference(startDate, endDate) {
//     let startYear = startDate.getFullYear();
//     let startMonth = startDate.getMonth();
//     let endYear = endDate.getFullYear();
//     let endMonth = endDate.getMonth();

//     let monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);

//     return monthDifference;
// }

function addWeekDays() {
    let str = '';
    for (let item of weekDays) {
        str += `<div class='grid-item'>${item}</div>`
    }
    day.innerHTML = str;
}
addWeekDays();

function setMonthsInDropdown() {
    let str = '';
    monthArray.forEach((month) => {
        str += `<option value=${month}>${month}</option>`;
    });
    monthDropdown.innerHTML = str;
}
setMonthsInDropdown();

let setYearsInDropdown = () => {
    let str = '';
    for (let i = 2010; i <= 2040; i++) {
        str += `<option value=${i}>${i}</option>`;
    }
    yearDropdown.innerHTML = str;
}
setYearsInDropdown();

function addSunday(dateText) {
    let div = document.createElement('div');
    div.innerText = dateText;
    div.classList.add('sunday', 'month-date');
    //add id
    div.id = `${dateText}`;
    date.appendChild(div);
}

function addInactiveDate(dateText) {
    let div = document.createElement('div');
    div.innerText = dateText;
    div.classList.add('inactive-date');
    // div.id = `${dateText}`;
    date.appendChild(div);
}

function addDate(dateText, month, year) {
    let div = document.createElement('div');
    div.innerText = dateText;
    div.id = `${dateText}`;

    if (dateText === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        div.classList.add('current-date', 'month-date');
    } else {
        div.classList.add('date-item', 'month-date');
    }

    date.appendChild(div);
}

function addDateRangeClass(startDate, endDate) {
    // console.log(`Start Date ${startDate} / End Date : ${endDate} in addDateRangeClass function`);
    let min = +startDate < +endDate ? +startDate : +endDate;
    let max = +startDate > +endDate ? +startDate : +endDate;
    for (let i = min; i <= max; i++) {
        const item = document.getElementById(`${i}`);
        item.classList.remove('date-item');
        item.classList.remove('current-date');
        item.classList.add('date-range');
    }
}

function addDateRangeFeature() {

    let monthDate = document.querySelectorAll('.month-date');
    monthDate.forEach((dateItem) => {
        dateItem.addEventListener('click', function () {
            if (startDate === EMPTY && endDate === EMPTY) {
                startDate = this.id;
            } else if (endDate === EMPTY) {
                endDate = this.id;
            }
            
            if (startDate !== EMPTY && endDate !== EMPTY) {
                addDateRangeClass(startDate, endDate);
            }
            // console.log(`Start Date : ${startDate} / End date : ${endDate}`);
        });
    });
}

function createCalender(selectedMonth = null, selectedYear = null) {
    date.innerHTML = '';
    startDate = EMPTY;
    endDate = EMPTY;
    let dt = new Date();

    if (selectedMonth !== null && selectedYear !== null) {
        // startDate = EMPTY;
        // endDate = EMPTY;
        if (isNaN(selectedMonth)) {
            dt = new Date(`${selectedMonth} 01, ${selectedYear}`);
        } else {
            dt = new Date(`${monthArray[selectedMonth]} 01, ${selectedYear}`);
        }
    }

    monthDropdown.selectedIndex = dt.getMonth();
    yearDropdown.value = dt.getFullYear();

    if (incrementDecrementFlag !== 0) {
        dt.setMonth(new Date().getMonth() + incrementDecrementFlag);
    }

    const month = dt.getMonth();
    const year = dt.getFullYear();
    yearText.innerText = year;
    monthText.innerText = monthArray[month];

    //calculates the number of days in a month based on the provided year and month values
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

    const dateObj = new Date(year, month, 1);
    const firstDayOfMonth = dateObj.getDay();

    let x = 1;
    let sunday = 1;
    for (let i = 1; i <= 42; i++) {
        if (i <= firstDayOfMonth) {
            let lastDayOfPreviousMonth = new Date(year, month, 0).getDate('', month, year);
            addInactiveDate((lastDayOfPreviousMonth - firstDayOfMonth) + i);
        } else if (i > numberOfDaysInMonth + firstDayOfMonth) {
            addInactiveDate(x);
            x++;
        } else if (i - sunday === 7 || i === 1) {
            addSunday(i - firstDayOfMonth);
            sunday = i;
        } else {
            addDate(i - firstDayOfMonth, month, year);
        }
    }

    // monthDate = document.querySelectorAll('.month-date');
    addDateRangeFeature();

}

function initButtons() {
    document.getElementById('next-button').addEventListener('click', () => {
        incrementDecrementFlag++;
        createCalender();
    });

    document.getElementById('back-button').addEventListener('click', () => {
        incrementDecrementFlag--;
        createCalender();
    });
}

function selectingMonthFunction(selectedMonth) {
    // incrementDecrementFlag = 0;
    // startDate = EMPTY;
    // endDate = EMPTY;
    createCalender(selectedMonth, selectedYear);
}

function selectingYearFunction(selectedYear) {
    // incrementDecrementFlag = 0;
    // startDate = EMPTY;
    // endDate = EMPTY;
    createCalender(selectedMonth, selectedYear);
}

initButtons();
createCalender();

//show current date
showCurrentDate.addEventListener('click', function () {
    incrementDecrementFlag = 0;
    selectedMonth = new Date().getMonth();
    selectedYear = new Date().getFullYear();
    createCalender();
});

//selecting month and year from dropdown list
monthDropdown.addEventListener('change', function () {
    selectedMonth = monthDropdown.value;
    selectingMonthFunction(selectedMonth);
});

yearDropdown.addEventListener('change', function () {
    selectedYear = yearDropdown.value;
    selectingYearFunction(selectedYear);
});




