function Portfolio({ portfolio }) {
  return (
    <div class="portfolio__content grid swiper-slide">
      <img src={portfolio.thumbnail} alt="" class="portfolio__img" />
      <div class="portfolio__data">
        <h3 class="portfolio__title">{portfolio.title}</h3>
        <p class="portfolio__description">
          {portfolio.description}
        </p>
        <a
          href={portfolio.demoLink}
          target="_blank"
          class="button button--flex button--small portfolio__button"
        >
          Demo
          <i class="uil uil-arrow-right button__icon"></i>
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
