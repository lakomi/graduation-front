$(document).ready(function () {
    localStorage.url = "http://127.0.0.1:9000";
    $('.am-round').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if(username == '' || password == ''){
            alert("用户名或密码不能为空");
        }else {
            $.ajax({
                type: "post",
                url: localStorage.url+"/loginA",
                data: {
                    "userId": username,
                    "password": password
                },
                async: false,
                success: function (msg) {
                    if (msg.code == '0') {
                        localStorage.userId = username;
                        localStorage.storeId = msg.data.userName;
                        // console.log(localStorage.storeId);
                        window.location.href = "admin.html";
                    }
                    if (msg.code == '1') {
                        alert(msg.message);
                    }
                },
                fail: function (err) {
                    alert(err);
                }
            });
        }
    });
});
