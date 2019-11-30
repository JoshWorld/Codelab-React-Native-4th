import React from 'react';
import Button from '../components/Button';
import { AsyncStorage } from 'react-native';
import { FlatList, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { withContext } from 'context-q';

const ListItemView = styled.View`
    padding: 8px 16px;
    border-bottom-color: #e5e5e5;
    border-bottom-width: 1px;
`;

let ListItem = props => (
    <TouchableOpacity onPress={ props.onPress }>
        <ListItemView>
            <Text style={{ fontSize: props.context.fontSize }}>
                { props.item.date } / { props.item.subject }
            </Text>
        </ListItemView>
    </TouchableOpacity>
);
ListItem = withContext( ListItem );

const DiaryList = props => {
    const [ list, setList ] = React.useState( [] );
    const loadData = async () => {
        let list = await AsyncStorage.getItem( 'diary' );
        list = list ? JSON.parse( list ) : [];
        setList( list );
    };
    return (
        <>
            <NavigationEvents
                onDidFocus={ loadData }
            />
            <Button onPress={ () => props.navigation.navigate( 'Form' )}>
                일기 작성
            </Button>
            <FlatList data={ list }
                renderItem={ itemProps =>
                    <ListItem { ...itemProps }
                        onPress={ () =>
                            props.navigation.navigate( 'Detail', { id: itemProps.item.id } ) }/> }
                keyExtractor={ item => item.id }/>
            <Button onPress={ () => props.navigation.navigate( 'Settings' )}>
                설정
            </Button>
        </>
    )
}

export default DiaryList;