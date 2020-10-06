import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeExamples, editHomeExample } from 'src/modules/home/index';
import axiosClient from 'src/common/axiosClient';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    axiosClient
      .get(
        '/?appid=c8ab1f9f4d840f76d232508bbdc3f487&id=1581130&units=metric&mode=json',
      )
      .then((response) => {
        console.log(response);
        this.setState(
          {
            data: response.data,
          },
          () => this.props.editHomeExample(this.state.data.name)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>Home Component</p>
        <div>{this.props.text}</div>
        <button
          onClick={() => {
            this.props.editHomeExample('Vai~ lon` luon dau cat moi');
          }}
        >
          Cắt đầu cắt moi ??
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  text: getHomeExamples(state),
});

const mapDispatchToProps = (dispatch) => ({
  editHomeExample: (text) => dispatch(editHomeExample(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
