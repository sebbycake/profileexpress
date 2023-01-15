import { useEffect } from "react";
import Head from "next/head";
import Education from "./components/Education";
import Portfolio from "./components/Portfolio";
import Work from "./components/Work";
import { Stack, } from '@chakra-ui/react'

function TemplateA({ user }) {
  
  useEffect(() => {

    if (typeof window !== 'undefined') {

      /*==================== MENU SHOW Y HIDDEN ====================*/
      const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle"),
        navClose = document.getElementById("nav-close");

      /*===== MENU SHOW =====*/
      /* Validate if constant exists */
      if (navToggle) {
        navToggle.addEventListener("click", () => {
          navMenu.classList.add("show-menu");
        });
      }

      /*===== MENU HIDDEN =====*/
      /* Validate if constant exists */
      if (navClose) {
        navClose.addEventListener("click", () => {
          navMenu.classList.remove("show-menu");
        });
      }

      /*==================== REMOVE MENU MOBILE ====================*/
      const navLink = document.querySelectorAll(".nav__link");

      function linkAction() {
        const navMenu = document.getElementById("nav-menu");
        // When we click on each nav__link, we remove the show-menu class
        navMenu.classList.remove("show-menu");
      }
      navLink.forEach((n) => n.addEventListener("click", linkAction));

      /*==================== ACCORDION SKILLS ====================*/
      const skillsContent = document.getElementsByClassName("skills__content"),
        skillsHeader = document.querySelectorAll(".skills__header");

      function toggleSkills() {
        let itemClass = this.parentNode.className;
        for (i = 0; i < skillsContent.length; i++) {
          skillsContent[i].className = "skills__content skills__close";
        }
        if (itemClass === "skills__content skills__close") {
          this.parentNode.className = "skills__content skills__open";
        }
      }

      skillsHeader.forEach((el) => {
        el.addEventListener("click", toggleSkills);
      });

      /*==================== QUALIFICATION TABS ====================*/
      const tabs = document.querySelectorAll("[data-target]"),
        tabContents = document.querySelectorAll("[data-content]");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = document.querySelector(tab.dataset.target);
          tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
          });
          target.classList.add("qualification__active");
          tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
          });
          tab.classList.add("qualification__active");
        });
      });

      /*==================== SERVICES MODAL ====================*/
      const modalViews = document.querySelectorAll(".services__modal"),
        modalBtns = document.querySelectorAll(".services__button"),
        modalCloses = document.querySelectorAll(".services__modal-close");

      let modal = function (modalClick) {
        modalViews[modalClick].classList.add("active-modal");
      };

      modalBtns.forEach((modalBtn, i) => {
        modalBtn.addEventListener("click", () => {
          modal(i);
        });
      });

      modalCloses.forEach((modalClose) => {
        modalClose.addEventListener("click", () => {
          modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
          });
        });
      });

      /*==================== PORTFOLIO SWIPER  ====================*/
      let swiper = new Swiper(".portfolio__container", {
        cssMode: true,
        loop: true,

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        mousewheel: true,
        keyboard: true,
      });

      /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
      const sections = document.querySelectorAll("section[id]");

      function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 50;
          const sectionId = current.getAttribute("id");

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
              .querySelector(".nav__menu a[href*=" + sectionId + "]")
              .classList.add("active-link");
          } else {
            document
              .querySelector(".nav__menu a[href*=" + sectionId + "]")
              .classList.remove("active-link");
          }
        });
      }
      window.addEventListener("scroll", scrollActive);

      /*==================== CHANGE BACKGROUND HEADER ====================*/
      function scrollHeader() {
        const nav = document.getElementById("header");
        // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
        if (this.scrollY >= 80) nav.classList.add("scroll-header");
        else nav.classList.remove("scroll-header");
      }
      window.addEventListener("scroll", scrollHeader);

      /*==================== SHOW SCROLL UP ====================*/
      function scrollUp() {
        const scrollUp = document.getElementById("scroll-up");
        // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
        if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
        else scrollUp.classList.remove("show-scroll");
      }
      window.addEventListener("scroll", scrollUp);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{`${user.firstName} ${user.lastName}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* update theme color root css variable here */}
      <style global jsx>{`
        :root {
          --hue-color: ${user.themeColor ? user.themeColor: 217};
        }
      `}</style>

      {/* <!--==================== HEADER ====================--> */}
      <header class="header" id="header">
        <nav class="nav portfolio_container">
          <a href="#" class="nav__logo">
            {user.firstName}
          </a>
          <div class="nav__menu" id="nav-menu">
            <ul class="nav__list grid">
              <li class="nav__item">
                <a href="#home" class="nav__link active-link">
                  <i class="uil uil-estate nav__icon"></i> Home
                </a>
              </li>
              <li class="nav__item">
                <a href="#about" class="nav__link">
                  <i class="uil uil-user nav__icon"></i> About
                </a>
              </li>
              <li>
                <a href="#portfolio" class="nav__link">
                  <i class="uil uil-scenery nav__icon"></i> Portfolio
                </a>
              </li>
              <li>
                <a href="#education" class="nav__link">
                  <i class="uil uil-graduation-cap nav__icon"></i> Education
                </a>
              </li>
              <li>
                <a href="#work" class="nav__link">
                  <i class="uil uil-bag nav__icon"></i> Work
                </a>
              </li>
              <li class="nav__item">
                <a href="#contact" class="nav__link">
                  <i class="uil uil-message nav__icon"></i> Contact
                </a>
              </li>
            </ul>
            <i class="uil uil-times nav__close" id="nav-close"></i>
          </div>
          <div class="nav__btns">
            <div class="nav__toggle" id="nav-toggle">
              <i class="uil uil-apps"></i>
            </div>
          </div>
        </nav>
      </header>

      <main class="main">
        {/* <!--==================== HOME ====================--> */}
        <section class="home section" id="home">
          <div class="home__container portfolio_container grid">
            <div class="home__content grid">
              <div class="home__social">
                {user.links.LinkedIn && (
                  <a
                    href={user.links.LinkedIn}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-linkedin-alt"></i>
                  </a>
                )}
                {user.links.Github && (
                  <a
                    href={user.links.Github}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-github-alt"></i>
                  </a>
                )}
                {user.links.Medium && (
                  <a
                    href={user.links.Medium}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-medium-m"></i>
                  </a>
                )}
                {user.links.Dribbble && (
                  <a
                    href={user.links.Dribbble}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-dribbble"></i>
                  </a>
                )}
                {user.links.Behance && (
                <a
                    href={user.links.Behance}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-behance-alt"></i>
                  </a>
                )}
                {user.links.YouTube && (
                 <a
                    href={user.links.YouTube}
                    target="_blank"
                    class="home__social-icon"
                  >
                    <i class="uil uil-youtube"></i>
                  </a>
                )}
              </div>

              <div class="home__img">
                <svg
                  class="home__blob"
                  viewBox="0 0 200 187"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask id="mask0" maskType="alpha">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                    <image
                      class="home__blob-img"
                      x="16"
                      y="0"
                      xlinkHref={user.profilePhoto}
                    />
                  </g>
                </svg>
              </div>

              <div class="home__data">
                <h1 class="home__title">Hi, I'm {user.firstName}</h1>
                <h3 class="home__subtitle">{user.title}</h3>
                {/* <p class="home__description">
                  I code. I read. Sometimes, I write and I strategize.
                </p> */}
                <a href="#contact" class="button button--flex">
                  Contact Me <i class="uil uil-message button__icon"></i>
                </a>
              </div>
            </div>
            <div class="home__scroll">
              <a href="#about" class="home__scroll-button button--flex">
                <i class="uil uil-mouse-alt home__scroll-mouse"></i>
                <span class="home__scroll-name">Scroll down</span>
                <i class="uil uil-arrow-down home__scroll-arrow"></i>
              </a>
            </div>
          </div>
        </section>

        {/* <!--==================== ABOUT ====================--> */}
        <section class="about section" id="about">
          <h2 class="section__title">About Me</h2>
          <span class="section__subtitle">My Introduction</span>
          <div class="about__container container grid">
            <img src={user.profilePhoto} alt="" class="about__img" />
            <div class="about__data">
              <p class="about__description">{user.intro}</p>
            </div>
          </div>
        </section>

        {/* <!--==================== PORTFOLIO ====================--> */}
        <section class="portfolio section" id="portfolio">
          <h2 class="section__title">Portfolio</h2>
          <span class="section__subtitle">Most recent work</span>
          <div class="portfolio__container container swiper">
            <div class="swiper-wrapper">
              {user.portfolioProjects.map((portfolio) => (
                <Portfolio portfolio={portfolio} />
              ))}
            </div>

            {/* <!-- Add Arrows --> */}
            <div class="swiper-button-next">
              <i class="uil uil-angle-right-b swiper-portfolio-icon"></i>
            </div>
            <div class="swiper-button-prev">
              <i class="uil uil-angle-left-b swiper-portfolio-icon"></i>
            </div>

            {/* <!-- Add Pagination --> */}
            <div class="swiper-pagination"></div>
          </div>
        </section>

        {/* <!--==================== EDUCATION ====================--> */}
        <section class="qualification section" id="education">
          <h2 class="section__title">Education</h2>
          <span class="section__subtitle">My personal journey</span>
          <div class="qualification__container container">
            {/* <div class="qualification__tabs"> */}
              {/* <div
                class="qualification__button button--flex qualification__active"
                data-target="#education"
              >
                <i class="uil uil-graduation-cap qualification__icon"></i>
                Education
              </div> */}

            {/* </div> */}

            <div class="qualification_sections">
              {/* <!--==================== QUALIFICATION CONTENT 1 ====================--> */}
              {/* <div
                class="qualification__content qualification__active"
                data-content
                id="education"
              > */}
                {user.education.map((education) => (
                  <Education education={education} />
                ))}
              {/* </div> */}

              {/* <!--==================== QUALIFICATION CONTENT 2 ====================-->
              <div class="qualification__content" data-content id="work">
                {user.workExperiences.map((work) => (
                  <Work work={work} />
                ))}
              </div> */}
            </div>
          </div>
        </section>


        {/* <!--==================== WORK EXPERIENCES ====================--> */}
        <section class="qualification section" id="work">
          <h2 class="section__title">Work Experiences</h2>
          <span class="section__subtitle">My profession</span>
          <div class="qualification__container container">
              <Stack spacing={4}>
                {user.workExperiences.map((work) => (
                  <Work work={work} />
                ))}
              </Stack>
          </div>
        </section>


        {/* <!--==================== CONTACT ME ====================--> */}
        <section class="contact section" id="contact">
          <h2 class="section__title">Contact Me</h2>
          <span class="section__subtitle">Get in touch</span>
          <div class="contact__container container grid">
            <div>
              <div class="contact__information">
                <i class="uil uil-envelope contact__icon"></i>
                <div>
                  <h3 class="contact__title">Email</h3>
                  <span class="contact__subtitle">{user.email}</span>
                </div>
              </div>

              <div class="contact__information">
                <i class="uil uil-map-marker contact__icon"></i>
                <div>
                  <h3 class="contact__title">Location</h3>
                  <span class="contact__subtitle">Singapore</span>
                </div>
              </div>
            </div>

            {/* form here */}
            <form action="" class="contact__form grid">
              <div className="contact__inputs grid">
                <div class="contact__content">
                  <label for="" class="contact__label">
                    Name
                  </label>
                  <input type="text" name="name" class="contact__input" />
                </div>
                <div class="contact__content">
                  <label for="" class="contact__label">
                    Email
                  </label>
                  <input type="email" name="email" class="contact__input" />
                </div>
              </div>

              <div class="contact__content">
                <label for="" class="contact__label">
                  Project
                </label>
                <input type="text" name="project" class="contact__input" />
              </div>
              <div class="contact__content">
                <label for="" class="contact__label">
                  Message
                </label>
                <textarea
                  name="message"
                  id=""
                  cols="0"
                  rows="7"
                  class="contact__input"
                ></textarea>
              </div>

              <div>
                <a href="" class="button button--flex">
                  Send Message
                  <i class="uil uil-message button__icon"></i>
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* <!--==================== FOOTER ====================--> */}
      <footer class="footer">
        <div class="footer__bg">
          <div class="footer__container portfolio_container grid">
            <div>
              <h1 class="footer__title">{user.firstName}</h1>
              <span class="footer__subtitle">{user.title}</span>
            </div>

            <ul class="footer__links">
              <li>
                <a href="#about" class="footer__link">
                  About
                </a>
              </li>
              <li>
                <a href="#portfolio" class="footer__link">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" class="footer__link">
                  Contact Me
                </a>
              </li>
            </ul>

            <div class="footer__socials">
              <a href="" class="footer__social" target="_blank">
                <i class="uil uil-facebook-f"></i>
              </a>
              <a href="" class="footer__social" target="_blank">
                <i class="uil uil-instagram"></i>
              </a>
              <a href="" class="footer__social" target="_blank">
                <i class="uil uil-twitter-alt"></i>
              </a>
            </div>
          </div>
          <p class="footer__copy">
            &#169; {user.firstName}. Adapted from Bedimcode. All rights reserved
          </p>
        </div>
      </footer>

      {/* <!--==================== SCROLL TOP ====================--> */}
      <a href="" class="scrollup" id="scroll-up">
        <i class="uil uil-arrow-up scrollup__icon"></i>
      </a>
    </div>
  );
}

export default TemplateA;
