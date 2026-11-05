/**
 * LOOT PERFUMES — Luxury Storefront Engine
 * Brand: LOOT PERFUMES | Founder: Nasif Ali | Contact: +91 8113873726
 */

(function () {
  'use strict';

  // Master Configuration
  const CONFIG = {
    brandName: "LOOT PERFUMES",
    founder: "Nasif Ali",
    whatsappNumber: "+91 8113873726",
    cleanWhatsApp: "918113873726",
    upiId: "8113873726@upi",
    currency: "₹",
    freeShippingThreshold: 999
  };

  // Default Preserved Catalog (Used as immediate source & offline fallback)
  const DEFAULT_PRODUCTS = [
    {
      id: 1,
      name: "ROYAL OUD",
      category: "Oud",
      gender: "Unisex",
      price: 799,
      originalPrice: 1199,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 799 },
        { size: "100ml", price: 1399 },
        { size: "10ml Pocket Atomizer", price: 249 }
      ],
      concentration: "Extrait de Parfum (35% Oil)",
      description: "The signature masterpiece of LOOT PERFUMES. Royal Oud blends prized Cambodian agarwood with spicy saffron, damask rose petals, and warm smoky ambergris. Engineered for profound projection and an unforgettable 18-hour trail.",
      topNotes: "Smoked Saffron, Bergamot, Cardamom",
      heartNotes: "Cambodian Oud, Rose Damascena, Atlas Cedar",
      baseNotes: "Ambergris, Suede Leather, Dark Musk",
      longevity: "18+ Hours",
      sillage: "Majestic & Beast Mode",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
      stock: 45,
      rating: 4.9,
      reviewsCount: 84,
      featured: true,
      isBestSeller: true,
      isNewArrival: false,
      badge: "BESTSELLER"
    },
    {
      id: 2,
      name: "MIDNIGHT",
      category: "Men's",
      gender: "Men's",
      price: 999,
      originalPrice: 1499,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 999 },
        { size: "100ml", price: 1699 },
        { size: "10ml Pocket Atomizer", price: 299 }
      ],
      concentration: "Extrait de Parfum (35% Oil)",
      description: "An intoxicating, mysterious elixir crafted for twilight elegance. Rich bourbon vanilla and roasted tonka bean intertwine with golden amber resins, sweet pipe tobacco, and creamy cashmere wood.",
      topNotes: "Bourbon Vanilla, Roasted Tonka, Pink Peppercorn",
      heartNotes: "Golden Benzoin, Liquid Amber, Frankincense",
      baseNotes: "Cashmere Wood, Mysore Sandalwood, Sweet Tobacco",
      longevity: "16+ Hours",
      sillage: "Intoxicating & Heavy",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
      stock: 32,
      rating: 5.0,
      reviewsCount: 67,
      featured: true,
      isBestSeller: true,
      isNewArrival: false,
      badge: "BESTSELLER"
    },
    {
      id: 3,
      name: "GOLDEN MUSK",
      category: "Attar",
      gender: "Unisex",
      price: 699,
      originalPrice: 999,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 699 },
        { size: "100ml", price: 1199 },
        { size: "10ml Pocket Atomizer", price: 199 }
      ],
      concentration: "Concentrated Perfume Oil / Extrait (32% Oil)",
      description: "Pure bottled prestige. Golden Musk opens with glistening white honey and almond blossom, cascading into opulent royal white musk, sheer jasmine sambac, and warm powdery amber.",
      topNotes: "Wild White Honey, Sicilian Lemon, Almond Blossom",
      heartNotes: "Royal White Musk, Jasmine Sambac, Orris Butter",
      baseNotes: "Madagascar Amber, Sheer Cedar, White Cashmere",
      longevity: "14+ Hours",
      sillage: "Intimate & Elegant",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
      stock: 38,
      rating: 4.8,
      reviewsCount: 52,
      featured: true,
      isBestSeller: true,
      isNewArrival: false,
      badge: "ICONIC"
    },
    {
      id: 4,
      name: "OUD ARABIA",
      category: "Oud",
      gender: "Unisex",
      price: 1199,
      originalPrice: 1699,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 1199 },
        { size: "100ml", price: 1999 },
        { size: "10ml Pocket Atomizer", price: 349 }
      ],
      concentration: "Extrait de Parfum (38% Oil)",
      description: "A tribute to the grand tradition of Arabian royalty. Formulated with rare aged Indian Dehn Al Oud, wild mountain thyme, smoky birch tar, and majestic Taif rose petals.",
      topNotes: "Taif Rose Petals, Mountain Thyme, Labdanum",
      heartNotes: "Aged Indian Oud, Birch Tar, Guaiac Wood",
      baseNotes: "Smoky Vetiver, Pure Ambergris, Civet Accord",
      longevity: "24+ Hours",
      sillage: "Enormous & Regal",
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600",
      stock: 20,
      rating: 5.0,
      reviewsCount: 94,
      featured: true,
      isBestSeller: true,
      isNewArrival: false,
      badge: "RESERVE"
    },
    {
      id: 5,
      name: "VELVET NOIR",
      category: "Men's",
      gender: "Men's",
      price: 899,
      originalPrice: 1299,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 899 },
        { size: "100ml", price: 1499 },
        { size: "10ml Pocket Atomizer", price: 279 }
      ],
      concentration: "Extrait de Parfum (35% Oil)",
      description: "Nocturnal seduction. Dark Cuban tobacco leaf infused with warm Ceylon cinnamon, dark plum, bittersweet cocoa pod, and intoxicating black orchid blossoms.",
      topNotes: "Cuban Tobacco Leaf, Ceylon Cinnamon, Dark Plum",
      heartNotes: "Cacao Pod, Black Orchid, Roasted Tonka",
      baseNotes: "Smoked Woods, Bourbon Vanilla, Dark Benzoin",
      longevity: "16+ Hours",
      sillage: "Hypnotic & Sensual",
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600",
      stock: 28,
      rating: 4.9,
      reviewsCount: 41,
      featured: false,
      isBestSeller: false,
      isNewArrival: true,
      badge: "NEW ARRIVAL"
    },
    {
      id: 6,
      name: "ROSE SUPREME",
      category: "Women's",
      gender: "Women's",
      price: 749,
      originalPrice: 1099,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 749 },
        { size: "100ml", price: 1299 },
        { size: "10ml Pocket Atomizer", price: 229 }
      ],
      concentration: "Extrait de Parfum (34% Oil)",
      description: "A velvety nocturnal rose drenched in liquid gold. Sparkling lychee and Turkish damask rose petals wrapped around mystical Somalian frankincense and golden amber musks.",
      topNotes: "Imperial Lychee, Dewy Rose Petals, Mandarin",
      heartNotes: "Rose Damascena Absolute, Frankincense, Peony",
      baseNotes: "Golden Amber, Sheer Skin Musk, Vetiver",
      longevity: "15+ Hours",
      sillage: "Romantic & Opulent",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600",
      stock: 35,
      rating: 4.9,
      reviewsCount: 49,
      featured: false,
      isBestSeller: false,
      isNewArrival: true,
      badge: "NEW ARRIVAL"
    },
    {
      id: 7,
      name: "AQUA IMPERIAL",
      category: "Unisex",
      gender: "Unisex",
      price: 849,
      originalPrice: 1199,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 849 },
        { size: "100ml", price: 1449 },
        { size: "10ml Pocket Atomizer", price: 259 }
      ],
      concentration: "Eau de Parfum Intense (28% Oil)",
      description: "Crisp Mediterranean sea breeze infused with crushed Italian mint, sparkling sun-drenched bergamot, and salty marine minerals anchored on white driftwood and mineral oakmoss.",
      topNotes: "Calabrian Bergamot, Sea Salt, Crushed Mint",
      heartNotes: "Oceanic Accord, Blue Lavender, Wild Geranium",
      baseNotes: "Grey Ambergris, Mineral Oakmoss, White Driftwood",
      longevity: "12+ Hours",
      sillage: "Radiant & Fresh",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600",
      stock: 50,
      rating: 4.7,
      reviewsCount: 38,
      featured: false,
      isBestSeller: false,
      isNewArrival: true,
      badge: "NEW ARRIVAL"
    },
    {
      id: 8,
      name: "SANTAL MAJESTY",
      category: "Attar",
      gender: "Unisex",
      price: 1099,
      originalPrice: 1599,
      size: "50ml",
      sizes: [
        { size: "50ml", price: 1099 },
        { size: "100ml", price: 1899 },
        { size: "10ml Pocket Atomizer", price: 329 }
      ],
      concentration: "Extrait de Parfum (35% Oil)",
      description: "An aristocratic woody indulgence. Creamy Mysore sandalwood accented by aromatic green cardamom, papyrus scrolls, and violet petals on a warm foundation of polished amber leather.",
      topNotes: "Green Cardamom, Papyrus, Italian Violet Leaf",
      heartNotes: "Mysore Sandalwood, Florentine Iris, Amyris Wood",
      baseNotes: "Polished Leather, Texas Cedar, Liquid Amber",
      longevity: "17+ Hours",
      sillage: "Quiet Luxury & Prestige",
      image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600",
      stock: 24,
      rating: 5.0,
      reviewsCount: 58,
      featured: false,
      isBestSeller: false,
      isNewArrival: true,
      badge: "NEW ARRIVAL"
    }
  ];

  // App State
  let state = {
    products: [],
    cart: JSON.parse(localStorage.getItem('loot_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('loot_wishlist') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    appliedCoupon: null,
    discountAmount: 0
  };

  // DOM Elements
  const DOM = {
    productsGrid: document.getElementById('productsGrid'),
    bestsellersGrid: document.getElementById('bestsellersGrid'),
    newArrivalsGrid: document.getElementById('newArrivalsGrid'),
    cartDrawer: document.getElementById('cartDrawer'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartCountBadges: document.querySelectorAll('.cart-count-badge'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTotal: document.getElementById('cartTotal'),
    shippingNotice: document.getElementById('shippingNotice'),
    shippingProgressBar: document.getElementById('shippingProgressBar'),
    wishlistCountBadge: document.getElementById('wishlistCountBadge'),
    searchInput: document.getElementById('searchInput'),
    sortSelect: document.getElementById('sortSelect'),
    categoryPills: document.querySelectorAll('.filter-pill'),
    // Modals
    quickViewModal: document.getElementById('quickViewModal'),
    checkoutModal: document.getElementById('checkoutModal'),
    orderTrackingModal: document.getElementById('orderTrackingModal'),
    adminLoginModal: document.getElementById('adminLoginModal'),
    toastContainer: document.getElementById('toastContainer')
  };

  // ================== INIT ==================
  async function init() {
    loadWishlistBadge();
    updateCartUI();
    bindEvents();
    await loadProducts();
  }

  // Load products from API with fallback to DEFAULT_PRODUCTS
  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        state.products = await res.json();
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      // Fallback
      const local = localStorage.getItem('loot_custom_products');
      state.products = local ? JSON.parse(local) : DEFAULT_PRODUCTS;
    }

    renderAllGrids();
  }

  // ================== RENDERING ==================
  function renderAllGrids() {
    renderMainGrid();
    renderBestsellers();
    renderNewArrivals();
  }

  // Render main catalog grid with search and category filters
  function renderMainGrid() {
    if (!DOM.productsGrid) return;

    let filtered = [...state.products];

    // Category filter
    if (state.activeCategory !== 'all') {
      filtered = filtered.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const target = state.activeCategory.toLowerCase();
        return cat.includes(target) || (p.gender && p.gender.toLowerCase() === target);
      });
    }

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.topNotes && p.topNotes.toLowerCase().includes(q)) ||
        (p.heartNotes && p.heartNotes.toLowerCase().includes(q)) ||
        (p.baseNotes && p.baseNotes.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (state.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Empty state
    if (filtered.length === 0) {
      DOM.productsGrid.innerHTML = `
        <div class="empty-catalog">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <h3>NO PERFUMES FOUND</h3>
          <p>We couldn't find any creations matching your search. Try another fragrance note or category.</p>
          <button class="btn btn-gold btn-sm" onclick="resetFilters()">View All Fragrances</button>
        </div>
      `;
      return;
    }

    DOM.productsGrid.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
  }

  // Render Best Sellers section
  function renderBestsellers() {
    if (!DOM.bestsellersGrid) return;
    const items = state.products.filter(p => p.isBestSeller || p.badge === 'BESTSELLER').slice(0, 4);
    DOM.bestsellersGrid.innerHTML = items.map(p => createProductCardHtml(p)).join('');
  }

  // Render New Arrivals section
  function renderNewArrivals() {
    if (!DOM.newArrivalsGrid) return;
    const items = state.products.filter(p => p.isNewArrival || p.badge === 'NEW ARRIVAL').slice(0, 4);
    DOM.newArrivalsGrid.innerHTML = items.map(p => createProductCardHtml(p)).join('');
  }

  // Create Product Card HTML
  function createProductCardHtml(p) {
    const isWishlisted = state.wishlist.includes(p.id);
    const notesSummary = [p.topNotes, p.heartNotes].filter(Boolean).join(' • ') || 'Saffron • Amber • Royal Oud';
    
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-media">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <div class="product-actions-overlay">
            <button class="action-btn-circle ${isWishlisted ? 'active' : ''}" title="Save to Wishlist" onclick="toggleWishlist(${p.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button class="action-btn-circle" title="Fragrance Dossier / Quick View" onclick="openProductModal(${p.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          <img src="${p.image}" alt="${p.name} - LOOT PERFUMES" loading="lazy" onclick="openProductModal(${p.id})" style="cursor:pointer">
        </div>

        <div class="product-body">
          <div class="product-meta">
            <span class="product-category">${p.category || 'Luxury'}</span>
            <span class="product-concentration">${p.concentration ? p.concentration.split('(')[0].trim() : 'EXTRAIT'}</span>
          </div>

          <h3 class="product-name" onclick="openProductModal(${p.id})" style="cursor:pointer">${p.name}</h3>

          <div class="product-rating">
            <span>★ ★ ★ ★ ★</span>
            <span class="rating-count">(${p.rating || 5.0} • ${p.reviewsCount || 40}+)</span>
          </div>

          <div class="product-notes-preview">
            ${notesSummary}
          </div>

          <!-- Size Pills -->
          <div class="product-size-selector" id="size-selector-${p.id}">
            ${(p.sizes && p.sizes.length ? p.sizes : [{ size: p.size || '50ml', price: p.price }]).map((s, idx) => `
              <button class="size-pill ${idx === 0 ? 'active' : ''}" 
                data-size="${s.size}" 
                data-price="${s.price}" 
                onclick="selectCardSize(${p.id}, '${s.size}', ${s.price}, this)">
                ${s.size.split(' ')[0]}
              </button>
            `).join('')}
          </div>

          <div class="product-bottom-row">
            <div class="product-price-box">
              <span class="current-price" id="card-price-${p.id}">${CONFIG.currency}${p.price}</span>
              ${p.originalPrice ? `<span class="original-price">${CONFIG.currency}${p.originalPrice}</span>` : ''}
            </div>

            <button class="btn btn-add-cart" onclick="quickAddToCart(${p.id})">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Handle card size selection
  window.selectCardSize = function (productId, size, price, btn) {
    const parent = document.getElementById(`size-selector-${productId}`);
    if (parent) {
      parent.querySelectorAll('.size-pill').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    }
    const priceDisplay = document.getElementById(`card-price-${productId}`);
    if (priceDisplay) {
      priceDisplay.innerText = `${CONFIG.currency}${price}`;
    }
  };

  // Quick Add to Cart from Card
  window.quickAddToCart = function (productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    let selectedSize = prod.size || '50ml';
    let selectedPrice = prod.price;

    const sizeContainer = document.getElementById(`size-selector-${productId}`);
    if (sizeContainer) {
      const activePill = sizeContainer.querySelector('.size-pill.active');
      if (activePill) {
        selectedSize = activePill.getAttribute('data-size');
        selectedPrice = Number(activePill.getAttribute('data-price'));
      }
    }

    addToCart(prod, selectedSize, selectedPrice, 1);
  };

  // ================== CART ENGINE ==================
  function addToCart(product, size, price, qty = 1) {
    const itemKey = `${product.id}-${size}`;
    const existing = state.cart.find(item => item.key === itemKey);

    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        size: size,
        price: price,
        qty: qty,
        image: product.image
      });
    }

    saveCart();
    updateCartUI();
    openCartDrawer();
    showToast(`Added ${product.name} (${size}) to cart.`, 'success');
  }

  function saveCart() {
    localStorage.setItem('loot_cart', JSON.stringify(state.cart));
  }

  window.changeCartQty = function (itemKey, delta) {
    const item = state.cart.find(it => it.key === itemKey);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(it => it.key !== itemKey);
      showToast(`Removed from cart.`, 'info');
    }
    saveCart();
    updateCartUI();
  };

  window.removeCartItem = function (itemKey) {
    state.cart = state.cart.filter(it => it.key !== itemKey);
    saveCart();
    updateCartUI();
    showToast(`Item removed from cart.`, 'info');
  };

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update Badges
    DOM.cartCountBadges.forEach(el => {
      el.innerText = totalItems;
    });

    // Update Drawer List
    if (!DOM.cartItemsList) return;

    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="cart-empty-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p style="margin-top:12px">Your luxury cart is empty.</p>
          <button class="btn btn-outline-gold btn-sm" style="margin-top:16px" onclick="closeCartDrawer()">Explore Fragrances</button>
        </div>
      `;
      if (DOM.cartSubtotal) DOM.cartSubtotal.innerText = `${CONFIG.currency}0`;
      if (DOM.cartTotal) DOM.cartTotal.innerText = `${CONFIG.currency}0`;
      if (DOM.shippingProgressBar) DOM.shippingProgressBar.style.width = '0%';
      if (DOM.shippingNotice) DOM.shippingNotice.innerText = `Add ₹${CONFIG.freeShippingThreshold} for complimentary delivery`;
      return;
    }

    DOM.cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-size">${item.size}</span>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${CONFIG.currency}${item.price}</span>
            <div class="qty-controls">
              <button class="qty-btn" onclick="changeCartQty('${item.key}', -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="changeCartQty('${item.key}', 1)">+</button>
            </div>
          </div>
          <span class="cart-item-remove" onclick="removeCartItem('${item.key}')">Remove</span>
        </div>
      </div>
    `).join('');

    // Shipping calculation
    const isFreeShipping = subtotal >= CONFIG.freeShippingThreshold;
    const shipping = isFreeShipping ? 0 : 99;
    const discount = state.discountAmount || 0;
    const total = Math.max(0, subtotal - discount) + shipping;

    if (DOM.cartSubtotal) DOM.cartSubtotal.innerText = `${CONFIG.currency}${subtotal.toLocaleString('en-IN')}`;
    if (DOM.cartTotal) DOM.cartTotal.innerText = `${CONFIG.currency}${total.toLocaleString('en-IN')}`;

    // Shipping Progress
    if (DOM.shippingProgressBar && DOM.shippingNotice) {
      if (isFreeShipping) {
        DOM.shippingProgressBar.style.width = '100%';
        DOM.shippingNotice.innerHTML = `✨ <strong>Complimentary Luxury Express Shipping</strong> unlocked!`;
      } else {
        const remaining = CONFIG.freeShippingThreshold - subtotal;
        const percent = Math.min(100, Math.round((subtotal / CONFIG.freeShippingThreshold) * 100));
        DOM.shippingProgressBar.style.width = `${percent}%`;
        DOM.shippingNotice.innerHTML = `Add <strong>₹${remaining}</strong> more for complimentary delivery.`;
      }
    }
  }

  // Cart Drawer open/close
  window.openCartDrawer = function () {
    if (DOM.cartDrawer) DOM.cartDrawer.classList.add('active');
    if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartDrawer = function () {
    if (DOM.cartDrawer) DOM.cartDrawer.classList.remove('active');
    if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Coupon application
  window.applyCoupon = function () {
    const input = document.getElementById('couponCodeInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (code === 'LOOT10') {
      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      state.discountAmount = Math.round(subtotal * 0.10);
      state.appliedCoupon = 'LOOT10';
      showToast('VIP Coupon Applied: 10% Luxury Discount!', 'success');
      updateCartUI();
    } else {
      showToast('Invalid promo code. Try LOOT10', 'error');
    }
  };

  // ================== WISHLIST ENGINE ==================
  window.toggleWishlist = function (productId) {
    const idx = state.wishlist.indexOf(productId);
    const prod = state.products.find(p => p.id === productId);

    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed from wishlist.`, 'info');
    } else {
      state.wishlist.push(productId);
      showToast(`Added ${prod ? prod.name : 'perfume'} to wishlist.`, 'success');
    }

    localStorage.setItem('loot_wishlist', JSON.stringify(state.wishlist));
    loadWishlistBadge();
    renderAllGrids();
  };

  function loadWishlistBadge() {
    if (DOM.wishlistCountBadge) {
      DOM.wishlistCountBadge.innerText = state.wishlist.length;
    }
  }

  // ================== PRODUCT DETAILS (QUICK VIEW) MODAL ==================
  window.openProductModal = function (productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    const modalBody = document.getElementById('quickViewBody');
    if (!modalBody) return;

    const defaultSize = (p.sizes && p.sizes[0]) || { size: p.size || '50ml', price: p.price };

    modalBody.innerHTML = `
      <div class="product-detail-layout">
        <div class="detail-media">
          <img src="${p.image}" alt="${p.name}">
        </div>

        <div class="detail-info">
          <div class="product-meta">
            <span class="product-category">${p.category || 'Luxury'}</span>
            <span class="product-concentration">${p.concentration || 'EXTRAIT DE PARFUM'}</span>
          </div>

          <h2 style="font-family:var(--font-serif);font-size:1.8rem;letter-spacing:2px;color:var(--ivory);margin:8px 0 10px;">
            ${p.name}
          </h2>

          <div class="product-rating" style="margin-bottom:14px;">
            <span>★ ★ ★ ★ ★</span>
            <span>(${p.rating || 5.0} • ${p.reviewsCount || 45} Verified Connoisseurs)</span>
          </div>

          <div style="font-family:var(--font-serif);font-size:1.6rem;color:var(--gold-primary);font-weight:700;margin-bottom:18px;" id="modalCurrentPrice">
            ${CONFIG.currency}${defaultSize.price}
          </div>

          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;margin-bottom:20px;">
            ${p.description}
          </p>

          <!-- The Fragrance Pyramid -->
          <div class="fragrance-pyramid-box">
            <h4 style="font-size:0.76rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold-muted);margin-bottom:14px;">
              The Olfactory Architecture
            </h4>
            <div class="pyramid-level">
              <span class="pyramid-label">Top Notes</span>
              <span class="pyramid-notes">${p.topNotes || 'Spicy Saffron, Italian Bergamot'}</span>
            </div>
            <div class="pyramid-level">
              <span class="pyramid-label">Heart Notes</span>
              <span class="pyramid-notes">${p.heartNotes || 'Royal Cambodian Oud, Turkish Damascena Rose'}</span>
            </div>
            <div class="pyramid-level">
              <span class="pyramid-label">Base Notes</span>
              <span class="pyramid-notes">${p.baseNotes || 'Ambergris, Cashmere Wood, Smoked Leather'}</span>
            </div>
          </div>

          <!-- Longevity & Sillage Stats -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;font-size:0.8rem;background:var(--bg-card);padding:14px;border:1px solid var(--border-subtle);border-radius:var(--radius-xs);">
            <div>
              <span style="color:var(--gold-primary);font-weight:700;">Longevity:</span>
              <span style="color:var(--text-secondary);">${p.longevity || '18+ Hours'}</span>
            </div>
            <div>
              <span style="color:var(--gold-primary);font-weight:700;">Sillage:</span>
              <span style="color:var(--text-secondary);">${p.sillage || 'Regal & Beast Mode'}</span>
            </div>
          </div>

          <!-- Size Selection -->
          <div style="margin-bottom:24px;">
            <label style="display:block;font-size:0.75rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold-muted);margin-bottom:8px;">
              Select Flacon Size
            </label>
            <div style="display:flex;gap:10px;" id="modalSizePills">
              ${(p.sizes && p.sizes.length ? p.sizes : [{ size: p.size || '50ml', price: p.price }]).map((s, idx) => `
                <button class="size-pill ${idx === 0 ? 'active' : ''}" 
                  data-size="${s.size}" 
                  data-price="${s.price}"
                  onclick="selectModalSize('${s.size}', ${s.price}, this)">
                  ${s.size}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button class="btn btn-gold" style="flex:1;" onclick="addFromModal(${p.id})">
              ADD TO CART
            </button>
            <a href="https://wa.me/${CONFIG.cleanWhatsApp}?text=${encodeURIComponent(`Hello Nasif Ali, I am interested in ordering ${p.name} (${defaultSize.size}) from LOOT PERFUMES.`)}" 
              target="_blank" 
              class="btn btn-whatsapp" 
              style="padding:14px 20px;">
              💬 Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    DOM.quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.selectModalSize = function (size, price, btn) {
    const parent = document.getElementById('modalSizePills');
    if (parent) {
      parent.querySelectorAll('.size-pill').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    }
    const priceDisplay = document.getElementById('modalCurrentPrice');
    if (priceDisplay) {
      priceDisplay.innerText = `${CONFIG.currency}${price}`;
    }
  };

  window.addFromModal = function (productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    let selectedSize = p.size || '50ml';
    let selectedPrice = p.price;

    const parent = document.getElementById('modalSizePills');
    if (parent) {
      const activePill = parent.querySelector('.size-pill.active');
      if (activePill) {
        selectedSize = activePill.getAttribute('data-size');
        selectedPrice = Number(activePill.getAttribute('data-price'));
      }
    }

    addToCart(p, selectedSize, selectedPrice, 1);
    closeModal('quickViewModal');
  };

  // ================== CHECKOUT & WHATSAPP SYSTEM ==================
  window.openCheckoutModal = function () {
    if (state.cart.length === 0) {
      showToast('Your cart is empty. Please select a fragrance.', 'error');
      return;
    }
    closeCartDrawer();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : 99;
    const discount = state.discountAmount || 0;
    const total = Math.max(0, subtotal - discount) + shipping;

    const orderPreviewBox = document.getElementById('checkoutOrderSummary');
    if (orderPreviewBox) {
      orderPreviewBox.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);padding:18px;border-radius:var(--radius-xs);margin-bottom:20px;">
          <h4 style="font-family:var(--font-serif);font-size:0.95rem;letter-spacing:1.5px;color:var(--gold-primary);margin-bottom:12px;">
            Order Breakdown (${state.cart.length} creations)
          </h4>
          ${state.cart.map(it => `
            <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:6px;color:var(--text-secondary);">
              <span>${it.name} (${it.size}) × ${it.qty}</span>
              <span style="color:var(--ivory);">${CONFIG.currency}${(it.price * it.qty).toLocaleString('en-IN')}</span>
            </div>
          `).join('')}
          <div style="border-top:1px dashed var(--border-subtle);margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;font-family:var(--font-serif);font-size:1.1rem;color:var(--gold-light);">
            <span>Total Payable:</span>
            <span>${CONFIG.currency}${total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      `;
    }

    // Set QR Code data
    const upiLink = `upi://pay?pa=${CONFIG.upiId}&pn=LOOT%20PERFUMES&am=${total}&cu=INR&tn=LOOT-Order`;
    const qrImg = document.getElementById('checkoutUpiQr');
    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiLink)}&bgcolor=12-12-12&color=212-175-55`;
    }

    DOM.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Submit Checkout
  window.submitOrder = async function (e) {
    if (e) e.preventDefault();

    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();
    const city = document.getElementById('custCity')?.value.trim();
    const pincode = document.getElementById('custPincode')?.value.trim();
    const notes = document.getElementById('custNotes')?.value.trim();
    const paymentMode = document.querySelector('input[name="paymentMode"]:checked')?.value || 'WhatsApp Order';

    if (!name || !phone || !address || !pincode) {
      showToast('Please fill all mandatory delivery details.', 'error');
      return;
    }

    const fullAddress = `${address}, ${city} - ${pincode}`;
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : 99;
    const discount = state.discountAmount || 0;
    const total = Math.max(0, subtotal - discount) + shipping;

    const orderPayload = {
      customerName: name,
      customerPhone: phone,
      deliveryAddress: fullAddress,
      notes: notes,
      paymentMethod: paymentMode,
      items: state.cart,
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      total: total
    };

    let orderResult = null;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        orderResult = await res.json();
      }
    } catch (err) {
      console.warn('Backend order sync unavailable, saving locally', err);
    }

    // Fallback order ID generation if offline
    if (!orderResult || !orderResult.order) {
      const randomId = `LOOT-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackOrder = {
        id: randomId,
        createdAt: new Date().toISOString(),
        ...orderPayload,
        status: 'New Order'
      };
      const existing = JSON.parse(localStorage.getItem('loot_orders') || '[]');
      existing.unshift(fallbackOrder);
      localStorage.setItem('loot_orders', JSON.stringify(existing));
      orderResult = {
        order: fallbackOrder,
        whatsappUrl: `https://wa.me/${CONFIG.cleanWhatsApp}?text=${encodeURIComponent(generateWhatsAppText(fallbackOrder))}`
      };
    }

    // Clear cart
    state.cart = [];
    state.discountAmount = 0;
    saveCart();
    updateCartUI();
    closeModal('checkoutModal');

    // Launch WhatsApp
    if (orderResult.whatsappUrl) {
      window.open(orderResult.whatsappUrl, '_blank');
    }

    // Display confirmation
    showOrderSuccessModal(orderResult.order);
  };

  function generateWhatsAppText(order) {
    let itemsText = order.items.map(it => `• *${it.name}* (${it.size}) × ${it.qty} = ₹${(it.price * it.qty).toLocaleString('en-IN')}`).join('\n');
    return `✨ *NEW ORDER: LOOT PERFUMES* ✨
━━━━━━━━━━━━━━━━━━━━
🏷️ *Order ID:* #${order.id}
👤 *Customer Name:* ${order.customerName}
📞 *Contact Number:* ${order.customerPhone}
📍 *Delivery Address:*
${order.deliveryAddress}
${order.notes ? `\n📝 *Order Note:* ${order.notes}\n` : ''}
💳 *Payment Mode:* ${order.paymentMethod}
🛍️ *ORDER SUMMARY:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* ₹${order.subtotal.toLocaleString('en-IN')}
${order.discount > 0 ? `🎁 *Discount:* -₹${order.discount.toLocaleString('en-IN')}\n` : ''}🚚 *Shipping:* ${order.shipping === 0 ? 'FREE (Complimentary)' : '₹' + order.shipping}
💰 *TOTAL AMOUNT:* ₹${order.total.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━━━
Please confirm my order with LOOT PERFUMES. Thank you Nasif Ali!`;
  }

  function showOrderSuccessModal(order) {
    const modal = document.getElementById('orderSuccessModal');
    if (!modal) return;

    document.getElementById('successOrderId').innerText = `#${order.id}`;
    document.getElementById('successCustName').innerText = order.customerName;
    document.getElementById('successTotal').innerText = `${CONFIG.currency}${order.total.toLocaleString('en-IN')}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ================== ORDER TRACKING ENGINE ==================
  window.openTrackingModal = function () {
    DOM.orderTrackingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.trackOrder = async function () {
    const input = document.getElementById('trackingInput');
    const resultBox = document.getElementById('trackingResultBox');
    if (!input || !resultBox) return;

    const query = input.value.trim();
    if (!query) {
      showToast('Please enter your Order ID or phone number.', 'error');
      return;
    }

    resultBox.innerHTML = `<div style="text-align:center;padding:20px;color:var(--gold-primary);">Searching atelier archives...</div>`;

    let foundOrder = null;

    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.orders && data.orders.length) {
          foundOrder = data.orders[0];
        }
      }
    } catch (e) {
      // Check local storage
      const local = JSON.parse(localStorage.getItem('loot_orders') || '[]');
      foundOrder = local.find(o => o.id.toLowerCase() === query.toLowerCase() || o.customerPhone.includes(query));
    }

    if (!foundOrder) {
      resultBox.innerHTML = `
        <div style="padding:20px;text-align:center;color:#ff6b6b;background:#181010;border:1px solid #451b1b;border-radius:var(--radius-xs);">
          No active order found for "<strong>${query}</strong>". Please verify your Order ID or contact Nasif Ali on WhatsApp.
        </div>
      `;
      return;
    }

    const steps = [
      { status: "Order Placed", desc: "Verified with LOOT PERFUMES atelier" },
      { status: "Handcrafting & Inspection", desc: "Bottle sealed and batch quality certified" },
      { status: "Dispatched", desc: "In transit with Express courier" },
      { status: "Delivered", desc: "Successfully delivered to your sanctuary" }
    ];

    let currentStepIndex = 0;
    const st = (foundOrder.status || '').toLowerCase();
    if (st.includes('confirm') || st.includes('handcraft')) currentStepIndex = 1;
    if (st.includes('dispatch') || st.includes('transit')) currentStepIndex = 2;
    if (st.includes('deliver')) currentStepIndex = 3;

    resultBox.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--gold-border);padding:24px;border-radius:var(--radius-xs);margin-top:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border-subtle);padding-bottom:12px;margin-bottom:16px;">
          <div>
            <h4 style="font-family:var(--font-serif);color:var(--ivory);letter-spacing:1px;">Order #${foundOrder.id}</h4>
            <span style="font-size:0.75rem;color:var(--text-muted);">${new Date(foundOrder.createdAt).toLocaleDateString()}</span>
          </div>
          <span style="padding:4px 12px;background:var(--gold-gradient);color:#000;font-size:0.72rem;font-weight:800;border-radius:var(--radius-xs);">
            ${foundOrder.status}
          </span>
        </div>

        <div class="tracking-steps">
          ${steps.map((s, idx) => `
            <div class="tracking-step ${idx <= currentStepIndex ? 'done' : ''}">
              <h5>${s.status}</h5>
              <p>${s.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="https://wa.me/${CONFIG.cleanWhatsApp}?text=${encodeURIComponent(`Hello Nasif Ali, I am checking the status of my order #${foundOrder.id}.`)}" target="_blank" class="btn btn-whatsapp btn-sm">
            💬 Inquire Directly with Nasif Ali
          </a>
        </div>
      </div>
    `;
  };

  // ================== GENERAL HELPERS & EVENTS ==================
  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.resetFilters = function () {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.sortBy = 'featured';
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';
    DOM.categoryPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-category') === 'all');
    });
    renderMainGrid();
  };

  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span>${message}</span>
    `;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('active'), 50);
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function bindEvents() {
    // Category pills click
    DOM.categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.getAttribute('data-category');
        renderMainGrid();
      });
    });

    // Search input
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderMainGrid();
      });
    }

    // Sort select
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', e => {
        state.sortBy = e.target.value;
        renderMainGrid();
      });
    }

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Header scroll background
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }
    });

    // Mobile nav toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('active'));
      });
    }

    // Contact Form submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const phone = document.getElementById('contactPhone')?.value.trim();
        const msg = document.getElementById('contactMsg')?.value.trim();

        const whatsappText = `✨ *LOOT PERFUMES ATELIER INQUIRY* ✨\n\n👤 *From:* ${name}\n📞 *Phone:* ${phone}\n💬 *Message:* ${msg}`;
        window.open(`https://wa.me/${CONFIG.cleanWhatsApp}?text=${encodeURIComponent(whatsappText)}`, '_blank');
        showToast('Connecting directly with Nasif Ali on WhatsApp...', 'success');
        contactForm.reset();
      });
    }

    // ================== CINEMATIC FLOATING PETALS ENGINE ==================
    function initHeroPetals() {
      const container = document.getElementById('heroPetalsField');
      if (!container) return;
      container.innerHTML = '';

      // Check reduced motion preference
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const isMobile = window.innerWidth <= 768;
      const count = isMobile ? 12 : 24;

      // Organic curved petal SVG templates with velvety red gradients
      const petalSvg1 = `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pGrad1" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stop-color="#E63946" />
              <stop offset="35%" stop-color="#B51224" />
              <stop offset="75%" stop-color="#700612" />
              <stop offset="100%" stop-color="#3A0208" />
            </radialGradient>
          </defs>
          <path d="M18 2 C26 2, 34 9, 33 22 C32 30, 23 35, 18 34 C13 35, 4 30, 3 22 C2 9, 10 2, 18 2 Z" fill="url(#pGrad1)" />
        </svg>
      `;

      const petalSvg2 = `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pGrad2" cx="30%" cy="25%" r="80%">
              <stop offset="0%" stop-color="#FF5A6B" />
              <stop offset="40%" stop-color="#B51224" />
              <stop offset="85%" stop-color="#60040E" />
              <stop offset="100%" stop-color="#2D0105" />
            </radialGradient>
          </defs>
          <path d="M18 3 C27 4, 33 13, 30 24 C28 32, 20 34, 18 34 C16 34, 8 32, 6 24 C3 13, 9 4, 18 3 Z" fill="url(#pGrad2)" />
        </svg>
      `;

      for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'floating-petal';

        // 3 depth tiers
        const tier = i % 3; // 0 = foreground bokeh, 1 = midground crisp, 2 = background soft
        let size, duration, blur, opacity, zIndex;

        if (tier === 0) {
          // Extreme foreground blurred petal (bokeh camera depth-of-field)
          size = Math.floor(Math.random() * 24) + 40; // 40-64px
          duration = (Math.random() * 4 + 7.5).toFixed(1); // 7.5-11.5s
          blur = (Math.random() * 2 + 3).toFixed(1); // 3-5px blur
          opacity = (Math.random() * 0.15 + 0.8).toFixed(2);
          zIndex = 10;
        } else if (tier === 1) {
          // Midground sharp petal
          size = Math.floor(Math.random() * 16) + 20; // 20-36px
          duration = (Math.random() * 5 + 10).toFixed(1); // 10-15s
          blur = '0';
          opacity = (Math.random() * 0.15 + 0.85).toFixed(2);
          zIndex = 4;
        } else {
          // Background soft ambient petal
          size = Math.floor(Math.random() * 10) + 12; // 12-22px
          duration = (Math.random() * 6 + 14).toFixed(1); // 14-20s
          blur = '1';
          opacity = (Math.random() * 0.25 + 0.5).toFixed(2);
          zIndex = 2;
        }

        const left = (Math.random() * 96).toFixed(1);
        const delay = -(Math.random() * duration).toFixed(1);
        const swayType = i % 2 === 0 ? 'swayRight' : 'swayLeft';
        const tumbleSpeed = (Math.random() * 3 + 4).toFixed(1);

        petal.style.cssText = `
          left: ${left}%;
          width: ${size}px;
          height: ${size}px;
          filter: ${blur !== '0' ? `blur(${blur}px)` : 'none'};
          opacity: ${opacity};
          z-index: ${zIndex};
          animation: petalFall ${duration}s linear infinite, petal${swayType} ${(duration * 0.45).toFixed(1)}s ease-in-out infinite alternate, petalTumble ${tumbleSpeed}s linear infinite;
          animation-delay: ${delay}s;
        `;

        petal.innerHTML = i % 2 === 0 ? petalSvg1 : petalSvg2;
        container.appendChild(petal);
      }
    }

    initHeroPetals();

    // Re-seed petals on resize if width tier changes
    let prevWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if ((prevWidth > 768 && window.innerWidth <= 768) || (prevWidth <= 768 && window.innerWidth > 768)) {
        prevWidth = window.innerWidth;
        initHeroPetals();
      }
    });

    // 3D Parallax Tilt for Floating Perfume Stage & Ambient Layers
    const heroLuxurySection = document.getElementById('home');
    const hero3dScene = document.getElementById('hero3dScene');
    const stageBacklight = document.querySelector('.stage-warm-backlight');
    const petalsContainer = document.getElementById('heroPetalsField');

    if (heroLuxurySection && hero3dScene && window.innerWidth > 992) {
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;
      let isInside = false;

      heroLuxurySection.addEventListener('mouseenter', () => {
        isInside = true;
      });

      heroLuxurySection.addEventListener('mouseleave', () => {
        isInside = false;
        targetX = 0;
        targetY = 0;
      });

      heroLuxurySection.addEventListener('mousemove', (e) => {
        const rect = heroLuxurySection.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = normX * 14; // Max 7 deg Y rotation
        targetY = -normY * 12; // Max 6 deg X rotation
      });

      function renderHeroParallax() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        hero3dScene.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
        
        if (stageBacklight) {
          stageBacklight.style.transform = `translate(calc(-50% + ${(-currentX * 1.5).toFixed(1)}px), calc(-50% + ${(-currentY * 1.5).toFixed(1)}px))`;
        }

        if (petalsContainer) {
          petalsContainer.style.transform = `translate3d(${(currentX * 0.8).toFixed(1)}px, ${(currentY * 0.8).toFixed(1)}px, 0)`;
        }

        requestAnimationFrame(renderHeroParallax);
      }
      requestAnimationFrame(renderHeroParallax);
    }
  }

  // Self start
  document.addEventListener('DOMContentLoaded', init);

})();

