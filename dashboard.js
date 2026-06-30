document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resp = await fetch('/api/me', { credentials: 'same-origin' });
    if (resp.status === 401) {
      window.location.href = '/login.html';
      return;
    }

    if (!resp.ok) {
      console.error('Failed to fetch profile:', resp.status);
      return;
    }

    const data = await resp.json();
    document.getElementById('greeting').textContent = `Welcome back, ${data.fullName || data.username}!`;
    document.getElementById('username').textContent = data.username || '—';
    document.getElementById('fullName').textContent = data.fullName || '—';
    document.getElementById('email').textContent = data.email || '—';
    document.getElementById('phone').textContent = data.phone || '—';
    document.getElementById('plan').textContent = data.plan || '—';
    document.getElementById('age').textContent = data.age || '—';
  } catch (err) {
    console.error('Profile load error:', err);
  }
});
