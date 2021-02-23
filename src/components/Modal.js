import React, { Component } from "react";

export default class Modal extends Component {
    constructor() {
        super();
        this.state = {
            name: "Joe"
        }
    }

    render() {
        if (this.props.modalSelection == -1) {
            return null;
        }
        return (
            <div className="modal-box">
                <div className="modal-content">
                    <div onClick={this.props.closeModal}>X</div>
                    <div>{JSON.stringify(this.props.modalData.city)}</div>
                    <div>{this.props.modalData.price}</div>
                    <div>{this.props.modalData.rooms}</div>
                </div>
            </div>
        );
    }
}