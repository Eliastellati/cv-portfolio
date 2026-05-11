import { businessData } from './data.business';

const SectionHeading = ({ eyebrow, title, description }) => (
  <header className="mb-8">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </header>
);

const MenuCard = ({ category }) => (
  <article className="card menu-card">
    <h3>{category.name}</h3>
    <ul>
      {category.items.map((item) => (
        <li key={`${category.name}-${item.name}`}>
          <span>{item.name}</span>
          <strong>{item.price}</strong>
        </li>
      ))}
    </ul>
  </article>
);

export default function App() {
  const { name, tagline, description, contact, hours, reviews, menuCategories, gallery, social } = businessData;

  return (
    <div className="page">
      <main>
        <section className="hero section">
          <img className="hero-logo" src="/assets/logo.png" alt={`${name} logo`} />
          <p className="eyebrow">Local Bar & Bakery</p>
          <h1>{name}</h1>
          <p className="lead">{tagline}</p>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-primary">View Menu</a>
            <a href={contact.directionsUrl} className="btn btn-secondary" target="_blank" rel="noreferrer">Get Directions</a>
          </div>
        </section>

        <section className="section" id="about">
          <SectionHeading eyebrow="About" title="Crafted daily, served warmly" description={description} />
        </section>

        <section className="section" id="menu">
          <SectionHeading eyebrow="Menu Preview" title="Brunch, pastries & signature bakes" description="Extracted from provided menu images. Please manually verify spelling, item availability, and pricing." />
          <div className="menu-grid">
            {menuCategories.map((category) => <MenuCard key={category.name} category={category} />)}
          </div>
        </section>

        <section className="section" id="gallery">
          <SectionHeading eyebrow="Gallery" title="Inside the bakehouse" />
          <div className="gallery-grid">
            {gallery.map((photo) => (
              <figure key={photo.src} className="card gallery-item">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="section contact-grid" id="visit">
          <article className="card">
            <SectionHeading eyebrow="Visit" title="Plan your stop" />
            <ul className="contact-list">
              <li><strong>Address:</strong> {contact.address}</li>
              <li><strong>Phone:</strong> <a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
              <li><strong>Directions:</strong> <a href={contact.directionsUrl} target="_blank" rel="noreferrer">Open Google Maps</a></li>
            </ul>
          </article>

          <article className="card">
            <h3>Opening Hours</h3>
            <ul className="hours-list">
              {hours.map((entry) => (
                <li key={entry.day}><span>{entry.day}</span><strong>{entry.hours}</strong></li>
              ))}
            </ul>
            <div className="map-placeholder" aria-label="Google Maps embed placeholder">{contact.mapsEmbedPlaceholder}</div>
          </article>
        </section>

        <section className="section" id="reviews">
          <SectionHeading eyebrow="Guest Highlights" title="What people love" description="Short paraphrased highlights based on listing sentiment, not direct copied reviews." />
          <div className="reviews-grid">
            {reviews.map((review) => <blockquote key={review} className="card">“{review}”</blockquote>)}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {name}</p>
        <div className="socials">
          {social.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </div>
      </footer>
    </div>
  );
}
