const About = () => {
  return (
    <div id="home-page">
      <div id="header-home-page">Cuida tus Hábitos</div>
      <div class="container">
        <h2>Calendario de Hábitos</h2>
        <div class="calendar">
          <div class="day">Lun</div>
          <div class="day">Mar</div>
          <div class="day">Mié</div>
          <div class="day">Jue</div>
          <div class="day">Vie</div>
          <div class="day">Sáb</div>
          <div class="day">Dom</div>
        </div>
        <h2>Hábitos Comunes</h2>
        <div class="habits">
          <div class="habit">Ejercicio</div>
          <div class="habit">Beber agua</div>
          <div class="habit">Leer</div>
          <div class="habit">Dormir bien</div>
          <div class="habit">Meditar</div>
          <div class="habit">Comer saludable</div>
        </div>
        <button>Empezar a Registrar Hábitos</button>
      </div>
    </div>
  );
};

export default About;
