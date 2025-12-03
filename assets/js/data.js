// data.js - sample in-memory data. Replace with AJAX in production.
window.FAC_APP = (function(){
  const CURRENT_USER = { id: 'instructor_1', name: 'Instructor', role: 'faculty' };

  // create rooms from provided building lists
  const buildingRooms = {
    "CICS": {
      "Floor 5": ["CICS-501","CICS-502","CICS-503","CICS-504","CICS-505"],
      "Floor 4": ["CICS-401","CICS-402","CICS-403","CICS-405"],
      "Floor 3": ["CICS-301","CICS-302","CICS-303","CICS-304","CICS-305"],
      "Floor 2": ["CICS-201","CICS-202","CICS-203","CICS-204","CICS-205"],
      "Floor 1": ["RGO","Dean Office","Faculty","Faculty","Faculty"]
    },
    "CET": {
      "Floor 5": ["AVR","CET-503","LIBRARY"],
      "Floor 4": ["CET-401","CET-402","CET-403","CET-404","CET-405"],
      "Floor 3": ["CET-301","CET-302","CET-303","CET-304","CET-305"],
      "Floor 2": ["Faculty","Dean Office","CET-203","CET-204","CET-205"],
      "Floor 1": ["CET-101","CET-102","CET-103","CET-104","CET-105"]
    }
  };

  let rooms = [];
  let idx=1;
  Object.keys(buildingRooms).forEach(b=>{
    Object.keys(buildingRooms[b]).forEach(f=>{
      buildingRooms[b][f].forEach(code=>{
        rooms.push({ id:'r'+(idx++), building: b, floor: f, code, capacity:40, type:'Lecture' });
      });
    });
  });

  // sample bookings
  const today = new Date().toISOString().slice(0,10);
  let bookings = [
    { id:'bk1', roomId: rooms[0].id, roomCode: rooms[0].code, building: rooms[0].building, date: today, start:'09:00', end:'11:00', purpose:'Class', ownerId: CURRENT_USER.id, ownerName: CURRENT_USER.name, status:'confirmed' },
    { id:'bk2', roomId: rooms[1].id, roomCode: rooms[1].code, building: rooms[1].building, date: today, start:'10:00', end:'12:00', purpose:'Meeting', ownerId: 'someone_else', ownerName:'Prof Cruz', status:'confirmed' }
  ];

  let student_requests = [
    { id:'sr1', studentId:'s1', studentName:'Juan D', assignedFacultyId: CURRENT_USER.id, roomId: rooms[2].id, roomCode: rooms[2].code, building: rooms[2].building, date: today, start:'13:00', end:'15:00', purpose:'Presentation', status:'pending', comments:'' }
  ];

  let modification_requests = [];
  let requests_to_admin = [];

  return {
    CURRENT_USER, rooms, bookings, student_requests, modification_requests, requests_to_admin
  };
})();
