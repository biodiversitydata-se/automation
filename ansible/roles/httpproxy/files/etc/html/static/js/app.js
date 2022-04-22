!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},i={},o={}.hasOwnProperty,s=/^\.\.?(\/|$)/,r=function(e,t){for(var n,i=[],o=(s.test(t)?e+"/"+t:t).split("/"),r=0,a=o.length;r<a;r++)n=o[r],".."===n?i.pop():"."!==n&&""!==n&&i.push(n);return i.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},l=function(t){return function(n){var i=r(a(t),n);return e.require(i,t)}},c=function(e,t){var i=h&&h.createHot(e),o={id:e,exports:{},hot:i};return n[e]=o,t(o.exports,l(e),o),o.exports},u=function(e){var t=i[e];return t&&e!==t?u(t):e},d=function(e,t){return u(r(a(e),t))},g=function(e,i){null==i&&(i="/");var s=u(e);if(o.call(n,s))return n[s].exports;if(o.call(t,s))return c(s,t[s]);throw new Error("Cannot find module '"+e+"' from '"+i+"'")};g.alias=function(e,t){i[t]=e};var p=/\.[^.\/]+$/,f=/\/index(\.[^\/]+)?$/,v=function(e){if(p.test(e)){var t=e.replace(p,"");o.call(i,t)&&i[t].replace(p,"")!==t+"/index"||(i[t]=e)}if(f.test(e)){var n=e.replace(f,"");o.call(i,n)||(i[n]=e)}};g.register=g.define=function(e,i){if(e&&"object"==typeof e)for(var s in e)o.call(e,s)&&g.register(s,e[s]);else t[e]=i,delete n[e],v(e)},g.list=function(){var e=[];for(var n in t)o.call(t,n)&&e.push(n);return e};var h=e._hmr&&new e._hmr(d,g,t,n);g._cache=n,g.hmr=h&&h.wrap,g.brunch=!0,e.require=g}}(),function(){var e;"undefined"==typeof window?this:window;require.register("js/autocomplete-conf.js",function(e,t,n){"use strict";var i=t("./settings"),o=i.services.bieService.url;window.BC_CONF=window.BC_CONF||{},BC_CONF.autocompleteURL=o+"/search/auto.json"}),require.register("js/i18next-config.js",function(e,t,n){"use strict";var i=t("./settings"),o=t("i18next"),s=t("jquery-i18next"),r=t("i18next-http-backend"),a=t("i18next-browser-languagedetector"),l=t("i18next-localstorage-cache"),c=t("domurl"),u=t("js-cookie"),d={loadPath:"https://static.biodiversitydata.se/locales/{{lng}}/{{ns}}",crossDomain:!0},g=new c,p="la-lang-session",f={backend:d,fallbackLng:{zh:["en"],"sw-TZ":["en"],"default":["en"]},sendMissingTo:"fallback",interpolation:{escapeValue:!1,formatSeparator:",",format:function(e,t,n){return"uppercase"===t?e.toUpperCase():e instanceof Date?moment(e).format(t):"number"===t?Intl.NumberFormat(n).format(e):e}},whitelist:i.enabledLangs,load:"languageOnly",debug:!0,ns:"common",defaultNS:"common",saveMissing:!0,saveMissingTo:"en",keySeparator:"ß",nsSeparator:"ð",pluralSeparator:"đ"},v={order:["querystring","cookie","navigator","localStorage","htmlTag"],lookupQuerystring:"lang",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",cookieMinutes:525600,caches:["cookie"],excludeCacheFor:["cimode"]};"localhost:3333"!==document.location.host&&(v.cookieDomain=i.mainDomain);var h={enabled:!1,prefix:"i18next_res_",expirationTime:6048e5,versions:{}};f.cache=h,f.detection=v,f.sendMissing=!1,f.missingKeyHandler=function(e,t,n,i){console.log('"'+n+'": "'+i+'"')},o.on("languageChanged",function(e){o.services.languageDetector&&(console.log("On lang changed "+e),o.services.languageDetector.cacheUserLanguage(e))}),function(e){o.use(r).use(a).use(l).init(f,function(t,n){if(t)return void console.error(t);if(console.log("Language initialized: "+o.language),s.init(o,e,{i18nName:"i18next"}),console.log("jquery i18next initialized"),e("body").localize(),e(".locale-link").on("click",function(t){t.preventDefault();var n=e(this).data("locale");console.log("Lang clicked "+n),o.changeLanguage(n),g.query.lang=n,document.location.search=g.query}),e("#dropdown-lang").length&&e("#dropdown-lang").find(".dropdown-toggle").html(o.language+' <span class="caret"></span>'),"undefined"==typeof u.get(p)&&"undefined"==typeof g.query.lang){var i=1/48;u.set(p,"/",{expires:i}),g.query.lang=o.language,document.location.search=g.query}})}(jQuery)}),require.register("js/index-auth.js",function(e,t,n){"use strict";var i=t("js-cookie"),o=t("js/settings"),s="ALA-Auth",r=function(){if(document.location.origin!==o.mainLAUrl&&"localhost:3333"!==document.location.host||"/"!==document.location.pathname)o.isDevel&&console.log("We aren't in the main url");else{o.isDevel&&console.log("We are in the main url, let's see if we are authenticated");var e=i.get(s,{domain:o.mainDomain,path:"/"}),t=1/48;"undefined"==typeof e&&"localhost:3333"===document.location.host&&(console.log("We set a test cookie if we are in development"),i.set(s,"/",{expires:t})),"undefined"!=typeof e?(o.isDevel&&console.log("Auth cookie present so logged in"),$("#dropdown-auth-menu").removeClass("::loginStatus::").addClass("signedIn"),$("#auth-header-buttons").removeClass("::loginStatus::").addClass("signedIn")):(o.isDevel&&console.log("No auth cookie not present so not-logged in"),$("#dropdown-auth-menu").removeClass("::loginStatus::").addClass("signedOut"),$("#auth-header-buttons").removeClass("::loginStatus::").addClass("signedOut"))}};$(function(){var e=setInterval(function(){window.jQuery&&$("#dropdown-auth-menu").length?(clearInterval(e),r()):o.isDevel&&console.log("drawer not loaded")},1e3)})}),require.register("js/init.js",function(e,t,n){"use strict";t("./settings.js")["default"],t("./index-auth.js"),t("./i18next-config.js"),t("./mante.js"),t("./stats.js"),t("./autocomplete-conf.js"),document.addEventListener("DOMContentLoaded",function(){console.log("LA skin initialized")})}),require.register("js/mante.js",function(e,t,n){"use strict";var i=t("./settings");$(function(){if(i.inMante){console.log("Setting manteinance banner");var e='<div class="row">\n    <div class="col-md-6">\n      <div class="error-template">\n        <h1 data-i18n="error.title"></h1>\n        <h2 data-i18n="error.subtitle"></h2>\n        <div>\n          <p data-i18n="error.description"></p>\n        </div>\n        <div class="error-actions">\n          <a data-i18n="error.button" href="'+i.mainLAUrl+'" style="margin-top: 10px;" class="btn btn-primary btn-lg"></a>\n        </div>\n      </div>\n    </div>\n    <div class="col-md-6">\n      <img src="images/error.svg" alt="Error Image" onerror="this.onerror=null; this.src=\'images/error.png\'">\n    </div>\n  </div>';$("#mante-container").html(e),$("#mante-container").show()}})}),require.register("js/settings.js",function(e,t,n){"use strict";n.exports={isDevel:!0,inMante:!1,enabledLangs:["en"],mainDomain:"static.biodiversitydata.se",mainLAUrl:"https://static.biodiversitydata.se",baseFooterUrl:"https://static.biodiversitydata.se",theme:"sbdi",services:{collectory:{url:"https://collections.biodiversitydata.se",title:"Collections"},biocache:{url:"https://records.biodiversitydata.se",title:"Occurrence records"},biocacheService:{url:"https://records.biodiversitydata.se/ws",title:"Occurrence records webservice"},bie:{url:"https://species.biodiversitydata.se",title:"Species"},bieService:{url:"https://species.biodiversitydata.se/ws",title:"Species webservice"},regions:{url:"https://regions.biodiversitydata.se",title:"Regions"},lists:{url:"https://lists.biodiversitydata.se",title:"Species List"},spatial:{url:"https://spatial.biodiversitydata.se",title:"Spatial Portal"},images:{url:"https://images.biodiversitydata.se",title:"Images Service"},cas:{url:"https://auth.biodiversitydata.se",title:"CAS"}},otherLinks:[{title:"Datasets",url:"https://collections.biodiversitydata.se/datasets"},{title:"Explore your area",url:"http://records.biodiversitydata.se/explore/your-area/"},{title:"Datasets",url:"https://collections.biodiversitydata.se/datasets"},{title:"twitter",url:"",icon:"twitter"}]}}),require.register("js/stats.js",function(e,t,n){"use strict";var i=t("./settings"),o=t("countup.js"),s=o.CountUp,r=i.services.collectory.url,a=i.services.biocacheService.url,l=function(e,t,n){var o={separator:",",duration:1};0===t&&i.isDevel&&(t=123456),o.startVal=Math.round(t-4*t/100),console.log("Start val "+o.startVal+" to "+t);var r=new s(e,t,o);r.error?console.error(r.error):r.start(function(){$("#"+e).addClass("loaded_stats"),"undefined"!=typeof n&&n()})},c=function(e,t){i.isDevel?t(e.indexOf("species")>-1?[{count:10402}]:{totalRecords:86965283,total:12922}):$.getJSON(e,t)},u=function(){c(a+"/occurrences",function(e){l("stats_occurrences",e.totalRecords,function(){return c(r+"/ws/dataResource/count",function(e){l("stats_datasets",e.total,function(){return c(r+"/ws/institution/count",function(e){l("stats_institutions",e.total)})})})})}),c(a+"/occurrence/facets?q=*:*&facets=species&pageSize=0",function(e){l("stats_species",e[0].count)})};document.addEventListener("DOMContentLoaded",function(){document.location.origin!==i.mainLAUrl&&"localhost:3333"!==document.location.host||"/"!==document.location.pathname||u()})}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___");