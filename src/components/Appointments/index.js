// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const newAppointmentsBox = []

class Appointments extends Component {
  state = {
    dateInput: '',
    titleInput: '',
    newAppointments: newAppointmentsBox,
    isFilteredActive: false,
  }

  onClickTitle = event => {
    event.preventDefault()
    this.setState({titleInput: event.target.value})
  }

  onClickDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy , EEEE')
      : ''

    const addAppointment = {
      id: v4(),
      date: formatDate,
      title: titleInput,
      like: false,
    }

    this.setState(previous => ({
      newAppointments: [...previous.newAppointments, addAppointment],
      dateInput: '',
      titleInput: '',
    }))
  }

  starred = id => {
    this.setState(previous => ({
      newAppointments: previous.newAppointments.map(eachOne => {
        if (id === eachOne.id) {
          return {...eachOne, like: !eachOne.like}
        }
        return eachOne
      }),
    }))
  }

  isFilteredAppointment = () => {
    const {isFilteredActive} = this.state
    this.setState({isFilteredActive: !isFilteredActive})
  }

  starredAppointmentsFiltered = () => {
    const {newAppointments, isFilteredActive} = this.state

    if (isFilteredActive) {
      return newAppointments.filter(each => each.like === true)
    }
    return newAppointments
  }

  render() {
    const {dateInput, titleInput, isFilteredActive} = this.state
    const starredBtn = isFilteredActive ? 'filter' : 'filtered'

    const newAppointmentsList = this.starredAppointmentsFiltered()

    return (
      <div className="main-container">
        <div className="content-container">
          <div className="input-container">
            <div className="input-box">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-data" onSubmit={this.onClickAdd}>
                <label htmlFor="nameId" className="label">
                  TITLE
                </label>
                <input
                  className="title-text input"
                  type="text"
                  value={titleInput}
                  id="nameId"
                  placeholder="Title"
                  onChange={this.onClickTitle}
                />
                <label htmlFor="dateId" className="label">
                  DATE
                </label>
                <input
                  className="date-text input"
                  value={dateInput}
                  type="date"
                  placeholder=""
                  id="dateId"
                  onChange={this.onClickDate}
                />
                <button className="btn" type="submit">
                  add
                </button>
              </form>
            </div>
            <div className="image-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="Appointments"
              />
            </div>
          </div>
          <div className="appointment-container">
            <div className="appointment-header">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className={starredBtn}
                onClick={this.isFilteredAppointment}
              >
                Starred
              </button>
            </div>
            <ul className="new-appointments">
              {newAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  details={each}
                  starred={this.starred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
