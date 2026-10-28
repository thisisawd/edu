const search = document.getElementById('quiz-search');
const filters = [...document.querySelectorAll('[data-subject].filter-button')];
const cards = [...document.querySelectorAll('.app-card')];
const status = document.getElementById('results-status');
let selectedSubject = 'all';

function filterQuizzes() {
  const query = search.value.toLocaleLowerCase().trim();
  const terms = query.split(/\s+/).filter(Boolean);
  let visibleCount = 0;
  for (const card of cards) {
    const matchesSubject = selectedSubject === 'all' || card.dataset.subject === selectedSubject;
    const searchableText = `${card.dataset.search} ${card.dataset.subject}`;
    const matchesQuery = terms.every((term) => searchableText.includes(term));
    card.hidden = !matchesSubject || !matchesQuery;
    if (!card.hidden) visibleCount++;
  }
  document.getElementById('empty-state').hidden = visibleCount > 0;
  document.getElementById('app-grid').hidden = visibleCount === 0;
  status.textContent = visibleCount === cards.length && !query && selectedSubject === 'all'
    ? `${cards.length} quizzes, ready when you are.`
    : `${visibleCount} ${visibleCount === 1 ? 'quiz' : 'quizzes'} found${selectedSubject !== 'all' ? ` in ${selectedSubject}` : ''}${query ? ` for "${search.value.trim()}"` : ''}.`;
}

function chooseSubject(subject) {
  selectedSubject = subject;
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.subject === subject));
  filterQuizzes();
}

function resetLibrary() {
  search.value = '';
  chooseSubject('all');
  search.focus();
}

for (const button of filters) button.addEventListener('click', () => chooseSubject(button.dataset.subject));
search.addEventListener('input', filterQuizzes);
search.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    search.value = '';
    filterQuizzes();
  }
});
document.getElementById('reset-button').addEventListener('click', resetLibrary);
document.getElementById('library-controls').hidden = false;
filterQuizzes();
