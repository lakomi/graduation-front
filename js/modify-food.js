window.onload = function (){
    var food_id = document.getElementById("food_id");
    var food_name = document.getElementById("food_name");
    var food_price = document.getElementById("food_price");
    var food_remark = document.getElementById("food_remark");
    var plate_photo = document.getElementById("plate_photo");
    // var platePhoto = $("select[name=plate_photo]").val();
    // $("select[name=plate_photo]").empty();
    $.ajax({
        type: "get",
        url: localStorage.url + "/food/getOneFood",
        data: {
            "foodId":localStorage.food_manage_to_modify_foodId
        },
        success: function (data1) {
            food_id.value = data1.data.foodId;
            food_name.value = data1.data.foodName;
            food_price.value = data1.data.foodPrice;
            food_remark.value = data1.data.remark;
            // var option = '<option selected=\"selected\">'+'<img src="data:image/png;base64,'+data1.data.platePhoto+'" style="width:100%;height: auto"></option>';
            // $("select[name=plate_photo]").append(option);
        },
    });
    // $.ajax({
    //     type: "get",
    //     url: localStorage.url + "/plate/getAllPlates",
    //     data: {
    //         "storeId":localStorage.storeId
    //     },
    //     success: function (data1) {
    //         var photoList = data1.data;
    //         if(photoList && photoList.length!=0){
    //             for (var i = 0;i<photoList.length;i++){
    //                 var option =
    //                     '<option value=\"'+photoList[i].plateId+'\" >' +
    //                     '<img src="data:image/png;base64,'+photoList[i].picture+'" style="width:100%;height: auto">' +
    //                     '</option>';
    //                 alert(option);
    //                 $("select[name=plate_photo]").append(option);
    //             }
    //         }
    //
    //     },
    // });

}