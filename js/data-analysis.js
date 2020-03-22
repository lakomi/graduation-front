window.onload = function () {
    $.ajax({
        type: "post",
        url: localStorage.url + "/sta/getEverydaySellcount",
        data: {
            "storeId": localStorage.storeId,
            "startDay":"2020-03-16",
            "endDay":"2020-03-22"
        },
        success: function (data1) {
            // console.log('test');

            var list = data1.data;
            // alert(data1.data);

            for(var key in list){
                console.info(key+":"+list[key]);
            }



        },
    });
}