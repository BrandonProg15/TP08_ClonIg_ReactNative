import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Post({ post }) {
    const navigation = useNavigation();
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const cargarLikes = async () => {
            try {
                const storedLikes = await AsyncStorage.getItem("MisLikes");
                if (storedLikes) {
                    setLikes(JSON.parse(storedLikes));
                }
            } catch (error) {
                console.error("Error cargando likes:", error);
            }
        };
        cargarLikes();
    }, []);

    const tieneLike = likes.includes(post.id);

    const añadirLikes = async (id) => {
        let nuevosLikes;

        if (likes.includes(id)) {
            nuevosLikes = likes.filter(likeId => likeId !== id);
        } else {
            nuevosLikes = [...likes, id];
        }

        setLikes(nuevosLikes);

        try {
            await AsyncStorage.setItem("MisLikes", JSON.stringify(nuevosLikes));
        } catch (error) {
            console.error("Error guardando likes:", error);
        }
    };

    return (
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
                    <TouchableOpacity onPress={() => añadirLikes(post.id)} style={styles.actionButton}>
                        <Text style={styles.actionIcon}>{tieneLike ? "❤️" : "🤍"}</Text>
                        <Text style={styles.actionCount}>{tieneLike ? 1201 : 1200}</Text>
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
    );
}

const styles = StyleSheet.create({
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
});
