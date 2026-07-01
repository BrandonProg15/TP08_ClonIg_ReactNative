import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function Feed() {
    const navigation = useNavigation();
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
                keyExtractor={(post) => post.id}
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
                contentContainerStyle={styles.feedContent}
                renderItem={({ item: post }) => (
                    <View style={styles.postContainer}>

                        <View style={styles.postHeader}>
                            <View style={styles.userInfo}>
                                <Image
                                    source={{ uri: "https://i.pravatar.cc/40" }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.username}>usuario cool</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.optionsIcon}>•••</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate('Detalle', { id: post.id, url: post.url })
                            }
                        >
                            <Image
                                source={{ uri: post.url }}
                                style={styles.mainImage}
                            />
                        </TouchableOpacity>

                        <View style={styles.actionsBar}>
                            <View style={styles.leftActions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>🤍</Text>
                                    <Text style={styles.actionCount}>1.2K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>💬</Text>
                                    <Text style={styles.actionCount}>57</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>🔁</Text>
                                    <Text style={styles.actionCount}>24</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>✈️</Text>
                                    <Text style={styles.actionCount}>6</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.actionIcon}>📥</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
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
    postContainer: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    username: {
        fontWeight: '600',
        fontSize: 14,
        color: '#262626',
    },
    optionsIcon: {
        fontSize: 14,
        color: '#262626',
        letterSpacing: -1,
    },
    mainImage: {
        width: width,
        height: width,
        resizeMode: 'cover',
    },
    actionsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    actionIcon: {
        fontSize: 20,
    },
    actionCount: {
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 4,
        color: '#262626',
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
