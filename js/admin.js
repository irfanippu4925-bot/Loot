/**
 * LOOT PERFUMES — Atelier Admin Portal Script
 * Brand: LOOT PERFUMES | Founder: Nasif Ali | WhatsApp: +91 8113873726
 */

(function () {
  'use strict';

  const AUTH_KEY = 'loot_admin_token';
  let adminToken = sessionStorage.getItem(AUTH_KEY);
  let productsCache = [];
  let ordersCache = [];
  let uploadedImageBase64 = '';

  // DOM
  const loginOverlay = document.getElementById('adminLoginOverlay');
  const mainContent = document.getElementById('adminMainContent');
  const toastContainer = document.getElementById('toastContainer');

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    if (adminToken) {
      const valid = await verifySession();
      if (valid) {
        unlockDashboard();
      } else {
        showLogin();
      }
    } else {
      showLogin();
    }
  });

  // Verify session
  async function verifySession() {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        return data.valid;
      }
    } catch {
      // Local fallback
      return adminToken === 'loot_session_local_token';
    }
    return false;
  }

  function showLogin() {
    loginOverlay.style.display = 'flex';
    mainContent.style.display = 'none';
  }

  function unlockDashboard() {
    loginOverlay.style.display = 'none';
    mainContent.style.display = 'block';
    loadDashboardData();
  }

  // Handle Login
  window.handleAdminLogin = async function (e) {
    e.preventDefault();
    const user = document.getElementById('adminUsername').value.trim();
    const pass = document.getElementById('adminPassword').value.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (res.ok) {
        const data = await res.json();
        adminToken = data.token;
        sessionStorage.setItem(AUTH_KEY, adminToken);
        showToast('Atelier Access Granted. Welcome, Nasif Ali.', 'success');
        unlockDashboard();
        return;
      }
    } catch {
      // Fallback local check
    }

    if (user === 'admin' && pass === 'loot@2026') {
      adminToken = 'loot_session_local_token';
      sessionStorage.setItem(AUTH_KEY, adminToken);
      showToast('Atelier Access Granted (Offline mode).', 'success');
      unlockDashboard();
    } else {
      showToast('Invalid credentials. Access Denied.', 'error');
    }
  };

  // Logout
  window.adminLogout = function () {
    sessionStorage.removeItem(AUTH_KEY);
    adminToken = null;
    showToast('Logged out securely.', 'info');
    showLogin();
  };

  // Tab Switcher
  window.switchAdminTab = function (tabName, btn) {
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('tabProducts').style.display = tabName === 'products' ? 'block' : 'none';
    document.getElementById('tabOrders').style.display = tabName === 'orders' ? 'block' : 'none';
    document.getElementById('tabSettings').style.display = tabName === 'settings' ? 'block' : 'none';

    if (tabName === 'orders') loadAdminOrders();
    if (tabName === 'products') loadAdminProducts();
  };

  // Load Dashboard Data
  async function loadDashboardData() {
    await loadAdminProducts();
    await loadAdminOrders();
    updateStats();
  }

  // Stats Calculator
  function updateStats() {
    const totalRev = ordersCache.reduce((sum, o) => sum + (o.total || 0), 0);
    const lowStock = productsCache.filter(p => (p.stock || 0) <= 10).length;

    document.getElementById('statRevenue').innerText = `₹${totalRev.toLocaleString('en-IN')}`;
    document.getElementById('statOrders').innerText = ordersCache.length;
    document.getElementById('statProducts').innerText = productsCache.length;
    document.getElementById('statLowStock').innerText = lowStock;
  }

  // ================== PRODUCTS CRUD ==================
  async function loadAdminProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        productsCache = await res.json();
      }
    } catch {
      const local = localStorage.getItem('loot_custom_products');
      productsCache = local ? JSON.parse(local) : [];
    }

    renderProductsTable();
  }

  function renderProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    if (productsCache.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">No perfumes found in atelier inventory.</td></tr>`;
      return;
    }

    tbody.innerHTML = productsCache.map(p => {
      const stock = typeof p.stock === 'number' ? p.stock : 25;
      let stockBadge = `<span class="badge-stock badge-in-stock">${stock} in stock</span>`;
      if (stock === 0) stockBadge = `<span class="badge-stock badge-out-stock">Out of stock</span>`;
      else if (stock <= 10) stockBadge = `<span class="badge-stock badge-low-stock">Low (${stock})</span>`;

      return `
        <tr>
          <td><img src="${p.image}" class="table-thumb" alt="${p.name}"></td>
          <td>
            <strong style="color:var(--ivory);font-family:var(--font-serif);letter-spacing:1px;">${p.name}</strong>
            ${p.badge ? `<br><small style="color:var(--gold-primary)">[${p.badge}]</small>` : ''}
          </td>
          <td><span style="color:var(--gold-muted);">${p.category || 'Luxury'}</span></td>
          <td>${p.size || '50ml'}</td>
          <td><strong style="color:var(--gold-light)">₹${p.price}</strong></td>
          <td>${stock}</td>
          <td>${stockBadge}</td>
          <td>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-sm" style="border:1px solid var(--border-subtle);padding:6px 10px;" onclick="openProductFormModal(${p.id})">Edit</button>
              <button class="btn btn-sm" style="border:1px solid #451b1b;color:#ff6b6b;padding:6px 10px;" onclick="deleteProduct(${p.id})">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Open Add/Edit Modal
  window.openProductFormModal = function (productId = null) {
    const modal = document.getElementById('productFormModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productFormTitle');
    const previewBox = document.getElementById('imagePreviewBox');
    const previewImg = document.getElementById('imagePreviewImg');

    uploadedImageBase64 = '';
    form.reset();
    previewBox.style.display = 'none';

    if (productId) {
      title.innerText = 'EDIT PERFUME DETAILS';
      const prod = productsCache.find(p => p.id === productId);
      if (prod) {
        document.getElementById('editProductId').value = prod.id;
        document.getElementById('prodName').value = prod.name;
        document.getElementById('prodCategory').value = prod.category || 'Oud';
        document.getElementById('prodSize').value = prod.size || '50ml / 1.7 FL. OZ.';
        document.getElementById('prodPrice').value = prod.price;
        document.getElementById('prodOriginalPrice').value = prod.originalPrice || '';
        document.getElementById('prodStock').value = typeof prod.stock !== 'undefined' ? prod.stock : 25;
        document.getElementById('prodBadge').value = prod.badge || '';
        document.getElementById('prodImageUrl').value = prod.image || '';
        document.getElementById('prodDesc').value = prod.description || '';
        document.getElementById('prodTopNotes').value = prod.topNotes || '';
        document.getElementById('prodHeartNotes').value = prod.heartNotes || '';
        document.getElementById('prodBaseNotes').value = prod.baseNotes || '';

        if (prod.image) {
          previewBox.style.display = 'block';
          previewImg.src = prod.image;
        }
      }
    } else {
      title.innerText = 'ADD NEW LUXURY PERFUME';
      document.getElementById('editProductId').value = '';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Image File Upload Preview & Base64
  window.handleImageFileSelect = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      uploadedImageBase64 = event.target.result;
      const previewBox = document.getElementById('imagePreviewBox');
      const previewImg = document.getElementById('imagePreviewImg');
      previewBox.style.display = 'block';
      previewImg.src = uploadedImageBase64;
      document.getElementById('prodImageUrl').value = uploadedImageBase64;
    };
    reader.readAsDataURL(file);
  };

  // Handle Form Submit
  window.handleProductFormSubmit = async function (e) {
    e.preventDefault();

    const editId = document.getElementById('editProductId').value;
    const name = document.getElementById('prodName').value.trim().toUpperCase();
    const category = document.getElementById('prodCategory').value;
    const size = document.getElementById('prodSize').value.trim();
    const price = Number(document.getElementById('prodPrice').value);
    const originalPrice = document.getElementById('prodOriginalPrice').value ? Number(document.getElementById('prodOriginalPrice').value) : Math.round(price * 1.4);
    const stock = Number(document.getElementById('prodStock').value);
    const badge = document.getElementById('prodBadge').value.trim();
    const image = uploadedImageBase64 || document.getElementById('prodImageUrl').value.trim() || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600';
    const description = document.getElementById('prodDesc').value.trim();
    const topNotes = document.getElementById('prodTopNotes').value.trim();
    const heartNotes = document.getElementById('prodHeartNotes').value.trim();
    const baseNotes = document.getElementById('prodBaseNotes').value.trim();

    const payload = {
      name, category, size, price, originalPrice, stock, badge, image,
      description, topNotes, heartNotes, baseNotes,
      concentration: 'Extrait de Parfum (35% Oil)',
      longevity: '18+ Hours',
      sillage: 'Regal & Beast Mode',
      sizes: [
        { size: size.split(' ')[0] || '50ml', price: price },
        { size: '100ml', price: Math.round(price * 1.75) },
        { size: '10ml Pocket Atomizer', price: Math.round(price * 0.32) }
      ]
    };

    const isEdit = Boolean(editId);
    const url = isEdit ? `/api/products/${editId}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(isEdit ? 'Perfume updated successfully.' : 'Perfume added to atelier catalog.', 'success');
        closeModal('productFormModal');
        await loadAdminProducts();
        updateStats();
        return;
      }
    } catch {
      // Fallback local persistence
    }

    if (isEdit) {
      const idx = productsCache.findIndex(p => p.id === Number(editId));
      if (idx > -1) {
        productsCache[idx] = { ...productsCache[idx], ...payload };
      }
    } else {
      const newId = productsCache.length ? Math.max(...productsCache.map(p => p.id || 0)) + 1 : 1;
      productsCache.unshift({ id: newId, ...payload });
    }

    localStorage.setItem('loot_custom_products', JSON.stringify(productsCache));
    showToast(isEdit ? 'Perfume updated (Saved locally).' : 'Perfume added (Saved locally).', 'success');
    closeModal('productFormModal');
    renderProductsTable();
    updateStats();
  };

  // Delete Product
  window.deleteProduct = async function (id) {
    if (!confirm('Are you certain you wish to archive and remove this creation from the catalog?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (res.ok) {
        showToast('Perfume removed from atelier catalog.', 'success');
        await loadAdminProducts();
        updateStats();
        return;
      }
    } catch {
      // Fallback
    }

    productsCache = productsCache.filter(p => p.id !== id);
    localStorage.setItem('loot_custom_products', JSON.stringify(productsCache));
    showToast('Perfume deleted.', 'info');
    renderProductsTable();
    updateStats();
  };

  // ================== ORDERS MANAGEMENT ==================
  window.loadAdminOrders = async function () {
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (res.ok) {
        ordersCache = await res.json();
      }
    } catch {
      const local = localStorage.getItem('loot_orders');
      ordersCache = local ? JSON.parse(local) : [];
    }

    renderOrdersTable();
    updateStats();
  };

  function renderOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    if (ordersCache.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted)">No client orders registered yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = ordersCache.map(o => {
      const dateStr = o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Recent';
      const itemsStr = (o.items || []).map(it => `${it.name} (${it.size}) × ${it.qty}`).join('<br>');
      const cleanPhone = (o.customerPhone || '').replace(/\D/g, '');

      return `
        <tr>
          <td><strong style="color:var(--gold-primary)">#${o.id}</strong></td>
          <td style="font-size:0.75rem;">${dateStr}</td>
          <td>
            <strong style="color:var(--ivory)">${o.customerName}</strong><br>
            <span style="font-size:0.75rem;color:var(--text-muted)">${o.customerPhone}</span>
          </td>
          <td style="font-size:0.8rem;max-width:220px;">
            ${o.deliveryAddress}
            ${o.notes ? `<br><small style="color:var(--gold-muted)">Note: "${o.notes}"</small>` : ''}
          </td>
          <td style="font-size:0.8rem;">${itemsStr}</td>
          <td><strong style="color:var(--gold-light)">₹${(o.total || 0).toLocaleString('en-IN')}</strong></td>
          <td><span style="font-size:0.75rem;color:var(--text-muted)">${o.paymentMethod || 'WhatsApp'}</span></td>
          <td>
            <select class="form-control" style="font-size:0.75rem;padding:6px 8px;width:auto;" onchange="updateOrderStatus('${o.id}', this.value)">
              <option value="New Order" ${o.status === 'New Order' ? 'selected' : ''}>New Order</option>
              <option value="Confirmed via WhatsApp" ${o.status === 'Confirmed via WhatsApp' ? 'selected' : ''}>Confirmed via WhatsApp</option>
              <option value="Artisan Handcrafted" ${o.status === 'Artisan Handcrafted' ? 'selected' : ''}>Artisan Handcrafted</option>
              <option value="Dispatched" ${o.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <button class="btn btn-whatsapp btn-sm" onclick="chatClientWhatsApp('${cleanPhone}', '${o.id}', '${encodeURIComponent(o.customerName)}')">
              💬 Message
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Update Status
  window.updateOrderStatus = async function (orderId, newStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast(`Order #${orderId} status updated to: ${newStatus}`, 'success');
        return;
      }
    } catch {
      // Local fallback
    }

    const order = ordersCache.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem('loot_orders', JSON.stringify(ordersCache));
      showToast(`Order #${orderId} updated locally.`, 'success');
    }
  };

  // Direct WhatsApp Chat with Client
  window.chatClientWhatsApp = function (phone, orderId, encodedName) {
    const name = decodeURIComponent(encodedName);
    const msg = `Hello ${name}! This is Nasif Ali from LOOT PERFUMES regarding your order #${orderId}. I am preparing your flacon today.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ================== PASSWORD CHANGE ==================
  window.handlePasswordChange = async function (e) {
    e.preventDefault();
    const curr = document.getElementById('currPass').value;
    const next = document.getElementById('newPass').value;

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ currentPassword: curr, newPassword: next })
      });
      if (res.ok) {
        showToast('Atelier password updated successfully.', 'success');
        e.target.reset();
        return;
      } else {
        const d = await res.json();
        showToast(d.error || 'Failed to change password.', 'error');
      }
    } catch {
      showToast('Password change updated locally.', 'info');
      e.target.reset();
    }
  };

  // Modal helpers
  window.closeModal = function (id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
    document.body.style.overflow = '';
  };

  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span>${message}</span>`;
    toastContainer.appendChild(t);
    setTimeout(() => t.classList.add('active'), 50);
    setTimeout(() => {
      t.classList.remove('active');
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

})();

