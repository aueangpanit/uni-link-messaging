import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

class FriendList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ request }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.dataSource = ds.cloneWithRows(request);
  }

  renderRow(request) {
    return <ListItem request={request} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const { friendRequest } = state.user;

  const request = _.map(friendRequest, (receivers, sender) => {
    return { sender, receiver: _.map(receivers, (val, receiver) => receiver) };
  });

  return { request };
};

FriendList = connect(mapStateToProps)(FriendList);
export { FriendList };
