import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import Dropzone from '../../components/Dropzone';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEProvinceResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {

    const history = useHistory();

    const [items, setItems] = useState<Item[]>([]);
    const [provinces, setProvinces] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>();
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();


    useEffect(() => {
        try {
            navigator.geolocation.getCurrentPosition(position => {
                setInitialPosition([position.coords.latitude, position.coords.longitude]);
            })
        } catch (err) {

        }
    }, []);

    useEffect(() => {
        try {
            api
                .get('items')
                .then(res => {
                    setItems(res.data);
                });
        } catch (err) {

        }
    }, []);

    useEffect(() => {
        try {
            axios
                .get<IBGEProvinceResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
                .then(res => {
                    setProvinces(res.data.map(province => province.sigla));
                })
        } catch (error) {

        }
    }, []);

    useEffect(() => {
        try {
            if (!selectedProvince) {
                return;
            }

            axios
                .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedProvince}/municipios?orderBy=nome`)
                .then(res => {
                    setCities(res.data.map(city => city.nome));
                })
        } catch (error) {

        }
    }, [selectedProvince]);

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleSelectProvince(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedProvince(event.target.value);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            setSelectedItems([...selectedItems.filter(item => item !== id)]);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const province = selectedProvince;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition ?? initialPosition;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('province', province);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        api
            .post('points', data)
            .then(() => {
                history.push('/');
            })
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to='/'>
                    <FiArrowLeft />
                    Back home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Collection point registration</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Info</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Entity name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the address on the map</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition ?? initialPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="province">Province</label>
                            <select
                                name="province"
                                id="province"
                                value={selectedProvince}
                                onChange={handleSelectProvince}
                            >
                                <option value="0">Select a province</option>
                                {provinces.map(province => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Select a city</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
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