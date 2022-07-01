const btn = document.querySelector("a");
  
const container = document.querySelector(".container");

const updateData = () => {
  const data = document.querySelectorAll("textarea");
  const notes = [];
  if(data == null) return
  data.forEach((ele)=>{
    return notes.push(ele.value);
  });
  localStorage.setItem("notes",JSON.stringify(notes));
};

const addNote = (text = "") => {
  const note = document.createElement("din");
  //create note box
  note.classList.add("note");
  const htmldata =`
      <div class="operation">
        <button class="btn edit"><i class="fas fa-edit"></i></button>
        <button class="btn delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="over">
        <div class="main ${text ? '' : 'hide'}"></div>
        <textarea class="box ${text ? 'hide': ''}"></textarea>
      </div>`;

  note.insertAdjacentHTML("afterbegin",htmldata);
  
  //Reference 
  const edit = note.querySelector(".edit");
  const delete_ = note.querySelector(".delete");
  
  const textarea = note.querySelector("textarea");
  
  const main = note.querySelector(".main");
  
  //delete note
  delete_.addEventListener("click",()=>{
    note.remove();
    updateData();
  });
  
  //save and edit
  
  main.innerHTML = text;
  textarea.value = text;
  
  edit.addEventListener("click",()=>{
    textarea.classList.toggle("hide");
    main.classList.toggle("hide");
    updateData();
  });
  
  //add text in main
  textarea.addEventListener("change",(event)=>{
    main.innerHTML = event.target.value;
    updateData();
  });
  container.appendChild(note);
};
  const lsDat = localStorage.getItem("notes");
  if(lsDat){
    JSON.parse(lsDat).forEach((ele)=>{
      addNote(ele);
    });
  }

btn.addEventListener("click",()=>{
  addNote();
});