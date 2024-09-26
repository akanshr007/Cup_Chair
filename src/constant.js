// export const API_BASE_URL = "https://api.cupchairs.com";
export const API_BASE_URL = import.meta.env.VITE_API_HOST;

// export const API_BASE_URL = "http://10.1.5.152:7098";
//export const API_BASE_URL = "http://localhost:3010";

export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
export const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const PASSWORD = "2R:H8udp7{);-:+L";
export const DEFAULTCOIN = "XTZ";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const SITE_URL = import.meta.env.VITE_SITE_URL;
export const ENABLE_ENCRYPTION = import.meta.env.VITE_ENABLE_ENCRYPTION;
export const LENGTH = import.meta.env.VITE_LENGTH;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
export const S3_URL = import.meta.env.VITE_S3_URL;
export const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL;
export const IMAGEKIT = import.meta.env.VITE_IMAGEKIT;
// export const SITE_URL = "localhost:3000"

// export const FIREBASE_MESSAGING_KEY =
//   "BLTmF04vTRjE_-DTrTCScRgavrJ28-kJTMakjTow78wvQjAol6X4W1EU5RremESzXFM5c0-X6AgoBewnlh1m_bg";

export const topSlider = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5500,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const newCollectionSlide = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const sliderOptions1 = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 0,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  asNavFor: ".slider-nav",
};
export const sliderOptions = {
  dots: false,
  infinite: true,
  arrows: false,
  autoplay: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  focusOnSelect: true,
  asNavFor: ".slider-for",
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const itemsSection = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  centerPadding: "60px",
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const videoPhotographerType = [
  "News",
  "Sports",
  "Sports / Action",
  "Nature / Wildlife",
  "Animation/ Digital Art",
  "Documentary",
  "Events Portraits",
  "Product",
  "Food",
  "Fashion",
  "Architectural",
  "Aerial (Drone) / Under-water",
  "Promotional",
  "Other",
];

export const searchInitials = {
  categoryId: 0,
  location: "",
  priceFrom: "",
  priceTo: "",
  title: "",
  dateFrom: "",
  dateTo: "",
  type: "all",
  fulladdress: "",
};
export const filterInitials = {
  categoryId: 0,
  location: "",
  priceFrom: "",
  priceTo: "",
  title: "",
  dateFrom: "",
  dateTo: "",
  // type:"all",
  fulladdress: "",
};

// convert url method
export const changeS3UrlToImageKit = (incomingUrl) => {
  try {
    if (
      incomingUrl?.includes("youtube.com") ||
      incomingUrl?.includes("youtu.be")
    ) {
      return incomingUrl;
    } else {
      const imageKitUrl =
        incomingUrl !== "" && incomingUrl?.replace(S3_URL, IMAGEKIT_URL);
      const s3BucketUrl =
        incomingUrl !== "" && incomingUrl?.replace(IMAGEKIT_URL, S3_URL);
      const url = IMAGEKIT === "YES" ? imageKitUrl : s3BucketUrl;
      return url;
    }
  } catch (error) {
    console.log(error, "error");
  }
};
