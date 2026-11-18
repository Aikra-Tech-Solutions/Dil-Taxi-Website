import { useEffect, useState } from 'react';

const NAV = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

const SERVICES = [
  { icon: '🛵', name: 'Bike', text: 'Quick and affordable rides through busy traffic.', tag: '1 seat' },
  { icon: '🛺', name: 'Auto', text: 'Everyday city trips at friendly fares.', tag: '3 seats' },
  { icon: '🚕', name: 'Mini', text: 'Compact, comfortable cabs for small groups.', tag: '4 seats' },
  { icon: '🚙', name: 'Sedan', text: 'Extra legroom for a premium ride.', tag: '4 seats' },
  { icon: '🚐', name: 'SUV', text: 'Spacious rides for families and luggage.', tag: '6 seats' },
];

const STEPS = [
  ['Set your trip', 'Enter your pickup and drop locations.'],
  ['Choose a ride', 'Pick the vehicle that suits your budget and group.'],
  ['Meet your driver', 'A verified driver arrives at your pickup point.'],
  ['Ride and pay', 'Enjoy the trip and pay at the end of your ride.'],
];

const WHY = [
  ['🛡️', 'Safety first', 'Verified drivers and vehicles, so you can ride with confidence.'],
  ['⏱️', 'Reliable', 'Dependable pickups, whether it is a morning commute or a late night.'],
  ['📱', 'Convenient', 'Simple booking that works the way you expect.'],
  ['💰', 'Fair prices', 'Clear, upfront fares with no unpleasant surprises.'],
];

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="DilTaxi home">
      <span className="logo-mark" aria-hidden="true">🚕</span>
      <span>
        Dil<b>Taxi</b>
      </span>
    </a>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <button
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`links ${open ? 'open' : ''}`}>
            {NAV.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="btn btn-primary small" href="#book" onClick={() => setOpen(false)}>
              Book a Ride
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <span className="pill">Safe · Reliable · Affordable</span>
              <h1>
                Your ride, <span className="accent">your way.</span>
              </h1>
              <p>
                DilTaxi gets you where you need to go, with verified drivers, clear fares and a
                choice of vehicles for every trip.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="#book">
                  Book a Ride
                </a>
                <a className="btn btn-ghost" href="#how">
                  How it works
                </a>
              </div>
              <ul className="stats">
                <li>
                  <b>5</b>
                  <span>Ride types</span>
                </li>
                <li>
                  <b>Verified</b>
                  <span>Drivers</span>
                </li>
                <li>
                  <b>Clear</b>
                  <span>Upfront fares</span>
                </li>
              </ul>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="road" />
              <div className="taxi">🚕</div>
              <div className="pin p1">📍</div>
              <div className="pin p2">🏁</div>
            </div>
          </div>
        </section>

        <section id="book" className="section book">
          <div className="container">
            <form className="booking reveal" onSubmit={submit}>
              <h2>Where to?</h2>
              <div className="fields">
                <label>
                  <span>Pickup location</span>
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    required
                  />
                </label>
                <label>
                  <span>Drop location</span>
                  <input
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="Enter drop location"
                    required
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Book a Ride
                </button>
              </div>
              {notice && (
                <p className="notice" role="status">
                  Online booking on this website is coming soon. For now, please book through the
                  DilTaxi app or contact us below.
                </p>
              )}
            </form>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="head reveal">
              <h2>Our Services</h2>
              <p>A ride for every need and budget.</p>
            </div>
            <div className="grid cards">
              {SERVICES.map((s) => (
                <article key={s.name} className="card reveal">
                  <div className="icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <span className="tag">{s.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section alt">
          <div className="container">
            <div className="head reveal">
              <h2>How It Works</h2>
              <p>Four simple steps from request to arrival.</p>
            </div>
            <ol className="grid steps">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="step reveal">
                  <span className="num">{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="why" className="section">
          <div className="container">
            <div className="head reveal">
              <h2>Why Choose DilTaxi</h2>
              <p>Built around reliability, convenience and safety.</p>
            </div>
            <div className="grid why">
              {WHY.map(([i, t, d]) => (
                <div key={t} className="why-item reveal">
                  <span className="icon">{i}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section dark">
          <div className="container about reveal">
            <h2>About Us</h2>
            <p>
              DilTaxi is a taxi-booking platform that connects riders with verified drivers and
              vehicle owners. We focus on honest fares, safe journeys and a simple experience, from
              a quick auto ride to a comfortable family trip.
            </p>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="head reveal">
              <h2>Contact Us</h2>
              <p>We would love to hear from you.</p>
            </div>
            <div className="grid contact">
              <div className="card reveal">
                <div className="icon">📞</div>
                <h3>Phone</h3>
                <p>+91 8695818655</p>
              </div>
              <div className="card reveal">
                <div className="icon">✉️</div>
                <h3>Email</h3>
                <p>rameshpnr8527@gmail.com</p>
              </div>
              <div className="card reveal">
                <div className="icon">📍</div>
                <h3>3/220A KK Nagar Perumanallur Tiruppur TAMIL NADU-641666</h3>
                <p>Tiruppur, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot-inner">
          <Logo />
          <nav>
            {NAV.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} DilTaxi. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
