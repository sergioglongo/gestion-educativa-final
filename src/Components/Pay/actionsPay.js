import { loading } from "../../redux/actions";

export const COURSE_STUDENTS = "COURSE_STUDENTS";
export const LOGIN = "LOGIN";



// CREA PAGOS
export function createPay(pay) {
    return fetch("http://localhost:3001/payments", {
      method: "POST",
      body: JSON.stringify(pay),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {return res});
}

// TRAER TODOS LOS ESTUDIANTES con cursos
export function groupStudents () {
  return function (dispatch){
   return fetch("http://localhost:3001/students")
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(res => {dispatch({ type: COURSE_STUDENTS, payload: res });
    });
  }
}


// TODO LO RELACIONADO CON PAY
export function getAllPay(state, idUser, typeUser) {
   return fetch(`http://localhost:3001/payments/${state}/${idUser}/${typeUser}`)
    .then(res => res.json())
    .then(res => {return res})
    .catch(error => console.error("Error:", error))
    }

  // TRAE USUARIO COMO EL DE LOGIN
    export function getUserPay(data) {
      return function (dispatch) {
        dispatch(loading())
        return fetch("http://localhost:3001/users/password", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((login) => {dispatch({ type: LOGIN, payload: login });
          });
      };
    }
