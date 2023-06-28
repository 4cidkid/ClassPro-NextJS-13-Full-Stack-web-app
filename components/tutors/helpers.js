export const filterTutorsByAll = (
  rating,
  country,
  languages,
  switchFirst,
  originalData,
  dataApi
) => {
  let filteredTutors = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    dataApi.language.filter((lang) => {
      if (
        lang.tu_id === tutor.tu_id &&
        lang.language_names.includes(languages) &&
        tutor.country_name.toLowerCase() === country.toLowerCase() &&
        tutor.average_rating > rating - 0.6 &&
        tutor.first_class === switchFirst
      ) {
        filteredTutors.push(tutor);
      }
    });
  });
  return filteredTutors;
};
export const languageAndRating = (
  languages,
  rating,
  originalData,
  switchFirst,
  dataApi
) => {
  let ratingAndLanguageTutors = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    dataApi.language.filter((lang) => {
      if (
        lang.tu_id === tutor.tu_id &&
        lang.language_names.includes(languages) &&
        tutor.average_rating > rating - 0.6 &&
        tutor.first_class === switchFirst
      ) {
        ratingAndLanguageTutors.push(tutor);
      }
    });
  });
  return ratingAndLanguageTutors;
};

export const countryAndRating = (
  country,
  rating,
  switchFirst,
  originalData
) => {
  let countryAndRatingTutors = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    if (
      tutor.country_name.toLowerCase() === country.toLowerCase() &&
      tutor.average_rating > rating - 0.6 &&
      tutor.first_class === switchFirst
    ) {
      countryAndRatingTutors.push(tutor);
    }
  });
  return countryAndRatingTutors;
};

export const countryAndLanguage = (
  country,
  languages,
  switchFirst,
  originalData,
  dataApi
) => {
  let countryAndLanguageTutors = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    dataApi.language.filter((lang) => {
      if (
        lang.tu_id === tutor.tu_id &&
        lang.language_names.includes(languages) &&
        tutor.country_name.toLowerCase() === country.toLowerCase() &&
        tutor.first_class === switchFirst
      ) {
        countryAndLanguageTutors.push(tutor);
      }
    });
  });
  return countryAndLanguageTutors;
};

export const filterLanguage = (
  languages,
  switchFirst,
  originalData,
  dataApi
) => {
  let tutorsByLanguage = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    dataApi.language.filter((lang) => {
      if (
        lang.tu_id === tutor.tu_id &&
        lang.language_names.includes(languages) &&
        tutor.first_class === switchFirst
      ) {
        tutorsByLanguage.push(tutor);
      }
    });
  });
  return tutorsByLanguage;
};
export const filterCountry = (country, switchFirst, originalData) => {
  let tutorsByCountry = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    if (
      tutor.country_name.toLowerCase() === country.toLowerCase() &&
      tutor.first_class === switchFirst
    ) {
      tutorsByCountry.push(tutor);
    }
  });
  return tutorsByCountry;
};
export const filterRating = (rating, switchFirst, originalData) => {
  let tutorsByRating = [];
  const tutorsToShow = originalData.response.filter((tutor) => {
    if (
      tutor.average_rating > rating - 0.6 &&
      tutor.first_class === switchFirst
    ) {
      tutorsByRating.push(tutor);
    }
  });
  return tutorsByRating;
};
