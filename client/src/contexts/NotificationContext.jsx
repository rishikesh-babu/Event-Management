import React, { useEffect, useState } from "react"

export default function NotificationBar({ message, type = "info", duration = 5000 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return

    setVisible(true) // show the bar

    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [message, duration])

  if (!visible) return null

  const getBgColor = () => {
    switch (type) {
      case "success": return "bg-green-600"
      case "error": return "bg-red-600"
      case "info": return "bg-blue-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg z-50 ${getBgColor()}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={() => setVisible(false)} className="ml-4 font-bold">
          ×
        </button>
      </div>
    </div>
  )
}
