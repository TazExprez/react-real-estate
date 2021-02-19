import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header.js";
import Filter from "./Filter.js";
import Listings from "./Listings.js";
import listingsData from "./data/listingsData.js";

import "../sass/main.scss";

// This is the parent component.
class App extends Component {
    constructor() {
        super();
        
        // Every child component will get the data from here.  All the data that we want to change, we want to change it from here.  All the data the components will be dependent on, we want it hosted here, in the parent.
        this.state = {
            name: "Joe",
            // Instead of writing listingsData: listingsData, we can just write listingsData, since we are using ES6.
            listingsData,
            // The default value for the city is All.
            city: "All",
            // The default value for the homeType is All.
            homeType: "All",
            // The default value for the bedrooms is 0.
            bedrooms: "0",
            min_price: 0,
            max_price: 10000000,
            min_floor_space: 0,
            max_floor_space: 50000,
            elevator: false,
            finished_basement: false,
            gym: false,
            swimming_pool: false,
            filteredData: listingsData,
            // The default value for the populateFormsData is an "" and this will be changed by the populateForms().
            populateFormsData: "",
            sortby: "price-dsc",
            // The default view is box, the other view is long.
            view: "box",
            // We are temporarily changing the view to long.
            // view: "long"
            // This is the part of the state that deals with searches.
            search: "",
            // This is the part of the state that deals with modals.  I set it to -1 by default because no modals will be viewed.  When a modal is to be viewed, this is set to the index of the listing.
        };
    
        this.change = this.change.bind(this);
        this.filteredData = this.filteredData.bind(this);
        this.populateForms = this.populateForms.bind(this);
        // We're binding changeView to this class so that when we pass it down to a child component, we're still keeping the same reference of this.
        this.changeView = this.changeView.bind(this);
    }

    // This is going to run a method before the whole component even shows up on the page.  Before this component shows up, we want the listings to be arranged from lowest priced to highest priced.  Before the component even mounts, it will run this.
    componentWillMount() {
        // var listingsData = this.listingsData.sort((a, b) => {
        // We don't have to use this.listingsData because the variable listingsData is being imported above.
        // Joe decided to use this.state.listingsData because he was having issues with just listingsData.  I think the issue would have been solved with an if statement checking for undefined.
        // if (listingsData != undefined){
        // var listingsData = listingsData.sort((a, b) => {
        // This is going to sort our listings from lowest price to highest price.
        var listingsData = this.state.listingsData.sort((a, b) => {
            return a.price - b.price;
        });
    
        this.setState({
            listingsData
        });
        // }
    }

    // This change method gets triggered any time you do a change in any of the input fields.
    change(event) {
        // Here we say give me the name of whatever it was that we changed.
        var name = event.target.name;
        // Here we say give me the value of whatever it was that we changed.
        // var value = event.target.value;
        // Here you are checking if this target is a checkbox, or not.  If it's a checkbox, then you get the event.target.checked, if not, you get the event.target.value.
        var value = (event.target.type === "checkbox") ? event.target.checked : event.target.value;
        
        // Here we are changing the state.  We are setting it to whatever the name of the input field is.  And then, the property inside of it will be the value of it.
        // We want to set up that the filteredData() gets triggered whenever we change the state.  Whenever we are changing the state on any of the FILTER options, after it changes the state, we want it to basically trigger the filteredData().  This is going to change the state again, but it's going to change it for the filteredData property of this.state.
        this.setState({
            // When we do a change, this is going to set the state.  Basically it is going to set the state, it's going to add the new field, this new property to our state.  So if we're changing the city, it's going to come here and say city, and then it's going to say the value is Miami.
            [name]: value,
        }, () => {
            // This is a callback function which means it will be triggered after the state is set.

            // We console.log this so that we can see the state as it changes.
            console.log(this.state);

            this.filteredData();
        });

        // console.log(event.target.name);
        // console.log(event.target.value);   
    }

    changeView(viewName) {
        this.setState({
            // Here we are going to change the view in the globalState by assigning it the viewName that we choose.
            view: viewName
        })
    }

