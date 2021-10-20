

describe('The Amazon Page', () => {

    it('successfully loads', () => {
      cy.visit('https://www.amazon.com/');

    
      //set filter
      let filter = cy.get('#searchDropdownBox').select("Books", {force: true});
      filter.trigger('click', {force: true});

      //search
      let searchLine = cy.get("#twotabsearchtextbox");
      searchLine.type("Java");

      //searchBtn
      let searchBtn = cy.get("#nav-search-submit-button");
      searchBtn.click();

      let searchRes = cy.get('[data-component-type="s-search-results"]');
      
      //searchedBook
      let searchedTitle = "Effective Java";
      let searchedAuthor = "Joshua Bloch";
      let searchedPrice = "$43.86";

      //Book Title
      let bookTitle = [];
      cy.get('.a-size-medium.a-color-base.a-text-normal').each(($el, i) => {
        bookTitle.push($el.text());
        //cy.log(bookTitle[i])
     }).then(() => {
        cy.log(bookTitle.includes(searchedTitle))
     });


     //Book Price
     let bookPrice = [];
      cy.get('.a-offscreen').each(($price) => {
        //cy.log($price.text());
        bookPrice.push($price.text());
      }).then(() => {
        cy.log(bookPrice.includes(searchedPrice));
      });

      //Book Author
      let Author = [];
      let authorStr;
      cy.get(".a-row.a-size-base.a-color-secondary .a-row").each(($author, i) => {
         authorStr = $author.text();
         authorStr = authorStr.slice(authorStr.indexOf('by') + 2);
         authorStr = authorStr.slice(0, authorStr.indexOf('|'));
         Author.push(authorStr);
         //cy.log(Author[i]);
      }).then(() => {
        cy.log(Author.includes(authorStr));
      })

    })   
  })



