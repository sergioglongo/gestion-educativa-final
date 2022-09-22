import { LOGIN, CLEANER_USER, GET_ALL_TYPEUSERS, GET_NEWS, GET_FAVORITES, LOADING } from "./actions";
import { GET_ALL_STUDENTS, GET_ALL_COURSES } from '../Components/Students/studentsActions'
import { GET_ALL_NOTIFICATIONS, GET_NOTIFICATIONS_IDUSER } from '../Components/Notifications/notificationsActions'
import { GET_ALL_USERS } from '../Components/Users/usersActions'
import { GET_ALL_NEWS } from '../Components/News/NewsActions'
import { COURSE_STUDENTS } from "../Components/Pay/actionsPay";

const initialState = {
  user: [],
  users: [],
  typeUsers: [],
  notificationsId: [],
  notificationsIdUser: [],
  notificationsAll: [],
  news: [],
  favorites: [],
  students: [],
  courses: [],
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
     ///// FLOR RICARDO
     case LOGIN:
      return { ...state, user: actions.payload, loading: false }
      case CLEANER_USER:
        return {...state, user: []}
    case COURSE_STUDENTS:
         return {...state, students: actions.payload}
    case LOADING:
    return {...state, loading: true}
    ///// FLOR RICARDO
    case GET_ALL_NOTIFICATIONS:
      return { ...state, notificationsAll: actions.payload }
    case GET_NOTIFICATIONS_IDUSER:
      return { ...state, notificationsIdUser: actions.payload }
    case GET_ALL_STUDENTS:
      return { ...state, students: actions.payload }
    case GET_ALL_USERS:
      return { ...state, users: actions.payload }
    case GET_ALL_TYPEUSERS:
      return { ...state, typeUsers: actions.payload }
    case GET_ALL_COURSES:
      return { ...state, courses: actions.payload }
    case GET_ALL_NEWS:
      return { ...state, news: actions.payload }
    case GET_NEWS:
      return {
        ...state, news: actions.payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: actions.payload,
      };
    default:
      return state;
  }
}
