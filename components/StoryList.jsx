import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Historias() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('https://api.thecatapi.com/v1/images/search?limit=10')
            .then((response) => {
                setPublicaciones(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="small" color="#999" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error al cargar historias</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={publicaciones}
                horizontal
                showsHorizontalScrollIndicator={false} 
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listPadding}
                renderItem={({ item }) => (
                    <View style={styles.storyContainer}>
                    
                        <LinearGradient
                            colors={['#CA1D7E', '#E35157', '#F2703F']}
                            start={{ x: 0.0, y: 1.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            style={styles.gradientBorder}
                        >
     
                            <View style={styles.whiteSpacer}>
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.avatar}
                                />
                            </View>
                        </LinearGradient>
                        <Text style={styles.username} numberOfLines={1}>
                            gato_{item.id.toLowerCase()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dbdbdb', 
    },
    listPadding: {
        paddingHorizontal: 10,
    },
    storyContainer: {
        alignItems: 'center',
        marginHorizontal: 7,
        width: 76, 
    },
    gradientBorder: {
        width: 74,
        height: 74,
        borderRadius: 37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteSpacer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32, 
        backgroundColor: '#eee', 
    },
    username: {
        fontSize: 11,
        color: '#262626',
        marginTop: 5,
        textAlign: 'center',
        width: '100%',
    },
    center: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 12,
        color: '#999',
    },
});
