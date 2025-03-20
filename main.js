(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-34",headers:{authorization:"aa682444-a8e1-45de-a12d-7c2e6e14e8b9","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(n,r,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)})(o).then((function(e){r.textContent=e.likes.length,n.classList.add("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при добавлении лайка:",e)}))}function r(n,r,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(o).then((function(e){r.textContent=e.likes.length,n.classList.remove("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при удалении лайка:",e)}))}function o(e,t,n,r,o,c){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__image"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-number");return a.querySelector(".card__image").src=e.link,a.querySelector(".card__title").textContent=e.name,a.querySelector(".card__image").alt="Фотография места: ".concat(e.name),s.textContent=e.likes.length,e.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),e.owner._id!==c?i.remove():i.addEventListener("click",(function(n){return t(n,e._id)})),l.addEventListener("click",(function(){l.classList.contains("card__like-button_is-active")?r(l,s,e._id):n(l,s,e._id)})),u.addEventListener("click",o),a}function c(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){n.target.closest(".places__item").remove()})).catch((function(e){return console.error("Ошибка удаления карточки:",e)}))}var a=function(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))};function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function l(e){e.addEventListener("click",(function(t){t.target===e&&u(document.querySelector(".popup_is-opened"))}));var t=e.querySelector(".popup__close");t&&t.addEventListener("click",(function(){u(document.querySelector(".popup_is-opened"))}))}function s(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__input-error_active"),n.textContent=""}function d(e,t,n){t?(e.disabled=!0,e.classList.add(n.inactiveButtonClass)):(e.disabled=!1,e.classList.remove(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){s(e,t),t.setCustomValidity("")})),d(r,!0,t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f,m=document.querySelector(".content").querySelector(".places__list"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__image"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_image"),L=q.querySelector(".popup__image"),g=q.querySelector(".popup__caption"),k=document.querySelector(".popup_type_new-avatar"),C=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),x=document.querySelector(".profile__image"),A=document.forms["edit-profile"],w=document.forms["new-place"],U=document.forms["new-avatar"],T=document.querySelector(".popup__input_type_name"),j=document.querySelector(".popup__input_type_description"),O=document.querySelector(".popup__input_type_card-name"),B=document.querySelector(".popup__input_type_url"),P=document.querySelector(".popup__input_type_avatar"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input-error",errorClass:"popup__input-error_active"};function I(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";t.textContent=e?"Сохранение...":n}function N(e){var t=e.target.closest(".card");i(q);var n=t.querySelector(".card__image").src,r=t.querySelector(".card__title").textContent,o=t.querySelector(".card__title").textContent;L.src=n,L.alt="Фотография места: ".concat(r),g.textContent=o}b.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),q.classList.add("popup_is-animated"),k.classList.add("popup_is-animated"),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){"url"===t.type||""===t.value.trim()||/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(t.value)?t.setCustomValidity(""):t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"),t.validity.valid?s(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),r.textContent=n,r.classList.add("popup__input-error_active")}(e,t,t.validationMessage)}(e,o),function(e,t,n){var r=function(e){return e.some((function(e){return!e.validity.valid}))}(e);d(t,r,n)}(n,r,t)}))}))}(t,e)}))}(D),A.addEventListener("submit",(function(n){var r;n.preventDefault(),I(!0,n.submitter),(r={name:T.value,about:j.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){C.textContent=e.name,E.textContent=e.about,u(b)})).catch((function(e){console.error("Ошибка при изменении данных профиля:",e)})).finally((function(){I(!1,n.submitter)}))})),w.addEventListener("submit",(function(a){var i;a.preventDefault(),I(!0,a.submitter),(i={name:O.value,link:B.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(i)}).then(t)).then((function(e){e.owner={_id:f};var t=o(e,c,n,r,N,f);m.prepend(t),w.reset(),u(S)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){I(!1,a.submitter)}))})),U.addEventListener("submit",(function(n){var r;n.preventDefault(),I(!0,n.submitter),(r={avatar:P.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){h.style.backgroundImage="url('".concat(e.avatar,"')"),u(k),U.reset()})).catch((function(e){console.error("Ошибка при изменении аватара профиля:",e)})).finally((function(){I(!1,n.submitter)}))})),l(S),l(b),l(q),l(k),y.addEventListener("click",(function(){w.reset(),p(w,D),i(S)})),v.addEventListener("click",(function(){T.value=C.textContent,j.value=E.textContent,p(A,D),i(b)})),h.addEventListener("click",(function(){U.reset(),p(U,D),i(k)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,a,i=(a=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,a)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=i[0],l=i[1];C.textContent=u.name,E.textContent=u.about,x.style.backgroundImage="url('".concat(u.avatar,"')"),f=u._id,l.forEach((function(e){var t=o(e,c,n,r,N,f);m.append(t)}))})).catch((function(e){return console.error("Ошибка при загрузке данных:",e)}))})();