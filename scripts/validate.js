const inputs = document.querySelectorAll("input, textarea");
const bookTitle = document.querySelector("input#book-title");
const bookAuthor = document.querySelector("input#book-author");
const bookRating = document.querySelector("input#book-rating");
const numOfRaters = document.querySelector("input#book-raters");
const bookImgURL = document.querySelector("input#book-image-url");
const bookReleaseYear = document.querySelector("input#book-release-year");
const addNewBookForm = document.querySelector("form#book-form");

// addNewBookForm.addEventListener('submit', validate);

for (const item of inputs){
  item.addEventListener('blur', validate);
};

function validate(e) {
  const element = e.target;
  const isValid = element.checkValidity();

  if(!isValid) {
    if (element.validity.valueMissing) {
      if (element === bookTitle)
        element.setCustomValidity("Please enter Book Title");
      else if (element === bookAuthor)
        element.setCustomValidity("Please enter name of Author");
      else if (element === bookReleaseYear)
        element.setCustomValidity("Please enter Book's release year");
    }

    else if (element.validity.patternMismatch) {
      if (element === bookRating)
        element.setCustomValidity("Please enter a number between 0 and 5");
      else if (element === numOfRaters)
        element.setCustomValidity("Please enter an integer");
      else if (element === bookReleaseYear)
        element.setCustomValidity("Please enter a year e.g. 2004");
    }

    else if (element.validity.typeMismatch) {
      if (element === bookImgURL)
        element.setCustomValidity("Please enter a url. e.g http://example.com");
    }

    else {
      element.setCustomValidity("");
    }
  }

   return  element.reportValidity();
};
