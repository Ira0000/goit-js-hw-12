import{S as C,i as y}from"./assets/vendor-0fc460d7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();function b(o,e,a){return axios.get("https://pixabay.com/api/",{params:{key:"45153931-2470322a6efc3ba9ceddb2cb4",image_type:"photo",orientation:"horizontal",safesearch:!0,q:o,per_page:a,page:e}})}let g=new C(".img-list a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250});function L(o,e){const a=o.map(t=>`<li class="gallery-item">
            <a class="gallery-link" href="${t.largeImageURL}">
            <img
            class="gallery-img"
            src="${t.webformatURL}"
            data-source="${t.largeImageURL}"
            alt="${t.tags}">
            </a>
            <div class="img-description">
              <p class="description-text">Likes <span class="description-value"> ${t.likes}</span></p>
              <p class="description-text">Views <span class="description-value"> ${t.views}</span></p>
              <p class="description-text">Comments <span class="description-value"> ${t.comments}</span></p>
              <p class="description-text">Downloads <span class="description-value"> ${t.downloads}</span></p>
            </div>
              </li>`).join("");e.insertAdjacentHTML("beforeend",a),g.on("show.simplelightbox",function(){}),g.refresh()}const S=document.querySelector(".search-form"),B=document.querySelector(".search-input"),u=document.querySelector(".img-list"),p=document.querySelector(".load-more-btn"),x=document.querySelector(".loader");function f(o){y.error({message:o,position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",iconColor:"#fff",icon:"fa-regular fa-circle-xmark",progressBarColor:"#B51B1B",maxWidth:432,messageSize:"16"})}let c=1;const h=15;let m,l;class w{constructor(e,a){this.buttonEL=e,this.hiddenClass=a}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const i=new w(p,"is-hidden"),n=new w(x,"is-hidden");i.hide();n.hide();S.addEventListener("submit",E);async function E(o){if(o.preventDefault(),i.hide(),u.innerHTML="",l=B.value.trim(),n.show(),l===""){i.hide(),n.hide(),f("Please fill the search field!");return}else{c=1;try{const e=await b(l,c,h),a=e.data.hits,t=e.data.totalHits;m=Math.ceil(t/h),t>0?(i.show(),i.disable(),L(a,u),n.hide()):(n.hide(),f("Sorry, there are no images matching your search query. Please try again!"),i.hide()),m>1?(i.enable(),p.addEventListener("click",v)):i.hide()}catch(e){console.log(`Помилка під час запиту: ${e.message}`)}finally{o.currentTarget.reset()}}}async function v(){i.disable(),c=c+1,n.show();try{const e=(await b(l,c,h)).data.hits;L(e,u);let t=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:2*t.height,behavior:"smooth"}),n.hide()}catch(o){console.error(`Error during request: ${o.message}`)}finally{c===m?(i.hide(),p.removeEventListener("click",v),y.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#8AC7DB",messageColor:"#000",iconColor:"#000",icon:"fa-solid fa-circle-info",progressBarColor:"#B51B1B",maxWidth:432,messageSize:"16"})):i.enable()}}
//# sourceMappingURL=commonHelpers.js.map
