//get tutors with specific params
export const selectAdvertisements = (subject, min, max, level) => {
  return `
  SELECT
  country.name as country_name,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  jsonb_agg(subjects.subject_name) AS subject_names,
  jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id,
  tutors.tutor_first_free as first_class
FROM
  tutors
JOIN
  tutors_subjects ON tutors_subjects.tutor_id = tutors.tutor_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
JOIN
  subjects ON subjects.subject_id = tutors_subjects.subject_id AND subjects.subject_name = '${subject.toLowerCase()}'
  WHERE tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
GROUP BY
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  tutors.tutor_name,
  tutors.tutor_lastname,
  tutors.tutor_hourly_wage,
  tutors.tutor_id,
  tutors.tutor_first_free,
  subjects.subject_name,
  country.name
  HAVING
  '${level.toLowerCase()}' = ANY(ARRAY_AGG(tutors_subjects.subject_level))
ORDER BY
AVG(reviews.review_rating) DESC;
  `;
};
//get tutors with min, max & level param

export const selectAdvertisementsLevel = (min, max, level) => {
  return `
  SELECT
  country.name as country_name,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  jsonb_agg(subjects.subject_name) AS subject_names,
  jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id,
  tutors.tutor_first_free as first_class
FROM
  tutors
JOIN
  tutors_subjects ON tutors_subjects.tutor_id = tutors.tutor_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
JOIN
  subjects ON subjects.subject_id = tutors_subjects.subject_id
  WHERE tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
GROUP BY
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  tutors.tutor_name,
  tutors.tutor_lastname,
  tutors.tutor_hourly_wage,
  tutors.tutor_id,
  tutors.tutor_first_free,
  subjects.subject_name,
  country.name
  HAVING
  '${level.toLowerCase()}' = ANY(ARRAY_AGG(tutors_subjects.subject_level))
ORDER BY
AVG(reviews.review_rating) DESC;
  `;
};
//get tutors with subject,min, & max param

export const selectAdvertisementsSubject = (subject, min, max) => {
  return `
  SELECT
  country.name as country_name,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  jsonb_agg(subjects.subject_name) AS subject_names,
  jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id,
  tutors.tutor_first_free as first_class
FROM
  tutors
JOIN
  tutors_subjects ON tutors_subjects.tutor_id = tutors.tutor_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
JOIN
  subjects ON subjects.subject_id = tutors_subjects.subject_id AND subjects.subject_name = '${subject.toLowerCase()}'
  WHERE tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
GROUP BY
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  tutors.tutor_name,
  tutors.tutor_lastname,
  tutors.tutor_hourly_wage,
  tutors.tutor_id,
  tutors.tutor_first_free,
  subjects.subject_name,
  country.name

ORDER BY
AVG(reviews.review_rating) DESC;
  `;
};
//get tutors with min & max param

export const selectAdvertisementsMin = (min, max) => {
  return `
  SELECT
  country.name as country_name,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  jsonb_agg(subjects.subject_name) AS subject_names,
  jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id,
  tutors.tutor_first_free as first_class
FROM
  tutors
JOIN
  tutors_subjects ON tutors_subjects.tutor_id = tutors.tutor_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
JOIN
  subjects ON subjects.subject_id = tutors_subjects.subject_id
  WHERE tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
GROUP BY
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  tutors.tutor_name,
  tutors.tutor_lastname,
  tutors.tutor_hourly_wage,
  tutors.tutor_id,
  tutors.tutor_first_free,
  country.name

ORDER BY
AVG(reviews.review_rating) DESC;
  `;
};

// select all tutors
export const selectAnyAdvertisements = () => {
  return `
  SELECT
  country.name as country_name,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  jsonb_agg(subjects.subject_name) AS subject_names,
  jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id,
  tutors.tutor_first_free as first_class
FROM
  tutors
JOIN
  tutors_subjects ON tutors_subjects.tutor_id = tutors.tutor_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
JOIN
  subjects ON subjects.subject_id = tutors_subjects.subject_id
GROUP BY
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  tutors.tutor_name,
  tutors.tutor_lastname,
  tutors.tutor_hourly_wage,
  tutors.tutor_id,
  tutors.tutor_first_free,
  country.name
ORDER BY
AVG(reviews.review_rating) DESC;
  `;
};

//get tutorsLanguages

export const selectTutorLanguages = () => {
  return `
  SELECT tutors_language.tutor_id as tu_id, array_agg(languages.name) AS language_names
FROM tutors_language
JOIN languages ON languages.id = tutors_language.language_id
GROUP BY tutors_language.tutor_id
ORDER BY tutors_language.tutor_id;
  `;
};

//get tutor info by id
export const getTutorinfo = (id) => {
  return `
  SELECT tutors.tutor_id AS tu_id,tutors.tutor_name AS tu_name,tutors.tutor_lastname AS tu_lastname,
  tutors.tutor_hourly_wage AS hourly, tutors.tutor_skills AS tu_skills, tutors.tutor_description AS
  tu_desc,ARRAY_AGG(languages.name) AS langs,country.iso AS c_iso,cl_date,
  subject_levels,
  subject_names
  FROM tutors 
  JOIN (
  SELECT tutor_id, ARRAY_AGG(class_date) AS cl_date
	  FROM private_class
	  GROUP BY 1
  ) priv_class ON tutors.tutor_id = priv_class.tutor_id
  JOIN tutors_language ON tutors.tutor_id = tutors_language.tutor_id
  JOIN languages ON tutors_language.language_id = languages.id
  JOIN country ON tutors.country_id = country.id
  JOIN (
	  SELECT tutors_subjects.tutor_id,jsonb_agg(tutors_subjects.subject_level) AS subject_levels,
	  jsonb_agg(subjects.subject_name) AS subject_names
	  FROM tutors_subjects
	  JOIN subjects ON tutors_subjects.subject_id = subjects.subject_id
	  GROUP BY 1
  ) tu_subj ON tutors.tutor_id = tu_subj.tutor_id
  WHERE tutors.tutor_id =${id}
  GROUP BY
  tutors.tutor_id,
  country.iso,
  cl_date,
  subject_levels,
  subject_names

  `;
};