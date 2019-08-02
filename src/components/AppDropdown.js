import React, { Component } from 'react'
import './AppDropdown.css'
export default class AppDropdown extends Component {
    render() {
        return (
            <div className="selectdiv">
                <label>
                    <select>
                        {this.props.cityList.map((city,index) => {
                            return <option key={index} onClick={()=>this.props.onClick(city)}>{city.name}</option>
                        })}
                    </select>
                </label>
            </div>
        )
    }
}
