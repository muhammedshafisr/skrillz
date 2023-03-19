import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "@react-icons/all-files/go/GoPrimitiveDot";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { setRandomVideos } from "../../redux/ducks/video";
import { useDispatch, useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import HomeGenreSection from "./homeGenreSection";
import Footer from "./footer";

const HomeLiveSection = () => {
  const delay = 4000;
  const [liveVideo, setLiveVideo] = useState("");
  const [visibleSlides, setVisibleSlides] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { randomVideos } = useSelector((state) => state.videosList);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.request({
        method: "get",
        url: "http://localhost:8080/api/user/home",
      });
      const { liveVideo, randomVideos } = data.homeData;
      
      if (randomVideos.length < 4) {
        setVisibleSlides(2);
      }
      if (randomVideos.length >= 4) {
        setVisibleSlides(4);
      }
      // live videos is not in the redux store
      setLiveVideo(liveVideo);
      dispatch(setRandomVideos(randomVideos));
    })();
  }, [dispatch]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? liveVideo?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === liveVideo?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === liveVideo?.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    document
      .querySelector(`#currentIndex${currentIndex}`)
      ?.classList?.add("text-cyan-700");

    return () => {
      resetTimeout();
    };
  }, [currentIndex, liveVideo?.length]);

  return (
    <>
      <div className="mx-auto">
        <div className=" bg-slate-900 shadow-cyan-600 shadow-md dark:bg-gray-800 dark:border-gray-700">
          {liveVideo?.length > 0 && (
            <>
              <div className="max-w-[1400px] h-[480px] w-full m-auto relative group">
                {console.log(liveVideo[currentIndex]?.url, liveVideo[currentIndex]?.thumbnail, currentIndex)}
                <Link to={`${liveVideo[currentIndex]?.url}`}>
                  <div
                    style={{
                      backgroundImage: `url(/img/${liveVideo[currentIndex]?.thumbnail})`,
                    }}
                    className="w-full h-full bg-center bg-cover duration-500"
                  ></div>
                </Link>
                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 bg-black/20 text-white cursor-pointer">
                  <svg
                    onClick={prevSlide}
                    size={30}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl p-2 bg-black/20 text-white cursor-pointer">
                  <svg
                    onClick={nextSlide}
                    size={30}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex top-4 justify-center py-2">
                {liveVideo?.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="text-2xl cursor-pointer"
                  >
                    {slideIndex === currentIndex ? (
                      <RxDotFilled className="text-cyan-400" />
                    ) : (
                      <RxDotFilled className="text-cyan-100" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {!liveVideo?.length > 0 && (
            <div className="max-w-[1400px] h-[480px] w-full m-auto relative group">
              <div
                style={{ backgroundImage: `url(/img/8083263.jpg)` }}
                className="w-full h-full bg-center bg-cover duration-500"
              ></div>
            </div>
          )}

          {/* // carousel */}
          {randomVideos?.length > 0 && (
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-center w-full">
                {/* Carousel for desktop and large size devices */}
                {randomVideos && (
                  <CarouselProvider
                    className="lg:block hidden"
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    interval={4000}
                    isPlaying={true}
                    totalSlides={randomVideos.length}
                    visibleSlides={visibleSlides}
                    step={1}
                    infinite={true}
                  >
                    <div className="w-full relative flex items-center justify-center">
                      <ButtonBack
                        role="button"
                        aria-label="slide backward"
                        className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                        id="prev"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 1L1 7L7 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonBack>
                      <div className="w-full mx-auto">
                        <Slider>
                          <div
                            id="slider"
                            className="flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                          >
                            {randomVideos.map((x, index) => (
                              <Slide
                                index={index}
                                key={index}
                                className="max-h-48"
                              >
                                <Link to={`/view_video/${x._id}`}>
                                  <div className="flex flex-shrink-0 relative w-full max-h-48 object-cover sm:w-auto">
                                    <img
                                      src={`/img/${x.video.thumbnail}`}
                                      alt="black chair and white table"
                                      className="object-cover object-center w-full"
                                    />
                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                      <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">{`${x.video.name}`}</h2>
                                      <div className="flex items-end h-full">
                                        <h3 className="text-sm font-semibold leading-5 lg:leading-6 text-white">{`${x.video.description}`}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </Slide>
                            ))}
                          </div>
                        </Slider>
                      </div>
                      <ButtonNext
                        role="button"
                        aria-label="slide forward"
                        className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        id="next"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L1 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonNext>
                    </div>
                  </CarouselProvider>
                )}
                {/* Carousel for tablet and medium size devices */}
                {randomVideos && (
                  <CarouselProvider
                    className="lg:hidden md:block hidden"
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    interval={4000}
                    isPlaying={true}
                    totalSlides={randomVideos?.length}
                    visibleSlides={2}
                    step={1}
                    infinite={true}
                  >
                    <div className="w-full relative flex items-center justify-center">
                      <ButtonBack
                        role="button"
                        aria-label="slide backward"
                        className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                        id="prev"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 1L1 7L7 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonBack>
                      <div className="w-full mx-auto overflow-x-hidden overflow-y-hidden">
                        <Slider>
                          <div
                            id="slider"
                            className="flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                          >
                            {randomVideos.map((x, index) => (
                              <Slide index={index} key={index}>
                                <Link to={`/view_video/${x._id}`}>
                                  <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                                    <img
                                      src={`/img/${x.video.thumbnail}`}
                                      alt="black chair and white table"
                                      className="object-cover object-center w-full"
                                    />
                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                      <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">{`${x.video.name}`}</h2>
                                      <div className="flex items-end h-full">
                                        <h3 className="text-sm font-semibold leading-5 lg:leading-6 text-white">{`${x.video.description}`}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </Slide>
                            ))}
                          </div>
                        </Slider>
                      </div>
                      <ButtonNext
                        role="button"
                        aria-label="slide forward"
                        className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        id="next"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L1 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonNext>
                    </div>
                  </CarouselProvider>
                )}
                {/* Carousel for mobile and Small size Devices */}
                {randomVideos && (
                  <CarouselProvider
                    className="block md:hidden "
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    totalSlides={randomVideos?.length}
                    interval={4000}
                    isPlaying={true}
                    visibleSlides={1}
                    step={1}
                    infinite={true}
                  >
                    <div className="w-full relative flex items-center justify-center">
                      <ButtonBack
                        role="button"
                        aria-label="slide backward"
                        className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                        id="prev"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 1L1 7L7 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonBack>
                      <div className="w-full mx-auto overflow-x-hidden overflow-y-hidden">
                        <Slider>
                          <div
                            id="slider"
                            className="w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700"
                          >
                            {randomVideos.map((x, index) => (
                              <Slide index={index} key={index}>
                                <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                                  <img
                                    src={`/img/${x.video.thumbnail}`}
                                    alt="black chair and white table"
                                    className="object-cover object-center w-full"
                                  />
                                  <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                    <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">{`${x.video.name}`}</h2>
                                    <div className="flex items-end h-full">
                                      <h3 className="text-sm font-semibold leading-5 lg:leading-6 text-white">{`${x.video.description}`}</h3>
                                    </div>
                                  </div>
                                </div>
                              </Slide>
                            ))}
                          </div>
                        </Slider>
                      </div>
                      <ButtonNext
                        role="button"
                        aria-label="slide forward"
                        className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        id="next"
                      >
                        <svg
                          width={8}
                          height={14}
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L1 13"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ButtonNext>
                    </div>
                  </CarouselProvider>
                )}
              </div>
            </div>
          )}
          {/* Carousel end */}
          <HomeGenreSection />
        </div>
      </div>
    </>
  );
};

export default HomeLiveSection;
