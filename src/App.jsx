import './App.css'

function App() {
  return (
    <main className="page">
      <div className="courtWatermark">⚖</div>

      <nav className="nav">
        <div className="brand">Akashdeep Shukla Law Office</div>
        <a className="navBtn" href="#contact">Book Consultation</a>
      </nav>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">High Court Lucknow • 16 Years Experience</p>

          <h1 className="radiantTitle">Adv. Akashdeep Shukla</h1>

          <h2>Criminal Lawyer in Lucknow High Court</h2>

          <p className="intro">
            Trusted legal guidance for criminal matters, appeals, writ petitions,
            matrimonial disputes, and divorce cases. Clear advice, strong preparation,
            and serious courtroom representation.
          </p>

          <div className="actions">
            <a className="primary" href="#contact">Book Consultation</a>
            <a className="secondary" href="tel:+917897775992">Call Now</a>
          </div>

          <div className="stats">
            <div><strong>16+</strong><span>Years Experience</span></div>
            <div><strong>High Court</strong><span>Lucknow</span></div>
            <div><strong>Criminal</strong><span>Appeals & Writs</span></div>
          </div>
        </div>

        <div className="profileCard">
          <div className="photoAura"></div>
          <img src={`${import.meta.env.BASE_URL}akashdeep-shukla.jpg`} alt="Advocate Akashdeep Shukla" />
          <div className="verified">Verified Advocate</div>
        </div>
      </section>

      <section className="section">
        <p className="sectionLabel">Practice Areas</p>
        <h2>Legal support for urgent and sensitive matters</h2>

        <div className="grid">
          {[
            'Criminal Defense',
            'Bail Matters',
            'Criminal Appeals',
            'Writ Petitions',
            'Marriage Disputes',
            'Divorce Matters',
          ].map((item) => (
            <div className="card" key={item}>
              <span>⚖️</span>
              <h3>{item}</h3>
              <p>Clear guidance, document review, legal strategy, and court representation.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <p className="sectionLabel">Why Choose Him</p>
          <h2>Calm advice. Strong preparation. Serious representation.</h2>
        </div>

        <div className="points">
          <p>Experienced in High Court Lucknow matters.</p>
          <p>Focused on criminal, appeal, writ, and matrimonial cases.</p>
          <p>Practical legal advice with clear next steps.</p>
          <p>Trusted support for sensitive legal matters.</p>
        </div>
      </section>

      <section className="seoBox">
        <h2>Looking for a criminal lawyer in Lucknow?</h2>
        <p>
          Adv. Akashdeep Shukla assists clients with criminal cases, bail,
          appeals, writ matters, marriage disputes, and divorce cases before
          courts in Lucknow.
        </p>
      </section>

      <section id="contact" className="contact">
        <p className="sectionLabel">Consultation</p>
        <h2>Need legal help now?</h2>
        <p>Share your case details and get connected for the next legal step.</p>

        <div className="actions center">
          <a className="primary" href="tel:+917897775992">Call Advocate</a>
        </div>
      </section>
    </main>
  )
}

export default App