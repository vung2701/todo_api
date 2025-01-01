
export const formatDateToISO = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;

  // Validate ngày tháng năm
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
    return null;
  }

  return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
};
