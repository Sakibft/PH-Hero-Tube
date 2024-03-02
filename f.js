const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('cardContainer');
const errorElement = document.getElementById('error-element')
const sortbutton = document.getElementById('sort-btn')
let selectedCategory = 1000;
let sortByView = false;
sortbutton.addEventListener('click', () =>{
  sortByView = true;
  fetchDataByCategories(selectedCategory,sortByView)
})
 const fetchCategories= async() =>{
  const cards = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await cards.json();
  const data2 = data.data;
  data2.forEach(element => {
    // console.log(element);
     const btn = document.createElement('button');
     btn.classList = `category-btn btn btn-ghost bg-gray-200`
     btn.innerHTML = element.category
     btn.addEventListener('click',() =>{
      fetchDataByCategories(element.category_id)
      const allBtns = document.querySelectorAll('.category-btn')
      for(const btn of allBtns){
       btn.classList.remove('bg-red-400')
      }
      btn.classList.add('bg-red-400')
     })
    
     btnContainer.appendChild(btn)
  })
 
 } 

const fetchDataByCategories = (categoryId, sortByView) =>{
  selectedCategory = categoryId;
  const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  fetch (url)
  .then((res) => res.json())
  .then (({data}) => {

    if(sortByView){
      data.sort((a,b)=>{
        const totalViewsStrFirst = a.others?.views;
        const totalViewsStrSecond = b.others?.views;
        const totalViewsFirstNumber =  parseFloat(totalViewsStrFirst.replace("k", '')) || 0;
        const totalViewsSecondNumber =  parseFloat(totalViewsStrSecond.replace("k", '')) || 0;
        return totalViewsSecondNumber - totalViewsFirstNumber;
      })
    }

    if(data.length === 0){
      errorElement.classList.remove('hidden')
    }
    else{
      errorElement.classList.add('hidden')
    }
    cardContainer.innerHTML = '';
    data.forEach(video => {
       let verifiedBadge = '';
      if(video.authors[0].verified){
        verifiedBadge =` <img src="Group 3.png" alt=""></img>`
      }
      console.log(video);
       const card = document.createElement('div');
       card.innerHTML = `
       <div class="card w-full shadow-xl bg-base-100">
    <figure><img class="w-[400px] h-[220px]" src="${video.thumbnail}" alt="Shoes" /></figure>
    <div class="flex mt-3 gap-2 ml-8 ">
      <div>
        <div class="avatar">
          <div class="w-10 rounded-full">
            <img src="${video.authors[0].profile_picture}" />
          </div>
        </div>
      </div>
     <div>
      <h2 class="card-title">${video.title}</h2>
     <div class="flex gap-2 ">
      <p>${video.authors[0].profile_name}</p>
       ${verifiedBadge}
     </div>
     <p class="text-sm mb-2">${video.others.views}</p>
     </div>
       
    </div>
  </div>
       `;
       cardContainer.appendChild(card);
        
    console.log(data);
  })
  console.log(categoryId);
})
}
 fetchCategories();
 fetchDataByCategories(selectedCategory,sortByView)