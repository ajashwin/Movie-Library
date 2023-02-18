const movies = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]

console.log(movies)


let movies1 = []
// using localstorage  to Store the list of movies such that it is available the next time the page is loaded.
// got to inspect, application and go to local storage, since it shows object so we stringify it so that it is readable.
localStorage.setItem('movieListToSave', JSON.stringify(movies))
//Use the JSON.stringify method to store the data as a string and the JSON.parse method to retrieve the data as an object.
movies1 = JSON.parse(localStorage.getItem('movieListToSave'));



const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const resultULTag = document.getElementById('results');
const sortByTitle = document.getElementById('sortByTitle');
const sortByGenre = document.getElementById('sortByGenre');
const countTag = document.getElementById('count');


let searchResult = []

document.getElementById("search").addEventListener('click', (event) => {
    console.log("Button Clicked");
    // console.log(document.getElementById('title').value);


    if (titleInput.value) {
        searchResult = searchByTitle(titleInput.value.trim()); //trimming to take off empty spaces
        // console.log(searchResult);
    } else if (genreInput.value) {
        searchResult = searchByGenre(genreInput.value.trim()); //trimming to take off empty spaces
        // console.log(searchResult);
    }
    displayResults(searchResult);
})


function searchByTitle(searchTerm) {
    console.log("Search by Title");
    //search by doing lower case on both sides and trimming the search term 
    return movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase().trim()));
}

function searchByGenre(searchTerm) {
    console.log("Search by Genre");
    //search by doing lower case on both sides and trimming the search term 
    return movies.filter(movie => movie.genre.toLowerCase().includes(searchTerm.toLowerCase().trim()));
}

function displayResults(list) {
    if (list.length === 0) {
        resultULTag.innerHTML = '<p>No results found.</p>';
        return;
      }
    resultULTag.innerHTML = ''; //clearing the previous results
    list.map(ele => {
        let childTag = `<li>${ele.title}${ele.genre}</li>`
        console.log(childTag);
        resultULTag.innerHTML += childTag;
    })
    countByGenre(list);
}

sortByTitle.addEventListener('click', (event) => {
    console.log("sort by title called");
    const sortedTitle = searchResult.sort((a, b) => a.title.localeCompare(b.title))
    //normal sort will work for numbers a-b, so string comparison for titles will be done using localecompare()
    displayResults(sortedTitle);
});

sortByGenre.addEventListener('click', (event) => {
    console.log("sort by genre called");
    const sortedGenre = searchResult.sort((a, b) => a.genre.localeCompare(b.genre))
    displayResults(sortedGenre);
});

function countByGenre(lists) {

    let countObject = {} //empty object
    lists.map(item => {
        if (countObject[item.genre])
            countObject[item.genre]++
        else {
            countObject[item.genre] = 1
        }
    })
    console.log(countObject);
    
//now, display count like this in browser
//{
//   Action: 3,
//   Adventure: 5,
//   Comedy: 2,
//   Drama: 4,
//   Fantasy: 4
// }

    countTag.innerHTML='';
    for(key in countObject) {
        console.log(key); 
        countTag.innerHTML += `<li>${key}:${countObject[key]}</li>`
    }
}

function searchBoth(title,genre) {
    return movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase().trim()) && movie.genre.toLowerCase().includes(genre.toLowerCase().trim()));
}

