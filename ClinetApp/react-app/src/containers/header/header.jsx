import { Link } from 'react-router-dom';
import React from "react";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/clubs">Clubs</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};