import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Detalle() {
    const route = useRoute();

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
        <SafeAreaView>
        <ScrollView style={styles.postCard}>
            <View style={styles.postHeader}>
                <Image 
                    source={{ uri: "https://i.pravatar.cc/40" }} 
                    style={styles.avatar} 
                />
                <Text style={styles.usuario}>usuario</Text>
            </View>

       
            {url && (
                <Image 
                    source={{ uri: url }} 
                    style={styles.postImage} 
                />
            )}


            <View style={styles.postInfoContainer}>
                <Text style={styles.postInfo}>{likes.length} likes</Text>
                
                <TouchableOpacity onPress={() => añadirLikes(id)} style={styles.likeButton}>
                    <Text style={styles.likeIcon}>{tieneLike ? "❤️" : "🤍"}</Text>
                </TouchableOpacity>
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
    postCard: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    usuario: {
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 300, 
        resizeMode: 'cover',
    },
    postInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    postInfo: {
        fontWeight: '600',
    },
    likeButton: {
        padding: 5,
    },
    likeIcon: {
        fontSize: 24,
    },
    postComentarios: {
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    comentarioTexto: {
        marginVertical: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default Detalle;
