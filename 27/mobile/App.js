import * as React from 'react';
import { useState } from 'react';
import { View, FlatList, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Avatar, Button, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DUMMY_ROOMS = [
  { id: '1', name: 'AI와의 대화', lastMessage: '안녕하세요!', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: '개발자 모임', lastMessage: '회의는 내일 2시입니다.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
];

const DUMMY_MESSAGES = {
  '1': [
    { id: 'm1', text: '안녕하세요!', sender: 'me', time: '오후 4:50' },
    { id: 'm2', text: '무엇을 도와드릴까요?', sender: 'ai', time: '오후 4:51' },
  ],
  '2': [
    { id: 'm3', text: '회의는 내일 2시입니다.', sender: 'dev', time: '오후 4:40' },
    { id: 'm4', text: '확인했습니다.', sender: 'me', time: '오후 4:41' },
  ],
};

function ChatRoomList({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="채팅" />
      </Appbar.Header>
      <FlatList
        data={DUMMY_ROOMS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.lastMessage}
            left={props => <Avatar.Image size={48} source={{ uri: item.avatar }} />}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id, roomName: item.name })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
      />
    </View>
  );
}

function ChatRoom({ route }) {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState(DUMMY_MESSAGES[roomId] || []);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => route.params.navigation.goBack()} />
        <Appbar.Content title={roomName} />
      </Appbar.Header>
      <FlatList
        style={{ flex: 1, padding: 10 }}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.sender === 'me' ? styles.myMessage : styles.otherMessage
          ]}>
            <Text style={{ color: item.sender === 'me' ? '#fff' : '#222' }}>{item.text}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ChatRoomList" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ChatRoomList" component={ChatRoomList} />
          <Stack.Screen name="ChatRoom" component={props => <ChatRoom {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  myMessage: {
    backgroundColor: '#4f92ff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
  timeText: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#4f92ff',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
});