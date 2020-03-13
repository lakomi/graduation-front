var bannerbtn = document.getElementsByClassName('bannerbtn')[0];
var de = document.getElementById('details');
var food = document.getElementById('food');
var DAbtn = document.getElementById('DA');
var plate = document.getElementById('plate');
// console.log(dBtn);//test
de.addEventListener('click',function (){
    window.location.href = 'admin.html';
})
food.addEventListener('click',function (){
    window.location.href = 'food-manage.html';
})
DAbtn.addEventListener('click',function (){
    window.location.href = 'data-analysis.html'
})
plate.addEventListener('click',function (){
    window.location.href = 'plate-manage.html'
})