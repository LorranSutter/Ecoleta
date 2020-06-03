import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to='/'>
                    <FiArrowLeft />
                    Back home
                </Link>
            </header>

            <form>
                <h1>Collection point registration</h1>

                <fieldset>
                    <legend>
                        <h2>Info</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Entity name</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the addres on the map</span>
                    </legend>

                    <Map center={[43.6753995, -79.4408024]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[43.6753995, -79.4408024]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="province">Province</label>
                            <select name="province" id="province">
                                <option value="0">Select a province</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select name="city" id="city">
                                <option value="0">Select a city</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Collection items</h2>
                        <span>Select one or more items below</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/oil.svg" alt="Oil" />
                            <span>Oil</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Register collection point
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;