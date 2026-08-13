import React, { useState } from 'react'

export default function Contact() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fullName || !email || !message) return

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setFullName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <div className="w-full bg-[#f7f9ff] py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 space-y-12">
        
        {/* Header */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-[#171c21] tracking-tight leading-tight">
            Get in Touch
          </h1>
          <p className="text-base text-[#3f4851] font-medium leading-relaxed">
            Have questions, feedback, or need mentorship support? Reach out to the DevConnect team and engineering community.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards (1 column on large screens) */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <h3 className="text-base font-bold text-[#171c21]">Email Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                For general platform inquiries, technical feedback, or collaboration opportunities:
              </p>
              <a href="mailto:support@devconnect.io" className="block text-xs font-bold text-primary-container hover:underline">
                support@devconnect.io
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
              <h3 className="text-base font-bold text-[#171c21]">Developer Community</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Join our live Discord & Telegram server for instant code reviews and pair programming:
              </p>
              <a href="https://github.com/engisak/dev_connect" target="_blank" rel="noreferrer" className="block text-xs font-bold text-primary-container hover:underline">
                discord.gg/devconnect-community
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <h3 className="text-base font-bold text-[#171c21]">Mentorship Hub</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Software Engineering Mentorship Headquarters & Code Review Lab.
              </p>
            </div>
          </div>

          {/* Contact Form (2 columns on large screens) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#171c21] tracking-tight">Send Us a Message</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">We usually respond within 24 hours.</p>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">Your Full Name <span className="text-primary-container">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl p-3 text-[#171c21] font-semibold placeholder-gray-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">Email Address <span className="text-primary-container">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="developer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl p-3 text-[#171c21] font-semibold placeholder-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Platform Feedback / Mentorship Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl p-3 text-[#171c21] font-semibold placeholder-gray-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">Message <span className="text-primary-container">*</span></label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message or technical question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl p-3 text-[#171c21] placeholder-gray-400 outline-none transition-all resize-none font-medium"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary-container hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}
