// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('food_sell'));
window.onload = function () {
    myChart.setOption({
        title: {
            left: 'left',
            text: '菜品日销售量(/元)'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
    });
};
//日期选择
layui.use('laydate', function(){
    var laydate1 = layui.laydate;
    var laydate2 = layui.laydate;

    //执行一个laydate实例
    laydate1.render({
        elem:'#start'   //指定元素
    });
    laydate2.render({
        elem:'#end'   //指定元素
    });
});

layui.use('form', function(){
    var form = layui.form;
    form.on('submit(*)',function (elementData) {
        startDay = elementData.field.startDay;
        endDay = elementData.field.endDay;

        $.ajax({
            type: "post",
            url: localStorage.url + "/sta/getAllFoodEveryDayCount",
            async: true,
            data: {
                "storeId": localStorage.storeId,
                "startDay":startDay,
                "endDay":endDay
            },
            success: function (msg) {
                var daylist = new Array();
                var foodlist = new Array();
                var serieslist = new Array();

                for(var i = 0;i<msg.data.length;i++) {
                    if(i == 0) {
                        for (var key in msg.data[i].day_values) {//日期，统计一遍即可
                            daylist.push(key);
                        }
                    }
                    var valuelist = new Array();   //y值
                    var tempseries = {};   //自定义series
                    foodlist.push(msg.data[i].foodName);
                    for (var key in  msg.data[i].day_values) {
                        valuelist.push( msg.data[i].day_values[key]);
                    }
                    tempseries = {
                        data : valuelist,
                        name : msg.data[i].foodName,
                        type : 'line'
                    };
                    serieslist.push(tempseries);
                }
                var option = {
                    title: {
                        left: 'left',
                        text: '菜品日销售量(/元)'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: foodlist
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: daylist
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: serieslist
                };
                myChart.setOption(option);
            },
        });
    })
});