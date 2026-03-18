let filmId = []

document.getElementById('search-form')?.addEventListener('submit',(e)=>{
    e.preventDefault()
    let searchValue = document.getElementById('search-input').value
    
    fetch(`https://www.omdbapi.com/?apikey=554d6fa1&s=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            for(movie of data.Search){
            getId(movie.imdbID)
            filmId.push(movie.imdbID)
            }
        })
        .catch(err => {
            document.getElementById('search-input').setAttribute("placeholder","Searching something with no data")
            document.getElementById('movies-list').innerHTML = `
            <p class='error-message'>Unable to find what you're looking for. Please try another search.</p>
            `
        })

    document.getElementById('search-input').value = ''

})

let htmlStr = ''

function getId(dataid){
    fetch(`https://www.omdbapi.com/?apikey=554d6fa1&i=${dataid}`)
            .then(res => res.json())
            .then(data => {
                htmlStr += `
                <div class='movie-details-container'>
                    <img class='movie-poster' src='${data.Poster}' alt='${data.Title} poster'/>
                    <div class='movie-details'>
                        <div class='title-and-rate'>
                            <h2>${data.Title}</h2>
                            <p class='movie-rating'>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            class="size-6 movie-rating-icon">
                            <path fill-rule="evenodd" 
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" c
                            lip-rule="evenodd" />
                            </svg>
                            ${data.imdbRating}
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            class="size-6 wishlisted-check-icon"
                            id="wishlisted-check-icon">
                            <path fill-rule="evenodd" 
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" 
                            clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class='runtime-genre-watchlist'>
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                            <button class='add-watchlist-btn' id='${data.imdbID}'>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            class="size-6 add-icon">
                            <path fill-rule="evenodd" 
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" 
                            clip-rule="evenodd" />
                            </svg>
                            Watchlist
                            </button>
                        </div>
                        <p class='movie-plot'>${data.Plot}</p>
                    </div>
                </div>
                `
                renderMovieList(htmlStr)
            })
}

function renderMovieList(string){
    const moviesList = document.getElementById('movies-list')
    moviesList.innerHTML = string
}

let myWishlistArr = JSON.parse(localStorage.getItem('MyWishlistMovieDetails')) || []

let myWishlistStr = ''

document.addEventListener("click", e =>{
   for(id of filmId){
    if(id===e.target.id){  
        fetch(`https://www.omdbapi.com/?apikey=554d6fa1&i=${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                myWishlistStr   = {
                    'Id':data.imdbID,
                    'Poster': data.Poster,
                    'Title': data.Title,
                    'Rating': data.imdbRating,
                    'RunTime': data.Runtime,
                    'Genre':data.Genre,
                    'Plot': data.Plot
                }

               let isDuplicate = myWishlistArr.some(movie => movie.Id === myWishlistStr.Id)

               if(!isDuplicate){
                myWishlistArr.unshift(myWishlistStr)
               }else{
                    console.log("its duplicate")
               }

                return localStorage.setItem('MyWishlistMovieDetails',JSON.stringify(myWishlistArr))
            })
            
    }

   }
   
})