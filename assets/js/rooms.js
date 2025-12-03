document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const filterBuilding = document.getElementById('filterBuilding');
  const filterDate = document.getElementById('filterDate');
  const filterTime = document.getElementById('filterTime');
  const roomsGrid = document.getElementById('roomsGrid');
  // populate building select
  const buildings = [...new Set(FAC.rooms.map(r=>r.building))];
  filterBuilding.innerHTML = '<option value="">-- All Buildings --</option>';
  buildings.forEach(b=> filterBuilding.appendChild(Object.assign(document.createElement('option'),{value:b,textContent:b})));
  filterDate.value = new Date().toISOString().slice(0,10);
  filterTime.value = '09:00';

  function render(){
    const b = filterBuilding.value;
    const date = filterDate.value;
    const time = filterTime.value;
    roomsGrid.innerHTML = '';
    const filtered = FAC.rooms.filter(r=> !b || r.building === b);
    filtered.forEach(r=>{
      const col = document.createElement('div'); col.className='col-12 col-md-6 col-lg-4';
      const card = document.createElement('div'); card.className='card p-3 room-card';
      const occupied = date && FAC.bookings.some(bk=> bk.roomId===r.id && bk.date===date && (time >= bk.start && time < bk.end));
      card.innerHTML = `<div class="d-flex justify-content-between"><div><h6>${r.code}</h6><small class="text-muted">${r.building} • ${r.floor}</small></div><div><span class="badge ${occupied? 'bg-danger':'bg-success'} text-white">${occupied? 'Occupied':'Available'}</span></div></div>
      <p class="small mt-2">Capacity: ${r.capacity}</p>
      <div class="d-flex gap-2"><button class="btn btn-sm btn-outline-primary view-schedule" data-id="${r.id}">View schedule</button><a class="btn btn-sm btn-success" href="create-booking.html">Book</a></div>`;
      col.appendChild(card); roomsGrid.appendChild(col);
    });
  }
  document.getElementById('filterForm').addEventListener('submit', e=>{ e.preventDefault(); render(); });
  render();
});
