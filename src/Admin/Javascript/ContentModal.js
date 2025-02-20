document.getElementById('content-edit').addEventListener('click', function() {
    const modal = document.getElementById('content-modal');
    modal.classList.remove('hidden'); // Show the modal
  });
  document.getElementById('content-modal').addEventListener('click', function() {
    const modal = document.getElementById('content-modal');
    modal.classList.add('hidden'); // Hide the modal
  });
    