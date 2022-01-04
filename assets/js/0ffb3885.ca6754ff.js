"use strict";(self.webpackChunk_viotemplate_docs=self.webpackChunk_viotemplate_docs||[]).push([[499],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=a,v=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return r?n.createElement(v,o(o({ref:t},u),{},{components:r})):n.createElement(v,o({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},431:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return p}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],s={sidebar_position:2},l="System Architecture",c={unversionedId:"design-docs/system-architecture",id:"design-docs/system-architecture",title:"System Architecture",description:"Overview",source:"@site/docs/design-docs/system-architecture.md",sourceDirName:"design-docs",slug:"/design-docs/system-architecture",permalink:"/docs/design-docs/system-architecture",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/design-docs/system-architecture.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Intro",permalink:"/docs/design-docs/intro"},next:{title:"Tools",permalink:"/docs/tooling/tools"}},u=[{value:"Overview",id:"overview",children:[],level:2},{value:"Deep dive",id:"deep-dive",children:[{value:"Load Balancer",id:"load-balancer",children:[],level:3},{value:"Server",id:"server",children:[],level:3},{value:"PostgreSQL",id:"postgresql",children:[],level:3},{value:"Redis",id:"redis",children:[],level:3},{value:"S3",id:"s3",children:[],level:3}],level:2}],d={toc:u};function p(e){var t=e.components,s=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"system-architecture"},"System Architecture"),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("p",null,"Initially, the software will be pretty simple."),(0,i.kt)("p",null,"It has a NodeJS server running behind a NGNIX load balancer.\nThe server has access to a relational(PostgreSQL) database and also a in-memory (Redis) database."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Architectural Diagram",src:r(5787).Z})),(0,i.kt)("h2",{id:"deep-dive"},"Deep dive"),(0,i.kt)("h3",{id:"load-balancer"},"Load Balancer"),(0,i.kt)("p",null,"This is an NGINX webserver. It has two main goals:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Serve as a reverse proxy, to make everything HTTPs compliant."),(0,i.kt)("li",{parentName:"ol"},"Serve as a load balancer to distribute the requests between all the server nodes.")),(0,i.kt)("h3",{id:"server"},"Server"),(0,i.kt)("p",null,"This is a REST API written in NodeJS.\nHere we have all the business logic of our software.\nYou can see more details of it at: HERE."),(0,i.kt)("h3",{id:"postgresql"},"PostgreSQL"),(0,i.kt)("p",null,"We'll use a PostgreSQL database used to persist everything related to the business logic."),(0,i.kt)("h3",{id:"redis"},"Redis"),(0,i.kt)("p",null,"We use Redis to serve as cache database. It's particularly helpful for performance and also for some features like authentication where we have a whitelist of JWTs."),(0,i.kt)("h3",{id:"s3"},"S3"),(0,i.kt)("p",null,"This is our blob storage.\nWe'll use Amazon S3 to store static assets such as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Pictures"),(0,i.kt)("li",{parentName:"ul"},"Videos"),(0,i.kt)("li",{parentName:"ul"},"Documents")))}p.isMDXComponent=!0},5787:function(e,t,r){t.Z=r.p+"assets/images/arch-diagram-62565c997862b13ca98b0d95ec0889e4.png"}}]);