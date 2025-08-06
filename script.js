const slideshow = document.querySelector('.streaming__slideshow');
const images = document.querySelectorAll('.streaming__item img');
const totalImages = images.length;
const names = document.querySelectorAll(".streaming__description");
const buttons = document.querySelectorAll(".streaming__buttons button");
let index = 2;

const removeImageEffect = () => {
    names.forEach((name) => name.classList.remove("current-txt"));
    images.forEach((image) => image.classList.remove("current-img"));
}

const checkCurrentImage = () => {
    if(index < 0) index = totalImages - 1;
    if(index > totalImages - 1) index = 0;
}

const addImageEffect = (idx) => {
    images[idx].classList.add("current-img");
    names[idx].classList.add("current-txt");
}

const nextImage = (idx) => {
    addImageEffect(idx);

    const firstImage = slideshow.firstElementChild;

    const middleIndex = Math.floor(totalImages / 2);

    // const thirdImage = slideshow.children[3];
    const thirdImage = slideshow.children[middleIndex + 1];
    thirdImage.classList.add('light');
    thirdImage.previousElementSibling.classList.remove('light');
    
    slideshow.appendChild(firstImage);
}

const previousImage = (idx) => {
    addImageEffect(idx);

    const lastImage = slideshow.lastElementChild;

    const middleIndex = Math.floor(totalImages / 2);
    
    const secondImage = slideshow.children[middleIndex - 1];
    secondImage.classList.add('light');
    // slideshow.children[middleIndex].classList.remove('light');
    secondImage.nextElementSibling.classList.remove('light');
    
    slideshow.prepend(lastImage);
}

const showImage = () => {
    index++;
    removeImageEffect();
    checkCurrentImage();
    nextImage(index);
}

let intervalImage = setInterval(showImage, 3700);

const changeImage = () => {
    clearInterval(intervalImage);
    removeImageEffect();
    checkCurrentImage();
    intervalImage = setInterval(showImage, 3700);
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(button.classList.contains("next-btn")) {            
            index++;
            changeImage();
            nextImage(index);
        }
        if(button.classList.contains("previous-btn")) {
            index--;
            changeImage();
            previousImage(index);
        }
    });
});