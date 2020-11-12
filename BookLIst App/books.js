class Book{
  
    constructor(bookName , bookAuthor , isbn){
        this.bookName = bookName
        this.bookAuthor = bookAuthor
        this.isbn =isbn
    }
}


class Local{

    static getBooks(){
        let books
        if(localStorage.getItem("books") === null){
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBooks(book){
        const books = Local.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static rmvBook(isbn){
        const books = Local.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem("books",JSON.stringify(books));
    }
}

//ui
class Ui{

    static displayBooks(){
        const books= Local.getBooks()
        books.forEach((book) => Ui.addBook(book))
    }
    static addBook(book){
      const lisItem = document.querySelector('#books-list');
      const row = document.createElement('tr');
      row.innerHTML =  `
      <td>${book.bookName}</td>
      <td>${book.bookAuthor}</td>
      <td>${book.isbn}</td>
      <td>
       <a href="" class="btn btn-danger btn-sm delete "> x </a>
     </td>
      `
       lisItem.append(row);
    }
    static clear(){
        document.getElementById("bookName").value = '';
        document.getElementById("bookAuthor").value = '';
        document.getElementById("isbn").value = '';
    }

    static alerts(msg, clsName){
        const div = document.createElement("div");
        div.className = `alert alert-${clsName}`
        div.appendChild(document.createTextNode(msg));

        const cont = document.querySelector(".container");
        const form = document.querySelector("#books-form");
        cont.insertBefore(div,form);
        setTimeout(()=>{
        document.querySelector(".alert").remove();
        },1000);


    }

    static delete(eventListen){

        if(eventListen.classList.contains("delete")){

            eventListen.parentElement.parentElement.remove();
        }

    }
    
}


//displaying a book
document.addEventListener('DOMContentLoader',Ui.displayBooks);

document.querySelector("#books-list").addEventListener("click",function(event){

    Ui.delete(event.target);
    Local.rmvBook(event.target.parentElement.previousElementSibling.textContent);
    alert(" Book will be Deleted");
})



//addig book
document.addEventListener('submit',function(e){

    e.preventDefault();

    const bName = document.querySelector("#bookName").value;
    const bAuthor = document.querySelector("#bookAuthor").vlaue;
    const isbn = document.querySelector("#isbn").value;

    if(bName === "" || bAuthor === "" || isbn === "")
    {
        Ui.alerts("Please Enter All the Feilds","danger");


            }
            else{
                const book =  new Book(bName,bAuthor,isbn);
                Ui.addBook(book);
                Local.addBooks(book);
                Ui.alerts("Book has been Added Sucessfully","success");

                Ui.clear()
            }


            
});



Ui.displayBooks()

