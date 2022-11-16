// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, starred} = props
  const {id, title, date, like} = details

  const starAppointment = () => {
    starred(id)
  }
  const isLiked = like ? (
    <img
      className="star-img"
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
    />
  ) : (
    <img
      className="star-img"
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="starred"
    />
  )

  return (
    <li className="appointment-box">
      <div className="title-box">
        <p className="title">{title}</p>
        <button
          className="like"
          type="button"
          onClick={starAppointment}
          // eslint-disable-next-line react/no-unknown-property
          testid="star"
        >
          {isLiked}
        </button>
      </div>

      <div className="date-box">
        <p>Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
