document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const list = document.getElementById('studentRequestsList');
  function render(){
    list.innerHTML='';
    const assigned = FAC.student_requests.filter(r=> r.assignedFacultyId === FAC.CURRENT_USER.id && r.status==='pending');
    if(!assigned.length){ list.innerHTML = '<div class="text-muted">No pending requests</div>'; return; }
    assigned.forEach(req=>{
      const div = document.createElement('div'); div.className='mb-2 border rounded p-2';
      div.innerHTML = `<div class="d-flex justify-content-between"><div><div class="fw-bold">${req.studentName}</div><div class="small text-muted">${req.roomCode} • ${req.date} ${req.start}-${req.end}</div><div class="mt-1">${req.purpose}</div></div>
        <div class="text-end"><button class="btn btn-sm btn-success approve" data-id="${req.id}">Approve</button><button class="btn btn-sm btn-danger reject" data-id="${req.id}">Reject</button></div></div>`;
      list.appendChild(div);
    });
    document.querySelectorAll('.approve').forEach(b=> b.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id; const req = FAC.student_requests.find(r=> r.id===id);
      if(isConflict(req.roomId, req.date, req.start, req.end)){ alert('Conflict'); return; }
      FAC.bookings.push(createBookingObject({ roomId:req.roomId, date:req.date, start:req.start, end:req.end, purpose:req.purpose, ownerId:req.studentId, ownerName:req.studentName }));
      req.status='approved'; render();
    }));
    document.querySelectorAll('.reject').forEach(b=> b.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id; const req = FAC.student_requests.find(r=> r.id===id);
      req.status='rejected'; render();
    }));
  }
  render();
});
