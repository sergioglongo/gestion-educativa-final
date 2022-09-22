export const GET_ALL_NOTIFICATIONS = "GET_ALL_NOTIFICATIONS";
export const GET_NOTIFICATIONS_IDUSER = "GET_NOTIFICATIONS_IDUSER";


export const getNotificationsAll = () => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/notifications/`)
            .then(r => r.json())
            .then(data => dispatch({ type: "GET_ALL_NOTIFICATIONS", payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}

export const getNotificationsIdUser = (idUser) => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/notifications/idUser/${idUser}`)
            .then(r => r.json())
            .then(data => dispatch({ type: "GET_NOTIFICATIONS_IDUSER", payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}

export async function notificationCreate(data) {
    return await fetch('http://localhost:3001/notifications', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function notificationEdit(data) {
    return await fetch('http://localhost:3001/notifications', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function notificationActDes(data) {
    return await fetch('http://localhost:3001/notifications/ActDes', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function notificationCheck(data) {
    return await fetch(`http://localhost:3001/notifications/check/${data}`, {
        method: 'PUT',
        }
    ).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

export async function notificationScore(data) {
    return await fetch('http://localhost:3001/notifications/score', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        //  .then(res => JSON.parse(res))
        .catch(error => console.error('Error:', error))
}

