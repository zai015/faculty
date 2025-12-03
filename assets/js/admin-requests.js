document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const list = document.getElementById('requestsToAdminList');
  function render(){
    list.innerHTML = '';
    if(!FAC.requests_to_admin.length){ list.innerHTML = '<div class="text-muted">No requests submitted to admin.</div>'; return; }
    FAC.requests_to_admin.forEach(r=>{
      const div = document.createElement('div'); div.className='border rounded p-2 mb-2';
      div.innerHTML = `<div class="d-flex justify-content-between"><div><div class="fw-bold">${r.type}</div><div class="small text-muted">${r.createdAt} • ${r.status}</div><div class="mt-1">${JSON.stringify(r.payload)}</div></div><div><span class="badge ${r.status==='open'?'bg-warning':'bg-secondary'}">${r.status}</span></div></div>`;
      list.appendChild(div);
    });
  }
  render();
});
