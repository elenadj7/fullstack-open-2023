import axios from "axios"
const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

const addPerson = person => {
    return axios.post(baseURL, person).then(response => response.data)
}

const updatePerson = person => {
    return axios.put(`${baseURL}/${person.id}`, person).then(response => response.data)
}

export default {getAll, deletePerson, addPerson, updatePerson}