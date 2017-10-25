import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

// import io from 'socket.io-client';

import ChatRoom from './chatRoom.js';
import * as messageActions from '../../actions/MessageActions/chatRoomActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class ChatList extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Chat',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="chat"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  constructor(props) {
    super(props);
  };

  componentDidMount(){
    // this.socket = io('/')
    // this.socket.on('message', message => {
    //   console.log('socket received message', message);
      // this.props.actions.messageChange([...this.props.log, message]);
    // })
    console.log(this.props)
    this.props.actions.getRooms(this.props.uid);

    // get rooms associated with user
    // set rooms = to data for FlatList
    // onPress function to go into room
  }

  _renderItem({item}) {
    <ChatRoom
      id={item.id}
      /* onPressItem={this._onPressItem} */
      /* selected={!!this.state.selected.get(item.id)} */
      /* title={item.title} */
    />
  };

  render() {
    console.log(this.props.rooms[0])

    return (
      <View>
        <FlatList 
          data={this.props.rooms}
          renderItem={({item}) =>  
          <TouchableHighlight
          underlayColor='rgba(192,192,192,0.6)'
        >
        <View>
          <ListItem
          onPress={() =>
            this.props.navigation.navigate('ChatRoom', item)
          }
            title={`${item._id}`}
            id={item._id}
          />
          </View>
          </TouchableHighlight>
          }
        />
        <View>
          <MaterialIcons
              name="menu"
              size={24}
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons>
        </View>
      </View>
    )
  };
}

// add rooms to state
const state = (store) => {
  return {
    rooms: store.Rooms.rooms,
    uid: store.Auth.ownerInfo[0]._id,    
  }
}

const messageDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(messageActions, dispatch),
  }
};

export default connect(state, messageDispatch)(ChatList);