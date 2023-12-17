import{c as d,d as A,g as q}from"./fast-diff-OpWFUizR.js";import{l as I}from"./lodash.clonedeep-QE15eSxZ.js";import{l as E}from"./lodash.isequal-Mdfy_HT4.js";var g={},M=d&&d.__importDefault||function(f){return f&&f.__esModule?f:{default:f}};Object.defineProperty(g,"__esModule",{value:!0});var $=M(I),L=M(E),j;(function(f){function e(i,n,o){i===void 0&&(i={}),n===void 0&&(n={}),typeof i!="object"&&(i={}),typeof n!="object"&&(n={});var a=$.default(n);o||(a=Object.keys(a).reduce(function(l,h){return a[h]!=null&&(l[h]=a[h]),l},{}));for(var u in i)i[u]!==void 0&&n[u]===void 0&&(a[u]=i[u]);return Object.keys(a).length>0?a:void 0}f.compose=e;function t(i,n){i===void 0&&(i={}),n===void 0&&(n={}),typeof i!="object"&&(i={}),typeof n!="object"&&(n={});var o=Object.keys(i).concat(Object.keys(n)).reduce(function(a,u){return L.default(i[u],n[u])||(a[u]=n[u]===void 0?null:n[u]),a},{});return Object.keys(o).length>0?o:void 0}f.diff=t;function r(i,n){i===void 0&&(i={}),n===void 0&&(n={}),i=i||{};var o=Object.keys(n).reduce(function(a,u){return n[u]!==i[u]&&i[u]!==void 0&&(a[u]=n[u]),a},{});return Object.keys(i).reduce(function(a,u){return i[u]!==n[u]&&n[u]===void 0&&(a[u]=null),a},o)}f.invert=r;function s(i,n,o){if(o===void 0&&(o=!1),typeof i!="object")return n;if(typeof n=="object"){if(!o)return n;var a=Object.keys(n).reduce(function(u,l){return i[l]===void 0&&(u[l]=n[l]),u},{});return Object.keys(a).length>0?a:void 0}}f.transform=s})(j||(j={}));g.default=j;var b={},_={},k;function R(){if(k)return _;k=1;var f=d&&d.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(_,"__esModule",{value:!0});var e=f(N()),t=function(){function r(s){this.ops=s,this.index=0,this.offset=0}return r.prototype.hasNext=function(){return this.peekLength()<1/0},r.prototype.next=function(s){s||(s=1/0);var i=this.ops[this.index];if(i){var n=this.offset,o=e.default.length(i);if(s>=o-n?(s=o-n,this.index+=1,this.offset=0):this.offset+=s,typeof i.delete=="number")return{delete:s};var a={};return i.attributes&&(a.attributes=i.attributes),typeof i.retain=="number"?a.retain=s:typeof i.insert=="string"?a.insert=i.insert.substr(n,s):a.insert=i.insert,a}else return{retain:1/0}},r.prototype.peek=function(){return this.ops[this.index]},r.prototype.peekLength=function(){return this.ops[this.index]?e.default.length(this.ops[this.index])-this.offset:1/0},r.prototype.peekType=function(){return this.ops[this.index]?typeof this.ops[this.index].delete=="number"?"delete":typeof this.ops[this.index].retain=="number"?"retain":"insert":"retain"},r.prototype.rest=function(){if(this.hasNext()){if(this.offset===0)return this.ops.slice(this.index);var s=this.offset,i=this.index,n=this.next(),o=this.ops.slice(this.index);return this.offset=s,this.index=i,[n].concat(o)}else return[]},r}();return _.default=t,_}var D;function N(){if(D)return b;D=1;var f=d&&d.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(b,"__esModule",{value:!0});var e=f(R()),t;return function(r){function s(n){return new e.default(n)}r.iterator=s;function i(n){return typeof n.delete=="number"?n.delete:typeof n.retain=="number"?n.retain:typeof n.insert=="string"?n.insert.length:1}r.length=i}(t||(t={})),b.default=t,b}var y=d&&d.__importDefault||function(f){return f&&f.__esModule?f:{default:f}},x=y(A),C=y(I),m=y(E),v=y(g),p=y(N()),P="\0",w=function(){function f(e){Array.isArray(e)?this.ops=e:e!=null&&Array.isArray(e.ops)?this.ops=e.ops:this.ops=[]}return f.prototype.insert=function(e,t){var r={};return typeof e=="string"&&e.length===0?this:(r.insert=e,t!=null&&typeof t=="object"&&Object.keys(t).length>0&&(r.attributes=t),this.push(r))},f.prototype.delete=function(e){return e<=0?this:this.push({delete:e})},f.prototype.retain=function(e,t){if(e<=0)return this;var r={retain:e};return t!=null&&typeof t=="object"&&Object.keys(t).length>0&&(r.attributes=t),this.push(r)},f.prototype.push=function(e){var t=this.ops.length,r=this.ops[t-1];if(e=C.default(e),typeof r=="object"){if(typeof e.delete=="number"&&typeof r.delete=="number")return this.ops[t-1]={delete:r.delete+e.delete},this;if(typeof r.delete=="number"&&e.insert!=null&&(t-=1,r=this.ops[t-1],typeof r!="object"))return this.ops.unshift(e),this;if(m.default(e.attributes,r.attributes)){if(typeof e.insert=="string"&&typeof r.insert=="string")return this.ops[t-1]={insert:r.insert+e.insert},typeof e.attributes=="object"&&(this.ops[t-1].attributes=e.attributes),this;if(typeof e.retain=="number"&&typeof r.retain=="number")return this.ops[t-1]={retain:r.retain+e.retain},typeof e.attributes=="object"&&(this.ops[t-1].attributes=e.attributes),this}}return t===this.ops.length?this.ops.push(e):this.ops.splice(t,0,e),this},f.prototype.chop=function(){var e=this.ops[this.ops.length-1];return e&&e.retain&&!e.attributes&&this.ops.pop(),this},f.prototype.filter=function(e){return this.ops.filter(e)},f.prototype.forEach=function(e){this.ops.forEach(e)},f.prototype.map=function(e){return this.ops.map(e)},f.prototype.partition=function(e){var t=[],r=[];return this.forEach(function(s){var i=e(s)?t:r;i.push(s)}),[t,r]},f.prototype.reduce=function(e,t){return this.ops.reduce(e,t)},f.prototype.changeLength=function(){return this.reduce(function(e,t){return t.insert?e+p.default.length(t):t.delete?e-t.delete:e},0)},f.prototype.length=function(){return this.reduce(function(e,t){return e+p.default.length(t)},0)},f.prototype.slice=function(e,t){e===void 0&&(e=0),t===void 0&&(t=1/0);for(var r=[],s=p.default.iterator(this.ops),i=0;i<t&&s.hasNext();){var n=void 0;i<e?n=s.next(e-i):(n=s.next(t-i),r.push(n)),i+=p.default.length(n)}return new f(r)},f.prototype.compose=function(e){var t=p.default.iterator(this.ops),r=p.default.iterator(e.ops),s=[],i=r.peek();if(i!=null&&typeof i.retain=="number"&&i.attributes==null){for(var n=i.retain;t.peekType()==="insert"&&t.peekLength()<=n;)n-=t.peekLength(),s.push(t.next());i.retain-n>0&&r.next(i.retain-n)}for(var o=new f(s);t.hasNext()||r.hasNext();)if(r.peekType()==="insert")o.push(r.next());else if(t.peekType()==="delete")o.push(t.next());else{var a=Math.min(t.peekLength(),r.peekLength()),u=t.next(a),l=r.next(a);if(typeof l.retain=="number"){var h={};typeof u.retain=="number"?h.retain=a:h.insert=u.insert;var c=v.default.compose(u.attributes,l.attributes,typeof u.retain=="number");if(c&&(h.attributes=c),o.push(h),!r.hasNext()&&m.default(o.ops[o.ops.length-1],h)){var T=new f(t.rest());return o.concat(T).chop()}}else typeof l.delete=="number"&&typeof u.retain=="number"&&o.push(l)}return o.chop()},f.prototype.concat=function(e){var t=new f(this.ops.slice());return e.ops.length>0&&(t.push(e.ops[0]),t.ops=t.ops.concat(e.ops.slice(1))),t},f.prototype.diff=function(e,t){if(this.ops===e.ops)return new f;var r=[this,e].map(function(a){return a.map(function(u){if(u.insert!=null)return typeof u.insert=="string"?u.insert:P;var l=a===e?"on":"with";throw new Error("diff() called "+l+" non-document")}).join("")}),s=new f,i=x.default(r[0],r[1],t),n=p.default.iterator(this.ops),o=p.default.iterator(e.ops);return i.forEach(function(a){for(var u=a[1].length;u>0;){var l=0;switch(a[0]){case x.default.INSERT:l=Math.min(o.peekLength(),u),s.push(o.next(l));break;case x.default.DELETE:l=Math.min(u,n.peekLength()),n.next(l),s.delete(l);break;case x.default.EQUAL:l=Math.min(n.peekLength(),o.peekLength(),u);var h=n.next(l),c=o.next(l);m.default(h.insert,c.insert)?s.retain(l,v.default.diff(h.attributes,c.attributes)):s.push(c).delete(l);break}u-=l}}),s.chop()},f.prototype.eachLine=function(e,t){t===void 0&&(t=`
`);for(var r=p.default.iterator(this.ops),s=new f,i=0;r.hasNext();){if(r.peekType()!=="insert")return;var n=r.peek(),o=p.default.length(n)-r.peekLength(),a=typeof n.insert=="string"?n.insert.indexOf(t,o)-o:-1;if(a<0)s.push(r.next());else if(a>0)s.push(r.next(a));else{if(e(s,r.next(1).attributes||{},i)===!1)return;i+=1,s=new f}}s.length()>0&&e(s,{},i)},f.prototype.invert=function(e){var t=new f;return this.reduce(function(r,s){if(s.insert)t.delete(p.default.length(s));else{if(s.retain&&s.attributes==null)return t.retain(s.retain),r+s.retain;if(s.delete||s.retain&&s.attributes){var i=s.delete||s.retain,n=e.slice(r,r+i);return n.forEach(function(o){s.delete?t.push(o):s.retain&&s.attributes&&t.retain(p.default.length(o),v.default.invert(s.attributes,o.attributes))}),r+i}}return r},0),t.chop()},f.prototype.transform=function(e,t){if(t===void 0&&(t=!1),t=!!t,typeof e=="number")return this.transformPosition(e,t);for(var r=e,s=p.default.iterator(this.ops),i=p.default.iterator(r.ops),n=new f;s.hasNext()||i.hasNext();)if(s.peekType()==="insert"&&(t||i.peekType()!=="insert"))n.retain(p.default.length(s.next()));else if(i.peekType()==="insert")n.push(i.next());else{var o=Math.min(s.peekLength(),i.peekLength()),a=s.next(o),u=i.next(o);if(a.delete)continue;u.delete?n.push(u):n.retain(o,v.default.transform(a.attributes,u.attributes,t))}return n.chop()},f.prototype.transformPosition=function(e,t){t===void 0&&(t=!1),t=!!t;for(var r=p.default.iterator(this.ops),s=0;r.hasNext()&&s<=e;){var i=r.peekLength(),n=r.peekType();if(r.next(),n==="delete"){e-=Math.min(i,e-s);continue}else n==="insert"&&(s<e||!t)&&(e+=i);s+=i}return e},f.Op=p.default,f.AttributeMap=v.default,f}(),S=w;const H=q(S);export{H as D};
