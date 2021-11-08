import { Link } from "react-router-dom";
import "../App.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Nav = () => (
    <div className="nav">
        <ul className="nav__list">
            <li className="nav__item">
                <Link to="/">
                    <FontAwesomeIcon icon="home" size="2x"/>
                    <p className="nav__itemlabel">Home</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/families">
                    <FontAwesomeIcon icon="users" size="2x" />
                    <p className="nav__itemlabel">Családok</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/timetables">
                    <FontAwesomeIcon icon={["far", "calendar-alt"]} size="2x" />
                    <p className="nav__itemlabel">Órarend</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/passes">
                    <FontAwesomeIcon icon="ticket-alt" size="2x" />
                    <p className="nav__itemlabel">Bérletek</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/invoices">
                    <FontAwesomeIcon icon="file-invoice-dollar" size="2x" />
                    <p className="nav__itemlabel">Pénzügy</p>
                </Link>
            </li>
        </ul>
    </div>
);