import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import Button from '@material-ui/core/Button';

import GoogleMapReact from 'google-map-react';

import RoomIcon from '@material-ui/icons/Room';


const AnyReactComponent = ({ text }) => <div><RoomIcon>{text}</RoomIcon></div>;


export class MapContainer extends Component {
	
	static defaultProps = {
    center: {
      lat: 50.4473109,
      lng: 30.4553406
    },
    zoom: 11
  };
	
	constructor(props) {
		super(props)
	
		this.state = {
			showingInfoWindow: false,  // Hides or shows the InfoWindow
			activeMarker: {},          // Shows the active marker upon click
			selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
			
			latitude:'',
			longitude:'',
			locationStatus:'',
			zoom:11
		}
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onClose = this.onClose.bind(this);


		this.onErrorHandler = this.onErrorHandler.bind(this);

		this.onSuccessHandler = this.onSuccessHandler.bind(this);

		this.getCurrentLocation = this.getCurrentLocation.bind(this);
	}

	onMarkerClick = (props, marker, e) =>
	this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	});

	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	getCurrentLocation(){

		if(!navigator.geolocation) {

			this.setState({
				locationStatus:'Geolocation is not supported by your browser'
			});

		} else {
			navigator.geolocation.getCurrentPosition(this.onSuccessHandler, this.onErrorHandler);
		}
	}

	onErrorHandler() {
		this.setState({
			locationStatus:'Unable to retrieve your location'
		});

  }

  onSuccessHandler(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
		this.setState({
			locationStatus:`Your location ${latitude} ,${longitude}`
		});


		this.setState({
			latitude: latitude,
			longitude: longitude
		});
	
  }
	

  render() {
		const {latitude,longitude} = this.state;

		const center = {
			lat:latitude,
			lang:longitude
		}

    return (

			<div className="row">				
				<div style={{ height: '600px', width: '800px' }}>

					<GoogleMapReact
						bootstrapURLKeys={{ key: 'AIzaSyD-8wTjwTNWWJAWa7-GeCIx0XtonLV5r9M'}}
						defaultCenter={this.props.center}
						defaultZoom={this.state.zoom}
					>

					<AnyReactComponent
						lat={this.props.center.lat}
						lng={this.props.center.lng}
						text="My Marker"
					/>
						
					</GoogleMapReact>
      	</div>


				<div className="col-sm-4 mb-3">
					<Button className="bg-info" 
						onClick={this.getCurrentLocation} 
						variant="contained" >
						get current location
					</Button>

					<h3>{this.state.locationStatus}</h3>
				</div>

			</div>

    );
  }
}
