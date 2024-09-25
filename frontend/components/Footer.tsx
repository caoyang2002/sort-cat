import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center space-x-4 text-gray-700">
        <p>
          Powered by{' '}
          <a
            href="https://github.com/caoyang2002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-white"
          >
            Simons
          </a>
        </p>
        <a
          href="mailto:reggiesimons2cy@gmial.com"
          className="text-gray-700 hover:text-white"
        >
          Content
        </a>
      </div>
    </footer>
  )
}

export default Footer
