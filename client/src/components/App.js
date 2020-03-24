import SearchApp from "./SearchApp";

import React from "react";
import axios from "axios";


class App extends React.Component {
    state = {building: "", entrances: []};

    onSearchSubmit = async term => {
        let search = parseInt(term, 10);
        const res = await axios.get("http://localhost:4000/api/buildings", {
            params: { query: term }
        });
        let changed = false;
        console.log(res.data.data[0]["entrances"]);
        res.data.data.forEach((data) => {
            if (data["id"] === search) {
                changed = true;
                this.setState({building: data["name"]});
                this.setState({entrances: data["entrances"]});
                for(let i = 0; i < this.state.entrances.length; i++) {
                    console.log(this.state.entrances[i]);
                }
            }
        });
        if(!changed) {
            this.setState({building: "not found"});
        }
    };

    render = () => {
        return(
            <div className="app">
                <h1>Access UBC</h1>
                <div>Search Icon</div>
                <SearchApp onSubmit={this.onSearchSubmit}/>
                {this.state.building}
            </div>
        );
    };
}

export default App;