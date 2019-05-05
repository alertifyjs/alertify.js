var alertify=function(t){"use strict";var e,o;(e=t.LogTypes||(t.LogTypes={})).default="default",e.success="success",e.error="error",(o=t.DialogTypes||(t.DialogTypes={})).alert="alert",o.confirm="confirm",o.prompt="prompt";var i=function(){function e(){this.parent=document.body,this.version="1.0.11",this.okLabel="Ok",this.cancelLabel="Cancel",this.maxLogItems=2,this.promptValue="",this.promptPlaceholder="",this.closeLogOnClick=!1,this.delay=5e3,this.logContainerClass="alertify-logs",this.logTemplateMethod=null,this.dialogs={buttons:{holder:"<nav>{{buttons}}</nav>",ok:"<button class='ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"},input:"<input type='text'>",message:"<p class='msg'>{{message}}</p>",log:"<div class='{{class}}'>{{message}}</div>"},this.injectCSS()}return e.prototype.setParent=function(t){return this.parent=t,this},e.prototype.reset=function(){return this.parent=document.body,this.okBtn(e.defaultOkLabel),this.cancelBtn(e.defaultCancelLabel),this.setMaxLogItems(e.defaultMaxLogItems),this.promptValue="",this.promptPlaceholder="",this.delay=e.defaultDelay,this.setCloseLogOnClick(e.defaultCloseLogOnClick),this.setLogPosition("bottom left"),this.logTemplateMethod=null,this},e.prototype.log=function(e,o){return this.prepareNotify(e,t.LogTypes.default,o),this},e.prototype.success=function(e,o){return this.prepareNotify(e,t.LogTypes.success,o),this},e.prototype.error=function(e,o){return this.prepareNotify(e,t.LogTypes.error,o),this},e.prototype.setDelay=function(t){return void 0===t&&(t=0),this.delay=isNaN(t)?e.defaultDelay:t,this},e.prototype.setMaxLogItems=function(t){return this.maxLogItems=Number(t)||e.defaultMaxLogItems,this},e.prototype.setCloseLogOnClick=function(t){return this.closeLogOnClick=Boolean(t),this},e.prototype.setLogPosition=function(t){return this.logContainerClass="alertify-logs "+(t||""),this},e.prototype.setLogTemplate=function(t){return this.logTemplateMethod=t,this},e.prototype.clearLogs=function(){return this.setupLogContainer().innerHTML="",this},e.prototype.close=function(t,e){var o=this;void 0===e&&(e=0),this.closeLogOnClick&&t.addEventListener("click",function(){return o.hideElement(t)});var i=e&&!isNaN(+e)?+e:this.delay;i<0?this.hideElement(t):i>0&&setTimeout(function(){return o.hideElement(t)},i)},e.prototype.alert=function(e,o,i){return this.dialog(e,t.DialogTypes.alert,o,i)||this},e.prototype.confirm=function(e,o,i){return this.dialog(e,t.DialogTypes.confirm,o,i)||this},e.prototype.prompt=function(e,o,i){return this.dialog(e,t.DialogTypes.prompt,o,i)||this},e.prototype.dialog=function(t,e,o,i){return this.setupDialog({type:e,message:t,onOkay:o,onCancel:i})},e.prototype.cancelBtn=function(t){return this.cancelLabel=t,this},e.prototype.okBtn=function(t){return this.okLabel=t,this},e.prototype.placeholder=function(t){return this.promptPlaceholder=t,this},e.prototype.defaultValue=function(t){return this.promptValue=t,this},e.prototype.prepareNotify=function(t,e,o){var i=document.querySelectorAll(".alertify-logs > div");if(i){var n=i.length-this.maxLogItems;if(n>=0)for(var r=n+1,a=0;a<r;a+=1)this.close(i[a],-1)}this.showNotify(t,e,o)},e.prototype.showNotify=function(t,e,o){var i=this.setupLogContainer(),n=document.createElement("div");n.className=e||"default",n.innerHTML=this.logTemplateMethod?this.logTemplateMethod(t):t,"function"==typeof o&&n.addEventListener("click",o),i.appendChild(n),setTimeout(function(){n.className+=" show"},10),this.close(n,this.delay)},e.prototype.setupLogContainer=function(){var t=document.querySelector(".alertify-logs"),e=this.logContainerClass;return t||((t=document.createElement("div")).className=e,this.parent.appendChild(t)),t.className!==e&&(t.className=e),t},e.prototype.buildDialog=function(t){var e=this.dialogs.buttons.ok,o='<div class="dialog"><div>'+this.dialogs.message.replace("{{message}}",t.message);return"confirm"!==t.type&&"prompt"!==t.type||(e=this.dialogs.buttons.cancel+this.dialogs.buttons.ok),"prompt"===t.type&&(o+=this.dialogs.input),o=(""+o+this.dialogs.buttons.holder+"</div></div>").replace("{{buttons}}",e).replace("{{ok}}",this.okLabel).replace("{{cancel}}",this.cancelLabel)},e.prototype.setupDialog=function(t){var e=this,o=document.createElement("div");o.className="alertify hide",o.innerHTML=this.buildDialog(t);var i,n=o.querySelector(".ok"),r=o.querySelector("input"),a=o.querySelector("label");return r&&("string"==typeof this.promptPlaceholder&&(a?a.textContent=this.promptPlaceholder:r.placeholder=this.promptPlaceholder),"string"==typeof this.promptValue&&(r.value=this.promptValue)),Reflect.has(window,"Promise")?i=new Promise(function(i){return e._setupHandlers(i,o,t)}):this._setupHandlers(function(){return null},o,t),this.parent.appendChild(o),setTimeout(function(){o.classList.remove("hide"),r&&t.type&&"prompt"===t.type?(r.select(),r.focus()):n&&n.focus()},100),i},e.prototype.injectCSS=function(){if(!document.querySelector("#alertifyCSS")){var t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.id="alertifyCSS",e.innerHTML=".alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{-webkit-transition:all .33s cubic-bezier(.25,.8,.25,1);-o-transition:all .33s cubic-bezier(.25,.8,.25,1);transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *,.alertify.show{-webkit-box-sizing:border-box;box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084);box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin:0 0 12px;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;display:inline-block;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:99999}.alertify-logs>*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .4s cubic-bezier(.25,.8,.25,1);-o-transition:all .4s cubic-bezier(.25,.8,.25,1);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;padding:12px 24px;color:#fff;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px;display:block!important;max-height:0;margin:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;-webkit-transform:translateZ(0);transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;-webkit-transform:translateZ(0);transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}",t.insertBefore(e,t.firstChild)}},e.prototype.removeCSS=function(){var t=document.querySelector("#alertifyCSS");t&&t.parentNode&&t.parentNode.removeChild(t)},e.prototype.hideElement=function(t){if(t){var o=function(){t&&t.parentNode&&t.parentNode.removeChild(t)};t.classList.remove("show"),t.classList.add("hide"),t.addEventListener("transitionend",o),setTimeout(o,e.transitionFallbackDuration)}},e.prototype._setupHandlers=function(t,e,o){var i=this,n=e.querySelector(".ok"),r=e.querySelector(".cancel"),a=e.querySelector("input");n&&n.addEventListener("click",function(n){o.onOkay&&"function"==typeof o.onOkay&&(a?o.onOkay(a.value,n):o.onOkay(n)),t(a?{buttonClicked:"ok",inputValue:a.value,event:n}:{buttonClicked:"ok",event:n}),i.hideElement(e)}),r&&r.addEventListener("click",function(n){o.onCancel&&"function"==typeof o.onCancel&&o.onCancel(n),t({buttonClicked:"cancel",event:n}),i.hideElement(e)}),a&&a.addEventListener("keyup",function(t){n&&13===t.which&&n.click()})},e.transitionFallbackDuration=500,e.defaultDelay=5e3,e.defaultMaxLogItems=2,e.defaultOkLabel="Ok",e.defaultCancelLabel="Cancel",e.defaultCloseLogOnClick=!1,e.defaultLogContainerClass="alertify-logs",e.defaultDialogs={buttons:{holder:"<nav>{{buttons}}</nav>",ok:"<button class='ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"},input:"<input type='text'>",message:"<p class='msg'>{{message}}</p>",log:"<div class='{{class}}'>{{message}}</div>"},e}();return t.Alertify=i,t}({});
