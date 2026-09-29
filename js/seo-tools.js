(() => {
  const url = document.querySelector('link[rel="canonical"]')?.href;
  document.getElementById('ck-region')?.addEventListener('change', e => {
    const paths = ['/website-designing-company-in-delhi','/website-development-dubai','/website-development-usa','/website-development-uk','/markets'];
    if (paths.includes(e.target.value)) location.assign(e.target.value);
  });
  document.querySelectorAll('[data-share]').forEach(button => button.addEventListener('click', async () => {
    const status = document.getElementById('share-status');
    try {
      if (button.dataset.share === 'native' && navigator.share) await navigator.share({ title: document.title, url });
      else await navigator.clipboard.writeText(url);
      if (status) status.textContent = button.dataset.share === 'native' && navigator.share ? 'Share action completed.' : 'Link copied.';
      window.CuriousKaizerAnalytics?.track('share_click',button.dataset.share);
    } catch (e) { if (status) status.textContent = e.name === 'AbortError' ? 'Sharing cancelled.' : 'Copy the address from your browser to share this page.'; }
  }));
})();
