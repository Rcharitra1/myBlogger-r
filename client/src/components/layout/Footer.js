import React from 'react'

export default function Footer () {
    return (
        <footer className="bg-success text-white mt-5 p-4 text-center fixed-bottom">
        <p className="p-0 m-0">Copyright &copy; {new Date().getFullYear()} 
        mBlogger </p>
        <p className="pt-1 m-0">For Educational Purposes Only</p>
        </footer>

    )
}
