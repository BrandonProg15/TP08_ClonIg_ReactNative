import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.headerIcon}>➕</Text>
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Instagram</Text>
            </View>

            <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.headerIcon}>➤</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dbdbdb',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    headerIcon: {
        fontSize: 22,
        color: '#262626',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: '700',
        fontStyle: 'italic',
        color: '#262626',
        letterSpacing: 0.5,
    },
});
