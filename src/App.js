import React, {Component} from 'react';
import './style.css';


class AnalogClok extends React.Component {

    getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const hands = [
            {
                hand: 'seconds',
                angle: (seconds * 6)
            },
            {
                hand: 'minutes',
                angle: (minutes * 6)
            },
            {
                hand: 'hour',
                angle: ( (hour * 30) + (minutes / 2) )
            }
        ];
        return hands;
    }

    render() {
        const Res = this.getTime();
        console.log(Res[2].angle);
        return (

            <div className="clock simple">
                <div className="hours-container">
                    <div className="hours" style={{transform: `rotate(${Res[2].angle}deg) ` }}>

                    </div>
                </div>
                <div className="minutes-container">
                    <div className="minutes" style={{transform: `rotate(${Res[1].angle}deg)` }}>

                    </div>
                </div>
                <div className="seconds-container">
                    <div className="seconds" style={{transform: `rotate(${Res[0].angle}deg)` }}>

                    </div>
                </div>

            </div>
        )
    }


}
class Input extends React.Component  {

    render() {

        const number  = [24, 12];

        return (
            <div>
                <form>
                    <p>Format: </p>
                    <label>
                        {number[0]}
                        <input
                            type="radio"
                            name="switch"
                            id="24"

                            onChange = { () =>
                            this.props.func[1]() }
                        />
                    </label>
                    <label>
                        {number[1]}
                        <input
                            type="radio"
                            name="switch"
                            id="12"
                            onChange =  { () =>
                                this.props.func[0]() }
                        />
                    </label>

                </form>
            </div>
        );

    }
}

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            format: false,
            analog: false
        };
        this.handleSwitchFormat24 = this.handleSwitchFormat24.bind(this);
        this.handleSwitchFormat12 = this.handleSwitchFormat12.bind(this);


    }


    handleSwitchFormat24() {
        this.setState({
            format: false
        });
    }

    handleSwitchFormat12() {
        this.setState({
            format: true
        });
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick(props) {
        this.setState ({
            date: new Date()
        });
    }


    render() {

        return (
            <div>

                <h2>{this.state.date.toLocaleTimeString('en-Us', { hour12: this.state.format })}</h2>
                <Input func={[this.handleSwitchFormat12, this.handleSwitchFormat24]}/>

                <div>
                    <AnalogClok func1={this.state.date}/>
                </div>
            </div>
        );
    }
}



export default Clock;
