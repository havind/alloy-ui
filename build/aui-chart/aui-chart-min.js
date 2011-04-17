AUI.add("aui-chart",function(x){var g=x.Lang,r=x.getClassName,k="chart",w=r(k),f=x.config.base+"aui-chart/assets/chart.swf";YUI.AUI.namespace("_CHART");YUI.AUI.namespace("defaults.chart");var D=x.Component.create({NAME:k,ATTRS:{type:{value:"pie"},dataSource:{value:null},altText:{getter:"_getAltText",setter:"_setAltText"},swfURL:{valueFn:function(){return YUI.AUI.defaults.chart.swfURL||f;}},swfCfg:{value:{}},request:{value:"*"},series:{value:null},categoryNames:{getter:"_getCategoryNames",setter:"_setCategoryNames"},dataTipFunction:{setter:"_setDataTipFunction"},legendLabelFunction:{setter:"_setLegendLabelFunction"},style:{value:null},pollingInterval:{value:0}},proxyFunctionCount:0,createProxyFunction:function(I,H){var A=D.proxyFunctionCount;var J="proxyFunction"+A;YUI.AUI._CHART[J]=x.bind(I,H);D.proxyFunctionCount++;return"YUI.AUI._CHART."+J;},getFunctionReference:function(I){var A=this;if(g.isFunction(I)){I=D.createProxyFunction(I);}else{if(I.fn&&g.isFunction(I.fn)){var H=[I.fn];if(I.context&&g.isObject(context)){H.push(I.context);}I=D.createProxyFunction(A,H);}}return I;},removeProxyFunction:function(A){if(A&&A.indexOf("YUI.AUI._CHART.proxyFunction")>-1){A=A.substr(12);YUI.AUI._CHART[A]=null;}},prototype:{renderUI:function(){var N=this;var A={align:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};var M=N.get("contentBox");var I={boundingBox:M,fixedAttributes:{allowScriptAccess:"always"},flashVars:{allowedDomain:document.location.hostname},backgroundColor:M.getStyle("backgroundColor"),url:N.get("swfURL"),height:N.get("height"),width:N.get("width"),version:9.045};var O=N.get("swfCfg");for(var K in O){if(A.hasOwnProperty(K)){I.fixedAttributes[K]=O[K];}else{I[K]=O[K];}}var L=I.version;if(L&&g.isValue(L)&&L!="undefined"){var J=(/\w*.\w*/.exec(((L).toString()).replace(/.0./g,"."))).toString();var H=J.split(".");L=H[0]+".";switch((H[1].toString()).length){case 1:L+="00";break;case 2:L+="0";break;}L+=H[1];I.version=parseFloat(L);}N._swfWidget=new x.SWF(I);N._swfNode=N._swfWidget._swf;if(N._swfNode){N._swf=N._swfNode.getDOM();N._swfWidget.on("swfReady",N._eventHandler,N);N.set("swfCfg",I);}},bindUI:function(){var A=this;A.publish("itemMouseOver");A.publish("itemMouseOut");A.publish("itemClick");A.publish("itemDblClick");A.publish("itemDragStart");A.publish("itemDragEnd");A.publish("itemDrag");A.after("seriesChange",A.refreshData);A.after("dataSourceChange",A.refreshData);A.after("pollingIntervalChange",A.refreshData);var H=A.get("dataSource");H.after("response",A._loadDataHandler,A);},setStyle:function(H,I){var A=this;I=x.JSON.stringify(I);A._swf.setStyle(H,I);},setStyles:function(H){var A=this;H=x.JSON.stringify(H);A._swf.setStyles(H);},setSeriesStyles:function(I){var A=this;for(var H=0;H<I.length;H++){I[H]=x.JSON.stringify(I[H]);}A._swf.setSeriesStyles(I);},_eventHandler:function(H){var A=this;if(H.type=="swfReady"){A._swfNode=A._swfWidget._swf;A._swf=A._swfNode.getDOM();A._loadHandler();A.fire("contentReady");}},_loadHandler:function(){var A=this;if(A._swf&&A._swf.setType){A._swf.setType(A.get("type"));var H=A.get("style");if(H){A.setStyles(H);}A._syncChartAttrs();A._initialized=true;A.refreshData();}},_syncChartAttrs:function(){var A=this;var H=A._originalConfig;if(H.categoryNames){A.set("categoryNames",H.categoryNames);}if(H.dataTipFunction){A.set("dataTipFunction",H.dataTipFunction);}if(H.legendLabelFunction){A.set("legendLabelFunction",H.legendLabelFunction);}if(H.series){A.set("series",H.series);}},refreshData:function(){var A=this;if(A._initialized){var K=A.get("dataSource");if(K){var H=A._pollingID;if(H!==null){K.clearInterval(H);A._pollingID=null;}var J=A.get("pollingInterval");var I=A.get("request");if(J>0){A._pollingID=K.setInterval(J,I);}K.sendRequest(I);}}},_loadDataHandler:function(H){var S=this;if(S._swf&&!H.error){var Q=S._seriesFunctions;if(Q){for(var N=0;N<Q.length;N++){D.removeProxyFunction(Q[N]);}S._seriesFunctions=null;}S._seriesFunctions=[];var K=[];var J=0;var T=null;var A=S.get("series");if(A!==null){J=A.length;for(var N=0;N<J;N++){T=A[N];var I={};for(var R in T){if(R=="style"){if(T.style!==null){I.style=x.JSON.stringify(T.style);}}else{if(R=="labelFunction"){if(T.labelFunction!==null){I.labelFunction=D.getFunctionReference(T.labelFunction);S._seriesFunctions.push(I.labelFunction);}}else{if(R=="dataTipFunction"){if(T.dataTipFunction!==null){I.dataTipFunction=D.getFunctionReference(T.dataTipFunction);S._seriesFunctions.push(I.dataTipFunction);}}else{if(R=="legendLabelFunction"){if(T.legendLabelFunction!==null){I.legendLabelFunction=D.getFunctionReference(T.legendLabelFunction);S._seriesFunctions.push(I.legendLabelFunction);}}else{I[R]=T[R];}}}}}K.push(I);}}var P=S.get("type");var M=H.response.results;if(J>0){for(var N=0;N<J;N++){T=K[N];if(!T.type){T.type=P;}T.dataProvider=M;}}else{var L={type:P,dataProvider:M};K.push(L);}try{if(S._swf.setDataProvider){S._swf.setDataProvider(K);}}catch(O){S._swf.setDataProvider(K);}}},_getCategoryNames:function(){var A=this;return A._swf.getCategoryNames();},_setCategoryNames:function(H){var A=this;A._swf.setCategoryNames(H);return H;},_setDataTipFunction:function(H){var A=this;if(A._dataTipFunction){D.removeProxyFunction(A._dataTipFunction);}if(H){A._dataTipFunction=H=D.getFunctionReference(H);}A._swf.setDataTipFunction(H);return H;},_setLegendLabelFunction:function(H){var A=this;if(A._legendLabelFunction){D.removeProxyFunction(A._legendLabelFunction);}if(H){A._legendLabelFunction=H=D.getFunctionReference(H);}A._swf.setLegendLabelFunction(H);return H;},_getAltText:function(){var A=this;return A._swf.getAltText();},_setAltText:function(){var A=this;A._swf.setAltText(value);return value;},_pollingID:null}});x.Chart=D;var g=x.Lang,r=x.getClassName,k="piechart";var p=x.Component.create({NAME:k,ATTRS:{dataField:{getter:"_getDataField",setter:"_setDataField",validator:g.isString},categoryField:{getter:"_getCategoryField",setter:"_setCategoryField",validator:g.isString}},EXTENDS:x.Chart,prototype:{_syncChartAttrs:function(){var A=this;
p.superclass._syncChartAttrs.apply(A,arguments);var H=A._originalConfig;if(H.dataField){A.set("dataField",H.dataField);}if(H.categoryField){A.set("categoryField",H.categoryField);}},_getDataField:function(){var A=this;return A._swf.getDataField();},_setDataField:function(H){var A=this;A._swf.setDataField(H);return H;},_getCategoryField:function(){var A=this;return A._swf.getCategoryField();},_setCategoryField:function(H){var A=this;A._swf.setCategoryField(H);return H;}}});x.PieChart=p;var g=x.Lang,r=x.getClassName,k="cartesianchart",j=r(k);var d=x.Component.create({NAME:k,ATTRS:{xField:{getter:"_getXField",setter:"_setXField",validator:g.isString},yField:{getter:"_getYField",setter:"_setYField",validator:g.isString},xAxis:{setter:"_setXAxis"},xAxes:{setter:"_setXAxes"},yAxis:{setter:"_setYAxis"},yAxes:{setter:"_setYAxes"},constrain2view:{setter:"_setConstrain2view"}},EXTENDS:x.Chart,prototype:{initializer:function(){var A=this;A._xAxisLabelFunctions=[];A._yAxisLabelFunctions=[];},destructor:function(){var A=this;A._removeAxisFunctions(A._xAxisLabelFunctions);A._removeAxisFunctions(A._yAxisLabelFunctions);},_syncChartAttrs:function(){var A=this;d.superclass._syncChartAttrs.apply(A,arguments);var H=A._originalConfig;if(H.xField){A.set("xField",H.xField);}if(H.yField){A.set("yField",H.yField);}if(H.xAxis){A.set("xAxis",H.xAxis);}if(H.yAxis){A.set("yAxis",H.yAxis);}if(H.xAxes){A.set("xAxes",H.xAxes);}if(H.yAxes){A.set("yAxes",H.yAxes);}if(H.constrain2view){A.set("constrain2view",H.constrain2view);}},_getXField:function(){var A=this;return A._swf.getHorizontalField();},_setXField:function(H){var A=this;A._swf.setHorizontalField(H);return H;},_getYField:function(){var A=this;return A._swf.getVerticalField();},_setYField:function(H){var A=this;A._swf.setVerticalField(H);return H;},_getClonedAxis:function(I){var A=this;var J={};for(var H in I){if(H=="labelFunction"){if(I.labelFunction&&I.labelFunction!==null){J.labelFunction=D.getFunctionReference(I.labelFunction);}}else{J[H]=I[H];}}return J;},_setXAxis:function(H){var A=this;if(H.position!="bottom"&&H.position!="top"){H.position="bottom";}A._removeAxisFunctions(A._xAxisLabelFunctions);H=A._getClonedAxis(H);A._xAxisLabelFunctions.push(H.labelFunction);A._swf.setHorizontalAxis(H);return H;},_setXAxes:function(I){var A=this;A._removeAxisFunctions(A._xAxisLabelFunctions);for(var H=0;H<I.length;H++){var J=I[H];if(J.position=="left"){J.position="bottom";}I[H]=A._getClonedAxis(J);J=I[H];if(J.labelFunction){A._xAxisLabelFunctions.push(J.labelFunction);}A._swf.setHorizontalAxis(J);}},_setYAxis:function(H){var A=this;A._removeAxisFunctions(A._yAxisLabelFunctions);H=A._getClonedAxis(H);A._yAxisLabelFunctions.push(H.labelFunction);A._swf.setVerticalAxis(H);},_setYAxes:function(I){var A=this;A._removeAxisFunctions(A._yAxisLabelFunctions);for(var H=0;H<I.length;H++){I[H]=A._getClonedAxis(I[H]);var J=I[H];if(J.labelFunction){A._yAxisLabelFunctions.push(J.labelFunction);}A._swf.setVerticalAxis(J);}},_setConstrain2view:function(H){var A=this;A._swf.setConstrainViewport(H);},setSeriesStylesByIndex:function(H,I){var A=this;if(A._swf&&A._swf.setSeriesStylesByIndex){I=x.JSON.stringify(I);A._swf.setSeriesStylesByIndex(H,I);}},_removeAxisFunctions:function(J){var H=this;if(J&&J.length){for(var I=0;I<J.length;I++){var A=J[I];if(A){x.Chart.removeProxyFunction(A);}}J=[];}}}});x.CartesianChart=d;var g=x.Lang,r=x.getClassName,k="linechart",y=r(k);var a=x.Component.create({NAME:k,ATTRS:{type:{value:"line"}},EXTENDS:x.CartesianChart});x.LineChart=a;var g=x.Lang,r=x.getClassName,k="columnchart",m=r(k);var C=x.Component.create({NAME:k,ATTRS:{type:{value:"column"}},EXTENDS:x.CartesianChart});x.ColumnChart=C;var g=x.Lang,r=x.getClassName,k="barchart",q=r(k);var u=x.Component.create({NAME:k,ATTRS:{type:{value:"bar"}},EXTENDS:x.CartesianChart});x.BarChart=u;var g=x.Lang,r=x.getClassName,k="stackedcolumnchart",G=r(k);var F=x.Component.create({NAME:k,ATTRS:{type:{value:"stackcolumn"}},EXTENDS:x.CartesianChart});x.StackedColumnChart=F;var g=x.Lang,r=x.getClassName,k="stackedbarchart",i=r(k);var l=x.Component.create({NAME:k,ATTRS:{type:{value:"stackbar"}},EXTENDS:x.CartesianChart});x.StackedBarChart=l;var o=function(){};o.prototype={type:null,reverse:false,labelFunction:null,labelSpacing:2,title:null};x.Chart.Axis=o;var t=function(){t.superclass.constructor.apply(this,arguments);};x.extend(t,o,{type:"numeric",minimum:NaN,maximum:NaN,majorUnit:NaN,minorUnit:NaN,snapToUnits:true,stackingEnabled:false,alwaysShowZero:true,scale:"linear",roundMajorUnit:true,calculateByLabelSize:true,position:"left",adjustMaximumByMajorUnit:true,adjustMinimumByMajorUnit:true});x.Chart.NumericAxis=t;var c=function(){c.superclass.constructor.apply(this,arguments);};x.extend(c,o,{type:"time",minimum:null,maximum:null,majorUnit:NaN,majorTimeUnit:null,minorUnit:NaN,minorTimeUnit:null,snapToUnits:true,stackingEnabled:false,calculateByLabelSize:true});x.Chart.TimeAxis=c;var e=function(){e.superclass.constructor.apply(this,arguments);};x.extend(e,o,{type:"category",categoryNames:null,calculateCategoryCount:false});x.Chart.CategoryAxis=e;var n=function(){};n.prototype={type:null,displayName:null};x.Chart.Series=n;var E=function(){E.superclass.constructor.apply(this,arguments);};x.extend(E,n,{xField:null,yField:null,axis:"primary",showInLegend:true});x.Chart.CartesianSeries=E;var b=function(){b.superclass.constructor.apply(this,arguments);};x.extend(b,E,{type:"column"});x.Chart.ColumnSeries=b;var s=function(){s.superclass.constructor.apply(this,arguments);};x.extend(s,E,{type:"line"});x.Chart.LineSeries=s;var z=function(){z.superclass.constructor.apply(this,arguments);};x.extend(z,E,{type:"bar"});x.Chart.BarSeries=z;var B=function(){B.superclass.constructor.apply(this,arguments);};x.extend(B,n,{type:"pie",dataField:null,categoryField:null,labelFunction:null});x.Chart.PieSeries=B;var h=function(){h.superclass.constructor.apply(this,arguments);};x.extend(h,E,{type:"stackbar"});x.Chart.StackedBarSeries=h;var v=function(){v.superclass.constructor.apply(this,arguments);
};x.extend(v,E,{type:"stackcolumn"});x.Chart.StackedColumnSeries=v;},"@VERSION@",{requires:["datasource","aui-swf","json"],skinnable:false});