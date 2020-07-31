import merge from 'lodash/merge';
import local from './local';

const settings = {}
export default (() => {
  console.log('process.env : ',process.env);
  switch (process.env.REACT_APP_ENV) {
    case 'localhost':
    case 'local':
      return merge(local, settings)
    default:
      return merge(local, settings)
  }
})()
