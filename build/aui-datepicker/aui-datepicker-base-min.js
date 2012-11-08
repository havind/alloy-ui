AUI.add("aui-datepicker-base",function(s){var h=s.Lang,l=h.isArray,k=h.isBoolean,a=h.isFunction,m=h.isString,w=s.Array,v=s.DataType,r="calendar",o="contentBox",y="currentNode",b="dateFormat",p="date-picker",j=27,e="focus",x="formatter",g="keydown",c="keypress",f="locale",u="selectionMode",i="setValue",d="trigger",n="type";var t=s.Component.create({NAME:p,ATTRS:{calendar:{setter:"_setCalendar",value:{}},formatter:{value:function(B){var z=this,A=[];if(l(B)){w.each(B,function(D,C){A[C]=z.calendar.formatDate(D);});return A.join(",");}else{return z.calendar.formatDate(B);}},validator:a},setValue:{value:true,validator:k},stack:{lazyAdd:false,value:true,setter:"_setStack",validator:k},showOn:{value:"mousedown"},hideOn:{value:"mousedown"}},EXTENDS:s.OverlayContext,prototype:{initializer:function(){var A=this,z=A.get(r),B=new s.Calendar(z);A.calendar=B;A.after("calendar:selectionChange",A._afterSelectionChange);A.after(A._afterShow,A,"show");A._hideOnEscapeEvent();if(z.hasOwnProperty("selectedDates")){B.set("selectedDates",z.selectedDates);}},bindUI:function(){var z=this;t.superclass.bindUI.apply(this,arguments);z.on("show",z._onShowOverlay);z._bindTriggerEvents();},destructor:function(){var z=this;z.calendar.destroy();z.escapeEventHandler.detach();},_afterSelectionChange:function(A){var z=this;z._uiSetSelectedDates(A.newSelection);},_afterShow:function(A){var z=this;z.calendar.focus();},_bindTriggerEvents:function(){var z=this,A=z.get(d),B=A.get(n);A.after(e,function(){if(/^(text|textarea)$/i.test(B)){z.show();}});A.after(c,function(){z.show();});},_hideOnEscapeEvent:function(){var z=this;z.escapeEventHandler=s.on(g,function(A){if(A.keyCode===j){z.hide();}});},_onShowOverlay:function(A){var z=this;z._renderCalendar();},_renderCalendar:function(){var z=this;z.calendar.render(z.get(o));},_setCalendar:function(A){var z=this;s.mix(A,{bubbleTargets:z});return A;},_setStack:function(A){var z=this;if(A){s.DatepickerManager.register(z);}else{s.DatepickerManager.remove(z);}return A;},_setTriggerValue:function(A){var z=this;var B=z.get(x).apply(z,[A]);z.get(y).val(B);},_uiSetSelectedDates:function(A){var z=this;if(z.calendar.get(u)!=="multiple"){z.hide();}if(z.get(i)){z._setTriggerValue(A);}if(A.length){z.calendar.set("date",A[A.length-1]);}}}});s.DatePicker=t;s.DatepickerManager=new s.OverlayManager({zIndexBase:1000});var q=function(){};q.ATTRS={dateFormat:{value:"%m/%d/%Y",validator:m},selectedDates:{readOnly:false,setter:function(A){var z=this;z._clearSelection();z.selectDates(A);}}};q.prototype={formatDate:function(C){var B=this,A=B.get(b),z=B.get(f);return v.Date.format(C,{format:A,locale:z});}};s.Base.mix(s.Calendar,[q]);},"@VERSION@",{skinnable:true,requires:["aui-datatype","calendar","aui-overlay-context"]});