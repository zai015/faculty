document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const tbody = document.querySelector('#myBookingsTable tbody');
  function render(){
    tbody.innerHTML='';
    FAC.bookings.filter(b=> b.ownerId === FAC.CURRENT_USER.id).forEach(bk=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${bk.roomCode}</td><td>${bk.date}</td><td>${bk.start} - ${bk.end}</td><td>${bk.purpose}</td><td>${bk.status}</td><td class="text-end">
        <button class="btn btn-sm btn-outline-primary edit" data-id="${bk.id}">Edit</button>
        <button class="btn btn-sm btn-outline-danger cancel" data-id="${bk.id}">Cancel</button>
      </td>`;
      tbody.appendChild(tr);
    });
    // attach
    document.querySelectorAll('.cancel').forEach(btn=> btn.addEventListener('click', e=>{
      if(!confirm('Cancel booking?')) return;
      const id=e.currentTarget.dataset.id; FAC.bookings = FAC.bookings.filter(b=> b.id !== id); render();
    }));
    document.querySelectorAll('.edit').forEach(btn=> btn.addEventListener('click', e=>{
      const id=e.currentTarget.dataset.id; const bk = FAC.bookings.find(b=> b.id===id);
      document.getElementById('editBookingId').value = bk.id;
      document.getElementById('editDate').value = bk.date;
      document.getElementById('editStart').value = bk.start;
      document.getElementById('editEnd').value = bk.end;
      document.getElementById('editPurpose').value = bk.purpose;
      new bootstrap.Modal(document.getElementById('editBookingModal')).show();
    }));
  }
  document.getElementById('editBookingForm').addEventListener('submit', e=>{
    e.preventDefault();
    const id = document.getElementById('editBookingId').value;
    const bk = FAC.bookings.find(b=> b.id===id);
    const date = document.getElementById('editDate').value;
    const start = document.getElementById('editStart').value;
    const end = document.getElementById('editEnd').value;
    const purpose = document.getElementById('editPurpose').value;
    if(isConflict(bk.roomId, date, start, end, id)){
      document.getElementById('editAlert').innerHTML = '<div class="alert alert-danger">Conflict</div>'; return;
    }
    bk.date = date; bk.start = start; bk.end = end; bk.purpose = purpose;
    bootstrap.Modal.getInstance(document.getElementById('editBookingModal')).hide();
    render();
  });

  render();
});
