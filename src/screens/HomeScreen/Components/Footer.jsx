import React from 'react'

const Footer = () => {
  return (
    <footer className="flex h-20 w-full border-t items-center px-4 md:px-6">
        <div className="grid gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2023 Ztics. All rights reserved.</p>
          <p>Made with Love for Zura   </p>
        </div>
        <div className="ml-auto grid gap-4 items-center justify-end text-sm">
          <a href="/terms-and-conditions" className="underline">
            Terms and Conditions
          </a>
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
        </div>
      </footer>
  )
}

export default Footer