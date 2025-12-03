document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const calEl = document.getElementById('calendar');
  const calBuilding = document.getElementById('calBuilding');
  const calRoom = document.getElementById('calRoom');
  const applyBtn = document.getElementById('applyCalFilter');

  // populate building and room selects
  const buildings = [...new Set(FAC.rooms.map(r=> r.building))];
  calBuilding.innerHTML = '<option value="">-- All --</option>';
  buildings.forEach(b=> calBuilding.appendChild(Object.assign(document.createElement('option'),{value:b,textContent:b})));
  function populateRooms(){
    calRoom.innerHTML = '<option value="">-- All Rooms --</option>';
    const b = calBuilding.value;
    FAC.rooms.filter(r=> !b || r.building===b).forEach(r=> calRoom.appendChild(Object.assign(document.createElement('option'),{value:r.id,textContent:r.code})));
  }
  calBuilding.addEventListener('change', populateRooms);
  populateRooms();

  // convert bookings to FullCalendar events
  function eventsFromBookings(filterRoomId){
    return FAC.bookings.map(bk=>{
      const start = bk.date + 'T' + bk.start + ':00';
      const end = bk.date + 'T' + bk.end + ':00';
      return {
        id: bk.id,
        title: `${bk.roomCode} • ${bk.purpose}`,
        start, end,
        extendedProps: { ...bk }
      };
    }).filter(ev => !filterRoomId || ev.extendedProps.roomId === filterRoomId);
  }

  let calendar = new FullCalendar.Calendar(calEl, {
    initialView: 'dayGridMonth',
    headerToolbar: { left:'prev,next today', center:'title', right:'dayGridMonth,timeGridWeek,timeGridDay,listWeek' },
    events: eventsFromBookings(),
    eventClick: function(info){
      const bk = info.event.extendedProps;
      document.getElementById('eventInfo').innerHTML = `<div><strong>${bk.roomCode}</strong></div><div class="small text-muted">${bk.date} ${bk.start} - ${bk.end}</div><div class="mt-2">${bk.purpose}</div><div class="mt-1"><em>Owner: ${bk.ownerName}</em></div>`;
      const actions = document.getElementById('eventActions'); actions.innerHTML = '';
      if(bk.ownerId !== FAC.CURRENT_USER.id){
        const btn = document.createElement('button'); btn.className='btn btn-warning'; btn.textContent='Request modification';
        btn.addEventListener('click', ()=>{
          const reason = prompt('Enter reason for modification request (optional):');
          FAC.modification_requests.push({ id:'mr'+Date.now(), bookingId: bk.id, requesterId: FAC.CURRENT_USER.id, requesterName: FAC.CURRENT_USER.name, reason: reason||'', status:'pending', createdAt: new Date().toISOString() });
          alert('Modification request submitted.');
        });
        actions.appendChild(btn);
      } else {
        const btn = document.createElement('button'); btn.className='btn btn-primary'; btn.textContent='Edit (Open My bookings)';
        btn.addEventListener('click', ()=> location.href = 'my-bookings.html');
        actions.appendChild(btn);
      }
      new bootstrap.Modal(document.getElementById('eventDetailModal')).show();
    }
  });
  calendar.render();

  applyBtn.addEventListener('click', ()=>{
    const filterRoom = calRoom.value;
    calendar.removeAllEvents();
    calendar.addEventSource(eventsFromBookings(filterRoom));
  });
});
