it("check load", () => {
    cy.visit("https://www.amazon.com");
})

it("check search filed", 
    () => {
        cy.get('.nav-search-field').type("java");
    }
)

it("filter setup", () => {
    let filter = cy.get('#searchDropdownBox').select("Books", {force: true});
    filter.trigger('click', {force: true});
    
});

it("click submit button", () => {
    const submitBtn = cy.get("#nav-search-submit-button");
    submitBtn.click();
})


let BookTitleArray = new Array();
let BookPriceArray = new Array();
let BookAuthorArray = new Array();

let BooksArray = new Array();

class Book {
    constructor(title, authorN, price) {
        this.title = title;
        this.authorN = authorN;
        this.price = price;
    }
    

    
    info() {
        cy.log("Book" + "\nTitle: " + this.title + "\nAuthor: " + this.authorN + "\nPrice: " + this.price);
    }
}

it("get Books info array", function() {
    // cy
    //     .get(".a-size-medium.a-color-base.a-text-normal")
    //     .invoke('text')
    //     .as('invokeText')

    cy
        .get('.a-size-medium.a-color-base.a-text-normal')
        .each(($ttl, i) => {
            let bufferTitle = $ttl.text();
            BookTitleArray[i] = bufferTitle;
            BooksArray[i] = new Book();
            BooksArray[i].title = bufferTitle;
            cy.wrap(BooksArray);
            cy.wrap(BookTitleArray);
        })
    
    // cy
    //     .get('.a-section.a-spacing-none.a-spacing-top-small > div:nth-of-type(2) > a:nth-of-type(1) > span:first-child > span:first-child')
    //     .each(($prc, i) => {
    //         let bufferPrice = $prc.text();
    //         BookPriceArray[i] = bufferPrice;
    //         BooksArray[i].price = bufferPrice;
    //         cy.wrap(BooksArray);
    //         cy.wrap(BookPriceArray);
    //     })

    cy
    .get('.a-section.a-spacing-none.a-spacing-top-small')
    .each(($elem, $i) => {
        let a = Cypress.$($elem.children());
        if(a.length >= 2) {
           let bufferPrice = a.text();
           bufferPrice = bufferPrice.slice(bufferPrice.indexOf('k') + 1 , bufferPrice.indexOf('$') + 6).trim();
           BookPriceArray[$i] = bufferPrice;
           BooksArray[$i].price = bufferPrice;
        } else {
            BooksArray[$i].price = -1;
        }
        cy.wrap(BooksArray);
    })
    

    cy
        .get('.a-row.a-size-base.a-color-secondary .a-row')
        .each(($athr, i) => {
            let authorStr = $athr.text();
            authorStr = authorStr.slice(authorStr.indexOf('by') + 2);
            authorStr = authorStr.slice(0, authorStr.indexOf('|')).trim();
            BookAuthorArray[i] = authorStr;
            cy.wrap(BookAuthorArray);
        })
})




it("configure Book objects", function() {
    for(let i = 0; i < BooksArray.length; i++) {
        BooksArray[i].authorN = BookAuthorArray[i];
        cy.log(BooksArray[i].info());
    }

   cy.log(containsBook(new Book("Effective Java", "Joshua Bloch", "$46.99")));

    function containsBook(book) {
        for(let i = 0; i < BooksArray.length; i++) {
            if(BooksArray[i].title == book.title && BooksArray[i].authorN == book.authorN && BooksArray[i].price == book.price) {
                return true;
            } else {
                return false;
            }
        }
     }
})
