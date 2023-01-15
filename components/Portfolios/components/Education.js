function Education({ education }) {
  return (
    <div class="qualification__data">
      <div>
        <h3 class="qualification__title">{education.programme}</h3>
        <span class="qualification__subtitle">{education.institution}</span>
        <div class="qualification__calendar">
          <i class="uil uil-calendar-alt"></i>{" "}
          {`${education.startDate} - ${education.endDate}`}
        </div>
      </div>

      <div>
        <span class="qualification__rounder"></span>
        <span class="qualification__line"></span>
      </div>
    </div>
  );
}

export default Education;
