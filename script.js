/**
 * Writes the current copyright year into the footer.
 * @param {{textContent: string}} element
 * @param {number} year
 * @returns {void}
 */
function updateCopyrightYear(element, year) {
  element.textContent = String(year);
}

const yearElement = document.querySelector('#year');

if (yearElement) {
  updateCopyrightYear(yearElement, new Date().getFullYear());
}
