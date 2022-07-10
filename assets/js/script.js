// Wait for the DOM to finish loading before running the page
document.addEventListener("DOMContentLoaded", () => {
    let pageName = window.location.pathname.split("/").pop();

    if (pageName === "library.html") {
        library.getPicks();

    } else if (pageName === "category.html") {
        let cat = new URLSearchParams(window.location.search).get('cat');
        library.getCategory(cat);

    } else if (pageName === "book.html") {
        let id = new URLSearchParams(window.location.search).get('id');

        let book;
        for (let i in library) {
            if (library[i].id == id) {
                book = library[i];
                break;
            }
        }

        book.openBook();

        let readBook = document.createElement("script");
        readBook.innerHTML = `
        const read = ePub('${book.path}');
        const rendition = read.renderTo("area");
        read.rendition.spread("none",1);
        rendition.themes.override("font-size", "100%");
        rendition.themes.override("max-height", "80vh");
        rendition.themes.override('width', '70vw');
        rendition.display();
        `;
        document.body.appendChild(readBook);

        document.getElementsByTagName("button")[0].addEventListener("click", showBook);
        document.getElementById("close-render").addEventListener("click", closeBook);

    }
});

// Functions
/** Shows the book in the book area 
 */
function showBook() {
    document.getElementById("render").style.display = "block";
    document.getElementById("book-details").style.display = "none";
    document.getElementsByClassName("go-back")[0].style.display = "none";
}

/** Hides the book area 
 */
 function closeBook() {
    document.getElementById("render").style.display = "none";
    document.getElementById("book-details").style.display = "block";
    document.getElementsByClassName("go-back")[0].style.display = "block";
}

// Book class
class book {
    constructor(_id, _title, _author, _description, _cover, _book, _picks, _genre, _mood) {
        console.log(`The book '${_title}' is in the library.`);

        // Properties
        this.id = _id;
        this.title = _title;
        this.author = _author;
        this.description = _description;
        this.cover = `assets/images/covers/${_cover}`;
        this.path = `assets/ebooks/${_book}`;
        this.pick = _picks;
        this.genre = _genre;
        this.mood = _mood;
    }

    // Methods
    /** Open book is the method through which the information inside the book object are rendered inside
     *  its web page
     */
    openBook() {
        const bookHTML = `<article class="open-book">
                            <img src=${this.cover} alt="${this.title} book cover">
                            <button type="button" class="btn">Read me!</button>
                            <div>
                                <h1>${this.title}</h1>
                                <h2>by ${this.author}</h2>
                            </div>
                            <p>${this.description}</p>
                        </article>`;

        document.getElementById("book-details").innerHTML = bookHTML;
    }

    /** Build the html for the book in the library
     */
    previewBook() {
        const bookHTML = `<article class="book">
                                <a href="book.html?id=${this.id}">
                                    <img src=${this.cover} alt="${this.title} book cover">
                                    <h1>${this.title}</h1>
                                    <h2>By ${this.author}</h2>
                                </a>
                            </article>`;
        return bookHTML;
    }

}

// Library object
let library = {

    // Methods
    /** This function provides a method to select the books in the library that are considered top picks 
     *  and builds the HTML code in order to add them to the page
     */
    getPicks() {
        let selection = "";
        for (let book of Object.values(this)) {
            if (book.pick) {
                selection += book.previewBook();
            } else {
                selection += "";
            }
        }

        document.getElementById("shelve").innerHTML = selection;

    },

    /** This function provides a method to select the books in the library that belong to the same category 
     *  and builds the HTML code in order to add them to the page
     */
    getCategory(category) {
        document.getElementById("title").innerHTML = category;

        let selection = "";
        for (let book of Object.values(this).slice(2)) {
            if (Object.values(book.genre).includes(category) || Object.values(book.mood).includes(category)) {
                selection += book.previewBook();
            } else {
                selection += "";
            }
        }

        document.getElementById("shelve").innerHTML = selection;

    }
};