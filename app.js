// Dom manipulation

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show a new quote
function newQuote() {
    showLoadingSpinner();
    //to pick a random quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if (!quote.author) {
        authorText.tentContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    //set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl= 'https://type.fit/api/quotes'
    
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
} catch (error) {
    console.log(error);
    //catch the error
    }
}

// Tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();