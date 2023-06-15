export const selectAdvertisements = (subject, min, max, level) => {
  return `
  SELECT advertisements.advertisements_title,country.iso,tutors.tutor_description,tutors.tutor_skills, advertisements.advertisements_description, advertisements.advertisements_level, advertisements.advertisements_price, tutors.tutor_name,tutors.tutor_lastname, subjects.subject_name
  FROM advertisements
  JOIN tutors ON advertisements.tutor_id = tutors.tutor_id AND advertisements.advertisements_price BETWEEN ${min}::money AND ${max}::money
  JOIN subjects ON advertisements.subject_id = subjects.subject_id AND subjects.subject_name = '${subject}' AND advertisements.advertisements_level = '${level.toLowerCase()}'
  JOIN country ON tutors.country_id = country.id
  ORDER BY advertisements.advertisements_price;
`;
};
export const selectAnyAdvertisements = () => {
  return `
  SELECT advertisements.advertisements_title,country.iso,tutors.tutor_description,tutors.tutor_skills, advertisements.advertisements_description, advertisements.advertisements_level, advertisements.advertisements_price, tutors.tutor_name,tutors.tutor_lastname, subjects.subject_name
  FROM advertisements
  JOIN tutors ON advertisements.tutor_id = tutors.tutor_id
  JOIN subjects ON advertisements.subject_id = subjects.subject_id
  JOIN country ON tutors.country_id = country.id
  ORDER BY advertisements.advertisements_price;
  `;
};
