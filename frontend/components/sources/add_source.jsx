import React from 'react';
import { Redirect } from 'react-router-dom';

class AddSource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {source: ""};
    this.handleClick = this.handleClick.bind(this);
    this.field
    this.debounce = 0;
    this.timer = Date.now();
    this.selectSource = this.selectSource.bind(this);
    this.selection = <ul></ul>;
    this.searching = true;
    this.changeState = this.changeState.bind(this);
    this.closeElement =this.closeElement.bind(this);
    this.showDetails = true;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field, time, source) {
    if (Boolean(source)) {
      return () => this.setState({
          [field]: source,
        });
    }
    // if (time - this.timer > 750) {
    if (time - this.timer > 100) {
      // debugger
      this.props.searchForSources(this.state.source)
      // console.log('too slow')
    }
    // debugger
    this.timer = Date.now();
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  hover(e) {
    console.log(e.target)
    let source = e.target;
    source.classList.toggle('hover')
  }
  
  selectPheed(e) {
    let source = e.target;
    var menu = document.querySelector('.pheed-menu')
    menu.classList.toggle('open')
  }
  urlScrubber(url) {
    var cleanUrl = url.slice(8, 11) === 'www' ? url.slice(8) : 'www.' + url.slice(8)
    let end = cleanUrl.length - 1
    if (cleanUrl[end] === '/') {
      cleanUrl = cleanUrl.slice(0, end)
    }
    return cleanUrl.toLowerCase()
  }

  closeElement(e) {
    const bubbles = e.path;
    if (!bubbles.some(ele => ele.className === 'source-list')) {   
      this.searching = false;
    }
    this.render();
  }

  handleSubmit(e) {
    e.preventDefault()
    const source = e.target.parentNode.children[0].children[0].textContent;
    var pheeds = Object.values(this.props.pheeds);
    const sourceDetails = document.querySelector('.source-details')
    var menu = document.createElement('ul')
    menu.className = 'pheed-menu';
    // pheeds = pheeds.map((pheed) => <li key={pheed.name}>{pheed.name}</li>)
    pheeds = pheeds.map((pheed) => pheed.name )
    pheeds.forEach(pheed => {
      // menu.appendChild(pheed)
      
    let li = document.createElement('li')
      li.innerText = pheed
      li.addEventListener('click', () => this.log())
      menu.appendChild(li)
    })
    // debugger
    
    // (
      //   <ul className="pheed-menu">
      //     {pheeds.map((pheed) => (
        //       <li key={pheed.name}>{pheed.name}</li>
        //     ))}
        //   </ul>
        // )
        
        
    sourceDetails.appendChild(menu)

  }
  
  selectSource(e) {
    // var sourceName = JSON.parse(e.target.dataset.source).name; ///////keeping this here just to remind myself this is possible
    this.showDetails = true;
    var suggestions = document.querySelector(".suggestions");
    suggestions.style.display = "none";

    var sourceName = e.target.dataset.sourcename;

    this.props.entitiesSearch(sourceName)
      .done(res => {
        const source = res.entities.value[0];
        // debugger

        this.selection = (
          <div className="source-details">
            <img src={source.image.thumbnailUrl} alt="" />
            <ul className='source-details-details'>
              <div className='source-details-navbar'>
                <div className='source-details-header'>
                  <li>{source.name}</li>
                  <li>{source.url ? this.urlScrubber(source.url) : '' }</li>
                </div>
                <div type='submit' className='source-details-add-source-button' 
                onClick={this.handleSubmit} 
                onMouseOver={this.hover}
                onMouseLeave={this.hover}
                >FOLLOW</div>
              </div>
              <li className='source-details-description'>{source.description}</li>
            </ul>
          </div>
        );
        this.searching = false; //THIS DOES NOTHING!!! 'this' is a promise and not the add source react component. 
        //does not throw an error which has lead me to believe I was switching searching state when i actually haven't
        this.render() //BUT WHY THEN DOES THIS WORK / IS REQUIRED ?!?! *scratches head vigorously*
      })    
  }

  changeState() {
    if (!this.seaching) this.searching = true;
    var details = document.querySelector('.source-details')
    if (Boolean(details)) this.showDetails = false;
    var suggestions = document.querySelector(".suggestions");
    suggestions.style.display = "block";
    this.render();
  }

  autofill(e) {
    // debugger
    // this.state.source = e.currentTarget.value;
    let value
    if (Boolean(e.currentTarget)) {
      value = e.currentTarget.value
      return e => this.setState({
        ["source"]: value
      });
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.props.addUserFeed(this.props.user, this.state.source) //now that this works
    //make sure to update sources in state and localstorage, refresh all articles this time 
    //including ones from new source, add these articles to state and localStorage
    //and then redirect back to '/home'
    console.log(':)')
  }

  log() {
    console.log('go to sleep now')
    debugger
  }

  render() {
    const body = document.querySelector('body')
    body.addEventListener('click', this.closeElement)
    // debugger
    console.log(this.props.pheeds)
    var newSources = [];
    var pheeds = Object.values(this.props.pheeds)
    var details = document.querySelector('.source-details')
    var menu = document
    if (Boolean(details) && !this.showDetails) { 
      // debugger
      // details.remove();
    }

    if (Boolean(this.props.sources.search)) {
      var matchedSources = Object.values(this.props.sources.search);
      var userSources = Object.values(this.props.sources.userSources).map(source => source.name)
      if (this.searching) newSources = matchedSources.filter(source => !userSources.includes(source.name))
    }

    return (
      <div className="add-source">
        <form className="source-form">
          <input
            type="text"
            onClick={this.changeState}
            onChange={this.update("source", Date.now())}
            value={this.state.source}
          />
          <input type="submit" onClick={this.handleClick} />
        </form>

        <div className="suggestions" 
          // onClick={this.log}
        >
          {/* <ul className="pheed-menu">
            {pheeds.map((pheed) => (
              <li key={pheed.name}>{pheed.name}</li>
            ))}
          </ul> */}
          <ul className='source-list'>
            <>{this.searching ? <li>sources</li> : ""}</>
            {newSources.map((source) => {
              return (
                // <li className={'new-source} onClick={this.update("source", 0, source.name)} onMouseLeave={this.hover} key={source.name}>
                <li
                  className={"new-source"}
                  // onClick={this.selectPheed}
                  onClick={this.selectSource}
                  onMouseOver={this.hover}
                  onMouseLeave={this.hover}
                  key={source.name}
                  // data-source={JSON.stringify(source)}
                  data-sourcename={source.name}
                >
                  {source.name}
                </li>
              );
            })}
          </ul>
        </div>
        <>{(this.searching && this.showDetails) ? "" : this.selection}</> 

      </div>
    );
  }
}

export default AddSource;