import React from 'react'

function VerificationRequests() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 justify-center items-center py-16 px-4'>
      <div className='w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-slate-200/50 p-12 text-center'>
        <h1 className="text-4xl font-black text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Verification Requests
        </h1>
        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          This feature is reserved for future use and will be activated after deployment. 
          Here you'll be able to manage and review verification requests from delivery boys.
        </p>
      </div>
    </div>
  )
}

export default VerificationRequests