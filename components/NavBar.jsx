import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
    const navigation = useNavigation();
    const avatarUrl = "https://i.pravatar.cc/30";
    return (
        <View style={styles.navContainer}>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Text style={styles.navIcon}>🏠</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navIcon}>▶️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navIcon}>➤</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navIcon}>🔎</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('ProfileScreen', {url: avatarUrl})}
            >
                <Image
                    source={{ uri: avatarUrl }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: '#efefef',
    },
    navButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    navIcon: {
        fontSize: 22,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#eee',
    },
});
