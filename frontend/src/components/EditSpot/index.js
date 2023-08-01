import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {editSpot } from "../../store/spots";
import "./editSpot.css";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";


export default function EditSpot() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const spotId = useParams().spotId


  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEditedSpot ={
    spot: {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    },
    id: {spotId}
};

    const editedSpot = await dispatch(editSpot(newEditedSpot));

    reset();
    history.push(`/spots/${editedSpot.id}`);
  };

  const reset = () => {
    setAddress('')
    setCity('')
    setState('')
    setCountry('')
    setLat('')
    setLng('')
    setName('')
    setDescription('')
    setPrice('')
  }

  return (
    <div className="inputBox">
      <h1>Edit Spot</h1>
      <form className='edit-spot-form' onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Address"
          name="address"
        />
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City"
          name="city"
        />
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          name="state"
          placeholder="State"
        ></input>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          name="country"
          placeholder="country"
        ></input>
        <input
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          name="lat"
          placeholder="lat"
        ></input>
        <input
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          name="lng"
          placeholder="lng"
        ></input>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="name"
        ></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="description"
        ></input>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          placeholder="price"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
