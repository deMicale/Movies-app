//es. 1: gestione errore Api musement//

// funzione per la creazione del banner//
function createBannerError(message) {
  const body = document.querySelector('body');
  const banner = document.createElement('span');
  banner.classList.add('banner');
  body.appendChild(banner);
  banner.textContent =`Ops, c'è stato un errore: ${message} `;
  
}

//funzione per filtrare città//
// async function loadData(){
//   try {
//   const response = await fetch("https://api.musement.com/api/v3/cit") //errore voluto//
//     if(!response.ok){
//       throw new Error (`status chiamata ${response.status}`);
//     }
//   } catch (message) {
//     console.error("Errore: ", message);
//     createBannerError(message)
//   } 
// } 
// loadData();

//es.2 fetch con MovieDB//

// stato interno//
const state = {
  config: {
    api_key: '212bebc18fae983c3fa75b9ecd381c54',
    base_url: 'https://api.themoviedb.org/3/',
  },
  movies: null, //chiave//
}

//funzione utility//  
function getUrl(pathName) {
    return `${state.config.base_url}${pathName}?api_key=${state.config.api_key}`
}

//funzione movie popular//
async function getMoviePop(){
  try{
    const response = await fetch(getUrl('movie/popular'));
    
    if(!response.ok){
      throw new Error (`status chiamata ${response.status}`);
    } else {
      const result = await response.json();
      state.movies = result;
      console.log(result);
    }
  } catch(error) {
    createBannerError(error);
  }
} 

  
//load del dom//
document.addEventListener('DOMContentLoaded', getMoviePop);


//Es. 3//
//raccolta input e btn//
const inputData = document.querySelector('input[name="data"]');
const saveBtn = document.querySelector('#save');
const removeBtn = document.querySelector('#remove');

//accesso locale storage//
function getTestStorage(){
  const testStorage = localStorage.getItem("test_storage");
  if (testStorage) {
    console.log("chiave test storage già presente: ", testStorage);
  }
}

//presa input e set//
function save(){
  const getInput = inputData.value;
  localStorage.setItem("test_storage", getInput);
}

//remove key//
function remove (){
  localStorage.removeItem("test_storage");
}


saveBtn.addEventListener('click', save);

removeBtn.addEventListener('click', remove);

document.addEventListener('DOMContentLoaded', getTestStorage)