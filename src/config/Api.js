import setting from './settings'

export default (() => {
  return {
    'AUTH': 'Basic ZGVtbzpkZW1v',
    'REGISTER': setting.api.url + "user/register",  
    'LOGIN': setting.api.url + "user/login", 
    'RECORD_MEAL': setting.api.url + "mealRecords/recordMeal",
    'EDIT_MEAL': setting.api.url + "mealRecords/editMeal",
    'DELETE_MEAL': setting.api.url + "mealRecords/deleteMeal",
    'GET_MEAL': setting.api.url + "mealRecords/getMeals",

  }
})()