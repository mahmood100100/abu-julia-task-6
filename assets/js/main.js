var httpRequest=new XMLHttpRequest();
var result=[];
function getNews(catagory){
httpRequest.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${catagory}`);
httpRequest.send();
httpRequest.onreadystatechange=function(){
   if(httpRequest.readyState==4){
    result=JSON.parse(httpRequest.response).recipes;
    DisplayData();
   }
  }
}
function DisplayData(){
    var data=""
    for(var i=0;i<result.length;i++){
        data+=`<div class="col-xxl-3 col-lg-4 col-sm-6">
          <div class="recipe">
          <a href="recipe-details.html?id=${result[i].recipe_id}" class="text-decoration-none" >
          <img src="${result[i].image_url}" class="w-100" style="height: 250px;">
          <h2 class="text-white fs-5">${result[i].title}</h2>
          </a>
          </div>
        </div>
        `;
    }
    document.getElementById("data").innerHTML=data;
}
var all_links=document.querySelectorAll(".navbar .navbar-nav .nav-link");
for(var i=0;i<all_links.length;i++){
  all_links[i].addEventListener('click',(e)=>{
     getNews(e.target.innerHTML);
  })
}
function Display_rDetails(){
  var result=[];
  var recipe_details=document.querySelector(".recipes-details > div");
  var id=location.href.split("?")[1].split("=")[1];
  var httpRequest=new XMLHttpRequest();
  httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  httpRequest.send();
  httpRequest.onreadystatechange=function(){
    if(httpRequest.readyState==4){
       result=JSON.parse(httpRequest.response).recipe;
      recipe_details.innerHTML=`
       <div class="recipe-data d-flex flex-column align-items-center ">
        <img src="${result.image_url}" class="w-50" style="height: 350px;"/>
        <h2 class="text-white ">${result.title}</h2>
        <p class="text-center w-50 text-white fs-5 fw-bold">${result.ingredients}</p>
       </div>
      `;
    }
  }
}
Display_rDetails();
