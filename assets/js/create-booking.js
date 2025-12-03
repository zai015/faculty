document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  const createBuilding = document.getElementById('createBuilding');
  const createRoom = document.getElementById('createRoom');
  const form = document.getElementById('createBookingForm');
  const alertDiv = document.getElementById('createAlert');

  // populate buildings
  const buildings = [...new Set(FAC.rooms.map(r=> r.building))];
  createBuilding.innerHTML = '<option value="">Select building</option>';
  buildings.forEach(b=> createBuilding.appendChild(Object.assign(document.createElement('option'),{value:b,textContent:b})));
  // populate rooms by building
  function populateRooms(){
    const b = createBuilding.value;
    createRoom.innerHTML = '<option value="">Select room</option>';
    FAC.rooms.filter(r=> !b || r.building===b).forEach(r=>{
      createRoom.appendChild(Object.assign(document.createElement('option'),{value:r.id,textContent: r.code + ' • ' + r.floor}));
    });
  }
  createBuilding.addEventListener('change', populateRooms);
  populateRooms();

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alertDiv.innerHTML = '';
    const payload = {
      roomId: form.room.value,
      date: form.date.value,
      start: form.start_time.value,
      end: form.end_time.value,
      purpose: form.purpose.value,
      ownerId: FAC.CURRENT_USER.id,
      ownerName: FAC.CURRENT_USER.name
    };
    if(isConflict(payload.roomId, payload.date, payload.start, payload.end)){
      alertDiv.innerHTML = '<div class="alert alert-danger">Conflict detected</div>'; return;
    }
    FAC.bookings.push(createBookingObject(payload));
    alertDiv.innerHTML = '<div class="alert alert-success">Booking created</div>';
    form.reset();
  });
});
