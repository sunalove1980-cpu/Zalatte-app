import{c as d,d as l}from"./index-D2MlFLW1.js";import{y as f,j as y}from"./firebase-TKKxe5x6.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],m=d("plus",p);async function g({coupleId:t,senderId:a,senderName:o,senderCharacter:c,type:e,title:r,body:i,targetId:n}){try{await f(y(l,"notifications"),{coupleId:t,senderId:a,senderName:o,senderCharacter:c,type:e,title:r,body:i,targetId:n||null,createdAt:new Date,read:!1,readBy:[a]})}catch(s){console.error("Error creating notification:",s)}}export{m as P,g as c};
