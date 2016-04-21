import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import FuelSavingsForm from '../components/FuelSavingsForm';

var timer;
export class FuelSavingsPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      hint: 'press Enter to refresh'
    };
  }

  componentWillMount() {
    this.props.actions.load();
  }

  componentDidUpdate() {
    // this.setState({
    //   hint: 'press Enter to refresh'
    // })
  }

  onInputChange(e) {
    // console.log(e.target.value)
    // this.props.actions.updateFilter(e.target.value);

    // clearTimeout(timer);
    // timer = setTimeout(function(gg, name) {
    //   gg.actions.updateFilter(name);
    // }, 500, this.props, e.target.value);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.actions.updateFilter(e.target.value);
    }
    // console.log(e.keyCode, e.target.value);
  }



  render() {

    return (
      <div>
        <span>filter: </span>
        <input
          id='filter'
          onChange={this.onInputChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}></input>
        <span>{this.state.hint}</span>

        <div>
          {this.props.appState.data.map( d => {

            let display = '';
            if (this.props.appState.filter !== '' && d.indexOf(this.props.appState.filter) === -1) {
              display = 'none';
            }

            return (
              <div style={{display: display}}>{d}</div>
            )

          })}
        </div>
      </div>
    );
  }
}

FuelSavingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.fuelSavingsAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
