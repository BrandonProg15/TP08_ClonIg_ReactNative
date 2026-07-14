import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Post from './Post';

export default function Feed() {
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
                keyExtractor={(post, index) => `${post.id}-${index}`}
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
                contentContainerStyle={styles.feedContent}
                renderItem={({ item }) => <Post post={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    flatListStyle: {
        flex: 1,
        height: '100%',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    },
    feedContent: {
        paddingBottom: 40,
    },
});
