import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api'
import NotificationBar from '../contexts/NotificationContext'
export default function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [notification, setNotification] = useState({ message: "", type: "" })

    const showNotification = (msg, type) => {
        setNotification({ message: msg, type })
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const validateForm = () => {
        const errors = {}
        if (credentials.email && !/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Email is invalid'
        }
        if (!credentials.email.trim()) errors.email = 'Email is required'
        if (!credentials.password.trim()) errors.password = 'Password is required'
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            const result = await loginUser(credentials)
            if (result.success) {
                showNotification("Logged successfully!", "success")
                setTimeout(() => navigate('/'), 500) 
            } else {
                setFormErrors({ general: result.message || "Login failed" })
                showNotification(result.message || "Login failed", "error")
            }
        } catch (err) {
            setFormErrors({ general: err.message || "Something went wrong" })
            showNotification(err.message || "Something went wrong", "error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const getClassName = (fieldName) => {
        return `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-300'
            }`
    }

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-xl shadow-2xl p-8">
            <NotificationBar message={notification.message} type={notification.type} />
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className='text-red-500 text-md'>*</span></label>
                    <input
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={getClassName('email')}
                    />
                    {formErrors.email && (
                        <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={getClassName('password')}
                    />
                    {formErrors.password && (
                        <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Login
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">Don't have an account?</p>
                <button
                    onClick={() => navigate('/signup')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Register here
                </button>
            </div>
        </div>
    )
}

