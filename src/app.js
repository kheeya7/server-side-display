import React from 'react'
import JakeTheDog from '../assets/jake.png'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isJakeVisible: false,
      data: [],
    }

    this.showJake = this.showJake.bind(this)
    this.hideJake = this.hideJake.bind(this)
  }

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // Typical action to be performed when the document is ready:
        const responseObj = JSON.parse(xhttp.responseText);

        const data = Object.keys(responseObj).map((key) => {
          return {
            name: key,
            count: responseObj[key],
          };
        });
        this.setState({
          data,
        });
      }
    };

    xhttp.open("GET", "http://localhost:8090/", true);
    xhttp.send();
  }

  showJake() {
    this.setState({
      isJakeVisible: true
    })
  }

  hideJake() {
    this.setState({
      isJakeVisible: false
    })
  }

  render() {
    const showJakeComponent = () => {
      if (this.state.isJakeVisible) {
        return (
          <img src={JakeTheDog} onClick={this.hideJake}></img>
        )
      } else {
        return (
          <button onClick={this.showJake}>Show Jake</button>
        )
      }
    }

    return (
      <div>
        <h1 className="tomato-color">
          {this.props.title}
        </h1>
        {showJakeComponent()}
        {
          this.state.data.map((item) => {
            return (
              <div>
                <strong>{item.name}</strong>
                {item.count}
              </div>
            );
          })
        }
      </div>
    )
  }
}

export default App
