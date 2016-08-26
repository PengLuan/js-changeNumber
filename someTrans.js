//一些常用的变化和翻译
var charNumber = {
    //数字变成汉字
    init:function(number){
        this.render();
        return this.bind(number);
    },
    bind:function(number){
        var me = this;
        if(Math.floor(number) != number ){
            return false;
        }else if(number < 0){
            return false;
        }else if(number < 10){
            return me.number[number];
        }else if(number < 10000){
            var returnNumber =  me.normalVal(number,1000);
        }else if(number < 100000000){
            var returnNumber = me.bigVal(number);
        }else{
            var returnNumber = me.largerVal(number);
        }
        returnNumber = me.reMoveZero(returnNumber);
        return returnNumber;
    },
    reMoveZero:function(number){
        var lastChar = '';
        var newNumber = number;
        var nowZero = true;
        var already = 0;
        for( var i = 0;i<number.length;i++){
            var myChar = number.charAt(i);
            if(myChar == '一'){
                if( '零' == lastChar && nowZero == true){
                    newNumber = newNumber.substr(0,i-1) +
                        newNumber.substr(i-1,number.length-i);
                    already++;
                }
            }
            if(myChar  == '零' ){
                if(nowZero == true ){
                    newNumber = newNumber.substr(0,i-1) +
                    newNumber.substr(i+1,number.length-i);
                    already++;
                }else if('零' == lastChar ){
                    newNumber = newNumber.substr(0,i-1-already) +
                    newNumber.substr(i-already,number.length-i);
                }
            }else{
                nowZero = false;
            }
            lastChar = myChar;
        }
        return newNumber;
    },
    largerVal:function(number){
        var me = this;
        return me.bigVal(Math.floor(number/100000000)) + '亿' + me.bigVal(number%100000000);
    },
    bigVal:function(number){
        var me = this;
        var first =me.normalVal(Math.floor(number/10000),1000);
        if(first){
            return first  + '万' + me.normalVal(number%10000,1000);
        }else{
            return  '零' + me.normalVal(number%10000,1000);
        }
    },
    normalVal:function(number,key){
        var me = this;
        if(key >= 10 && number > 10){
            if(Math.floor(number/key) == 0){
                return me.number[Math.floor(number/key)] + me.normalVal(number%key,(key/10));
            }else{
                return me.number[Math.floor(number/key)] + me.getUnitByVal(key) + me.normalVal(number%key,(key/10));
            }
        }else{
            if(number > 0){
                return me.number[number];
            }else{
                return '';
            }
        }
    },
    getUnitByVal:function(val){
        var me = this;
        me.valCache = '';
        $.each(me.unit,function(i,item){
            if(val == item[0]){
                me.valCache = item[1];
            }
        });
        return me.valCache;
    },
    render:function(){
        var me = this;
        me.number = ['零','一','二','三','四','五','六','七','八','九'];
        me.unit = [[10,'十'],[100,'百'],[1000,'千'],[10000,'万'],[100000000,'亿']];
    }
};