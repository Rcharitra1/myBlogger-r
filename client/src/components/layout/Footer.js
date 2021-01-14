import React from 'react';
import {Link} from "react-router-dom";

export default function Footer () {
    return (
        <footer className="bg-success text-white mt-5 p-4 text-center fixed-bottom">
        <p className="p-0 m-0">Copyright &copy;
        For Educational Purposes Only  
         </p>
        <p className="pt-1 m-0"><Link className="badge badge-success" to='/'>mBlogger</Link></p>
        </footer>

    )
}
