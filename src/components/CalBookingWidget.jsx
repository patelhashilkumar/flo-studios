import { useState } from 'react'
import './CalBookingWidget.css'

export default function CalBookingWidget({ calLink = 'flo-studios-nh4bet/15min' }) {
  const [isLoading, setIsLoading] = useState(true)

  const embedUrl = `https://cal.com/${calLink}?embed=1&theme=light&layout=month_view`
  const directUrl = `https://cal.com/${calLink}`

  return (
    <div className="cal-widget-card">
      <div className="cal-widget-header">
        <div className="cal-widget-tag-row">
          <div className="cal-widget-tag">
            <span className="cal-widget-pulse" aria-hidden="true" />
            <span>DIRECT FOUNDER CALENDAR</span>
          </div>
          <span className="cal-widget-meta-pill">⚡ 15 MIN • GOOGLE MEET</span>
        </div>
        <h2 className="cal-widget-title">Book a 15-Min Scope Call</h2>
        <p className="cal-widget-desc">
          Select a time with Flo Studios. We'll discuss your product requirements, architecture, and deployment timeline directly.
        </p>
      </div>

      <div className="cal-widget-frame-wrap">
        {isLoading && (
          <div className="cal-widget-loader" aria-hidden="true">
            <div className="cal-widget-spinner" />
            <span>Connecting to studio calendar...</span>
          </div>
        )}
        <iframe
          src={embedUrl}
          title="Flo Studios 15-Min Discovery Call"
          className="cal-widget-iframe"
          loading="lazy"
          allow="camera; microphone; autoplay; fullscreen"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="cal-widget-footer">
        <div className="cal-widget-footer-left">
          <span className="cal-widget-footer-dot" aria-hidden="true" />
          <span className="cal-widget-footer-note">Google Meet invite sent automatically upon booking</span>
        </div>
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cal-widget-direct-link"
        >
          Open in new tab ↗
        </a>
      </div>
    </div>
  )
}

