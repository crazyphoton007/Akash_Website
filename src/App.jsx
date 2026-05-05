import { useState } from 'react'
import './App.css'

const whatsappLink =
  'https://wa.me/917897775992?text=Hi, I need legal help regarding my case.'

function App() {
  const [showBooking, setShowBooking] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [time, setTime] = useState('')
  const [ampm, setAmpm] = useState('PM')
  const [timeError, setTimeError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(80)
  }

  const handlePhoneChange = (event) => {
    const digits = event.target.value.replace(/\D/g, '')

    if (digits.length > 10) {
      vibrate()
      setPhoneError('Phone number must be exactly 10 digits.')
      return
    }

    setPhone(digits)

    if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Phone number must be exactly 10 digits.')
    } else {
      setPhoneError('')
    }
  }

  const validatePhone = () => {
    if (phone.length !== 10) {
      vibrate()
      setPhoneError('Phone number must be exactly 10 digits.')
      return false
    }

    setPhoneError('')
    return true
  }

  const handleDateChange = (event) => {
    let value = event.target.value.replace(/[^\d/]/g, '')

    if (value.length === 2 && date.length < value.length) value += '/'
    if (value.length === 5 && date.length < value.length) value += '/'

    if (value.length > 10) {
      vibrate()
      return
    }

    setDate(value)
    setDateError('')
  }

  const validateDate = () => {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = date.match(datePattern)

    if (!match) {
      vibrate()
      setDateError('Please enter date in DD/MM/YYYY format.')
      return false
    }

    const day = Number(match[1])
    const month = Number(match[2])
    const year = Number(match[3])
    const parsedDate = new Date(year, month - 1, day)

    const isValid =
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day

    if (!isValid) {
      vibrate()
      setDateError('Please enter a valid date.')
      return false
    }

    setDateError('')
    return true
  }

  const handleTimeChange = (event) => {
    let value = event.target.value.replace(/[^\d:]/g, '')

    if (value.length === 2 && time.length < value.length) value += ':'

    if (value.length > 5) {
      vibrate()
      return
    }

    setTime(value)
    setTimeError('')
  }

  const validateTime = () => {
    const timePattern = /^(\d{1,2}):(\d{2})$/
    const match = time.match(timePattern)

    if (!match) {
      vibrate()
      setTimeError('Please enter time like 10:30.')
      return false
    }

    const hour = Number(match[1])
    const minute = Number(match[2])

    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
      vibrate()
      setTimeError('Please enter valid 12-hour time.')
      return false
    }

    setTimeError('')
    return true
  }

  const handleBookingSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const isPhoneValid = validatePhone()
    const isDateValid = validateDate()
    const isTimeValid = validateTime()

    if (!isPhoneValid || !isDateValid || !isTimeValid) return

    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.set('Phone', `${countryCode} ${phone}`)
    formData.set('Preferred Date', date)
    formData.set('Preferred Time', `${time} ${ampm}`)

    try {
      const response = await fetch('https://formsubmit.co/ajax/vik.shukla44@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setBookingSuccess(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or contact directly on WhatsApp.')
      vibrate()
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeBooking = () => {
    setShowBooking(false)
    setBookingSuccess(false)
    setSubmitError('')
  }

  return (
    <main className="page">
      <div className="courtWatermark">⚖</div>

      <nav className="nav">
        <div className="brand">Akashdeep Shukla Law Office</div>
        <button className="navBtn" onClick={() => setShowBooking(true)}>
          Book Consultation
        </button>
      </nav>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">High Court Lucknow • 16 Years Experience</p>
          <h1 className="radiantTitle">Adv. Akashdeep Shukla</h1>
          <h2>Criminal Lawyer in Lucknow High Court</h2>

          <p className="intro">
            Trusted legal guidance for criminal matters, appeals, writ petitions,
            matrimonial disputes, and divorce cases. Clear advice, strong preparation,
            and serious courtroom representation.
          </p>

          <div className="actions">
            <button className="primary" onClick={() => setShowBooking(true)}>
              Book Consultation
            </button>

            <a className="whatsappPremium" href={whatsappLink} target="_blank">
              <span className="waIcon">💬</span>
              WhatsApp Now
            </a>
          </div>

          <div className="stats">
            <div><strong>16+</strong><span>Years Experience</span></div>
            <div><strong>High Court</strong><span>Lucknow</span></div>
            <div><strong>Criminal</strong><span>Appeals & Writs</span></div>
          </div>
        </div>

        <div className="profileCard">
          <div className="photoAura"></div>
          <img
            src={`${import.meta.env.BASE_URL}akashdeep-shukla.jpg`}
            alt="Advocate Akashdeep Shukla"
          />
          <div className="verified">Verified Advocate</div>
        </div>
      </section>

      <section className="section">
        <p className="sectionLabel">Practice Areas</p>
        <h2>Legal support for urgent and sensitive matters</h2>

        <div className="grid">
          {[
            'Criminal Defense',
            'Bail Matters',
            'Criminal Appeals',
            'Writ Petitions',
            'Marriage Disputes',
            'Divorce Matters',
          ].map((item) => (
            <div className="card" key={item}>
              <span>⚖️</span>
              <h3>{item}</h3>
              <p>Clear guidance, document review, legal strategy, and court representation.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <p className="sectionLabel">Why Choose Him</p>
          <h2>Calm advice. Strong preparation. Serious representation.</h2>
        </div>

        <div className="points">
          <p>Experienced in High Court Lucknow matters.</p>
          <p>Focused on criminal, appeal, writ, and matrimonial cases.</p>
          <p>Practical legal advice with clear next steps.</p>
          <p>Trusted support for sensitive legal matters.</p>
        </div>
      </section>

      <section className="seoBox">
        <h2>Looking for a criminal lawyer in Lucknow?</h2>
        <p>
          Adv. Akashdeep Shukla assists clients with criminal cases, bail,
          appeals, writ matters, marriage disputes, and divorce cases before
          courts in Lucknow.
        </p>
      </section>

      <section id="contact" className="contact">
        <p className="sectionLabel">Consultation</p>
        <h2>Need legal help now?</h2>
        <p>Choose a date and time, then share your case details.</p>

        <div className="actions center">
          <button className="primary" onClick={() => setShowBooking(true)}>
            Book Date & Time
          </button>
        </div>
      </section>

      <a className="whatsappFloat" href={whatsappLink} target="_blank" aria-label="Chat on WhatsApp">
        💬
      </a>

      {showBooking && (
        <div className="bookingOverlay">
          <div className="bookingModal">
            <button className="closeBtn" onClick={closeBooking}>×</button>

            {bookingSuccess ? (
              <div className="successBox">
                <div className="successIcon">✓</div>
                <p className="sectionLabel">Request Submitted</p>
                <h2>Consultation request received</h2>
                <p>
                  Thank you. Your booking request has been sent successfully.
                  The law office will contact you shortly.
                </p>

                <div className="actions center">
                  <button className="primary" onClick={closeBooking}>
                    Done
                  </button>
                  <a className="whatsappPremium" href={whatsappLink} target="_blank">
                    <span className="waIcon">💬</span>
                    WhatsApp Now
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="sectionLabel">Private Consultation Request</p>
                <h2>Book your consultation</h2>
                <p className="bookingSub">
                  Select a preferred date and time. The request will be sent directly to the law office.
                </p>

                <form className="bookingForm" onSubmit={handleBookingSubmit}>
                  <input type="hidden" name="_cc" value="aksmon.shukla31@gmail.com" />
                  <input type="hidden" name="_subject" value="New Consultation Booking - Akashdeep Shukla Law Office" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <input name="Name" type="text" placeholder="Full name" required />

                  <div>
                    <div className="phoneGroup">
                      <input
                        className="countryCode"
                        name="Country Code"
                        type="text"
                        value={countryCode}
                        onChange={(event) => {
                          let value = event.target.value.replace(/[^\d+]/g, '')

                          if (!value.startsWith('+')) {
                            value = `+${value.replace(/\+/g, '')}`
                          }

                          setCountryCode(value)
                        }}
                        required
                      />

                      <input
                        name="Phone Number"
                        type="tel"
                        inputMode="numeric"
                        maxLength="10"
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={validatePhone}
                        placeholder="10 digit mobile number"
                        required
                      />
                    </div>

                    {phoneError && <p className="fieldError">{phoneError}</p>}
                  </div>

                  <div className="formRow">
                    <div>
                      <input
                        name="Preferred Date"
                        type="text"
                        inputMode="numeric"
                        value={date}
                        onChange={handleDateChange}
                        onBlur={validateDate}
                        placeholder="DD/MM/YYYY"
                        maxLength="10"
                        required
                      />
                      {dateError && <p className="fieldError">{dateError}</p>}
                    </div>

                    <div>
                      <div className="timeGroup">
                        <input
                          name="Preferred Time"
                          type="text"
                          inputMode="numeric"
                          value={time}
                          onChange={handleTimeChange}
                          onBlur={validateTime}
                          placeholder="10:30"
                          maxLength="5"
                          required
                        />

                        <select
                          name="AM / PM"
                          value={ampm}
                          onChange={(event) => setAmpm(event.target.value)}
                        >
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                      {timeError && <p className="fieldError">{timeError}</p>}
                    </div>
                  </div>

                  <select name="Case Type" required>
                    <option value="">Select case type</option>
                    <option>Criminal Matter</option>
                    <option>Bail Matter</option>
                    <option>Appeal</option>
                    <option>Writ Petition</option>
                    <option>Marriage Dispute</option>
                    <option>Divorce Matter</option>
                    <option>Other</option>
                  </select>

                  <textarea name="Case Details" placeholder="Briefly explain your matter" rows="4" required />

                  {submitError && <p className="fieldError">{submitError}</p>}

                  <button className="submitBooking" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Confirm Booking Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default App