//https://restcountries.com/v3.1/all
let search = document.forms[0];
let countries = document.getElementById('countrys');
let  moreDetail = document.getElementById('moreDetail');
let mode = document.getElementById('mode');
let header = document.querySelector('header');




const getCountries = async ()=>{
    const response=await fetch('https://restcountries.com/v3.1/all');
    if(response.status != 200){
        throw new Error('Cannot fetch Data')
    }
   const data= await response.json();
   return data
}
getCountries().then( country => {
    console.log(country);
    
   
    for(let x = 0; x < country.length; x++){
       
        const { altSpellings, area, borders,capital,capitalInfo, car, cca2, cca3,ccn3,cioc,
                coatOfArms,continents,currencies,demonyms, fifa, flag, flags,
                gini, idd, independent, landlocked, languages, latlng, maps,
                 name,population,region, startOfWeek,status, subregion,
                 timezones, tld, translations, unMember,
            } = country[x];
            
            
        countries.innerHTML+=` <div class="country" data-region='${region}' data-num="${x}">
        <img src=${flags.png} class='flagimg' height="150px" width="250px" alt="">
        <div class="details">
            <p class="countryName">${name.common}</p>
            <p class="name">Population: <span class="key">${Number(population)}</span></p>
            <p class="name">Region: <span class="key">${region}</span</p>
            <p class="name">Capital: <span class="key">${capital}</span> </p>

        </div>
    </div>` 
    }
  


}).catch( err => {
    console.log("there is an error:",err.message)
})
//search function 
search.addEventListener('keyup', find)
function find(){
    let searchValue=search.querySelector(['input[type="text"]']).value.toLowerCase();
    let countrys=document.querySelectorAll('.country')
    countrys.forEach( country => {
        let counName = country.querySelector('.countryName').innerText.toLowerCase();
        if(counName.indexOf(searchValue) != -1)
        {
            country.style.display = 'block'
        }
        else
        {
            country.style.display = 'none';
        }
        
    } )
}
//filter function
let filter = document.querySelector('.region')
filter.addEventListener('change',function(){
    console.log(filter.value)
    let count=document.querySelectorAll('.country')
    count.forEach( country => {
        country.style.display='none';
        let region = country.getAttribute('data-region');
        console.log(region)
      if(filter.value == "All"){
        country.style.display="block"


      }
       if (filter.value == region  ){
        country.style.display="block" }
    //    
        

    })
   
})




let body = document.body;


body.onclick = function(){
    let country=document.querySelectorAll('.country')
    let countriesList=document.getElementById('countriesList')
    let region = document.querySelector('.region');
    let backBtn = document.querySelector('.backBtn');
    let search = document.querySelector('.search');
    let border = document.querySelectorAll('.border');
    let moon = document.querySelector('#moon');











    // do display detail on a country
    if(event.target.className == 'flagimg' || event.target.className == 'details')
     {
        choose(event.target.parentElement.getAttribute("data-num"))
        countriesList.style.display='none';
        moreDetail.style.display="block";
   
    }
    // to go back to list of countries
    if(event.target.classList.contains('backBtn') || event.target.classList.contains("arrow") ){
        moreDetail.style.display="none";
        countriesList.style.display='block';
        moreDetail.innerHTML=''
     
    }
    // button that changes dark or light mode
    if(event.target.id=="mode"){

        if(moon.classList.contains('moon')){
            moon.classList.remove('moon');
            moon.src="/image/icon-moon.svg";
        }
        else{
            moon.classList.add('moon');
            moon.src="/image/icon-moonblack.svg";
        }
        
            body.classList.toggle('dark');
            header.classList.toggle('headDark');
            search.classList.toggle('countryDark');
            region.classList.toggle('countryDark');
      
            country.forEach( countrys => {
                countrys.classList.toggle('countryDark');
            })
            if(moreDetail.style.display=='block'){
                border.forEach( b => {
                    b.classList.toggle('countryDark')
                })
                backBtn.classList.toggle('countryDark');
                
            }
           


           
           

        
}




}



function choose(num){
    
getCountries().then( country => {
   
    for(let x = 0; x < country.length; x++){
       
        const { altSpellings, area, borders,capital,capitalInfo, car, cca2, cca3,ccn3,cioc,
            coatOfArms,continents,currencies,demonyms, fifa, flag, flags,
             gini, idd, independent, landlocked, languages, latlng, maps,
            name,population,region, startOfWeek,status, subregion,
             timezones, tld, translations, unMember,
            } = country[num];

     let narr = (name.nativeName != undefined ) ? Object.values(name.nativeName): undefined;
     let ncurr = (currencies !=undefined ) ? Object.values(currencies): undefined;
     let nlang = (languages !=undefined ) ? Object.values(languages): undefined;
    
    moreDetail.innerHTML=`
    <button class="backBtn">Back</button>
    <i class="material-icons arrow" style="font-size:18px">keyboard_backspace</i>
    <div id="bigDetails">
        <img class="bigFlags" src=${flags.png}  alt="">
        <div id="fullDetails">
            <p class="countryName1">${name.common}</p>
            <div id="smalldetails">
                <div id="firstDetails">
                     
                     <p class="name1">Native Name: <span class="key">${(narr == undefined) ? 'none' :
                      (narr.length == 1) ? narr[0].common : (narr.length == 2) ? narr[1].common : narr[2].common }</span> </p>
                     <p class="name1">Population: <span class="key">${Number(population)}</span></p>
                     <p class="name1">Region: <span class="key">${region}</span</p>
                     <p class="name1">Sub Region: <span class="key">${subregion}</span</p>
                     <p class="name1">Capital: <span class="key">${capital}</span> </p>
                  </div>
                  <div id="secondDetails" >
                     <p class="name1">Top Level Domain: <span class="key">${tld}</span> </p>
                     <p class="name1">Currencies: <span class="key">${(ncurr == undefined) ? 'None' : ncurr[0].name}</span></p>
                     <p class="name1">Language: <span class="key">${(nlang == undefined) ? 'None' : nlang[0]}  ${(nlang[1] == undefined) ? '' : nlang[1]}  ${(nlang[2] == undefined) ? '' :  nlang[2]}</span</p>
                  </div>
             </div>
             <p class="name1 borderkey">Border countires:  <span class='bord' ><span class="border">${(borders == undefined)? '': borders[0]}</span> <span class="border">${(borders == undefined)? '':(borders[1] == undefined)?'': borders[1]}</span>
             <span class="border">${(borders == undefined)? '':(borders[2] == undefined)? '': borders[2]}</span></span>  </p>

        </div>
        
    </div>`
}
let border = document.querySelectorAll('.border');
let backBtn = document.querySelector('.backBtn');

if(body.classList.contains('dark')){
    backBtn.classList.add('countryDark');
    border.forEach( b => {
            b.classList.add('countryDark');
    })

}
else{
    backBtn.classList.remove('countryDark');
    border.forEach( b => {
            b.classList.remove('countryDark');
    })
}

 
}).catch( err => {
    console.log("there is an error:",err.message)
})

}

