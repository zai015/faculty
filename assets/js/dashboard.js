document.addEventListener('DOMContentLoaded', ()=>{
  const FAC = window.FAC_APP;
  document.getElementById('stat-today-count').textContent = FAC.bookings.filter(b=> b.ownerId === FAC.CURRENT_USER.id && b.date === new Date().toISOString().slice(0,10)).length;
  document.getElementById('stat-student-req').textContent = FAC.student_requests.filter(r=> r.assignedFacultyId === FAC.CURRENT_USER.id && r.status==='pending').length;
  document.getElementById('stat-mod-req').textContent = FAC.modification_requests.length;
});
