"use strict";(self.webpackChunk_viotemplate_docs=self.webpackChunk_viotemplate_docs||[]).push([[481],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=l(r),m=o,d=f["".concat(s,".").concat(m)]||f[m]||p[m]||c;return r?n.createElement(d,a(a({ref:t},u),{},{components:r})):n.createElement(d,a({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,a=new Array(c);a[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var l=2;l<c;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3907:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return f}});var n=r(7462),o=r(3366),c=(r(7294),r(3905)),a=["components"],i={sidebar_position:4},s="Checklist",l={unversionedId:"Packages/server/checklist",id:"Packages/server/checklist",title:"Checklist",description:"Before opening a pull request, remember to:",source:"@site/docs/Packages/server/checklist.mdx",sourceDirName:"Packages/server",slug:"/Packages/server/checklist",permalink:"/docs/Packages/server/checklist",editUrl:"https://github.com/otaviotech/ts-monorepo/tree/main/packages/docs/docs/Packages/server/checklist.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"API Documentation",permalink:"/docs/Packages/server/API documentation"}},u=[],p={toc:u};function f(e){var t=e.components,r=(0,o.Z)(e,a);return(0,c.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"checklist"},"Checklist"),(0,c.kt)("p",null,"Before opening a pull request, remember to:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"Write unit/integration tests for your changes."),(0,c.kt)("li",{parentName:"ul"},"Update the OpenAPI spec if you made any changes to it."),(0,c.kt)("li",{parentName:"ul"},"Document your change at the Knowledge Base (the docs package).")),(0,c.kt)("p",null,"It will also be a checklist for reviewing pull-requests."))}f.isMDXComponent=!0}}]);