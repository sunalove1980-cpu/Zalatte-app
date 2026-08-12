import{c as s,n as d,a as l,b as f}from"./index-Bx7ULHQe.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],y=s("plus",h);async function u({coupleId:a,senderId:t,senderName:c,senderCharacter:o,type:e,title:n,body:r}){try{await d(l(f,"notifications"),{coupleId:a,senderId:t,senderName:c,senderCharacter:o,type:e,title:n,body:r,createdAt:new Date,read:!1})}catch(i){console.error("Error creating notification:",i)}}export{y as P,u as c};
