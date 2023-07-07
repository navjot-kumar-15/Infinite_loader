const imageContainer = document.getElementById("image_container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImage = 0;

// Global variable
let photosArray = [];
const count = 30;
const apiKey = "g8q6O3EJQ5LvAumz8AgqpxCHnxyWv7i_nnTsGzGhCkE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all the images were loaded
const imageLoad = () => {
  imageLoaded++;
  console.log("Image loaded", imageLoaded);
  if (imageLoaded === totalImage) {
    ready = true;
    loader.style.display = "none";
  } else {
    loader.style.display = "visible";
  }
};

// Helper function to set attributes on DOM element
const setAttributes = (element, attribute) => {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
};

// Creating the elements for links and photos and add to the DOM
const displayPhotos = () => {
  imageLoaded = 0;
  totalImage = photosArray.length;

  // to display the photo we have to use foreach
  photosArray.forEach((photo) => {
    // Create a <a> element
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Creating the img element
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //  Event listner ,check when each finish loading
    img.addEventListener("load", imageLoad);

    // Putting the img inside the a and put both into imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// GETTING THE PHOTOS FROM UNPLASH
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert("Some error occured", error);
  }
};

// Checking to see if scrolling near bottom of page ,Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
