import{S as m,i as c}from"./assets/vendor-0fc460d7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function d(o,s){let r=`https://pixabay.com/api/?${new URLSearchParams({key:"45153931-2470322a6efc3ba9ceddb2cb4",image_type:"photo",orientation:"horizontal",safesearch:!0,q:o})}`;return fetch(r).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}let l=new m(".img-list a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250});function f(o,s){const a=o.hits.map(r=>`<li class="gallery-item">
            <a class="gallery-link" href="${r.largeImageURL}">
            <img
            class="gallery-img"
            src="${r.webformatURL}"
            data-source="${r.largeImageURL}"
            alt="${r.tags}">
            </a>
            <div class="img-description">
              <p class="description-text">Likes <span class="description-value"> ${r.likes}</span></p>
              <p class="description-text">Views <span class="description-value"> ${r.views}</span></p>
              <p class="description-text">Comments <span class="description-value"> ${r.comments}</span></p>
              <p class="description-text">Downloads <span class="description-value"> ${r.downloads}</span></p>
            </div>
              </li>`).join("");s.insertAdjacentHTML("afterbegin",a),l.on("show.simplelightbox",function(){}),l.refresh()}const p=document.querySelector(".search-form"),u=document.querySelector(".search-input"),n=document.querySelector(".img-list"),g=document.querySelector(".img-section");p.addEventListener("submit",o=>{o.preventDefault(),n.innerHTML="";const s='<div class="loader"></div>';g.insertAdjacentHTML("afterbegin",s);let a=u.value;const r=document.querySelector(".loader");u.value!==""?d(a).then(e=>{e.total===0?(n.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",iconColor:"#fff",icon:"fa-regular fa-circle-xmark",progressBarColor:"#B51B1B",maxWidth:432,messageSize:"16"}),r.remove()):(f(e,n),r.remove())}).catch(e=>{console.log("This error"),console.log(e)}):(c.error({message:"Please fill the search field!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",iconColor:"#fff",icon:"fa-regular fa-circle-xmark",progressBarColor:"#B51B1B",maxWidth:432,messageSize:"16"}),r.remove())});
//# sourceMappingURL=commonHelpers.js.map
