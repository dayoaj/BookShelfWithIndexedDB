const idbApp = (function() {
  window.indexedDB = window.indexedDB || window.mozIndexedDB ||
           window.webkitIndexedDB || window.msIndexedDB;

  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
  };

  let db;
  const request = window.indexedDB.open("books", 1);
  const bookData = [
      {
        title: 'Monolith to Microservices',
        author: 'Sam Newman',
        rating: 4.49,
        ratingsNo: 39,
        description: `How do you detangle a monolithic system and migrate it to a microservices architecture? How do you do it while maintaining business-as-usual?...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566123566l/44144499.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Poor Charlie\'s Almanack',
        author: 'Charles T. Munger',
        rating: 4.51,
        ratingsNo: 5159,
        description: `EXPANDED THIRD EDITION includes Charlie's 2007 USC Law School Commencement address. Edited by Peter D. Kaufman. Brand New...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387744370l/944652.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Effective Java Programming Guide',
        author: 'Joshua Bloch et al',
        rating: 4.49,
        ratingsNo: 6181,
        description: `A new edition of this title is available, ISBN-10: 0321356683 ISBN-13: 9780321356680...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433511045l/105099.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        rating: 4.40,
        ratingsNo: 13118,
        description: `Even bad code can function. But if code isn t clean, it can bring a development organization to its knees...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Behave: The Biology of Humans at Our Best and Worst',
        author: 'Robert M. Sapolsky',
        rating: 4.41,
        ratingsNo: 7918,
        description: `More than a decade in the making, this game-changing book is Robert Sapolsky's genre-shattering attempt to answer that question as fully as perhaps only he could, looking at it from every angle. Sapolsky's...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1517732866l/31170723._SY475_.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'The Handmaid\'s Tale',
        author: 'Margaret Atwood',
        rating: 4.10,
        ratingsNo: 1281591,
        description: `Offred is a Handmaid in the Republic of Gilead. She may leave the home of the Commander and his wife once a day to walk to food markets whose signs are now pictures instead of words because women are no longer allowed to read...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1578028274l/38447._SY475_.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Freakonomics',
        author: 'Steven D. Levitt et al',
        rating: 3.97,
        ratingsNo: 654732,
        description: `Which is more dangerous, a gun or a swimming pool? What do schoolteachers and sumo wrestlers have in common? Why do drug dealers still live with their moms?...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1550917827l/1202._SX318_.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'Outliers: The Story of Success',
        author: 'Malcolm Gladwell',
        rating: 4.15,
        ratingsNo: 483175,
        description: `In this stunning new book, Malcolm Gladwell takes us on an intellectual journey through the world of "outliers"--the best and the brightest, the most famous and the most successful. He asks the question:...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1344266315l/3228917.jpg',
        year: 2016,
        tags: []
      },
      {
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey et al',
        rating: 4.10,
        ratingsNo: 458521,
        description: `When Stephen Covey first released The Seven Habits of Highly Effective People, the book became an instant rage because people suddenly got up and took notice that...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1421842784l/36072.jpg',
        year: 2016,
        tags: []
      },
      {

        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        rating: 4.07,
        ratingsNo: 226237,
        description: `Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1573745054l/40097951._SY475_.jpg',
        year: 2016,
        tags: []
      },
      {

        title: 'Atomic Habits',
        author: 'James Clear',
        rating: 4.33,
        ratingsNo: 51106,
        description: `No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg',
        year: 2018,
        tags: []
      },
      {

        title: 'The Man\'s Guide to Women',
        author: 'John M. Gottman et al',
        rating: 4.16,
        ratingsNo: 926,
        description: `Results from world-renowned relationship expert John Gottman’s famous Love Lab have proven an incredible truth: Men make or break relationships. Based on 40 years of research, The Man’s Guide to Women unlocks the mystery of how to attract...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1444638337l/25664439.jpg',
        year: 2016,
        tags: []
      },
      {

        title: 'UX for Lean Startups',
        author: 'Laura Klein',
        rating: 4.08,
        ratingsNo: 1559,
        description: `Great user experiences (UX) are essential for products today, but designing one can be a lengthy and expensive process. With this practical, hands-on book, you’ll learn how to do it faster and smarter using Lean UX techniques...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1356670411l/16128986.jpg',
        year: 2016,
        tags: []
      },
      {

        title: 'The World is Flat',
        author: 'Thomas L. Friedman',
        rating: 3.68,
        ratingsNo: 93194,
        description: `A timely and essential update on globalization, its successes and discontents, powerfully illuminated by one of our most respected journalists...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442191453l/1911._SY475_.jpg',
        year: 2005,
        tags: []
      },
      {

        title: 'The Joys of Motherhood',
        author: 'Buchi Emecheta',
        rating: 4.1,
        ratingsNo: 4526,
        description: `Nnu Ego is a woman who gives all her energy, money and everything she has to raising her children - leaving her little time to make friends....`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1431801037l/210722._SY475_.jpg',
        year: 1979,
        tags: []
      },
      {

        title: 'Cracking the Coding Interview',
        author: 'Gayle Laakmann McDowell',
        rating: 4.35,
        ratingsNo: 4558,
        description: `Now in the 5th edition, Cracking the Coding Interview gives you the interview preparation you need to get the top software developer jobs....`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391311964l/12544648.jpg',
        year: 2008,
        tags: []
      },
      {

        title: 'The Origin of Wealth',
        author: 'Eric D. Beinhocker',
        rating: 4.27,
        ratingsNo: 1284,
        description: `Over 6.4 billion people participate in a $36.5 trillion global economy, designed and overseen by no one. How did this marvel of self-organized complexity evolve? How is wealth created within this system?...`,
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388330469l/22456.jpg',
        year: 2006,
        tags: []
      }
    ];

  let dbPopulated = false; // indicates if the Database has been populated with the initial data

  // Elements
  let body = document.querySelector("body");
  let modifyBooksModal = document.querySelector("#modify-books-modal");
  let searchBooksModal = document.querySelector("#search-books-modal");
  let modalContent = document.querySelector(".modal-content");
  let modalHeader = modalContent.querySelector("header > span");
  let closeModalBtn = document.querySelector(".close-btn");
  let submitBtn = document.querySelector("button[name='book-submit-btn']"); // Text content of Modal Submit Button
  let bookForm = document.forms['book-form'];
  let mobSearchBookTitle = document.forms['mob-search-book-title'];
  let mobSearchBookRating = document.forms['mob-search-book-rating'];


  request.onsuccess = function(event) {

    db = request.result;
    renderBooks();
    console.log("Database Opened");
  }

  request.onerror = function(event) {
    console.log("error: ", event.target.errorCode);
  }

  request.onupgradeneeded = function(event) {
      const store = event.currentTarget.result.createObjectStore('books', {keyPath: "id"});
      console.log('in onupgradeneeded');
      store.createIndex('title', 'title');
      store.createIndex('rating','rating');
  }


  function bookDivContent(book) {
        return `<div href="#" class="book-card">

                  <img src=${book.imageUrl} alt="picture of book"/>

                  <div class="book-details">
                    <h3>${book.title}</h3>
                    <span>by ${book.author}</span>
                    <span>rated ${book.rating} of ${book.ratingsNo} ratings</span>
                    <div class="description">${book.description}</div>
                    <div class="book-actions" data-identity="${book.id}">
                      <button class="edit-btn">
                      </button>
                      <button class="delete-btn">
                      </button>
                    </div>
                  </div>
                </div>`;
      }

  function renderBooks() {
    let s = '';

    const objectStore = db.transaction("books").objectStore("books");
    objectStore.getAll().onsuccess = function(event) {

      for(const book of event.target.result) {
        s+= bookDivContent(book);
      }
      document.querySelector('.book-list').innerHTML =  (s === ''?'No Book to List': s);
    }

  }

  function publishBooks() {

    if (dbPopulated) {
      return;
    }

    const transaction = db.transaction('books', 'readwrite');
    const store = transaction.objectStore('books');

    let initialID = Date.now();

    for(const book of bookData) {

      book.id = ++initialID;
      let request = store.add(book);
      request.onsuccess = (event) => {
        console.log('Succesfully added resource: ',event.target.result);
      };
    }

    dbPopulated = true;
    return renderBooks();
  }

  function clearObjectStore() {
    const transaction = db.transaction('books', 'readwrite');
    const store = transaction.objectStore('books');
    let request = store.clear();
    request.onsuccess = (event) => {
      console.log('Database cleared');
      dbPopulated = false;
      return renderBooks();
    }
  }

  function searchByTitle(e) {
    e.preventDefault();
    const key = e.target.querySelector('input').value;
    if (key === ''){
      return document.querySelector('.book-list').innerHTML =  "No result: Empty entry";
    }
    const transaction = db.transaction('books', 'readwrite');
    const store = transaction.objectStore('books');
    const index = store.index('title');
    const objectStoreRequest = index.get(key)
    objectStoreRequest.onsuccess = (event) => {
      if (event.target.result === undefined){
        return document.querySelector('.book-list').innerHTML =  "No result: Can't find entry in DB";
      }
      console.log(event);
      const book = event.target.result;
      document.querySelector('.book-list').innerHTML =  bookDivContent(book);
      return hideSearch();
    }
  }

  function searchByRating(e) {
    e.preventDefault();
    const min = e.target.querySelector('input#min-rating-input').value;
    const max = e.target.querySelector('input#max-rating-input').value;
    const minNum = Number(min);
    const maxNum = Number(max);

    if(min === '' && max === '') {
      document.querySelector('.book-list').innerHTML =  "No value inputed";
      return;
    };

    let range;
    if (min !== '' && max !== '') {
      range = IDBKeyRange.bound(minNum, maxNum);
    } else if (min === '') {
      range = IDBKeyRange.upperBound(maxNum);
    } else {
      range = IDBKeyRange.lowerBound(minNum);
    }
    let s = '';
    let i = 0;

    const transaction = db.transaction('books', 'readonly');
    const store = transaction.objectStore('books');
    const index = store.index('rating');
    console.log(index);

    index.openCursor(range).onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const book = cursor.value;
        s += bookDivContent(book);
        i++;
        cursor.continue();
      } else {
          console.log(" Entries All Parsed");
          console.log("Number: ", i);
          document.querySelector('.book-list').innerHTML =  (s === ''?'No results': s);
          return hideSearch();
        }
    }
  }

  function deleteEntry(e) {
    const id = Number(e.target.parentNode.dataset.identity);

    // Get Object from IndexedDB
    const result = db.transaction("books", "readwrite")
                      .objectStore("books")
                      .delete(id);

    result.onerror = event => {
      oonsole.log("Could not delete from DB: ", e);
    };

    result.onsuccess = event => {
      return renderBooks();
    };
  }

  function handleHover(e){
    if (e.target && e.target.classList.contains("edit-btn")){
      // console.log(e);
      e.target.classList.add("hover");
      // console.log(e);
    }
    if (e.target && e.target.classList.contains("delete-btn")){
      e.target.classList.add("hover");
    }
  }

  function handleLeave(e){
    if (e.target && e.target.classList.contains("edit-btn")){
      e.target.classList.remove("hover");
    }
    if (e.target && e.target.classList.contains("delete-btn")){
      e.target.classList.remove("hover");
    }
  }


  function showModal() {
    body.classList.add("no-scroll");
    modifyBooksModal.style.display = "flex";
    return null;
  }

  function showSearch() {
    searchBooksModal.style.display = "flex";
    return null;
  }

  function showEditModal(e){

    const id = Number(e.target.parentNode.dataset.identity);

    // Get Object from IndexedDB
    const result = db.transaction("books", "readwrite")
                      .objectStore("books")
                      .get(id);

    // Fill in Object Values into the Form
    result.onsuccess = (e) => {
      const book = e.target.result;
      bookForm.querySelector('#book-title').value = book.title;
      bookForm.querySelector('#book-author').value = book.author;
      bookForm.querySelector('#book-rating').value = book.rating;
      bookForm.querySelector('#book-raters').value = book.ratingsNo;
      bookForm.querySelector('#book-description').value = book.description;
      bookForm.querySelector('#book-image-url').value = book.imageUrl;
      bookForm.querySelector('#book-release-year').value = book.year;

      bookForm.dataset.identity = id;
      modalHeader.textContent = "Edit Book";
      submitBtn.textContent = "Edit Book";

      return showModal();
    };
  }

  function handleActionBtnClick(e){
    if (e.target && e.target.classList.contains("edit-btn")){
      showEditModal(e);
    }
    if (e.target && e.target.classList.contains("delete-btn")){
      deleteEntry(e);
    }
  }

  function hideModal(e) {
    if (e.target === modifyBooksModal || e.target === closeModalBtn) {
      body.classList.remove("no-scroll");
      modifyBooksModal.style.display = "none";
      if(submitBtn.textContent !== "Add New Book" ) {
        submitBtn.textContent = "Add New Book";
        modalHeader.textContent = "Add New Book";
      }
      bookForm.reset();
      bookForm.dataset.identity = "";
    }
    return null;
  }

  function hideSearch(e){
    if (e.target !== searchBooksModal) {
      return null;
    }
    searchBooksModal.style.display = "none";
    mobSearchBookTitle.reset();
    mobSearchBookRating.reset();
  }

  function handleBookSubmit(submitEvent) {
    // submitEvent.preventDefault();
    let formEl = new FormData(bookForm);
    let bookTitleEntry = formEl.get('book-title').trim();
    let bookAuthorEntry = formEl.get('book-author').trim();
    let bookRatingEntry = Number(formEl.get('book-rating').trim());
    let numberOfRatersEntry = Number(formEl.get('book-raters').trim());
    let bookDescriptionEntry = formEl.get('book-description').trim();
    let bookImageURLEntry = formEl.get('book-image-url').trim();
    let bookYearEntry = Number(formEl.get('book-release-year').trim());


    const newObj = {};

    newObj["title"] = bookTitleEntry ? bookTitleEntry : "";
    newObj["author"] = bookAuthorEntry ? bookAuthorEntry : "";
    newObj["rating"] = bookRatingEntry ? bookRatingEntry : 0;
    newObj["ratingsNo"] = numberOfRatersEntry ? numberOfRatersEntry : 0;
    newObj["description"] = bookDescriptionEntry ? bookDescriptionEntry : "";
    newObj["imageUrl"] = bookImageURLEntry ? bookImageURLEntry : 'https://s.gr-assets.com/assets/nophoto/book/blank-133x176-8b769f39ba6687a82d2eef30bdf46977.jpg';
    newObj["year"] = bookYearEntry ? bookYearEntry : "";
    newObj["tags"] = [];

    newObj["id"] = submitEvent.target.dataset.identity ? Number(submitEvent.target.dataset.identity) : Date.now(); // Adds elements ID

    bookForm.dataset.identity = ""; // reset identity tag on form to null value;


    let request = db.transaction('books', 'readwrite')
                      .objectStore('books')
                      .put(newObj);


    request.onerror = (e) => {
      console.log('You got an error while trying to insert to IndexedDB: ', e);
      return null;
    }

    request.onsuccess = (e) => {
      console.log('Succesfully added: ', event.target.result);
      return renderBooks();
      // return hideModal(submitEvent);
    };

  }

  return {
    publishBooks: (publishBooks),
    clearObjectStore: (clearObjectStore),
    searchByTitle: (searchByTitle),
    searchByRating: (searchByRating),
    showModal: (showModal),
    showSearch: (showSearch),
    handleActionBtnClick: (handleActionBtnClick),
    hideModal: (hideModal),
    hideSearch: (hideSearch),
    handleHover: (handleHover),
    handleBookSubmit: (handleBookSubmit),
    handleLeave: (handleLeave)
  };

})(event);
