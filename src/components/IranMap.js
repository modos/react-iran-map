import React from 'react';

import './IranMap.css';

import CityModal from './CityModal';


class IranMap extends React.Component {

    state = {
        citiesData: null,
        selectedCity: null,
        isModalOpen: false,
    };

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:9000/cities')
            const json = await response.json()
            this.setState({citiesData: json})
        } catch (error) {
            
        }
    }


    cityClicked = (id) => async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:9000/cities/${id}`)
            const json = await response.json()
            this.setState({selectedCity: json})
            this.setState({isModalOpen: true})
        } catch (error) {
            
        }
    };

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    render() {
        return (
            <div>
                <div className="map-container">
                    {(this.state.citiesData || []).map((record) => (
                        <div
                            key={record.id}
                            className="city-name"
                            style={{
                                top: `${record.top}%`,
                                left: `${record.left}%`,
                            }}
                            onClick={this.cityClicked(record.id)}
                        >
                            {record.name}
                        </div>
                    ))}
                </div>
                <CityModal
                    city={this.state.selectedCity}
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                />
            </div>
        );
    }
}

export default IranMap;
