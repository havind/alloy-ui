AUI.add("aui-classnamemanager",function(a){var d=a.ClassNameManager,b=d.getClassName,c="aui";a.getClassName=function(){var e=a.Array(arguments,0,true);e.unshift(c);return b.apply(d,e);};},"@VERSION@",{requires:["classnamemanager"],skinnable:false,condition:{trigger:"classnamemanager",test:function(){return true;}}});