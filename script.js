function saveGoal(goal) {
  localStorage.setItem('goalCountdown', JSON.stringify(goal));
}

function loadGoal() {
  return JSON.parse(localStorage.getItem('goalCountdown')) || null;
}

function updateCountdown() {
  const goal = loadGoal();
  const titleEl = document.getElementById('goalTitle');
  const dateEl = document.getElementById('goalDate');
  const daysEl = document.getElementById('daysLeft');

  if (!goal) {
    titleEl.textContent = 'No goal set';
    dateEl.textContent = '—';
    daysEl.textContent = '—';
    return;
  }

  titleEl.textContent = goal.name;
  dateEl.textContent = `Deadline: ${goal.date}`;

  const today = new Date();
  const deadline = new Date(goal.date);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    daysEl.textContent = `${diffDays} day${diffDays !== 1 ? 's' : ''} remaining`;
  } else if (diffDays === 0) {
    daysEl.textContent = `Today is the deadline!`;
  } else {
    daysEl.textContent = `Goal expired ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
  }
}

function setGoal() {
  const name = document.getElementById('goalName').value.trim();
  const date = document.getElementById('goalDeadline').value;
  if (name && date) {
    saveGoal({ name, date });
    updateCountdown();
    document.getElementById('goalName').value = '';
    document.getElementById('goalDeadline').value = '';
  }
}

function clearGoal() {
  localStorage.removeItem('goalCountdown');
  updateCountdown();
}

function refreshGoal() {
  updateCountdown();
}

updateCountdown();