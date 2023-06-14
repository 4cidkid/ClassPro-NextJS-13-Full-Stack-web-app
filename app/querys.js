export const selectAdvertisements = (subject,min,max,level) => {
  return `
  SELECT advertisements.advertisements_title, advertisements.advertisements_description, advertisements.advertisements_level, advertisements.advertisements_price, tutors.tutor_name, subjects.subject_name
  FROM advertisements
  JOIN tutors ON advertisements.tutor_id = tutors.tutor_id AND advertisements.advertisements_price BETWEEN ${min}::money AND ${max}::money
  JOIN subjects ON advertisements.subject_id = subjects.subject_id AND subjects.subject_name = '${subject}' AND advertisements.advertisements_level = '${level.toLowerCase()}';
`;
};
