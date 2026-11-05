/**
 * LOOT PERFUMES - Luxury E-Commerce Server
 * Brand: LOOT PERFUMES | Founder & Owner: Nasif Ali | Official Contact: +91 8113873726
 * Pure Node.js high-performance server (zero external npm dependencies required)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Ensure directories exist (skip on serverless/read-only environments)
try {
  [DATA_DIR, PUBLIC_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
} catch (e) {
  // Serverless environment — directories may be read-only
}

// Secret key for HMAC token signing
const SECRET_KEY_FILE = path.join(DATA_DIR, '.secret');
let SECRET_KEY = '';
try {
  if (fs.existsSync(SECRET_KEY_FILE)) {
    SECRET_KEY = fs.readFileSync(SECRET_KEY_FILE, 'utf8').trim();
  } else {
    SECRET_KEY = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(SECRET_KEY_FILE, SECRET_KEY, 'utf8');
  }
} catch (e) {
  // Serverless environment — generate ephemeral key
  SECRET_KEY = crypto.randomBytes(32).toString('hex');
}

// Brand Info
const BRAND_CONFIG = {
  brandName: "LOOT PERFUMES",
  ownerName: "Nasif Ali",
  whatsappNumber: "+91 8113873726",
  cleanWhatsApp: "918113873726",
  tagline: "Luxury is a Fragrance.",
  currency: "₹",
  freeShippingThreshold: 999,
  upiId: "8113873726@upi"
};

// Safe JSON file read/write
function readJson(filename, defaultValue = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(filename, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return defaultValue;
  }
}

function writeJson(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = filePath + '.tmp';
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
}

// Auth helpers
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function generateToken(payload) {
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function authenticateAdmin(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.substring(7).trim();
  const decoded = verifyToken(token);
  return decoded && decoded.role === 'admin';
}

// Body parser helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

// JSON responder
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Static file server
function serveStaticFile(req, res, pathname) {
  let relativePath = pathname === '/' ? '/index.html' : pathname;
  relativePath = relativePath.split('?')[0];

  if (relativePath === '/admin') relativePath = '/admin.html';

  let filePath = path.join(__dirname, relativePath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, relativePath);
  }

  const resolved = path.resolve(filePath);
  if (!resolved.toLowerCase().startsWith(__dirname.toLowerCase())) {
    res.writeHead(403);
    return res.end('Access Denied');
  }

  fs.stat(resolved, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html><head><title>404 Not Found - LOOT PERFUMES</title>
        <style>body{background:#0a0a0a;color:#c5a880;font-family:sans-serif;text-align:center;padding:100px;}</style>
        </head><body>
        <h1>404 | Page Not Found</h1>
        <p>The fragrance experience you seek does not exist.</p>
        <a href="/" style="color:#c5a880;text-decoration:underline;">Return to LOOT PERFUMES</a>
        </body></html>
      `);
    }

    const ext = path.extname(resolved).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });
    fs.createReadStream(resolved).pipe(res);
  });
}

// Request handler (used by both local server and Vercel serverless)
const requestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // ----------------- API ROUTES -----------------

  // GET /api/config
  if (req.method === 'GET' && pathname === '/api/config') {
    return sendJson(res, 200, BRAND_CONFIG);
  }

  // GET /api/products
  if (req.method === 'GET' && pathname === '/api/products') {
    const products = readJson('products.json', []);
    return sendJson(res, 200, products);
  }

  // GET /api/products/:id
  if (req.method === 'GET' && pathname.startsWith('/api/products/')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const products = readJson('products.json', []);
    const product = products.find(p => p.id === id);
    if (!product) return sendJson(res, 404, { error: 'Product not found' });
    return sendJson(res, 200, product);
  }

  // POST /api/products (Admin Only)
  if (req.method === 'POST' && pathname === '/api/products') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    try {
      const data = await parseBody(req);
      if (!data.name || !data.price) {
        return sendJson(res, 400, { error: 'Name and price are required' });
      }

      const products = readJson('products.json', []);
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id || 0)) + 1 : 1;

      const price = Number(data.price);
      const newProduct = {
        id: newId,
        name: String(data.name).trim().toUpperCase(),
        category: data.category || 'Unisex Exclusive',
        price: price,
        originalPrice: data.originalPrice ? Number(data.originalPrice) : Math.round(price * 1.4),
        size: data.size || '50ml / 1.7 FL. OZ.',
        sizes: data.sizes || [
          { size: '50ml', price: price },
          { size: '100ml', price: Math.round(price * 1.75) },
          { size: '10ml Pocket Atomizer', price: Math.round(price * 0.32) }
        ],
        concentration: data.concentration || 'Extrait de Parfum (35% Oil)',
        description: data.description || 'A bespoke haute formulation by LOOT PERFUMES.',
        topNotes: data.topNotes || '',
        heartNotes: data.heartNotes || '',
        baseNotes: data.baseNotes || '',
        longevity: data.longevity || '16+ Hours',
        sillage: data.sillage || 'Heavy & Long Lasting',
        image: data.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600',
        stock: typeof data.stock !== 'undefined' ? Number(data.stock) : 25,
        rating: 5.0,
        reviewsCount: 1,
        featured: Boolean(data.featured),
        badge: data.badge || (data.featured ? 'EXCLUSIVE' : '')
      };

      products.unshift(newProduct);
      writeJson('products.json', products);
      return sendJson(res, 201, { success: true, product: newProduct });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to create product: ' + err.message });
    }
  }

  // PUT /api/products/:id (Admin Only)
  if (req.method === 'PUT' && pathname.startsWith('/api/products/')) {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    const id = parseInt(pathname.split('/')[3], 10);
    try {
      const data = await parseBody(req);
      const products = readJson('products.json', []);
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return sendJson(res, 404, { error: 'Product not found' });

      products[index] = {
        ...products[index],
        name: data.name ? String(data.name).trim().toUpperCase() : products[index].name,
        category: data.category || products[index].category,
        price: typeof data.price !== 'undefined' ? Number(data.price) : products[index].price,
        originalPrice: typeof data.originalPrice !== 'undefined' ? Number(data.originalPrice) : products[index].originalPrice,
        size: data.size || products[index].size,
        sizes: data.sizes || products[index].sizes,
        concentration: data.concentration || products[index].concentration,
        description: data.description || products[index].description,
        topNotes: data.topNotes !== undefined ? data.topNotes : products[index].topNotes,
        heartNotes: data.heartNotes !== undefined ? data.heartNotes : products[index].heartNotes,
        baseNotes: data.baseNotes !== undefined ? data.baseNotes : products[index].baseNotes,
        longevity: data.longevity || products[index].longevity,
        sillage: data.sillage || products[index].sillage,
        image: data.image || products[index].image,
        stock: typeof data.stock !== 'undefined' ? Number(data.stock) : products[index].stock,
        featured: typeof data.featured !== 'undefined' ? Boolean(data.featured) : products[index].featured,
        badge: typeof data.badge !== 'undefined' ? data.badge : products[index].badge
      };

      writeJson('products.json', products);
      return sendJson(res, 200, { success: true, product: products[index] });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to update product: ' + err.message });
    }
  }

  // DELETE /api/products/:id (Admin Only)
  if (req.method === 'DELETE' && pathname.startsWith('/api/products/')) {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    const id = parseInt(pathname.split('/')[3], 10);
    const products = readJson('products.json', []);
    const filtered = products.filter(p => p.id !== id);
    if (products.length === filtered.length) {
      return sendJson(res, 404, { error: 'Product not found' });
    }
    writeJson('products.json', filtered);
    return sendJson(res, 200, { success: true, message: 'Product deleted successfully' });
  }

  // GET /api/reviews
  if (req.method === 'GET' && pathname === '/api/reviews') {
    const reviews = readJson('reviews.json', []);
    return sendJson(res, 200, reviews);
  }

  // POST /api/reviews (Public customer reviews)
  if (req.method === 'POST' && pathname === '/api/reviews') {
    try {
      const data = await parseBody(req);
      if (!data.customerName || !data.comment || !data.rating) {
        return sendJson(res, 400, { error: 'Customer name, rating, and review are required' });
      }

      const reviews = readJson('reviews.json', []);
      const newReview = {
        id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id || 0)) + 1 : 1,
        productId: data.productId ? Number(data.productId) : 1,
        productName: data.productName || 'ROYAL OUD',
        customerName: String(data.customerName).trim(),
        city: data.city ? String(data.city).trim() : 'Customer',
        rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
        date: new Date().toISOString().split('T')[0],
        title: data.title ? String(data.title).trim() : 'Verified Customer Review',
        comment: String(data.comment).trim(),
        verifiedPurchase: true
      };

      reviews.unshift(newReview);
      writeJson('reviews.json', reviews);

      return sendJson(res, 201, { success: true, review: newReview });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to submit review: ' + err.message });
    }
  }

  // POST /api/upload (Admin Only) - supports Base64 file upload
  if (req.method === 'POST' && pathname === '/api/upload') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    try {
      const data = await parseBody(req);
      if (!data.image || !data.filename) {
        return sendJson(res, 400, { error: 'Missing image data or filename' });
      }

      let base64Data = data.image;
      let ext = '.jpg';
      if (base64Data.includes(';base64,')) {
        const parts = base64Data.split(';base64,');
        const mime = parts[0].split(':')[1];
        if (mime === 'image/png') ext = '.png';
        else if (mime === 'image/webp') ext = '.webp';
        else if (mime === 'image/gif') ext = '.gif';
        base64Data = parts[1];
      }

      const safeName = `perfume_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
      const filePath = path.join(UPLOADS_DIR, safeName);
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filePath, buffer);

      return sendJson(res, 200, { success: true, url: `/uploads/${safeName}` });
    } catch (err) {
      return sendJson(res, 500, { error: 'Image upload failed: ' + err.message });
    }
  }

  // GET /api/orders (Admin Only)
  if (req.method === 'GET' && pathname === '/api/orders') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    const orders = readJson('orders.json', []);
    return sendJson(res, 200, orders);
  }

  // GET /api/orders/track/:query (Public order tracker)
  if (req.method === 'GET' && pathname.startsWith('/api/orders/track/')) {
    const query = decodeURIComponent(pathname.substring('/api/orders/track/'.length)).trim().toLowerCase();
    const orders = readJson('orders.json', []);
    const matched = orders.filter(o =>
      (o.id && o.id.toLowerCase() === query) ||
      (o.customerPhone && o.customerPhone.replace(/\D/g, '').endsWith(query.replace(/\D/g, '')))
    );

    if (matched.length === 0) {
      return sendJson(res, 404, { error: 'No order found with the provided Order ID or Phone Number.' });
    }

    return sendJson(res, 200, { success: true, orders: matched });
  }

  // POST /api/orders (Public - customer places order)
  if (req.method === 'POST' && pathname === '/api/orders') {
    try {
      const data = await parseBody(req);
      if (!data.customerName || !data.customerPhone || !data.deliveryAddress || !Array.isArray(data.items) || data.items.length === 0) {
        return sendJson(res, 400, { error: 'Customer name, phone, address, and items are required' });
      }

      let subtotal = 0;
      const items = data.items.map(item => {
        const qty = Math.max(1, parseInt(item.qty || 1, 10));
        const price = Number(item.price);
        subtotal += price * qty;
        return {
          id: item.id,
          name: item.name,
          size: item.size || '50ml',
          price: price,
          qty: qty,
          image: item.image || ''
        };
      });

      const discount = data.discount ? Number(data.discount) : 0;
      const discountedSubtotal = Math.max(0, subtotal - discount);
      const shipping = discountedSubtotal >= BRAND_CONFIG.freeShippingThreshold ? 0 : 99;
      const total = discountedSubtotal + shipping;

      // Unique Order ID: LOOT-XXXX
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const orderId = `LOOT-${randomCode}`;

      const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone.trim(),
        customerEmail: data.customerEmail ? data.customerEmail.trim() : '',
        deliveryAddress: data.deliveryAddress.trim(),
        notes: data.notes ? data.notes.trim() : '',
        paymentMethod: data.paymentMethod || 'WhatsApp Order',
        items: items,
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: total,
        status: data.paymentMethod === 'UPI / QR Code' ? 'Payment Verification Pending' : 'New Order',
        trackingHistory: [
          {
            time: new Date().toISOString(),
            status: 'Order Placed',
            desc: `Order received via ${data.paymentMethod || 'WhatsApp'}. Registered with LOOT PERFUMES atelier.`
          }
        ]
      };

      // Decrement stock
      const products = readJson('products.json', []);
      items.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod && typeof prod.stock === 'number') {
          prod.stock = Math.max(0, prod.stock - item.qty);
        }
      });
      writeJson('products.json', products);

      // Save order
      const orders = readJson('orders.json', []);
      orders.unshift(newOrder);
      writeJson('orders.json', orders);

      // Generate Luxury WhatsApp Message
      let itemsText = items.map(it => `• *${it.name}* (${it.size}) × ${it.qty} = ₹${(it.price * it.qty).toLocaleString('en-IN')}`).join('\n');

      const whatsappMsg =
        `✨ *NEW ORDER: LOOT PERFUMES* ✨
━━━━━━━━━━━━━━━━━━━━
🏷️ *Order ID:* #${orderId}
👤 *Customer Name:* ${newOrder.customerName}
📞 *Contact Number:* ${newOrder.customerPhone}
📍 *Delivery Address:*
${newOrder.deliveryAddress}
${newOrder.notes ? `\n📝 *Order Note:* ${newOrder.notes}\n` : ''}
💳 *Payment Mode:* ${newOrder.paymentMethod}
🛍️ *ORDER SUMMARY:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
${discount > 0 ? `🎁 *Discount Applied:* -₹${discount.toLocaleString('en-IN')}\n` : ''}🚚 *Shipping:* ${shipping === 0 ? 'FREE (Complimentary)' : '₹' + shipping}
💰 *TOTAL AMOUNT:* ₹${total.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━━━
Please confirm my order with LOOT PERFUMES. Thank you Nasif Ali!`;

      const whatsappUrl = `https://wa.me/${BRAND_CONFIG.cleanWhatsApp}?text=${encodeURIComponent(whatsappMsg)}`;

      return sendJson(res, 201, {
        success: true,
        order: newOrder,
        whatsappUrl: whatsappUrl,
        whatsappMessage: whatsappMsg
      });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to place order: ' + err.message });
    }
  }

  // PUT /api/orders/:id/status (Admin Only)
  if (req.method === 'PUT' && pathname.startsWith('/api/orders/') && pathname.endsWith('/status')) {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    const parts = pathname.split('/');
    const orderId = parts[3];
    try {
      const data = await parseBody(req);
      if (!data.status) return sendJson(res, 400, { error: 'Status is required' });

      const orders = readJson('orders.json', []);
      const order = orders.find(o => o.id === orderId);
      if (!order) return sendJson(res, 404, { error: 'Order not found' });

      order.status = data.status;
      order.updatedAt = new Date().toISOString();
      if (!order.trackingHistory) order.trackingHistory = [];
      order.trackingHistory.push({
        time: new Date().toISOString(),
        status: data.status,
        desc: data.note || `Order status updated to ${data.status}`
      });
      writeJson('orders.json', orders);

      return sendJson(res, 200, { success: true, order });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to update order status: ' + err.message });
    }
  }

  // POST /api/admin/login
  if (req.method === 'POST' && pathname === '/api/admin/login') {
    try {
      const { username, password } = await parseBody(req);
      if (!username || !password) {
        return sendJson(res, 400, { error: 'Username and password required' });
      }

      const admin = readJson('admin.json', null);
      if (!admin || admin.username !== username) {
        return sendJson(res, 401, { error: 'Invalid username or password' });
      }

      const inputHash = hashPassword(password, admin.salt);
      if (inputHash !== admin.hash) {
        return sendJson(res, 401, { error: 'Invalid username or password' });
      }

      const token = generateToken({ username: admin.username, role: 'admin', name: admin.name });
      return sendJson(res, 200, {
        success: true,
        token: token,
        admin: {
          username: admin.username,
          name: admin.name,
          brand: admin.brand,
          phone: admin.phone
        }
      });
    } catch (err) {
      return sendJson(res, 500, { error: 'Login error: ' + err.message });
    }
  }

  // GET /api/admin/verify
  if (req.method === 'GET' && pathname === '/api/admin/verify') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { valid: false });
    }
    const admin = readJson('admin.json', {});
    return sendJson(res, 200, {
      valid: true,
      admin: {
        username: admin.username,
        name: admin.name,
        brand: admin.brand,
        phone: admin.phone
      }
    });
  }

  // POST /api/admin/change-password
  if (req.method === 'POST' && pathname === '/api/admin/change-password') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    try {
      const { currentPassword, newPassword } = await parseBody(req);
      if (!currentPassword || !newPassword || newPassword.length < 6) {
        return sendJson(res, 400, { error: 'New password must be at least 6 characters' });
      }

      const admin = readJson('admin.json', null);
      if (!admin) return sendJson(res, 500, { error: 'Admin config missing' });

      const checkHash = hashPassword(currentPassword, admin.salt);
      if (checkHash !== admin.hash) {
        return sendJson(res, 400, { error: 'Incorrect current password' });
      }

      const newSalt = crypto.randomBytes(16).toString('hex');
      const newHash = hashPassword(newPassword, newSalt);
      admin.salt = newSalt;
      admin.hash = newHash;
      writeJson('admin.json', admin);

      return sendJson(res, 200, { success: true, message: 'Password updated successfully' });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to change password: ' + err.message });
    }
  }

  // GET /api/admin/stats
  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    if (!authenticateAdmin(req)) {
      return sendJson(res, 401, { error: 'Unauthorized: Admin authentication required' });
    }
    const products = readJson('products.json', []);
    const orders = readJson('orders.json', []);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const lowStockCount = products.filter(p => (p.stock || 0) <= 10).length;

    return sendJson(res, 200, {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      lowStockCount: lowStockCount,
      recentOrders: orders.slice(0, 8)
    });
  }

  // ----------------- STATIC ASSETS & PAGES -----------------
  serveStaticFile(req, res, pathname);
};

// Export handler for Vercel serverless deployment
module.exports = requestHandler;

// Start local server only when run directly (not imported by Vercel)
if (require.main === module) {
  const server = http.createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`💎 LOOT PERFUMES - Luxury E-Commerce Platform`);
    console.log(`👑 Brand: ${BRAND_CONFIG.brandName} | Founder: ${BRAND_CONFIG.ownerName}`);
    console.log(`📱 Official WhatsApp: ${BRAND_CONFIG.whatsappNumber}`);
    console.log(`🌐 Storefront: http://localhost:${PORT}`);
    console.log(`🔒 Admin Portal: http://localhost:${PORT}/admin.html`);
    console.log(`   (Default Login: admin / loot@2026)`);
    console.log(`======================================================\n`);
  });
}
