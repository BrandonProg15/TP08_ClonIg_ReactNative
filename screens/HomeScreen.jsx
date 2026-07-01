import { View } from 'react-native';
import Historias from '../components/Historias';
import Feed from '../components/Feed';

export default function HomeScreen() {
    return (
        <View>
            <Historias />
            <Feed />
        </View>
    );
}