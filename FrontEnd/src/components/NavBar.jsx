/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function NavBar({ navItems, ...props}) {
    const navBarClass = 'navbar'
    return (
        <nav className={navBarClass}>
            <ul>
                {navItems.map((item, index) => (
                    <li className='navItem' key={index}>
                        <Link className='link' to={item.to}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
