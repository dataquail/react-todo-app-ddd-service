export const getConfig = () => {
  type Environment = 'development' | 'staging';
  const environment: Environment = 'development';

  const configMap = {
    development: {
      API_HOST: 'localhost:9000/api',
      API_URL: 'http://localhost:9000/api',
    },
    staging: {
      API_HOST: 'test.dataquail.com/api',
      API_URL: 'https://test.dataquail.com/api',
    },
  };

  return configMap[environment];
};
