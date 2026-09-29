(() => {
  'use strict';
  const form = document.getElementById('project-planner');
  const output = document.getElementById('planner-output');
  const copy = document.getElementById('copy-brief');
  const status = document.getElementById('planner-status');
  let brief = '';
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim() || 'To be confirmed';
    brief = `PROJECT BRIEF\n\nProject type: ${value('type')}\nMarket: ${value('market')}\nPrimary audience: ${value('audience')}\n\nOutcome and current process:\n${value('outcome')}\n\nRoles and permissions:\n${value('roles')}\n\nData and integrations:\n${value('integrations')}\n\nFirst-release essentials:\n${value('essentials')}\n\nDelivery constraints and approvals:\n${value('constraints')}\n\nAcceptance questions:\n- Can each role complete its intended task?\n- Are permissions enforced beyond the interface?\n- Can failed integrations be retried safely?\n- Are backup, account and handover responsibilities documented?`;
    output.textContent = brief;
    copy.disabled = false;
    status.textContent = 'Brief created locally.';
  });
  copy?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(brief); status.textContent = 'Brief copied.'; }
    catch { status.textContent = 'Select the brief text and copy it manually.'; }
  });
})();
