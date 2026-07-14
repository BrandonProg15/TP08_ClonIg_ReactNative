import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Detalle() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, url } = route.params || {};
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

    const comentarios = [
        { usuario: 'michi_lover', texto: 'qué lindo!! 😍' },
        { usuario: 'gatito_fan', texto: 'me encanta 🐱' },
        { usuario: 'cat.world', texto: 'hermoso gatito' },
    ];

    const tieneLike = likes.includes(id);

    const añadirLikes = async (postId) => {
        let nuevosLikes;

        if (likes.includes(postId)) {
            nuevosLikes = likes.filter(likeId => likeId !== postId);
        } else {
            nuevosLikes = [...likes, postId];
        }

        setLikes(nuevosLikes);

        try {
            await AsyncStorage.setItem("MisLikes", JSON.stringify(nuevosLikes));
        } catch (error) {
            console.error("Error guardando likes:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Publicacion publicacionosa</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.postCard} showsVerticalScrollIndicator={false}>
                <View style={styles.postHeader}>
                    <Image
                        source={{ uri: "https://pravatar.cc" }}
                        style={styles.avatar}
                    />
                    <Text style={styles.usuario}>usuario_instagram</Text>
                </View>

                {url && (
                    <Image
                        source={{ uri: url }}
                        style={styles.postImage}
                    />
                )}

                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => añadirLikes(id)} style={styles.likeButton}>
                        <Text style={styles.likeIcon}>{tieneLike ? "❤️" : "🖤"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.postInfoContainer}>
                    <Text style={styles.postInfo}>{likes.length} Me gusta</Text>
                </View>

                <View style={styles.postComentarios}>
                    {comentarios.map((c, index) => (
                        <Text key={index} style={styles.comentarioTexto}>
                            <Text style={styles.bold}>{c.usuario} </Text>
                            {c.texto}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dbdbdb',
        paddingHorizontal: 10,
    },
    backButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    backButtonText: {
        fontSize: 34,
        color: '#000',
        fontWeight: '300',
        lineHeight: 34,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    headerSpacer: {
        width: 35, 
    },
    postCard: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
    },
    usuario: {
        fontSize: 13,
        fontWeight: '600',
        color: '#262626',
    },
    postImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 6,
    },
    likeButton: {
        marginRight: 15,
    },
    likeIcon: {
        fontSize: 24,
    },
    postInfoContainer: {
        paddingHorizontal: 14,
        paddingBottom: 8,
    },
    postInfo: {
        fontSize: 14,
        fontWeight: '600',
        color: '#262626',
    },
    postComentarios: {
        paddingHorizontal: 14,
        paddingBottom: 15,
    },
    comentarioTexto: {
        marginVertical: 3,
        fontSize: 14,
        color: '#262626',
    },
    bold: {
        fontWeight: '700',
        color: '#262626',
    },
});

export default Detalle;
