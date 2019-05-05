var alertify=function(t){"use strict";var e,o,i=".alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{-webkit-transition:all .33s cubic-bezier(.25,.8,.25,1);-o-transition:all .33s cubic-bezier(.25,.8,.25,1);transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *,.alertify.show{-webkit-box-sizing:border-box;box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084);box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin:0 0 12px;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;display:inline-block;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:99999}.alertify-logs>*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .4s cubic-bezier(.25,.8,.25,1);-o-transition:all .4s cubic-bezier(.25,.8,.25,1);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;padding:12px 24px;color:#fff;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px;display:block!important;max-height:0;margin:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;-webkit-transform:translateZ(0);transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;-webkit-transform:translateZ(0);transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}";(e=t.LogTypes||(t.LogTypes={})).default="default",e.success="success",e.error="error",(o=t.DialogTypes||(t.DialogTypes={})).alert="alert",o.confirm="confirm",o.prompt="prompt";class a{constructor(){this.parent=document.body,this.version="1.0.11",this.okLabel="Ok",this.cancelLabel="Cancel",this.maxLogItems=2,this.promptValue="",this.promptPlaceholder="",this.closeLogOnClick=!1,this.delay=5e3,this.logContainerClass="alertify-logs",this.logTemplateMethod=null,this.dialogs={buttons:{holder:"<nav>{{buttons}}</nav>",ok:"<button class='ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"},input:"<input type='text'>",message:"<p class='msg'>{{message}}</p>",log:"<div class='{{class}}'>{{message}}</div>"},this.injectCSS()}setParent(t){return this.parent=t,this}reset(){return this.parent=document.body,this.okBtn(a.defaultOkLabel),this.cancelBtn(a.defaultCancelLabel),this.setMaxLogItems(a.defaultMaxLogItems),this.promptValue="",this.promptPlaceholder="",this.delay=a.defaultDelay,this.setCloseLogOnClick(a.defaultCloseLogOnClick),this.setLogPosition("bottom left"),this.logTemplateMethod=null,this}log(e,o){return this.prepareNotify(e,t.LogTypes.default,o),this}success(e,o){return this.prepareNotify(e,t.LogTypes.success,o),this}error(e,o){return this.prepareNotify(e,t.LogTypes.error,o),this}setDelay(t=0){return this.delay=isNaN(t)?a.defaultDelay:t,this}setMaxLogItems(t){return this.maxLogItems=Number(t)||a.defaultMaxLogItems,this}setCloseLogOnClick(t){return this.closeLogOnClick=Boolean(t),this}setLogPosition(t){return this.logContainerClass=`alertify-logs ${t||""}`,this}setLogTemplate(t){return this.logTemplateMethod=t,this}clearLogs(){return this.setupLogContainer().innerHTML="",this}close(t,e=0){this.closeLogOnClick&&t.addEventListener("click",()=>this.hideElement(t));const o=e&&!isNaN(+e)?+e:this.delay;o<0?this.hideElement(t):o>0&&setTimeout(()=>this.hideElement(t),o)}alert(e,o,i){return this.dialog(e,t.DialogTypes.alert,o,i)||this}confirm(e,o,i){return this.dialog(e,t.DialogTypes.confirm,o,i)||this}prompt(e,o,i){return this.dialog(e,t.DialogTypes.prompt,o,i)||this}dialog(t,e,o,i){return this.setupDialog({type:e,message:t,onOkay:o,onCancel:i})}cancelBtn(t){return this.cancelLabel=t,this}okBtn(t){return this.okLabel=t,this}placeholder(t){return this.promptPlaceholder=t,this}defaultValue(t){return this.promptValue=t,this}prepareNotify(t,e,o){const i=document.querySelectorAll(".alertify-logs > div");if(i){const t=i.length-this.maxLogItems;if(t>=0){const e=t+1;for(let t=0;t<e;t+=1)this.close(i[t],-1)}}this.showNotify(t,e,o)}showNotify(t,e,o){const i=this.setupLogContainer(),a=document.createElement("div");a.className=e||"default",a.innerHTML=this.logTemplateMethod?this.logTemplateMethod(t):t,"function"==typeof o&&a.addEventListener("click",o),i.appendChild(a),setTimeout(function(){a.className+=" show"},10),this.close(a,this.delay)}setupLogContainer(){let t=document.querySelector(".alertify-logs");const e=this.logContainerClass;return t||((t=document.createElement("div")).className=e,this.parent.appendChild(t)),t.className!==e&&(t.className=e),t}buildDialog(t){let e=this.dialogs.buttons.ok,o=`<div class="dialog"><div>${this.dialogs.message.replace("{{message}}",t.message)}`;return"confirm"!==t.type&&"prompt"!==t.type||(e=this.dialogs.buttons.cancel+this.dialogs.buttons.ok),"prompt"===t.type&&(o+=this.dialogs.input),o=`${o}${this.dialogs.buttons.holder}</div></div>`.replace("{{buttons}}",e).replace("{{ok}}",this.okLabel).replace("{{cancel}}",this.cancelLabel)}setupDialog(t){const e=document.createElement("div");e.className="alertify hide",e.innerHTML=this.buildDialog(t);const o=e.querySelector(".ok"),i=e.querySelector("input"),a=e.querySelector("label");let n;return i&&("string"==typeof this.promptPlaceholder&&(a?a.textContent=this.promptPlaceholder:i.placeholder=this.promptPlaceholder),"string"==typeof this.promptValue&&(i.value=this.promptValue)),Reflect.has(window,"Promise")?n=new Promise(o=>this._setupHandlers(o,e,t)):this._setupHandlers(()=>null,e,t),this.parent.appendChild(e),setTimeout(function(){e.classList.remove("hide"),i&&t.type&&"prompt"===t.type?(i.select(),i.focus()):o&&o.focus()},100),n}injectCSS(){if(!document.querySelector("#alertifyCSS")){const t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.id="alertifyCSS",e.innerHTML=i,t.insertBefore(e,t.firstChild)}}removeCSS(){const t=document.querySelector("#alertifyCSS");t&&t.parentNode&&t.parentNode.removeChild(t)}hideElement(t){if(!t)return;const e=()=>{t&&t.parentNode&&t.parentNode.removeChild(t)};t.classList.remove("show"),t.classList.add("hide"),t.addEventListener("transitionend",e),setTimeout(e,a.transitionFallbackDuration)}_setupHandlers(t,e,o){const i=e.querySelector(".ok"),a=e.querySelector(".cancel"),n=e.querySelector("input");i&&i.addEventListener("click",i=>{o.onOkay&&"function"==typeof o.onOkay&&(n?o.onOkay(n.value,i):o.onOkay(i)),t(n?{buttonClicked:"ok",inputValue:n.value,event:i}:{buttonClicked:"ok",event:i}),this.hideElement(e)}),a&&a.addEventListener("click",i=>{o.onCancel&&"function"==typeof o.onCancel&&o.onCancel(i),t({buttonClicked:"cancel",event:i}),this.hideElement(e)}),n&&n.addEventListener("keyup",t=>{i&&13===t.which&&i.click()})}}return a.transitionFallbackDuration=500,a.defaultDelay=5e3,a.defaultMaxLogItems=2,a.defaultOkLabel="Ok",a.defaultCancelLabel="Cancel",a.defaultCloseLogOnClick=!1,a.defaultLogContainerClass="alertify-logs",a.defaultDialogs={buttons:{holder:"<nav>{{buttons}}</nav>",ok:"<button class='ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"},input:"<input type='text'>",message:"<p class='msg'>{{message}}</p>",log:"<div class='{{class}}'>{{message}}</div>"},t.Alertify=a,t}({});
