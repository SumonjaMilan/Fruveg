// Counter for clicking plus and minus
// Counter for clicking plus and minus
// Counter for clicking plus and minus

var values=document.getElementsByClassName('value');
var pluses=document.getElementsByClassName('plus');
var minuses=document.getElementsByClassName('minus');

function changeTotal(e){
    var price = parseInt( e.parentElement.parentElement.previousElementSibling.children[0].innerHTML); 
    if(e.value == ""){
        e.parentElement.nextElementSibling.children[1].innerHTML = price;
    }else{
        e.parentElement.nextElementSibling.children[1].innerHTML = price* e.value;
    }    
}

function plus(e){
    e.previousElementSibling.value = parseInt(e.previousElementSibling.value)+ 1; 
    var price = parseInt( e.parentElement.parentElement.previousElementSibling.children[0].innerHTML);
    var total = (parseInt(e.parentElement.nextElementSibling.children[1].innerHTML));
    total +=price;
    e.parentElement.nextElementSibling.children[1].innerHTML = total;
}

function minus(e){
    if(e.nextSibling.value !=1){
        e.nextSibling.value -=1;
        var price = parseInt( e.parentElement.parentElement.previousElementSibling.children[0].innerHTML);
        var total = (parseInt(e.parentElement.nextElementSibling.children[1].innerHTML));
        total -=price;
        e.parentElement.nextElementSibling.children[1].innerHTML = total;
    }    
}


// SLIDER FOR REVIEWS 
// SLIDER FOR REVIEWS
// SLIDER FOR REVIEWS
// SLIDER FOR REVIEWS


var slideIndex = 1;

showSlidesPlus(slideIndex);

function plusSlides(n) {
  showSlidesPlus(slideIndex += 2*n);
}

function minusSlides(n) {
    showSlidesMinus(slideIndex -=2*n);
}

function currentSlide(n) {
    showCurrent(slideIndex = n);
    
}

function showCurrent(n){
    var i;
    var slides = document.getElementsByClassName("reviewCard");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    setTimeout(() => {
        slides[n-1].style.display = "block";
        slides[n].style.display = "block";
    }, 300);

   

    if (n==1){
        dots[0].className += " active";
    }else if(n==3){
        dots[1].className += " active";    
    }
    else if(n==5){
        dots[2].className += " active";    
    }
}


function showSlidesPlus(n) {
    var i;
    var slides = document.getElementsByClassName("reviewCard");
    var dots = document.getElementsByClassName("dot");
  
    if (n > slides.length) {slideIndex = 1}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
  
    setTimeout(() => {
        try{
            slides[slideIndex-1].style.display = "block";
            slides[slideIndex].style.display = "block";
        }catch(error){
            
        }
       
    }, 300);


    if (slideIndex==1){
        try{
            dots[0].className += " active";
        }catch(error){

        }
        
    }else if(slideIndex==3){
        dots[1].className += " active";    
    }
    else if(slideIndex==5){
        dots[2].className += " active";    
    }
}

function showSlidesMinus(n) {
    
    var i;
    var slides = document.getElementsByClassName("reviewCard");
    var dots = document.getElementsByClassName("dot");

    
    if (n < 1) {
        slideIndex = slides.length - 1
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    setTimeout(() => {
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex].style.display = "block";
    }, 300);


    if (slideIndex==1){
        dots[0].className += " active";
    }else if(slideIndex==3){
        dots[1].className += " active";    
    }
    else if(slideIndex==5){
        dots[2].className += " active";    
    }
    
}

// SHOWCASE SLIDER
// SHOWCASE SLIDER
// SHOWCASE SLIDER

var showcase1 = document.querySelector(".showcase1");
var showcase2 = document.querySelector(".showcase2");

var arrows = document.querySelectorAll(".arrow");

arrows.forEach(arrow => {
    arrow.addEventListener("click", changeDivs);
});

function changeDivs(e){

    if(showcase1.classList.contains('active')){
        showcase1.classList.remove('active');
        showcase1.classList.add('inactive');
        showcase2.classList.add('active');
        showcase2.classList.remove('inactive');
    } 

    else if(showcase2.classList.contains('active')){
        showcase2.classList.remove('active');
        showcase2.classList.add('inactive');
        showcase1.classList.add('active');
        showcase1.classList.remove('inactive');
    }

}


   
    