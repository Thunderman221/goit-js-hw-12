import{a as b,i as c,S as E}from"./assets/vendor-b0d10f48.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const L="45010101-f091bc02c96679130727c6b77",P="https://pixabay.com/api/",w=15;let d=1,p="";async function f(){try{const o=await b.get(P,{params:{key:L,q:p,image_type:"photo",orientation:"horizontal",safesearch:"true",page:d,per_page:w}}),s=o.data.hits,n=o.data.totalHits;return{images:s,totalHits:n}}catch(o){throw console.error("Error fetching images:",o),o}}function S(){d=1}function v(){d+=1}function q(o){p=o}function $(){return d}function y(o){const s=document.querySelector(".gallery"),n=o.map(t=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}" data-title="${t.tags}">
        <img 
          class="gallery-image" 
          src="${t.webformatURL}" 
          alt="${t.tags}" 
        />
        <div class="gallery-info">
          <p class="info-item"><b>Likes</b>: ${t.likes}</p>
          <p class="info-item"><b>Views</b>: ${t.views}</p>
          <p class="info-item"><b>Comments</b>: ${t.comments}</p>
          <p class="info-item"><b>Downloads</b>: ${t.downloads}</p>
        </div>
      </a>
    </li>
      `).join("");s.insertAdjacentHTML("beforeend",n)}function I(){c.error({title:"Error",message:"Sorry, there are no images. Please try again!"})}function m(){c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}const g=15;document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector("#search-form"),s=document.querySelector("#search-input"),n=document.querySelector(".gallery"),t=document.querySelector(".loader"),e=document.querySelector("#load-more");if(!o||!s||!n||!e){console.error("Form, input, gallery, or load more button element not found");return}const r=new E(".gallery a",{captions:!0,captionsData:"title",captionDelay:250});let a=0;o.addEventListener("submit",async l=>{l.preventDefault();const u=s.value.trim();if(u===""){c.error({title:"Error",message:"Search query can't be empty!"});return}t.style.display="block",e.style.display="none",q(u),S();try{const{images:i,totalHits:h}=await f();a=h,n.innerHTML="",i.length===0?I():(y(i),r.refresh(),e.style.display=a>g?"block":"none")}catch(i){console.error("Error fetching images:",i),c.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{t.style.display="none"}}),e.addEventListener("click",async()=>{t.style.display="block",v();try{const{images:l}=await f(),u=$();l.length>0?(y(l),r.refresh(),u*g>=a&&(e.style.display="none",m())):(e.style.display="none",m())}catch(l){console.error("Error fetching images:",l),c.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{t.style.display="none"}})});
//# sourceMappingURL=commonHelpers.js.map
