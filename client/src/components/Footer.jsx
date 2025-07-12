import React from 'react'
import { PenTool } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <PenTool className="h-6 w-6" />
            <span className="text-lg font-semibold">MERN Blog</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © {new Date().getFullYear()} MERN Blog. Built with MongoDB, Express, React & Node.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer