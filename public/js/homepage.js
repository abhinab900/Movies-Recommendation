const search_it = document.getElementById('search_it')
const search_btn = document.getElementById('search_btn')
const movies_grid = document.getElementById('movies-grid')

const movies_img_url = 'https://api.themoviedb.org/3/movie/movie_id/images';
const movies_search_url = 'https://api.themoviedb.org/3/search/movie?';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzU1NjE4ZjNjOWQ2OTZiZWQ1MmNlYmU4Y2U5ZDA0OCIsInN1YiI6IjYxYmFmNmY1YzYxNmFjMDAxZTY2NGVhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FGPgT3zEqGcAFxM4S0wJ87eXjgVVHtGNylrstRKaNw0'
  }
};

search_btn.addEventListener('click',()=>{
    getMovies()
})

search_it.addEventListener('keyup',(e)=>{
    if(e.key=='Enter')getMovies()
})

async function getMovies(){
    const search_text = search_it.value
    const url_with_query = `query=${search_text}&include_adult=false&language=en-US&page=1`

    if(search_text.length != 0){
        const res = await fetch(movies_search_url+`query=${search_text}`,options)
        const res_json = await res.json()
        console.log(res_json)
        console.log(res_json.results);
        populate_grid(res_json.results)
    }
}


function populate_grid(movies_arr){

    movies_grid.innerHTML = '';
    
    for(let movie of movies_arr){
        const element = document.createElement('div');
        element.className = `flex flex-col`;
        element.innerHTML = `
        <img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" class="m-0 rounded-xl">
        <div class="p-4 flex flex-col items-center"> 
            <p class="text-lg md:text-xl xl:text-2xl">${movie.title}</p>
            <p class="text-md md:text-lg xl:text-xl">${movie.release_date.slice(0,4)}</p> 
        </div>
        `
        movies_grid.append(element)
    }

    sendDataToServer(movies_arr)
}

async function sendDataToServer(movies_arr){
    try{
        const res = await fetch('/',{
            method:'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({'movies':movies_arr})
        })
        const res_json = await res.json()

        console.log(res_json)
    }catch(err){
        console.log(err);
    }


    
}