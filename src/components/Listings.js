import React, { Component } from "react";

// import "../sass/main.scss";

export default class Listings extends Component {
    constructor() {
        super();
        this.state = {
            name: "Joe",
        };
        
        // We are binding this.loopListings to this class so that when we use this, it's basically hey I know what version of this you are talking about.
        this.loopListings = this.loopListings.bind(this);
    }

    loopListings() {
        // var data = this.props.listingsData;
        // You can also do the above like it is done below by using deconstruction.
        var {listingsData} = this.props;

        // This is in case we put in a crazy number that gives us zero listings.  If this happens, we are basically telling the user that his or her filtering didn't return any results.
        if (listingsData == undefined || listingsData.length == 0) {
            return "Sorry your filter did not match any listing."
        }

        return listingsData.map((listing, index) => {
            // This if-else statement will show either a box view or a long view, depending on the globalState.
            // We could have put these two views into separate files, but this project is so short that this does not make much sense.
            // This is the Box View.
            if (this.props.globalState.view == "box") {
                return (
                    <div className="col-md-3" key={index}>
                        <div className="listing">
                            <div className="listing-img" style={{background: `url("${listing.image}") no-repeat center center`}}>
                                {/* The span.address is the wording on the lower portion of the div.listing-img. */}
                                <span className="address">{listing.address}</span>
                                {/* The div.details is what shows up when you hover over the div.listing. */}
                                <div className="details">
                                    <div className="col-md-3">
                                        <div className="user-img"></div>
                                    </div>
                                    <div className="col-md-9">
                                        {/* The div.user-details is the area to the right of the div.user-img. */}
                                        <div className="user-details">
                                            <span className="user-name">Nina Smith</span>
                                            <span className="post-date">05/05/2020</span>
                                        </div>
                                        <div className="listing-details">
                                            <div className="floor-space">
                                                <i className="far fa-square"></i>
                                                <span>{listing.floorSpace} ft&sup2;</span>
                                            </div>
                                            <div className="bedrooms">
                                                <i className="fas fa-bed"></i>
                                                <span>{listing.rooms} bedrooms</span>
                                            </div>
                                        </div>
                                        <div className="view-btn">
                                            View Listing
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-info">
                                <span className="price">${listing.price} </span>
                                <span className="location">
                                    <i className="fas fa-map-marker-alt"></i> {listing.city}, {listing.state}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
            // This is the Long View.
            else {
                return (
                    <div className="col-md-12 col-lg-6" key={index}>
                        <div className="listing">
                            <div className="listing-img" style={{background: `url("${listing.image}") no-repeat center center`}}>
                                {/* The span.address is the wording on the lower portion of the div.listing-img. */}
                                <span className="address">{listing.address}</span>
                                {/* The div.details is what shows up when you hover over the div.listing. */}
                                <div className="details">
                                    {/* <div className="col-md-3"> */}
                                    <div className="col-md-4">
                                        <div className="user-img large"></div>
                                    </div>
                                    {/* <div className="col-md-9"> */}
                                    <div className="col-md-8">
                                        {/* The div.user-details is the area to the right of the div.user-img. */}
                                        <div className="user-details">
                                            <span className="user-name">Nina Smith</span>
                                            <span className="post-date">05/05/2020</span>
                                        </div>
                                        <div className="listing-details">
                                            <div className="floor-space">
                                                <i className="far fa-square"></i>
                                                <span>{listing.floorSpace} ft&sup2;</span>
                                            </div>
                                            <div className="bedrooms">
                                                <i className="fas fa-bed"></i>
                                                <span>{listing.rooms} bedrooms</span>
                                            </div>
                                        </div>
                                        <div className="view-btn">
                                            View Listing
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-info">
                                <span className="price">${listing.price} </span>
                                <span className="location">
                                    <i className="fas fa-map-marker-alt"></i> {listing.city}, {listing.state}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return(
            <section id="listings">
                <section className="search-area">
                    {/* With onChange, as you type, character by character, the globalState search property is changed.  */}
                    <input type="text" name="search" onChange={this.props.change}/>
                </section>
                
                <section className="sortby-area">
                    {/* Here we want to find the number of results inside of filteredData, which is an array. */}
                    <div className="results">{this.props.globalState.filteredData.length} results found</div>
                    <div className="sort-options">
                        <select name="sortby" className="sortby" onChange={this.props.change}>
                            <option value="price-dsc">Lowest Price</option>
                            <option value="price-asc">Highest Price</option>
                        </select>
                        <div className="view">
                            {/* With the .bind(null, "long") portion, we are passing down the params to be used. */}
                            {/* We cannot simply use onClick={this.props.changeView("long")} because when you put parenthese after a function, it automatically gets triggered.  It will get into an infinite loop and your React app will stop working. */}
                            {/* The best way to do this is to use the bind().  So you use .bind(null, "long").  You bind to the changeView() and you use null because you don't want to bind anything to it since it's already bound to the other class.  So you say null, don't bind it to anything, but pass down the "long" argument.  The only way to do this is to bind it to a null and then pass an argument inside of this null on this bind function. */}
                            {/* Whenever you are going to pass an argument to an onClick function, or any other function, remember to use the .bind(), then null, and from there you pass in all of the arguments that you want to use. */}
                            {/* <i className="fas fa-th-list" onClick={this.props.changeView.bind(null, "long")}></i> */}
                            <i className="fas fa-th-list" onClick={() => this.props.changeView("long")}></i>
                            {/* <i className="fas fa-th" onClick={this.props.changeView.bind(null, "box")}></i> */}
                            <i className="fas fa-th" onClick={() => this.props.changeView("box")}></i>
                        </div>
                    </div>
                </section>
                
                <section className="listings-results">
                    <div className="row">
                        {this.loopListings()}
                    </div>
                </section>
                
                <section id="pagination">
                    <div className="row">
                        <ul className="pages">
                            <li>Prev</li>
                            <li className="active">1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>Next</li>
                        </ul>
                    </div>
                </section>
            </section>
        );
    }
}