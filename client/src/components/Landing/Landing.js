import "./css/default.css";
import { useEffect, useState } from "react";
import img1 from "./img/device1.png";
import img2 from "./img/device2.png";
import img3 from "./img/device3.png";
import f1 from "./img/f1.png";
import f2 from "./img/f2.png";
import intro from "./img/intro.png";
import js from "./js/scripts.js";
const Landing = () => {
  return (
    <>
      {/* <!--navigation--> */}
      <section class="smart-scroll">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-md navbar-dark">
            <a class="navbar-brand heading-black" href="index.html">
              {" "}
              Trendly{" "}
            </a>
            <button
              class="navbar-toggler navbar-toggler-right border-0"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span data-feather="grid"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav ml-auto" style={{ textAlign: "initial" }}>
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#features">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#endorsements">
                    Endorsements
                  </a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link page-scroll" href="#blog">
                    Extra
                  </a>
                </li> */}
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#about">
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link page-scroll d-flex flex-row align-items-center text-primary"
                    href="/auth"
                  >
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
      {/* )} */}
      {/* <!--hero header--> */}
      <section class="py-7 py-md-0 bg-hero" id="home">
        <div class="container">
          <div class="row vh-md-100">
            <div class="col-md-4 col-sm-10 col-6 mx-auto my-auto text-center">
              <h1 class="heading-black text-capitalize">
                A platform to track all your data
              </h1>
              {/* <!-- <p class="lead py-3">Trendly steals all your</p> --> */}
              <button
                class="btn btn-primary d-inline-flex flex-row align-items-center"
                onClick={() => {
                  window.location.href = "/auth";
                }}
              >
                Get Started
                <em class="ml-2" data-feather="arrow-right"></em>
              </button>
            </div>
            <div class="col-md-8 col-sm-10 col-6 mx-auto my-auto text-center">
              <h1 class="heading-black text-capitalize"></h1>
              {/* <!-- <p class="lead py-3">Trendly steals all your</p> --> */}
              <img
                src={intro}
                style={{
                  background: "transparent",
                  height: "440px",
                  width: "auto",
                  borderRadius: "1%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- features section --> */}
      <section class="pt-6 pb-7" id="features">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto text-center">
              <h2 class="heading-black">
                Trendly offers customized tracking for your everyday needs.
              </h2>
              {/* <!-- <p class="text-muted lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.
            </p> --> */}
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-10 mx-auto">
              <div class="row feature-boxes">
                <div class="col-md-6 box">
                  <div class="icon-box box-primary">
                    <div class="icon-box-inner">
                      <span data-feather="edit-3" width="35" height="35"></span>
                    </div>
                  </div>
                  <h5>Full Customizability</h5>
                  <p class="text-muted">
                    You can track your progress in anyway you want.
                  </p>
                </div>
                <div class="col-md-6 box">
                  <div class="icon-box box-success">
                    <div class="icon-box-inner">
                      <span
                        data-feather="monitor"
                        width="35"
                        height="35"
                      ></span>
                    </div>
                  </div>
                  <h5>Intuitive Visuals</h5>
                  <p class="text-muted">
                    Trendly offers intuitive and multiple formats to view your
                    data.
                  </p>
                </div>
                <div class="col-md-6 box">
                  <div class="icon-box box-danger">
                    <div class="icon-box-inner">
                      <span data-feather="layout" width="35" height="35"></span>
                    </div>
                  </div>
                  <h5>Personalized Insights</h5>
                  <p class="text-muted">
                    Trendly offers secure and informative analysis of your data.
                  </p>
                </div>
                <div class="col-md-6 box">
                  <div class="icon-box box-info">
                    <div class="icon-box-inner">
                      <span data-feather="globe" width="35" height="35"></span>
                    </div>
                  </div>
                  <h5>Network Sharing</h5>
                  <p class="text-muted">
                    Your data is automatically shared with your network.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-6">
            <div class="col-md-6 mr-auto">
              <h2>Use your devices to faciliate your tracking</h2>
              <p class="mb-5">
                Trendly offers multiple device and other tracking service
                integrations.
              </p>
              <a href="#" class="btn btn-light">
                {" "}
                Video Tutorial
              </a>
            </div>
            <div class="col-md-5">
              <div class="slick-about">
                <img
                  src={img1}
                  class="img-fluid rounded d-block mx-auto"
                  alt="Work 1"
                  style={{ background: "transparent" }}
                />

                <img
                  src={img3}
                  class="img-fluid rounded d-block mx-auto"
                  alt="Work 3"
                  style={{ background: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--pricing section--> */}
      <section class="py-7 bg-dark">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto text-center">
              <h2 class="text-white heading-black">Trackings include</h2>
            </div>
          </div>
          {/* <!--pricing tables--> */}
          <div class="row pt-5 pricing-table">
            <div class="col-12 mx-auto">
              <div class="card-deck pricing-table">
                <div class="cardLanding">
                  <div class="card-body">
                    <h3 class="card-title pt-3">Everyday Activities</h3>
                    <h2 class="card-title text-primary mb-0 pt-4">Free</h2>
                    {/* <div class="text-muted font-weight-medium mt-2">
                      blasdfasdf
                    </div> */}
                    <ul class="list-unstyled pricing-list">
                      <li>Everyday tracking</li>
                    </ul>
                    <a href="#" class="btn btn-primary">
                      Details
                    </a>
                  </div>
                </div>
                <div class="cardLanding">
                  <div class="card-body">
                    <h3 class="card-title pt-3">Fitness</h3>
                    <h2 class="card-title text-info mb-0 pt-4">Free</h2>
                    {/* <div class="text-muted font-weight-medium mt-2">
                      per month
                    </div> */}
                    <ul class="list-unstyled pricing-list">
                      <li>Push your fitness boundaries</li>
                    </ul>
                    <a href="#" class="btn btn-info">
                      Details
                    </a>
                  </div>
                </div>
                <div class="cardLanding">
                  <div class="card-body">
                    <h3 class="card-title pt-3">Mental Health</h3>
                    <h2 class="card-title text-primary mb-0 pt-4">$0.99</h2>
                    <div class="text-muted font-weight-medium mt-2">
                      per month
                    </div>
                    <ul class="list-unstyled pricing-list">
                      <li> Coming soon!</li>
                    </ul>
                    <a href="#" class="btn btn-primary">
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- <div class="row mt-6">
          <div class="col-md-4 mr-auto">
            <h3>Everything is covered.</h3>
            <p class="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.
            </p>
          </div>
          <div class="col-md-7 offset-md-1">
            <ul class="features-list">
              <li>Weekly new templates</li>
              <li>Access to new features</li>
              <li>MailChimp integration</li>
              <li>Stripe integration</li>
              <li>100 refund guarantee</li>
              <li>Advance SEO tools</li>
              <li>Free unlimited support</li>
            </ul>
          </div>
        </div> --> */}
          <div class="row mt-5">
            <div
              class="col-md-8 col-12 divider top-divider mx-auto pt-5 text-center"
              style={{ background: "inherit" }}
            >
              <h3>Try Trendly Now!</h3>
              <button
                class="btn btn-primary"
                onClick={() => {
                  window.location.href = "/auth";
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!--faq section--> */}
      {/* <section class="py-7" id="endorsements">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto text-center">
              <h2>User Reviews</h2>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-10 mx-auto">
              <div class="row">
                <div class="col-md-6 mb-5">
                  <h6>Jon - from CA</h6>
                  <p class="text-muted">This app rocks!</p>
                </div>
                <div class="col-md-6 mb-5">
                  <h6>Zhi Yuan - from China</h6>
                  <p class="text-muted">...</p>
                </div>
                <div class="col-md-6 mb-5">
                  <h6>Nicole - UK</h6>
                  <p class="text-muted">...</p>
                </div>
                <div class="col-md-6 mb-5">
                  <h6>...</h6>
                  <p class="text-muted">...</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mx-auto text-center">
              <h2>Featured In</h2>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-10 mx-auto">
              <div class="row">
                <div class="col-md-6 mb-5">
                  <img
                    src={f1}
                    style={{
                      background: "transparent",
                      height: "300px",
                      width: "auto",
                    }}
                  />
                </div>

                <div class="col-md-6 mb-5">
                  <img
                    src={f2}
                    style={{
                      background: "transparent",
                      height: "300px",
                      width: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!--news section--> */}
      {/* <section
        class="py-7 bg-dark section-angle top-left bottom-left"
        id="blog"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto text-center">
              <h2 class="heading-black">Extra</h2>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-4">
              <div class="cardLanding">
                <a href="#">
                  <img
                    class="card-img-top img-raised"
                    src={img1}
                    alt="Blog 1"
                  />
                </a>
                <div class="card-body">
                  <a href="#" class="card-title mb-2">
                    <h5>...</h5>
                  </a>
                  <p class="text-muted small-xl mb-2">Sep 27, 2018</p>
                  <p class="card-text">
                    Nam liber tempor cum soluta nobis eleifend option congue
                    nihil imper, consectetur adipiscing elit.{" "}
                    <a href="#">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="cardLanding">
                <a href="#">
                  <img
                    class="card-img-top img-raised"
                    src={img2}
                    alt="Blog 2"
                  />
                </a>
                <div class="card-body">
                  <a href="#" class="card-title mb-2">
                    <h5>...</h5>
                  </a>
                  <p class="text-muted small-xl mb-2">August 16, 2018</p>
                  <p class="card-text">
                    Nam liber tempor cum soluta nobis eleifend option congue
                    nihil imper, consectetur adipiscing elit.{" "}
                    <a href="#">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="cardLanding">
                <a href="#">
                  <img
                    class="card-img-top img-raised"
                    src={img3}
                    alt="Blog 3"
                  />
                </a>
                <div class="card-body">
                  <a href="#" class="card-title mb-2">
                    <h5>...</h5>
                  </a>
                  <p class="text-muted small-xl mb-2">December 2nd, 2017</p>
                  <p class="card-text">
                    Nam liber tempor cum soluta nobis eleifend option congue
                    nihil imper, consectetur adipiscing elit.{" "}
                    <a href="#">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!--footer--> */}
      <footer class="py-6" id="about">
        <div class="container">
          <div class="row">
            <div class="col-sm-5 mr-auto">
              <h5>About Trendly</h5>
              <p class="text-muted">Trendly is a Web App</p>
              <ul class="list-inline social social-sm">
                <li class="list-inline-item">
                  <a href="">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="">
                    <i class="fa fa-google-plus"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="">
                    <i class="fa fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-sm-2">
              <h5>Docs</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="#">Tutorial</a>
                </li>
                <li>
                  <a href="#">User Guide</a>
                </li>
                <li>
                  <a href="#">Development Guide</a>
                </li>
              </ul>
            </div>
            {/* <!-- <div class="col-sm-2">
            <h5>Partner</h5>
            <ul class="list-unstyled">
              <li><a href="#">Refer a friend</a></li>
              <li><a href="#">Affiliates</a></li>
            </ul>
          </div>
          <div class="col-sm-2">
            <h5>Help</h5>
            <ul class="list-unstyled">
              <li><a href="#">Support</a></li>
              <li><a href="#">Log in</a></li>
            </ul>
          </div> --> */}
          </div>
          <div class="row mt-5">
            <div class="col-12 text-muted text-center small-xl">
              &copy; 2021 Trendly
            </div>
          </div>
        </div>
      </footer>

      {/* <!--scroll to top--> */}
      <div class="scroll-top">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </div>

      {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
    </>
  );
};

export default Landing;
