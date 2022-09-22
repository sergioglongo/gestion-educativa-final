export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const GET_ALL_COURSES = "GET_ALL_COURSES";
export const GET_ALL_STUDENTS_IN_IDNOTIFICATION = "GET_ALL_STUDENTS_IN_IDNOTIFICATION";


export const getAllStudents = () => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/students/`)
            .then(r => r.json())
            .then(data => dispatch({ type: "GET_ALL_STUDENTS", payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}

export const getAllStudentsIdNotification = () => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/students/`)
            .then(r => r.json())
            .then(data => dispatch({ type: "GET_ALL_STUDENTS_IN_IDNOTIFICATION", payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}

export async function studentActDes(data) {
    return await fetch('http://localhost:3001/students/ActDes', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function studentCreate(data) {
    return await fetch('http://localhost:3001/students', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function studentEdit(data) {
    return await fetch('http://localhost:3001/students/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export const getAllCourses = () => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/course/`)
            .then(r => r.json())            
            .then(data => dispatch({ type: "GET_ALL_COURSES", payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}