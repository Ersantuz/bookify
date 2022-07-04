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
        const bookHTML = `<article class="book">
                            <img src=${this.cover} alt="${this.title} book cover">
                            <button type="button" class="btn">Read me!</button>
                            <h1>${this.title}</h1>
                            <h2>By ${this.author}</h2>
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