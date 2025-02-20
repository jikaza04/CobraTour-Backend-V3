document.querySelectorAll('li').forEach(item => {
    item.onclick = () => {
      document.querySelectorAll('li').forEach(li => li.classList.remove('bg-admin-hovergray'));
      item.classList.add('bg-admin-hovergray');
    };
  });