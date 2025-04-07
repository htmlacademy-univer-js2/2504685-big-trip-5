(()=>{var t={826:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",r="second",s="minute",a="hour",i="day",l="week",o="month",c="quarter",u="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,_=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},p=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:p,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+p(r,2,"0")+":"+p(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,o),a=n-s<0,i=e.clone().add(r+(a?-1:1),o);return+(-(r+(n-s)/(a?s-i:i-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:u,w:l,d:i,D:d,h:a,m:s,s:r,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",b={};b[$]=m;var g=function(t){return t instanceof D},y=function t(e,n,r){var s;if(!e)return $;if("string"==typeof e){var a=e.toLowerCase();b[a]&&(s=a),n&&(b[a]=n,s=a);var i=e.split("-");if(!s&&i.length>1)return t(i[0])}else{var l=e.name;b[l]=e,s=l}return!r&&s&&($=s),s||!r&&$},w=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},M=v;M.l=y,M.i=g,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=y(t.locale,null,!0),this.parse(t)}var p=m.prototype;return p.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(f);if(r){var s=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},p.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},p.$utils=function(){return M},p.isValid=function(){return!(this.$d.toString()===h)},p.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},p.isAfter=function(t,e){return w(t)<this.startOf(e)},p.isBefore=function(t,e){return this.endOf(e)<w(t)},p.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(t,e){var n=this,c=!!M.u(e)||e,h=M.p(t),f=function(t,e){var r=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?r:r.endOf(i)},_=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,p=this.$M,v=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case u:return c?f(1,0):f(31,11);case o:return c?f(1,p):f(0,p+1);case l:var b=this.$locale().weekStart||0,g=(m<b?m+7:m)-b;return f(c?v-g:v+(6-g),p);case i:case d:return _($+"Hours",0);case a:return _($+"Minutes",1);case s:return _($+"Seconds",2);case r:return _($+"Milliseconds",3);default:return this.clone()}},p.endOf=function(t){return this.startOf(t,!1)},p.$set=function(t,e){var l,c=M.p(t),h="set"+(this.$u?"UTC":""),f=(l={},l[i]=h+"Date",l[d]=h+"Date",l[o]=h+"Month",l[u]=h+"FullYear",l[a]=h+"Hours",l[s]=h+"Minutes",l[r]=h+"Seconds",l[n]=h+"Milliseconds",l)[c],_=c===i?this.$D+(e-this.$W):e;if(c===o||c===u){var m=this.clone().set(d,1);m.$d[f](_),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](_);return this.init(),this},p.set=function(t,e){return this.clone().$set(t,e)},p.get=function(t){return this[M.p(t)]()},p.add=function(n,c){var d,h=this;n=Number(n);var f=M.p(c),_=function(t){var e=w(h);return M.w(e.date(e.date()+Math.round(t*n)),h)};if(f===o)return this.set(o,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===i)return _(1);if(f===l)return _(7);var m=(d={},d[s]=t,d[a]=e,d[r]=1e3,d)[f]||1,p=this.$d.getTime()+n*m;return M.w(p,this)},p.subtract=function(t,e){return this.add(-1*t,e)},p.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),a=this.$H,i=this.$m,l=this.$M,o=n.weekdays,c=n.months,u=function(t,n,s,a){return t&&(t[n]||t(e,r))||s[n].slice(0,a)},d=function(t){return M.s(a%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:M.s(l+1,2,"0"),MMM:u(n.monthsShort,l,c,3),MMMM:u(c,l),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,o,2),ddd:u(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(a),HH:M.s(a,2,"0"),h:d(1),hh:d(2),a:f(a,i,!0),A:f(a,i,!1),m:String(i),mm:M.s(i,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return r.replace(_,(function(t,e){return e||m[t]||s.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(n,d,h){var f,_=M.p(d),m=w(n),p=(m.utcOffset()-this.utcOffset())*t,v=this-m,$=M.m(this,m);return $=(f={},f[u]=$/12,f[o]=$,f[c]=$/3,f[l]=(v-p)/6048e5,f[i]=(v-p)/864e5,f[a]=v/e,f[s]=v/t,f[r]=v/1e3,f)[_]||v,h?$:M.a($)},p.daysInMonth=function(){return this.endOf(o).$D},p.$locale=function(){return b[this.$L]},p.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=y(t,e,!0);return r&&(n.$L=r),n},p.clone=function(){return M.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},m}(),T=D.prototype;return w.prototype=T,[["$ms",n],["$s",r],["$m",s],["$H",a],["$W",i],["$M",o],["$y",u],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,D,w),t.$i=!0),w},w.locale=y,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=b[$],w.Ls=b,w.p={},w}()}},e={};function n(r){var s=e[r];if(void 0!==s)return s.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class r{getTemplate(){return'<section class="board container"></section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<div class="board__sort-list">\n      <a href="#" class="board__sort-item">SORT BY DEFAULT</a>\n      <a href="#" class="board__sort-item">SORT BY DATE up</a>\n      <a href="#" class="board__sort-item">SORT BY DATE down</a>\n    </div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<div class="board__tasks"></div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var i=n(826),l=n.n(i);function o(t){return t[Math.floor(Math.random()*t.length)]}function c(t){return t?l()(t).format("D MMMM"):""}function u(t){return Object.values(t).some(Boolean)}class d{constructor({task:t}){this.task=t}getTemplate(){return function(t){const{color:e,description:n,dueDate:r,repeating:s,isArchive:a,isFavorite:i}=t,o=c(r),d=function(t){return t&&l()().isAfter(t,"D")}(r)?"card--deadline":"";return`<article class="card card--${e} ${d} ${u(s)?"card--repeat":""}">\n      <div class="card__form">\n        <div class="card__inner">\n          <div class="card__control">\n            <button type="button" class="card__btn card__btn--edit">\n              edit\n            </button>\n            <button type="button" class="card__btn ${a?"card__btn--archive card__btn--disabled":"card__btn--archive"}">\n              archive\n            </button>\n            <button\n              type="button"\n              class="card__btn ${i?"card__btn--favorites card__btn--disabled":"card__btn--favorites"}"\n            >\n              favorites\n            </button>\n          </div>\n          <div class="card__color-bar">\n            <svg class="card__color-bar-wave" width="100%" height="10">\n              <use xlink:href="#wave"></use>\n            </svg>\n          </div>\n          <div class="card__textarea-wrap">\n            <p class="card__text">${n}</p>\n          </div>\n          <div class="card__settings">\n            <div class="card__details">\n              <div class="card__dates">\n                <div class="card__date-deadline">\n                  <p class="card__input-deadline-wrap">\n                    <span class="card__date">${o}</span>\n                  </p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </article>`}(this.task)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const h=["black","yellow","blue","green","pink","purple"],f={color:h[0],description:"",dueDate:null,repeating:{mo:!1,tu:!1,we:!1,th:!1,fr:!1,sa:!1,su:!1},isArchive:!1,isFavorite:!1};class _{constructor({task:t=f}){this.task=t}getTemplate(){return function(t){const{color:e,description:n,dueDate:r,repeating:s}=t,a=function(t){return`<button class="card__date-deadline-toggle" type="button">\n      date: <span class="card__date-status">${null!==t?"yes":"no"}</span>\n    </button>\n    ${null!==t?`<fieldset class="card__date-deadline">\n      <label class="card__input-deadline-wrap">\n        <input\n          class="card__date"\n          type="text"\n          placeholder=""\n          name="date"\n          value="${c(t)}"\n        />\n      </label>\n    </fieldset>`:""}\n  `}(r),i=u(s)?"card--repeat":"",l=function(t){return`<button class="card__repeat-toggle" type="button">\n      repeat:<span class="card__repeat-status">${u(t)?"yes":"no"}</span>\n    </button>\n  ${u(t)?`<fieldset class="card__repeat-days">\n    <div class="card__repeat-days-inner">\n      ${Object.entries(t).map((([t,e])=>`<input\n        class="visually-hidden card__repeat-day-input"\n        type="checkbox"\n        id="repeat-${t}"\n        name="repeat"\n        value="${t}"\n        ${e?"checked":""}\n      />\n      <label class="card__repeat-day" for="repeat-${t}"\n        >${t}</label\n      >`)).join("")}\n    </div>\n  </fieldset>`:""}`}(s),o=(d=e,h.map((t=>`<input\n    type="radio"\n    id="color-${t}"\n    class="card__color-input card__color-input--${t} visually-hidden"\n    name="color"\n    value="${t}"\n    ${d===t?"checked":""}\n  />\n  <label\n    for="color-${t}"\n    class="card__color card__color--${t}"\n    >${t}</label\n  >`)).join(""));var d;return`<article class="card card--edit card--${e} ${i}">\n      <form class="card__form" method="get">\n        <div class="card__inner">\n          <div class="card__color-bar">\n            <svg class="card__color-bar-wave" width="100%" height="10">\n              <use xlink:href="#wave"></use>\n            </svg>\n          </div>\n          <div class="card__textarea-wrap">\n            <label>\n              <textarea\n                class="card__text"\n                placeholder="Start typing your text here..."\n                name="text"\n              >${n}</textarea>\n            </label>\n          </div>\n          <div class="card__settings">\n            <div class="card__details">\n              <div class="card__dates">\n                ${a}\n                ${l}\n              </div>\n            </div>\n            <div class="card__colors-inner">\n              <h3 class="card__colors-title">Color</h3>\n                ${o}\n              </div>\n            </div>\n          </div>\n          <div class="card__status-btns">\n            <button class="card__save" type="submit">save</button>\n            <button class="card__delete" type="button">delete</button>\n          </div>\n        </div>\n      </form>\n    </article>`}(this.task)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{getTemplate(){return'<button class="load-more" type="button">load more</button>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const p=[{description:"Сделать домашку",dueDate:null,repeating:{mo:!1,tu:!1,we:!0,th:!1,fr:!1,sa:!0,su:!1},color:o(h),isArchive:!1,isFavorite:!0},{description:"Завести кота",dueDate:null,repeating:{mo:!1,tu:!1,we:!1,th:!1,fr:!1,sa:!1,su:!1},color:o(h),isArchive:!1,isFavorite:!1},{description:"Купить доллары",dueDate:new Date("2014-01-01"),repeating:{mo:!1,tu:!1,we:!1,th:!1,fr:!1,sa:!1,su:!1},color:o(h),isArchive:!0,isFavorite:!1},{description:"Пройти интенсив на соточку",dueDate:new Date("2023-06-26"),repeating:{mo:!1,tu:!1,we:!1,th:!1,fr:!1,sa:!1,su:!1},color:o(h),isArchive:!1,isFavorite:!0}];function v(){return o(p)}const $=document.querySelector(".main"),b=$.querySelector(".main__control"),g=new class{tasks=Array.from({length:4},v);getTasks(){return this.tasks}},y=new class{boardComponent=new r;taskListComponent=new a;constructor({boardContainer:t,tasksModel:e}){this.boardContainer=t,this.tasksModel=e}init(){this.boardTasks=[...this.tasksModel.getTasks()],e(this.boardComponent,this.boardContainer),e(new s,this.boardComponent.getElement()),e(new _({task:this.boardTasks[0]}),this.taskListComponent.getElement()),e(new _,this.taskListComponent.getElement());for(let t=1;t<this.boardTasks.length;t++)e(new d({task:this.boardTasks[t]}),this.taskListComponent.getElement());e(new m,this.boardComponent.getElement())}}({boardContainer:$,tasksModel:g});e(new class{getTemplate(){return'<button class="control__button">+ ADD NEW TASK</button>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},b),e(new class{getTemplate(){return'<section class="main__filter filter container">\n      <input\n        type="radio"\n        id="filter__all"\n        class="filter__input visually-hidden"\n        name="filter"\n        checked\n      />\n      <label for="filter__all" class="filter__label">\n        All <span class="filter__all-count">13</span></label\n      >\n      <input\n        type="radio"\n        id="filter__overdue"\n        class="filter__input visually-hidden"\n        name="filter"\n        disabled\n      />\n      <label for="filter__overdue" class="filter__label"\n        >Overdue <span class="filter__overdue-count">0</span></label\n      >\n      <input\n        type="radio"\n        id="filter__today"\n        class="filter__input visually-hidden"\n        name="filter"\n        disabled\n      />\n      <label for="filter__today" class="filter__label"\n        >Today <span class="filter__today-count">0</span></label\n      >\n      <input\n        type="radio"\n        id="filter__favorites"\n        class="filter__input visually-hidden"\n        name="filter"\n      />\n      <label for="filter__favorites" class="filter__label"\n        >Favorites <span class="filter__favorites-count">1</span></label\n      >\n      <input\n        type="radio"\n        id="filter__repeating"\n        class="filter__input visually-hidden"\n        name="filter"\n      />\n      <label for="filter__repeating" class="filter__label"\n        >Repeating <span class="filter__repeating-count">1</span></label\n      >\n      <input\n        type="radio"\n        id="filter__archive"\n        class="filter__input visually-hidden"\n        name="filter"\n      />\n      <label for="filter__archive" class="filter__label"\n        >Archive <span class="filter__archive-count">115</span></label\n      >\n    </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},$),y.init()})()})();
//# sourceMappingURL=bundle.1aebd92088c3d33245a7.js.map