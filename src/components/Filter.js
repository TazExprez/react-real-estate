import React, { Component } from "react";

// import "../sass/main.scss";

export default class Filter extends Component {
    constructor() {
        super();
        this.state = {
            name: "Joe",
        };

        this.cities = this.cities.bind(this);
        this.homeTypes = this.homeTypes.bind(this);
        this.bedrooms = this.bedrooms.bind(this);
    }

    // What we need right now is that as soon as the Filter component is about to run, right before it renders, we want the componentWillMount() to run the function we just passed down, populateAction(), from the parent component.
    componentWillMount() {
        this.props.populateAction();
    }

    // We will now create small components to populate the FILTER sections City, Home Type, and Bedrooms.
    // Now we will go <select> by <select> in the render() and replace the <option>s, with the exception of the "All" <option>s for the city and homeType <select>s.

    cities() {
        // We had to put all of this inside of an if statement to check for undefined because of some things getting executed asynchronously.
        if (this.props.globalState.populateFormsData.cities != undefined) {
            // var { populateFormsData } = this.props.globalState;
            // We had to go one level deeper, to cities, and could not do it with populateFormsData.  populateFormsData is an object, but we needed to use an array, cities, so that we could use array methods, like map.
            var { cities } = this.props.globalState.populateFormsData;

            console.log(cities);
            return cities.map((item) => {
                return (
                    // Joe decided to use the item for the key, instead of the index, because we are not repeating the names of the cities.
                    <option key={item} value={item}>{item}</option>
                );
            });
        }
    }

    homeTypes() {
        if (this.props.globalState.populateFormsData.homeTypes != undefined) {
            var { homeTypes } = this.props.globalState.populateFormsData;

            return homeTypes.map((item) => {
                return (
                    <option key={item} value={item}>{item}</option>
                );
            });
        }
    }

    bedrooms() {
        if (this.props.globalState.populateFormsData.bedrooms != undefined) {
            var { bedrooms } = this.props.globalState.populateFormsData;

            return bedrooms.map((item) => {
                return (
                    <option key={item} value={item}>{item}+ BR</option>
                );
            });
        }

    }

    render() {
        return(
            <section id="filter">
                <div className="inside">
                    <h4>Filter</h4>
                    <label htmlFor="city">City</label>
                    {/* The onChange method is similar to the onchange JavaScript method and detects changes in the select boxes below.  Whenever there is a change in the select box, we want to trigger the this.props.change function.  We use this.props.change in order to get access to the change function inside of realEstate.js. */}
                    {/* If we switch to let's say Miami, now in our state, which Joe is calling our globalState, it basically changes.  So our city is Miami now.  If we switch Ranch to Studio, it changes what type of house it is. */}
                    {/* Whenever this select box changes to anything, any other field besides whatever is the default, then automatically, we save that information into our database, into the state. */}
                    <select name="city" className="filters city" onChange={this.props.change}>
                        <option value="All">All</option>
                        {/* <option value="Ridgewood">Ridgewood</option>
                        <option value="Miami">Miami</option> */}
                        {/* We have to remember to bind the cities() because this is a method of a class. */}
                        {this.cities()}
                    </select>
                    <label htmlFor="city">Home Type</label>
                    {/* <select name="houseType" className="filters houseType" onChange={this.props.change}> */}
                    <select name="homeType" className="filters homeType" onChange={this.props.change}>
                        <option value="All">All Homes</option>
                        {/* <option value="Ranch">Ranch</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                        <option value="Room">Room</option> */}
                        {this.homeTypes()}
                    </select>
                    <label htmlFor="city">Bedrooms</label>
                    <select name="bedrooms" className="filters bedrooms" onChange={this.props.change}>
                        {/* <option value="0">0+ BR</option>
                        <option value="1">1+ BR</option>
                        <option value="2">2+ BR</option>
                        <option value="3">3+ BR</option>
                        <option value="4">4+ BR</option> */}
                        {this.bedrooms()}
                    </select>

                    <div className="filters price">
                        <span className="title">Price</span>
                        {/* We have to use _, instead of -, for the names because this is JSX and it would be considered subtraction in JavaScript. */}
                        {/* Once there is a change, the state will change.  The value is connected to the state, so the changed state will be the new value. */}
                        <input type="text" name="min_price" className="min-price" onChange={this.props.change} value={this.props.globalState.min_price} />
                        <input type="text" name="max_price" className="max-price" onChange={this.props.change} value={this.props.globalState.max_price} />
                    </div>
                    <div className="filters floor-space">
                        <span className="title">Floor Space</span>
                        <input type="text" name="min_floor_space" className="min-floor-space" onChange={this.props.change} value={this.props.globalState.min_floor_space} />
                        <input type="text" name="max_floor_space" className="max-floor-space" onChange={this.props.change} value={this.props.globalState.max_floor_space} />
                    </div>
                    <div className="filters extras">
                        <span className="title">
                            Extras
                        </span>
                        <label htmlFor="extras">
                            <span>Elevator</span>
                            <input name="elevator" value="elevator" type="checkbox" onChange={this.props.change} />
                        </label>
                        <label htmlFor="extras">
                            <span>Swimming Pool</span>
                            <input name="swimming_pool" value="swimming_pool" type="checkbox" onChange={this.props.change} />
                        </label>
                        <label htmlFor="extras">
                            <span>Finished Basement</span>
                            <input name="finished_basement" value="finished_basement" type="checkbox" onChange={this.props.change} />
                        </label>
                        <label htmlFor="extras">
                            <span>Gym</span>
                            <input name="gym" value="gym" type="checkbox" onChange={this.props.change} />
                        </label>
                    </div>
                </div>
            </section>
        );
    }
}

// Lifecycle Methods.
// Before a component loads, basically it has a whole bunch of different lifecycle methods.  constructor() is the first one that gets triggered.  Basically as soon as the component gets started.  The next one is componentWillMount().  This one gets triggered right before the rendering, right before you get to see anything on the page.  The next one is render().  Now you get to see the component on the page.  The next one is componentDidMount().  With this, you can run something after everything has loaded on the page.
// There are other lifecycle methods.  One of these is componentWillReceiveProps() that deals with when a component will receive props or any data.  Another one is shouldComponentUpdate() that deals with when the data changes and the component updates, this method is going to run.  Another one is componentWillUpdate() that deals with right before a component updates.  The component basically just updates.  Two others are render() and componentDidUpdate().
// Another lifecycle method is componentWillUnmount.  This deals with right before you remove a component.  That's when this method will basically run.
// Every situation is different, so you can choose the lifecycle method that best fits your needs.