export const businessData = {
  name: 'Baked & Bottled',
  tagline: 'Artisan pastries, brunch plates, and specialty coffee in a cozy neighborhood space.',
  description:
    'Baked & Bottled blends bakery craftsmanship with relaxed bar-cafe energy. Guests come for laminated pastries, all-day brunch, and carefully brewed coffee in a warm, social setting.',
  // TODO: verify these details from the Google Maps listing.
  contact: {
    address: 'Local address — please verify',
    phone: '+44 (0)0000 000000',
    directionsUrl: 'https://share.google/Ee3fyclpUpuAhxyGq',
    mapsEmbedPlaceholder: 'Google Maps embed goes here',
  },
  hours: [
    { day: 'Monday', hours: '8:00 AM – 4:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM – 4:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM – 4:00 PM' },
    { day: 'Thursday', hours: '8:00 AM – 5:00 PM' },
    { day: 'Friday', hours: '8:00 AM – 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: '9:00 AM – 4:00 PM' },
  ],
  reviews: [
    'Guests regularly praise the flaky pastry texture and creative seasonal fillings.',
    'Brunch plates are highlighted as generous, balanced, and full of fresh ingredients.',
    'The venue atmosphere is often described as friendly, stylish, and perfect for slow mornings.',
  ],
  menuCategories: [
    {
      name: 'Brunch & Savory Plates',
      items: [
        { name: 'Granola Bowl', price: '£5.50' },
        { name: 'Fresh Berries, Mix Seeds, Yogurt', price: '£5.50' },
        { name: 'Overnight Oats', price: '£5.50' },
        { name: 'Ham & Cheese Toastie', price: '£7.50' },
        { name: 'Chorizo Melt Toastie', price: '£9.50' },
        { name: 'Mortadella Sandwich', price: '£9.50' },
        { name: 'Grilled Veg Sandwich', price: '£9.50' },
        { name: 'Fruit & Berry Pancakes (GF)', price: '£13.50' },
        { name: 'Bacon & Egg Pancakes (GF)', price: '£15.50' },
        { name: 'Mushrooms on Toast', price: '£9.50' },
        { name: 'Shakshuka', price: '£10.50' },
      ],
    },
    {
      name: 'Pastries & Bakes',
      items: [
        { name: 'Croissant', price: '£3.50' },
        { name: 'Chocolate Croissant', price: '£3.95' },
        { name: 'Cinnamon Monkey Bread', price: '£3.95' },
        { name: 'Almond Croissant', price: '£4.50' },
        { name: 'Pain Suisse', price: '£4.50' },
        { name: 'Kimcheese & Ham', price: '£5.50' },
        { name: 'Sausage Roll', price: '£5.95' },
        { name: 'Brown Butter Chocolate Chip Cookies', price: '£3.50' },
        { name: 'Pecan Chocolate Cookies', price: '£3.50' },
        { name: 'Flourless Chocolate Cake Slice (GF)', price: '£5.95' },
        { name: 'Buttermilk Scone, Jam & Butter', price: '£3.20' },
      ],
    },
  ],
  gallery: [
    { src: '/assets/photo-1.jpg', alt: 'Laminated pastry served on a plate' },
    { src: '/assets/photo-2.jpg', alt: 'Assorted pastries on a café table' },
    { src: '/assets/photo-3.jpg', alt: 'Bakery display counter and seating area' },
    { src: '/assets/photo-4.jpg', alt: 'Seasonal pastry nests on display' },
    { src: '/assets/photo-5.jpg', alt: 'Matcha latte art in turquoise cups' },
  ],
  social: [
    // TODO: add official social handles from the business listing.
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
};