    filteredData() {
        // We want to pass in an item.  An item means one of the listings.  We have an array of listings and it basically loops through every single one, so each one is basically an item.
        // What newData is doing is it's going through every listing inside of listingsData and it's saying hey does this listing match whatever we put in the return statement.  If it doesn't, the listing doesn't get added to the new array.  If it does, then it gets added to the new array.    
        var newData = this.state.listingsData.filter((item) => {
            // We want to return a condition.
            //For each item, we want to return it back, if it matches the statement that we are going to put down here.
            // What's happening here is that we are only going to return the listings that have a certain minimum price.  We are going to change the minimum price with the change(), I think, which will change the min_price property in this.state.  As changes occur, we are basically going to trigger the filteredData() to match whatever expressions we put here.
            // return item.price >= this.state.min_price;
            // Now we are going to return the listings that match a certain range of conditions.
            return item.price >= this.state.min_price 
                && item.price <= this.state.max_price 
                && item.floorSpace >= this.state.min_floor_space 
                && item.floorSpace <= this.state.max_floor_space 
                && item.rooms >= this.state.bedrooms;
        });

        // If this.state.city != "All" you are going to take newData and filter it again.
        if (this.state.city != "All") {
            newData = newData.filter((item) => {
                // Here we will return the selected city.
                return item.city == this.state.city;
            });
        }

        // If this.state.homeType != "All" you are going to take newData and filter it again.
        if (this.state.homeType != "All") {
            newData = newData.filter((item) => {
                // Here we will return the selected home type.
                return item.homeType == this.state.homeType;
            });
        }

        // This is going to sort the listings from lowest price to highest price.
        if (this.state.sortby == "price-dsc") {
            newData = newData.sort((a, b) => {
                return a.price - b.price;
            });
        }
        
        // This is going to sort the listings from highest price to lowest price.
        if (this.state.sortby == "price-asc") {
            newData = newData.sort((a, b) => {
                return b.price - a.price;
            });
        }

        // We want to create a filter for the search bar data.
        if (this.state.search != "") {
            newData = newData.filter((item) => {
                // We are looping through all of the cities and making them lower case automatically.
                // We have this string, which is our city, of whatever item we're looking at.  All of the listings are items.  We're getting the city from it.  We're making the city lower case.
                var city = item.city.toLowerCase();
                // This is the text that we are putting in the search bar.  This goes to the state.  We are getting it again, whatever we search, and putting it into a variable here.
                // Then here we have the searchText.  This is what we put in the search bar.
                var searchText = this.state.search.toLowerCase();
                // Here we are searching inside the string city, to see if anything matches, as far as any text that we put in.  If we put m and it matches to something, then it's basically not null.  If it doesn't match anything it just returns null.
                // Joe didn't mention this, but here we are dealing with regular expressions.  If you put in a string into the params section of the match() string function, it will be turned into a regular expression.
                // After we put something in the search bar, we create another variable called n.  The match() is a method that goes on the string and searches to see if the search bar text matches anything that is inside of the city string.  If nothing matches, the match() is going to return null.  The moment that the match() matches something, it's going to return an array with all of the matches.
                var n = city.match(searchText);

                // Because it returns an array, here we are basically saying, hey if it's not null, then it must be true.  This means hey this actually matched to something.  So now we filter in the data like that.
                if (n != null) {
                    return true;
                }
            });
        }

        // The following four if statements deal with the filtering of the extras.
        if (this.state.elevator == true) {
            newData = newData.filter((item) => {
                return item.extras.indexOf("elevator") != -1;
            });
        }

        if (this.state.finished_basement == true) {
            newData = newData.filter((item) => {
                return item.extras.indexOf("finished_basement") != -1;
            });
        }

        if (this.state.gym == true) {
            newData = newData.filter((item) => {
                return item.extras.indexOf("gym") != -1;
            });
        }

        if (this.state.swimming_pool == true) {
            newData = newData.filter((item) => {
                return item.extras.indexOf("pool") != -1;
            });
        }

        // Here we are changing the filteredData property of this.state by changing it to the newData.
        this.setState({
            filteredData: newData
        });
    }

    // To make this app more dynamic, we are going to fill in the city, homeType, and bedrooms data in the FILTER section with the appropriate data that's available from the listingsData.js file.  Extra things that are not available in the listingsData.js file will not be used.
    // With populateForms() we are going to take the data in listingsData and basically change it.
    populateForms() {
        // city
        // We are going to go up and basically get all of the listings.
        // We are going to have an array of cities in the cities var.
        var cities = this.state.listingsData.map((item) => {
            return item.city;
        });
        // The next thing we want to do is to create a set.
        // Here we are creating a new set and passing in the cities array to it.
        // What this is going to do is that it's going to remove the repeats in the array, it will only keep the unique values.
        cities = new Set(cities);
        // We want to make cities into an array, because it is currently an object since that is what the Set() creates.  We do this by putting cities inside of an array with a spread operator.
        cities = [...cities];
        // The sort() is going to sort the cities from A to Z.
        cities = cities.sort();

        // homeType
        var homeTypes = this.state.listingsData.map((item) => {
            return item.homeType;
        });
        homeTypes = new Set(homeTypes);
        homeTypes = [...homeTypes];
        homeTypes = homeTypes.sort();

        // bedrooms
        var bedrooms = this.state.listingsData.map((item) => {
            return item.rooms;
        });
        bedrooms = new Set(bedrooms);
        bedrooms = [...bedrooms];
        bedrooms = bedrooms.sort();

        // Now we have to pass all of this information to the state.
        this.setState({
            populateFormsData: {
                homeTypes,
                bedrooms,
                cities
            }
        }, () => {
            // Right after the object we are doing this console.log for testing purposes, to see what is happening.
            console.log(this.state);
        });
    }

    render() {
        // console.log(this.state.listingsData);
        // console.log(this.state);
        return(
            <div>
                <Header />
                <section id="content-area">
                    {/* Here we are passing the change method to the Filter component method.  We are naming the property change, exactly how the method is named in its definition on top.  We do this so that we don't lose this and we know exactly which one we are talking about when we go to the next component. We basically pass down the change function to the Filter component. */}
                    {/* We are passing the entire state from the main App component. */}
                    {/* We are passing the populateForms() as the populateAction property. */}
                    <Filter change={this.change} globalState={this.state} populateAction={this.populateForms} />
                    {/* <Listings listingsData={this.state.listingsData} /> */}
                    {/* Instead of using the listingsData, we are now going to use the filteredData. */}
                    <Listings listingsData={this.state.filteredData} change={this.change} globalState={this.state} changeView={this.changeView} />
                </section>
            </div>
        );
    }
}

const app = document.getElementById("app");

ReactDOM.render(<App />, app);

module.hot.accept();