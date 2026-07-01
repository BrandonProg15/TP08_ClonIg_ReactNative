import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Feed() {
    const navigation = useNavigation();
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(false);
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
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>CARGANDOOO</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.feedContainer}>
            <FlatList
                data={publicaciones}
                keyExtractor={(post) => post.id}
                numColumns={3}
                renderItem={({ item: post }) => (
                    <TouchableOpacity
                        style={styles.feedPost}
                        onPress={() =>
                            navigation.navigate('Detail', { id: post.id, url: post.url })
                        }
                    >
                        <Image
                            source={{ uri: post.url }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feedPost: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
