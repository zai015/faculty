// utils.js
const FAC = window.FAC_APP;

function findRoomById(id){ return FAC.rooms.find(r=> r.id===id); }

function isConflict(roomId, date, start, end, excludeBookingId=null){
  // assume format HH:MM, YYYY-MM-DD
  return FAC.bookings.some(bk=>{
    if(bk.id === excludeBookingId) return false;
    if(bk.roomId !== roomId) return false;
    if(bk.date !== date) return false;
    // overlap check
    return !(end <= bk.start || start >= bk.end);
  });
}

function createBookingObject({roomId, date, start, end, purpose, ownerId, ownerName}){
  const room = findRoomById(roomId);
  return {
    id: 'bk' + Date.now(),
    roomId,
    roomCode: room ? room.code : '',
    building: room ? room.building : '',
    date, start, end, purpose,
    ownerId, ownerName,
    status: 'confirmed'
  };
}
