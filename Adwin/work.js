
let openPopupButton = document.querySelector(".createNew");
let closePopupButton = document.querySelector(".close-modal");
let popup = document.querySelector(".popup");
let popupoverlay = document.querySelector(".popup-overlay");
let loadNotice = document.querySelector('.download-notice');
let noticeList = document.querySelector(".notice-list");
let noticeTitle = document.querySelector(".notice-title");
let noticeData = document.querySelector(".notice-data");
let noticeText = document.querySelector(".notice-text");
let noteList = document.querySelector('.note-list');
let errorMessage = document.getElementById("errorMessage");
let errorMessageData = document.getElementById("errorMessageData");
let errorMessageDescr = document.getElementById("errorMessageDescr");
let prevButton = document.querySelector(".prev-page");
let nextButton = document.querySelector(".next-page");
let pages = document.querySelectorAll(".page");
let currentPage = 0; // текущая страница
let newestBtn = document.querySelector('.newest-button');
let oldestBtn = document.querySelector('.oldest-button');
let items = Array.from(noteList.querySelectorAll(".note"));

let noteBook = [];
//Открытие попапа
openPopupButton.addEventListener('click', function() {
    popup.style.display = 'block';
    popupoverlay.style.display = 'block';
    noticeTitle.value = "";
    noticeText.value = "";
    noticeData.value = "";
});
// Закрытие попапа
closePopupButton.addEventListener('click', function() {
    popup.style.display = 'none';
    popupoverlay.style.display = 'none';
});

// Создание новой записи
loadNotice.addEventListener ('click', function() {
    let newNote = {
        noteTitle: noticeTitle.value,
        noteData: noticeData.value,
        noteText: noticeText.value
    }
    noteBook.push(newNote);

    let newNoteElement = document.createElement('li');
    newNoteElement.classList.add('note');

    let noteTitleElement = document.createElement('div');
    noteTitleElement.classList.add('note-title');
    noteTitleElement.textContent = newNote.noteTitle;

    let descriptionElement = document.createElement('div');
    descriptionElement.classList.add('description');
    descriptionElement.innerHTML = newNote.noteText;

    let dataViewElement = document.createElement('div');
    dataViewElement.classList.add('data-view');

    let dateElement = document.createElement('div');
    dateElement.classList.add('data');
    dateElement.innerHTML = `<img class="sort-img" src="photo/Calendar 1.png" alt="Дата">${newNote.noteData}`;

    let timeElement = document.createElement('div');
    timeElement.classList.add('data', 'time');
    timeElement.innerHTML = `<img class="sort-img" src="photo/Clock.png" alt="время">10:00`;

    dataViewElement.appendChild(dateElement);
    dataViewElement.appendChild(timeElement);

    newNoteElement.appendChild(noteTitleElement);
    newNoteElement.appendChild(descriptionElement);
    newNoteElement.appendChild(dataViewElement);

    if (noticeTitle.value === "") {
        errorMessage.style.display = "block";
        noticeTitle.style.border = "1px solid red";
        return false; // не отправлять данные
      } else {
        errorMessage.style.display = "none";
        noticeTitle.style.border = "none";
    }
    if (noticeText.value === "") {
        errorMessageDescr.style.display = "block";
        noticeText.style.border = "1px solid red";
        return false; // не отправлять данные
      } else {
        errorMessageDescr.style.display = "none";
        noticeText.style.border = "none";
    }
    if (noticeData.value === "") {
        errorMessageData.style.display = "block";
        noticeData.style.border = "1px solid red";
        return false; // не отправлять данные
      } else {
        errorMessageData.style.display = "none";
        noticeData.style.border = "none";
    }

    noteList.appendChild(newNoteElement);

    localStorage.setItem('noticeBook', JSON.stringify(noteBook))
    popup.style.display = 'none';
    popupoverlay.style.display = 'none';
});

//Кнопка предыдущей пагинации
prevButton.addEventListener('click', function() {
    pages[currentPage].classList.remove("current-page");
    pages[currentPage-1].classList.add("current-page");
    currentPage--;
    if(currentPage === 0){
        prevButton.disabled = true;
    }
});
// Кнопка следующей пагинации
nextButton.addEventListener('click', function() {
    pages[currentPage].classList.remove("current-page");
    pages[currentPage+1].classList.add("current-page");
    currentPage++;
    if(currentPage === 4){
        nextButton.disabled = true;
    }
});
// Страницы пагинации
pages[0].addEventListener('click', function() {
    currentPage = 0;
    pages[1].classList.remove("current-page");
    pages[2].classList.remove("current-page");
    pages[3].classList.remove("current-page");
    pages[4].classList.remove("current-page");
    pages[0].classList.add("current-page");
});
pages[1].addEventListener('click', function() {
    currentPage = 1;
    pages[0].classList.remove("current-page");
    pages[2].classList.remove("current-page");
    pages[3].classList.remove("current-page");
    pages[4].classList.remove("current-page");
    pages[1].classList.add("current-page");
});
pages[2].addEventListener('click', function() {
    currentPage = 2;
    pages[1].classList.remove("current-page");
    pages[0].classList.remove("current-page");
    pages[3].classList.remove("current-page");
    pages[4].classList.remove("current-page");
    pages[2].classList.add("current-page");
});
pages[3].addEventListener('click', function() {
    currentPage = 3;
    pages[1].classList.remove("current-page");
    pages[2].classList.remove("current-page");
    pages[0].classList.remove("current-page");
    pages[4].classList.remove("current-page");
    pages[3].classList.add("current-page");
});
pages[4].addEventListener('click', function() {
    currentPage = 4;
    pages[1].classList.remove("current-page");
    pages[2].classList.remove("current-page");
    pages[3].classList.remove("current-page");
    pages[0].classList.remove("current-page");
    pages[4].classList.add("current-page");
});
// Кнопки сортировки 
newestBtn.addEventListener('click', function() {
    oldestBtn.classList.remove("current-sort");
    newestBtn.classList.add("current-sort");
});
oldestBtn.addEventListener('click', function() {
    newestBtn.classList.remove("current-sort");
    oldestBtn.classList.add("current-sort");
    console.log(items)
    items.sort(function(a, b) {
        var dateA = new Date(a.getAttribute("data-date"));
        var dateB = new Date(b.getAttribute("data-date"));
        return dateA - dateB;
      });
});

// Кнопка показать больше
let showMoreBtn = document.querySelector('.show-more-button');
showMoreBtn.addEventListener('click', function() {
    let hiddenItems = noteList.querySelectorAll(".hidden");
    if (hiddenItems.length > 0) {
      // Показываем все скрытые элементы
      for (var i = 0; i < hiddenItems.length; i++) {
        hiddenItems[i].classList.remove("hidden");
      }
      // Скрываем кнопку "Показать больше"
      showMoreBtn.style.display = "none";
    }
});

// Кнопка наверх
let upBtn = document.querySelector('.page-up');
upBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
});

/*
function sortAndRenderList() {
    let items = Array.from(noteList.querySelectorAll(".note"));
    console.log(items)
    items.sort(function(a, b) {
      var dateA = new Date(a.getAttribute("data-date"));
      var dateB = new Date(b.getAttribute("data-date"));
      return dateA - dateB;
    });
  
    noteList.innerHTML = ""; // Очистить список
  
    noteList.forEach(function(item) {
        noteList.appendChild(item);
    });
  }*/