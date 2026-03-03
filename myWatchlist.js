let getData = []
function renderMyWislist(){
    let renderMyWislistStr = ''
    getData = JSON.parse(localStorage.getItem('MyWishlistMovieDetails')) || []
    if(getData.length !== 0){
        document.getElementById('watchlist-placeholder-container').classList.add('placeholder-hidden')
    }else{
        document.getElementById('watchlist-placeholder-container').classList.add('placeholder-visible')
    }

    for(let data of getData){
        renderMyWislistStr += `
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
                                ${data.Rating}
                                </p>
                            </div>
                            <div class='runtime-genre-watchlist'>
                                <p>${data.RunTime}</p>
                                <p>${data.Genre}</p>
                                <button class='add-watchlist-btn' id='${data.Id}'>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                class="size-6 minus-icon">
                                <path fill-rule="evenodd" 
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" 
                                clip-rule="evenodd" />
                                </svg>
                                Remove
                                </button>
                            </div>
                            <p class='movie-plot'>${data.Plot}</p>
                        </div>
                        </div>
    `
    }
    return document.getElementById('my-movies-list').innerHTML = renderMyWislistStr
}

renderMyWislist()

let updateData = []
document.addEventListener('click', e =>{
    updateData = getData.filter(movie => movie.Id !== e.target.id)
    localStorage.setItem('MyWishlistMovieDetails',JSON.stringify(updateData))
    return renderMyWislist()
})