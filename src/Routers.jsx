import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Loader from "./containers/components/Loader/Loader";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-phone-input-2/lib/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./containers/components/Footer/Footer";
import Header from "./containers/components/Header/Header";
import {
  apiCallGet,
  axiosRequest,
  axiosResponse,
} from "./containers/components/Axios/Axios";
import { useDispatch } from "react-redux";
import {
  setUserProfile,
  removeToken,
  setNotificationData,
  setPhotographer,
  setUserStatus,
  setShowBackButton,
} from "./Redux/Reducers/user";

import { toasts } from "./containers/components/Toast/Toast";
import cogoToast from "cogo-toast";
import BackButton from "./containers/components/BackButton/BackButton";



// import { getFirebaseToken, onMessageListener } from "./firebase";

const LandingPage = React.lazy(() =>
  import("./containers/pages/LandingPage/LandingPage")
);
const SearchResult = React.lazy(() =>
  import("./containers/pages/SearchResult/SearchResult")
);
const PhotoInfo = React.lazy(() =>
  import("./containers/pages/PhotoInfo/PhotoInfo")
);
const CreateEditItem = React.lazy(() =>
  import("./containers/pages/CreateEditItem/CreateEditItem")
);
const BuyInfoPage = React.lazy(() =>
  import("./containers/pages/BuyInfoPage/BuyInfoPage")
);
const PurchaseInfo = React.lazy(() =>
  import("./containers/pages/BuyInfoPage/PurchaseInfo")
);
const Settings = React.lazy(() =>
  import("./containers/pages/Settings/Settings")
);

const TransactionHistory = React.lazy(() =>
  import("./containers/pages/Settings/TransactionHistory/TransactionHistory")
);
const PaymentMethod = React.lazy(() =>
  import("./containers/pages/Settings/PaymentMethod/PaymentMethod")
);
const NoPageFound = React.lazy(() =>
  import("./containers/pages/NoPageFound/NoPageFound")
);
const MyCart = React.lazy(() => import("./containers/pages/MyCart/MyCart"));
const BecomePhotographer = React.lazy(() =>
  import("./containers/pages/BecomePhotographer/BecomePhotographer")
);
// const EditItem = React.lazy(() =>
//   import("./containers/pages/CreateEditItem/EditItem")
// );
const ListItem = React.lazy(() =>
  import("./containers/pages/CreateEditItem/ListItem")
);
const MyProfile = React.lazy(() =>
  import("./containers/pages/MyProfile/MyProfile")
);
const PhotographersProfile = React.lazy(() =>
  import("./containers/pages/MyProfile/PhotographersProfile")
);
const CollectionProfile = React.lazy(() =>
  import("./containers/pages/CollectionProfile/CollectionProfile")
);
const TermServices = React.lazy(() =>
  import("./containers/pages/TermServices/TermServices")
);

const WhitePaper = React.lazy(() =>
  import("./containers/pages/WhitePaper/WhitePaper")
);
const PrivacyPolicy = React.lazy(() =>
  import("./containers/pages/PrivacyPolicy/PrivacyPolicy")
);
const Notification = React.lazy(() =>
  import("./containers/pages/Notification/Notification")
);
const Faq = React.lazy(() => import("./containers/pages/Faq/Faq"));
const Pricing = React.lazy(() => import("./containers/pages/Pricing/Pricing"));
const MyItem = React.lazy(() => import("./containers/pages/MyItem/MyItem"));
// const Wallet = React.lazy(() => import("./containers/pages/Wallet/Wallet"));
const VerifyEmail = React.lazy(() =>
  import("./containers/pages/Verifyemail/Verifyemail")
);
const ResetPassword = React.lazy(() =>
  import("./containers/pages/ResetPassword/ResetPassword.jsx")
);
const ContactUs = React.lazy(() =>
  import("./containers/pages/ContactUs/Contactus.jsx")
);

