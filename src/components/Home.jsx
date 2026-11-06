import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Little Lemon</h1>
        <p className="hero-sub">Lahore</p>
        <p>
           Fresh  food ,
           cooked daily for you and your family
        </p>
        <Link className="button" to="/booking">Reserve a table</Link>
      </section>

      <section className="highlights" aria-labelledby="highlights-title">
        <h2 id="highlights-title">Our popular dishes</h2>
        <ul>
        <li><strong>Russian Salad</strong> - Diced apples, potatoes, peas, and pineapple folded in a rich, sweet creamy dressing.</li>
        <li><strong>Dynamite Chicken</strong> - Crispy fried boneless chicken bites tossed in our signature spicy mayo sauce.</li>
        <li><strong>Lemon Slice Cake</strong> - Soft, buttery pound cake topped with a fresh, tangy lemon glaze.</li>
        </ul>
      </section>
    </>
  );
}

export default Home;
