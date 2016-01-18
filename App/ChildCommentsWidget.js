/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
} = React;

var ChildCommentsWidget = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.comment,
            children: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentDidMount: function() {
        if(this.state.data.length > 0) {
            this.setState({
                children: this.state.children.cloneWithRows(this.state.data)
            });
        }
    },

    render: function() {
        if(this.state.data.length == 0) {
            return (<View></View>);
        }
        return (
            <ListView
            dataSource={this.state.children}
            renderRow={this.renderPosts}
            style={{flex: 1, marginTop: 5, marginBottom: 5}}>
            </ListView>
        );
    },

    renderPosts: function(comment) {
        return (
            <View style={styles.container}>
            <Image source={{uri: comment.user.image_url['50px'] }} style={styles.thumbnail} />

            <View style={{flex: 1 }}>
            <Text style={styles.body}>{comment.body}</Text>
            <Text style={styles.votes}>{comment.votes} Vote(s) | {comment.user.name}</Text>
            </View>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 50,
    },
    body: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    votes: {
        fontSize: 10,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = ChildCommentsWidget;
