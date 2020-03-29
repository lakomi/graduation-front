// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('turnover'));
window.onload = function () {
    myChart.setOption({
        title: {
            left: 'center',
            text: '店铺营业额'
        },
        tooltip: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '营业额',
            type: 'line',
            data: []
        }]
    });
};

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
            url: localStorage.url + "/sta/getEverydaySellcount",
            async: true,
            data: {
                "storeId": localStorage.storeId,
                "startDay":startDay,
                "endDay":endDay
            },
            success: function (msg) {
                var daylist = new Array();
                var valuelist = new Array();
                var list = msg.data;
                for(var key in list){
                    daylist.push(key);
                    valuelist.push(list[key]);
                }
                myChart.clear();
                var option = {
                    // Make gradient line here
                    visualMap: [{
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }],
                    title: [{
                        left: 'center',
                        text: '店铺营业额'
                    }],
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: [{
                        data: daylist
                    }],
                    yAxis: [{
                        splitLine: {show: false}
                    }],
                    grid: [{
                        // bottom: '60%'
                        containLabel: true
                    }],
                    series: [{
                        type: 'line',
                        showSymbol: false,
                        data: valuelist
                    }]
                };
                //使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
        });
    })
});