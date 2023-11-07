import apiGeneralInfo from './apiGeneralInfo';
import servers from './servers';
import tags from './tags';
import components from './components';
import users from './users';
import auth from './auth';

export = {
  ...apiGeneralInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...users,
  },
};
