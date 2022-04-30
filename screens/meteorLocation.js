import React, {
    Component
} from 'react';
import {
    Text,
    View, 
    StyleSheet
} from 'react-native';
import axios from 'axios';

export default class MeteorLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors : {}
        }
    }

    getMeteors=()=> {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=VNleu0k9SGBh7n1QsJRR4cnIkpMk4dd2Nds0QRQN")
            .then(response => {
                this.setState({
                        meteors: response.data.near_earth_objects
                    })
                    .catch(error => {
                        Alert.alert(error.message)
                    })
            })
        
    }

    componentDidMount() {
        this.getMeteors();
    }

    render() {
        if(Object.keys(this.state.meteors).length === 0)
        {
            return(
                <View style={{
                    flex: 1, 
                    justifyContent : 'center',
                    alignItems: 'center'
                }}>
                    <Text>Loading....Please wait</Text>
                    </View>
            )
        }
        else
        {
        
        
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date=> {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element){
                //average diameter
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                //calculate the threat score 
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            })

            return ( 
            <View style = {
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            } >
            <Text > Meteor Location </Text> 
            </View>
        
            )
    }
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})