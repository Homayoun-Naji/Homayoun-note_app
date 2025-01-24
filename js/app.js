const createButton = document.querySelector(".create-button");
const modalScreen = document.querySelector(".modal-screen");
const closeXBtn = document.querySelector(".close-x-btn");
const closeBtn = document.querySelector(".close");
const colorBoxes = document.querySelectorAll(".color-box");
const createNoteBtn = document.querySelector(".continue");
const editor = document.querySelector("#editor");
const notesContainer = document.querySelector(".notes-container");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

function CloseModal() {
  modalScreen.classList.add("hidden");
}

createButton.addEventListener("click", () => {
  modalScreen.classList.remove("hidden");
});

closeXBtn.addEventListener("click", CloseModal);
closeBtn.addEventListener("click", CloseModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    CloseModal();
  }
});

let colorCode;

for (let i = 0; i < colorBoxes.length; i++) {
  colorBoxes[i].addEventListener("click", () => {
    colorBoxes[i].classList.add("selected");
    for (let j = 0; j < colorBoxes.length; j++) {
      if (j !== i) {
        colorBoxes[j].classList.remove("selected");
      }
    }
  });
}

createNoteBtn.addEventListener("click", () => {
  if (editor.value.length === 0) {
    alert("لطفا حتما محتوایی برای یادداشت خود وارد نمایید");
  } else {
    let newArticle = document.createElement("article");
    newArticle.classList.add("note");
    let noteText = document.createElement("p");
    noteText.classList = "note-content";
    noteText.innerText = editor.value;
    newArticle.append(noteText);
    colorBoxes.forEach((colorBox) => {
      if (colorBox.classList.contains("selected")) {
        colorCode = colorBox.dataset.color;
      }
    });
    newArticle.style.backgroundColor = colorCode;
    let removeBtnDiv = document.createElement("div");
    let removeBtn = document.createElement("i");
    removeBtn.className = "fa-solid fa-trash delete";
    removeBtn.style.cursor = "pointer";
    removeBtn.addEventListener("click", () => {
      newArticle.remove();
    });
    removeBtnDiv.append(removeBtn);
    newArticle.append(removeBtnDiv);
    notesContainer.append(newArticle);
    editor.value = "";
    CloseModal();
  }
});

function Search() {
  if (searchInput.length === 0) {
    alert("لطفا متن جستجو خود را وارد نمایید");
  } else {
    if (!notesContainer.childElementCount) {
      alert("شما هنوز یادداشتی ایجاد نکرده اید!");
    } else {
      const notes = document.querySelectorAll(".note");
      notes.forEach((note) => {
        const noteContent = note.querySelector(".note-content");

        if (noteContent.innerHTML.includes(searchInput.value)) {
          note.style.display = "flex";
        } else {
          note.style.display = "none";
        }
      });
    }
  }
  searchInput.value = "";
}

searchButton.addEventListener("click", Search);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    Search();
  }
});