const Routers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = useSelector((state) => state.user.showBackBtn);

  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);
  // const { id } = useParams();
  const ref = useRef(null);

  useEffect(() => {
    axiosResponse(setActive);
    axiosRequest(setActive);
    // setHeight(ref.current.clientHeight);

    // document?.getElementById("footer-height")?.clientHeight
  }, []);

  function isInView(el) {
    let box = el.getBoundingClientRect();
    return box.top < window.innerHeight && box.bottom >= 0;
  }
  window.addEventListener("scroll", function () {
    let footer = document.getElementById("footer-height");
    let Cartfooter = document.getElementById("cartBlockClass");

    let visible = isInView(footer);
    if (visible) {
      Cartfooter.classList.remove("cartBlockBottomSet");
    } else {
      Cartfooter.classList.add("cartBlockBottomSet");
    }
  });

  const auth = useSelector((state) => state.user.loggedin);

  const photographer = useSelector(
    (state) => state?.user?.profile?.userDetails?.role_type
  );
  const userId = useSelector(
    (state) => state?.user?.profile?.userDetails?.userId
  );

  const isPhotographer = useSelector((state) => state.user.photographer);
  useEffect(() => {
    if (auth && +photographer === 2 || +photographer === 3 ) {
      dispatch(setPhotographer(true));
    } else {
      dispatch(setPhotographer(false));
    }
  }, [photographer]);

  // To load once
  // useEffect(() => {

  //   onMessageListener()
  //     .then((payload) => {
  //       console.log(payload);
  //     })
  //     .catch((err) => console.log("failed: ", err));
  // }, [userId]);
  const options = {
    position: "bottom-right",
  };

  const checkUserStatus = async () => {
    try {
      const res = await apiCallGet("/users/api/v1/check_user_status");
      if (res) {
        if (+res.data.isActive === 0) {
          cogoToast.error(
            "Admin has blocked you from running cupchairs. for more information contact support!",
            options
          );
          logoutUser();
        }
      }
      else{
        logoutUser();
      }
    } catch {
      logoutUser();
    }
  };

  // useEffect(() => {
  //   dispatch(setShowBackButton(true));
  //   auth && checkUserStatus();
  // }, [loction]);
  useEffect(() => {
    dispatch(setShowBackButton(true));
    auth && checkUserStatus();
  }, []);

  const logoutUser = () => {
    dispatch(removeToken());
    dispatch(setUserStatus(false));
    dispatch(setUserProfile({}));
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
    <div
      className="mainWrap"
      id="cartBlockClass"
      // style={{ paddingBottom: height }}
    >
      <Loader active={active} />
      <Header />
      {showBackButton && <BackButton />}

      <Suspense fallback={<Loader active={true} />}>
        <Routes>
          <Route path={"/"} element={<LandingPage />} />
          <Route path={"search"} element={<SearchResult />} />
          <Route path={"photoInfo"} element={<PhotoInfo />} />
          <Route path={"/collection-detail/:slug"} element={<CollectionProfile />} />
          <Route path={"termservices"} element={<TermServices />} />
          <Route path={"whitePaper"} element={<WhitePaper />} />
          <Route path={"privacypolicy"} element={<PrivacyPolicy/>} />
          <Route path={"verify-email"} element={<VerifyEmail />} />
          <Route path={"reset-password"} element={<ResetPassword />} />
          <Route path={"help"} element={<Faq />} />
          <Route path={"pricing"} element={<Pricing />} />
          <Route path={"nft-info/:id"} element={<BuyInfoPage />} />
          <Route path={"/my-purchased-item/:id"} element={<PurchaseInfo setActive={setActive} />}  />
          
          <Route path={"contact-us"} element={<ContactUs />} />
          <Route
            path={"create-new-item"}
            element={!isPhotographer ? <Navigate to="/" /> : <CreateEditItem />}
          />
          <Route
            path={"edit-item/:id"}
            element={!auth ? <Navigate to="/" /> : <CreateEditItem />}
          />
          <Route
            path={"relist-item/:id"}
            element={!auth ? <Navigate to="/" /> : <CreateEditItem />}
          />
          <Route
            path={"settings"}
            element={!auth ? <Navigate to="/" /> : <Settings />}
          />
          <Route
            path={"transactions"}
            element={!auth ? <Navigate to="/" /> : <TransactionHistory />}
          />
          <Route
            path={"wallet"}
            element={!auth ? <Navigate to="/" /> : <PaymentMethod />}
          />
          <Route
            path={"cart"}
            element={!auth ? <Navigate to="/" /> : <MyCart />}
          />
          <Route
            path={"becomePhotographer"}
            element={!auth ? <Navigate to="/" /> : <BecomePhotographer />}
          />
          <Route
            path={"listItem"}
            element={!auth ? <Navigate to="/" /> : <ListItem />}
          />
          <Route
            path={"notifications"}
            element={!auth ? <Navigate to="/" /> : <Notification />}
          >
            <Route
              path={":id"}
              element={!auth ? <Navigate to="/" /> : <Notification />}
            />
          </Route>
          <Route
            path={"photographersProfile/:id"}
            element={<PhotographersProfile />}
          />
          <Route
            path={"musiciansProfile/:id"}
            element={<PhotographersProfile />}
          />
          <Route
            path={"myItem"}
            element={
              !auth ? <Navigate to="/" /> : <MyItem setActive={setActive} />
            }
          />
          <Route
            path={"myProfile"}
            element={!auth ? <Navigate to="/" /> : <MyProfile />}
          />
          {/* <Route
            path={"wallet"}
            element={!auth ? <Navigate to="/" /> : <Wallet />}
          /> */}
          <Route path={"*"} element={<NoPageFound errors="Page Not Found" />} />
        </Routes>
      </Suspense>
    </div>
      {/* {location.pathname !== "/cart" && <Footer refs={ref} />} */}
      <Footer refs={ref} />
      </>
  );
};
export default Routers;
  