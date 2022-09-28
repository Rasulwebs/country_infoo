"use strict";

//=============== data api func =============================
async function allCountry() {
    const response = await fetch("https://restcountries.com/v2/all");
    const result = await response.json();
    renderData(result);
}
allCountry();

// ==================== dynamic crelement func =================
function renderData(data = []) {
    if (data.length === 0) {
        $(".box_wrapp").innerHTML = `<div class="shapes-4"></div>`;
    } else {
        $(".box_wrapp").innerHTML = ""
        data.forEach((item) => {
            const card = crElement(
                "div",
                "row box  p-2 d-flex my-2",
                `     <img src="${item.flags.png}" alt="flag" class="box-img col-lg-3 col-md-4 col-sm-12 border p-0"> 
                 
        <div class="box-body col-lg-8 col-md-7 col-sm-12 ">
        <h3 class="countr_title mt-4">
        ${item.name}
        </h3>
         <p class="box_text ">
          ${item.nativeName}
          </p>
         </div>
                
       `
            );
            card.dataset.info = item.name
            $(".box_wrapp").appendChild(card);

            card.addEventListener("click", (e) => {
                // console.log(card.getAttribute("data-info"));
                renderModal(card.getAttribute("data-info").toLowerCase())
            });
        });
    }
};

renderData()


//============================  name api func ===========================
async function searchCountry(query) {
    $(".box_wrapp").innerHTML = `<div class="shapes-4"></div>`;
    const nameInfo = await fetch(`https://restcountries.com/v2/name/${query}`);
    // console.log(query);
    const res = await nameInfo.json();
    $(".box_wrapp").innerHTML = "";
    if (res.message) {
        $(".box_wrapp").innerHTML = `<h2 class="text-warning fs-1 text-center m-5">Not Found</h2>`
    } else {
        renderData(res);
    }


    // console.log(res);
};


//============================= name search  func ==========================
$(".name_search").addEventListener("keyup", (e) => {

    if (e.target.value.length === 0) {
        allCountry()
    } else {
        searchCountry(e.target.value.trim().toLowerCase());
    }


    // if(e.keyCode===13){
    //     searchCountry(e.target.value.trim().toLowerCase())
    // }else{
    //     console.log(e.code);
    // }
});


//================= modal window func =====================
// $(".modal_wrapp").style.display = "block";
// async function renderModal(info) {
//     const nameInfo = await fetch(`https://restcountries.com/v2/name/${info}`);
//     const res = await nameInfo.json();
//     const modalCard = crElement('div', 'modal_info d-flex flex-column', `<img src="${res[0].flags.png}" alt="rasm" >
//     <h2>${res[0].name}</h2>`);
//     $(".modal_wrapp").style.display = "flex";
//     $(".modal_content").appendChild(modalCard)
//     // console.log(res);
//     // console.log(info);
// }

$('.modal-content').style.display="none";

async function renderModal(data){

   const result = await fetch(`https://restcountries.com/v2/name/${data}`);
   const res = await result.json();

   const modal=crElement('div', 'col-12 modals p-3 d-flex flex-column justify-content-center' , `  <img src="${res[0].flags.png}" alt="rasm" class="modal_imgg ">
   <div class="modall_info row">
   <h2 class="modal_title text-center mt-3">${res[0].name}</h2>
   <div class="col-lg-6 col-md-5 col-sm-12 mt-2">
   <p><strong>Capital:</strong>${res[0].capital}</p>
   <p><strong>Subregion:</strong>${res[0].subregion}</p>
   <p><strong>Callingcode:</strong>${res[0].region}</p>
   <p><strong>Population:</strong>${res[0].population}</p>
   <p><strong>Timezones:</strong>${res[0].timezones[0]}</p>
   
   <p><strong>Callingcode:</strong>${res[0].callingCodes[0]}</p></div>

   <div class="col-lg-6 col-md-5 col-sm-12 mt-2">
   <p><strong>Alphacode:</strong>${res[0].alpha3Code}</p>
   <p><strong>Demon:</strong>${res[0].demonym}</p>
   <p><strong>Area:</strong>${res[0].area}</p>
   <p><strong>Domain:</strong>${res[0].topLevelDomain}</p>
   </div>
   </div>`);


   $('.modal-content').style.display="flex";
   $('.wrapper').appendChild(modal) ;

   console.log(data);
   console.log(res);
}


$('.hideelement').addEventListener('click',()=>{
   $('.wrapper').innerHTML=""
   $('.modal-content').style.display="none";
})









