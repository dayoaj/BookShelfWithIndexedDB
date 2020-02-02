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
const request = window.indexedDB.open("bookshelf-demo-indexeddb", 1);

request.onsuccess = function(event) {
  db = request.result;
  console.log("Database Opened");
}

request.onerror = function(event) {
  console.log("error: ", event.target.errorCode);
}

request.onupgradeneeded = function(event) {
    const store = event.currentTarget.result.createObjectStore('books', {keyPath: "id"});

    store.createIndex('title', 'title');
    store.createIndex('rating','rating');

}



  function publishBooks() {
    const tx = db.transaction('books', 'readwrite');
    const store = tx.objectStore('books');
    const bookData = [
        {
          id: '01',
          title: 'Monolith to Microservices',
          author: 'Sam Newman',
          rating: 4.49,
          ratingsNo: 39,
          description: `How do you detangle a monolithic system and migrate it to a microservices architecture? How do you do it while maintaining business-as-usual? As a companion to Sam Newman's extremely popular Building Microservices...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566123566l/44144499.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '02',
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
          id: '03',
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
          id: '04',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          rating: 4.40,
          ratingsNo: 13118,
          description: `Even bad code can function. But if code isn t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn t have to be that way....`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '05',
          title: 'Behave: The Biology of Humans at Our Best and Worst',
          author: 'Robert M. Sapolsky',
          rating: 4.41,
          ratingsNo: 7918,
          description: `More than a decade in the making, this game-changing book is Robert Sapolsky's genre-shattering attempt to answer that question as fully as perhaps only he could, looking at it from every angle. Sapolsky's storytelling concept is delightful but it also has a powerful intrinsic logic...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1517732866l/31170723._SY475_.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '06',
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
          id: '07',
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
          id: '08',
          title: 'Outliers: The Story of Success',
          author: 'Malcolm Gladwell',
          rating: 4.15,
          ratingsNo: 483175,
          description: `In this stunning new book, Malcolm Gladwell takes us on an intellectual journey through the world of "outliers"--the best and the brightest, the most famous and the most successful. He asks the question: what makes high-achievers different?...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1344266315l/3228917.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '09',
          title: 'The 7 Habits of Highly Effective People',
          author: 'Stephen R. Covey et al',
          rating: 4.10,
          ratingsNo: 458521,
          description: `When Stephen Covey first released The Seven Habits of Highly Effective People, the book became an instant rage because people suddenly got up and took notice that their lives were headed off in the wrong direction; and more than that...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1421842784l/36072.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '10',
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
          id: '11',
          title: 'Atomic Habits',
          author: 'James Clear',
          rating: 4.33,
          ratingsNo: 51106,
          description: `No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg',
          year: 2018,
          tags: []
        },
        {
          id: '12',
          title: 'The Man\'s Guide to Women',
          author: 'John M. Gottman et al',
          rating: 4.16,
          ratingsNo: 926,
          description: `Results from world-renowned relationship expert John Gottman’s famous Love Lab have proven an incredible truth: Men make or break relationships. Based on 40 years of research, The Man’s Guide to Women unlocks the mystery of how to attract, satisfy, and succeed with a woman for a lifetime...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1444638337l/25664439.jpg',
          year: 2016,
          tags: []
        },
        {
          id: '13',
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
          id: '14',
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
          id: '15',
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
          id: '16',
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
          id: '17',
          title: 'The Origin of Wealth',
          author: 'Eric D. Beinhocker',
          rating: 4.27,
          ratingsNo: 1284,
          description: `Over 6.4 billion people participate in a $36.5 trillion global economy, designed and overseen by no one. How did this marvel of self-organized complexity evolve? How is wealth created within this system? And how can wealth be increased for the benefit of individuals, businesses, and society?...`,
          imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388330469l/22456.jpg',
          year: 2006,
          tags: []
        }
      ];
      let s = '';
      for(const book of bookData) {

        let request = store.add(book);
        request.onsuccess = (event) => {
          console.log('Succesfully added resource: ',event.target.result);
        };

        s += `<div href="#" class="book-card">
        <img src=${book.imageUrl} alt="picture of book"/>
          <div class="book-details">
            <h3>${book.title}</h3>
            <span>by ${book.author}</span>
            <span>rated ${book.rating} of ${book.ratingsNo} ratings</span>
            <div class="description">${book.description}</div>
            <div class="book-actions">
              <button>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ccc" viewBox="0 0 383.947 383.947" style="enable-background:new 0 0 383.947 383.947;" xml:space="preserve" width="22px" height="22px">
                  	<polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 " />
                  	<path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
                  		C386.027,77.92,386.027,64.373,377.707,56.053z" />
                  </svg>
                </button>
                <button>
                  <svg id="Capa_1" enable-background="new 0 0 515.556 515.556" height="22px" width="22px" fill="#ccc" viewBox="0 0 515.556 515.556"  xmlns="http://www.w3.org/2000/svg">
                      <path d="m64.444 451.111c0 35.526 28.902 64.444 64.444 64.444h257.778c35.542 0 64.444-28.918 64.444-64.444v-322.222h-386.666z" />
                      <path d="m322.222 32.222v-32.222h-128.889v32.222h-161.111v64.444h451.111v-64.444z" />
                  </svg>
                </button>
            </div>
          </div>
        </div>`;
      }
      document.querySelector('.book-list').innerHTML = s;
  }

  function clearObjectStore() {
    const tx = db.transaction('books', 'readwrite');
    const store = tx.objectStore('books');
    let request = store.clear();
    request.onsuccess = (event) => {
      console.log('Database cleared');
    }
  }


  return {
    publishBooks: (publishBooks),
    clearObjectStore: (clearObjectStore)
  };

})();
