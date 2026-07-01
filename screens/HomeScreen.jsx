import { View, StyleSheet, SafeAreaView } from 'react-native';
import Historias from '../components/Historias';
import Feed from '../components/Feed';
import Navbar from '../components/NavBar';
import Header from '../components/Header';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Header />
                <Historias />
                <Feed />
                <Navbar />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
