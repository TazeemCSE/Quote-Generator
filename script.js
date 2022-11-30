const quotecontainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuote=[];

// show loading
function loading(){
    loader.hidden=false;
    quotecontainer.hidden=true;
}

// hide loading
function complete(){
    loader.hidden=true;
    quotecontainer.hidden=false;
}

// getting newQuotes
function newQuotes(){
    loading();
    const quote=apiQuote[Math.floor(Math.random()*apiQuote.length)];
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    // Checking quote length to determine its length
    if(quote.text.length>70){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
// Getting quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
    const response= await fetch(apiUrl);
    apiQuote= await response.json();
   newQuotes();
    } catch(error){
        
    }
}
// tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank');
}
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
getQuotes();