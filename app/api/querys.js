export const selectAdvertisements = (subject, min, max, level) => {
  return `
  SELECT
  advertisements.advertisements_title AS ad_title,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  advertisements.advertisements_description as ad_desc,
  advertisements.advertisements_level as ad_level,
  advertisements.advertisements_price as ad_price,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  subjects.subject_name as subject,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id
FROM
  advertisements
JOIN
  tutors ON advertisements.tutor_id = tutors.tutor_id AND tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
JOIN
subjects ON advertisements.subject_id = subjects.subject_id AND subjects.subject_name = '${subject.toLowerCase()}' AND advertisements.advertisements_level = '${level.toLowerCase()}'
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
GROUP BY
  advertisements.advertisements_title,
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  advertisements.advertisements_description,
  advertisements.advertisements_level,
  advertisements.advertisements_price,
  tutors.tutor_name,
  tutors.tutor_lastname,
  subjects.subject_name,
  tutors.tutor_hourly_wage,
  tutors.tutor_id
ORDER BY
  AVG(reviews.review_rating) DESC;
  `;
};

export const selectAdvertisementsAll = (min,max,level) => {
  return `
  SELECT
  advertisements.advertisements_title AS ad_title,
  country.iso as country,
  tutors.tutor_description as tu_desc,
  tutors.tutor_skills as tu_skill,
  advertisements.advertisements_description as ad_desc,
  advertisements.advertisements_level as ad_level,
  advertisements.advertisements_price as ad_price,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  subjects.subject_name as subject,
  round(AVG(reviews.review_rating)::numeric,2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id
FROM
  advertisements
JOIN
  tutors ON advertisements.tutor_id = tutors.tutor_id AND tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
JOIN
subjects ON advertisements.subject_id = subjects.subject_id AND advertisements.advertisements_level = '${level.toLowerCase()}'
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
GROUP BY
  advertisements.advertisements_title,
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  advertisements.advertisements_description,
  advertisements.advertisements_level,
  advertisements.advertisements_price,
  tutors.tutor_name,
  tutors.tutor_lastname,
  subjects.subject_name,
  tutors.tutor_hourly_wage,
  tutors.tutor_id
ORDER BY
  AVG(reviews.review_rating) DESC;
  `;
};

export const selectAnyAdvertisements = () => {
  return `
  SELECT
  advertisements.advertisements_title AS ad_title,
  country.iso AS country,
  tutors.tutor_description AS tu_desc,
  tutors.tutor_skills AS tu_skill,
  advertisements.advertisements_description as ad_desc,
  advertisements.advertisements_level as ad_level,
  advertisements.advertisements_price as ad_price,
  tutors.tutor_name as tu_name,
  tutors.tutor_lastname as tu_lastname,
  subjects.subject_name as subject,
  round(AVG(reviews.review_rating)::numeric, 2) AS average_rating,
  COUNT(reviews.review_rating) AS number_reviews,
  tutors.tutor_hourly_wage as tu_hourly,
  tutors.tutor_id as tu_id
FROM
  advertisements
JOIN
  tutors ON advertisements.tutor_id = tutors.tutor_id
JOIN
  subjects ON advertisements.subject_id = subjects.subject_id
JOIN
  country ON tutors.country_id = country.id
JOIN
  reviews ON reviews.tutor_id = tutors.tutor_id
GROUP BY
  advertisements.advertisements_title,
  country.iso,
  tutors.tutor_description,
  tutors.tutor_skills,
  advertisements.advertisements_description,
  advertisements.advertisements_level,
  advertisements.advertisements_price,
  tutors.tutor_name,
  tutors.tutor_lastname,
  subjects.subject_name,
  tutors.tutor_hourly_wage,
  tutors.tutor_id
ORDER BY
  average_rating DESC;
  `;
};
export const selectTutorLanguages = () => {
  return `
  SELECT tutors_language.tutor_id as tu_id, array_agg(languages.name) AS language_names
FROM tutors_language
JOIN languages ON languages.id = tutors_language.language_id
GROUP BY tutors_language.tutor_id
ORDER BY tutors_language.tutor_id;
  `;
};
export const selectTutorLanguagesAll = (min,max,level) => {
  return `
  SELECT
    tutors.tutor_id as tu_id,
    array_agg(DISTINCT languages.name) AS language_names,
    subjects.subject_name,advertisements.advertisements_level
FROM
    tutors
JOIN
    tutors_language ON tutors.tutor_id = tutors_language.tutor_id
JOIN
    languages ON languages.id = tutors_language.language_id
JOIN
    tutors_subjects ON tutors.tutor_id = tutors_subjects.tutor_id
JOIN
    advertisements ON advertisements.tutor_id = tutors.tutor_id
JOIN
    subjects ON subjects.subject_id = advertisements.subject_id
WHERE
    tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
	AND advertisements.advertisements_level = '${level.toLowerCase()}'
GROUP BY
    tutors.tutor_id,
    subjects.subject_name,
	advertisements.advertisements_level
ORDER BY
    tutors.tutor_id;
  `;
};
export const selectTutorLanguagesFilter = (subject, min, max, level) => {
  return `
  SELECT
    tutors.tutor_id as tu_id,
    array_agg(DISTINCT languages.name) AS language_names,
    subjects.subject_name,advertisements.advertisements_level
FROM
    tutors
JOIN
    tutors_language ON tutors.tutor_id = tutors_language.tutor_id
JOIN
    languages ON languages.id = tutors_language.language_id
JOIN
    tutors_subjects ON tutors.tutor_id = tutors_subjects.tutor_id
JOIN
    advertisements ON advertisements.tutor_id = tutors.tutor_id
JOIN
    subjects ON subjects.subject_id = advertisements.subject_id
WHERE
    tutors.tutor_hourly_wage BETWEEN ${min}::money AND ${max}::money
    AND LOWER(subjects.subject_name) = '${subject.toLowerCase()}' 
	AND advertisements.advertisements_level = '${level.toLowerCase()}'
GROUP BY
    tutors.tutor_id,
    subjects.subject_name,
	advertisements.advertisements_level
ORDER BY
    tutors.tutor_id;
  `;
};
