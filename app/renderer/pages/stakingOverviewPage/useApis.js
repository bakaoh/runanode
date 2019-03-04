import useApi from './useApi';

/**
 * Use when there are more than two apiMethods
 */

const useApis = (...apiSections) =>
  apiSections && apiSections.map(apiSection => useApi(apiSection));

export default useApis;
