import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="login_footer">
            <div className="login_footer_wrap">
                <Link to="/">English(UK)</Link>
                <Link to="/">Francais(FR)</Link>
                <Link to="/">العربية</Link>
                <Link to="/">Español</Link>
                <Link to="/">Italiano</Link>
                <Link to="/">Deutsch</Link>
                <Link to="/">Português(Brasil)</Link>
                <Link to="/">हिन्दी</Link>
                <Link to="/">日本語</Link>
                <Link to="/">Hausa</Link>
                <Link to="/" className="footer_square">
                    <i className="plus_icon"></i>
                </Link>
            </div>
            <div className="footer_splitter"></div>
            <div className="login_footer_wrap">
                <Link to="/">Sign Up</Link>
                <Link to="/">Log In</Link>
                <Link to="/">Messenger</Link>
                <Link to="/">Facebook Lite</Link>
                <Link to="/">Watch</Link>
                <Link to="/">Places</Link>
                <Link to="/">Marketplace</Link>
                <Link to="/">Facebook Pay</Link>
                <Link to="/">Oculus</Link>
                <Link to="/">Portal</Link>
                <Link to="/">Instagram</Link>
                <Link to="/">Bulletin</Link>
                <Link to="/">Local</Link>
                <Link to="/">Fundraisers</Link>
                <Link to="/">Services</Link>
                <Link to="/">Voting information center</Link>
                <Link to="/">Groups</Link>
                <Link to="/">About</Link>
                <Link to="/">Create Ad</Link>
                <Link to="/">Create page</Link>
                <Link to="/">Developers</Link>
                <Link to="/">Careers</Link>
                <Link to="/">Privacy</Link>
                <Link to="/">Cookies</Link>
                <Link to="/">
                    AdChoices
                    <i className="adChoices_icon"></i>
                </Link>
                <Link to="/">Terms</Link>
                <Link to="/">Help</Link>
                </div>
                <div className="login_footer_wrap">
                <Link to="/">Meta @ 2022</Link>
            </div>
        </footer>
    );
}
