import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import axios from 'axios';
import Navbar from '../components/NavBar';


const { width } = Dimensions.get('window');
const itemSize = width / 3;

export default function ProfileScreen() {
    const route = useRoute();
    const { url } = route.params || { url: "https://pravatar.cc" };

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
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <View style={styles.avatarBorder}>
                    <Image source={{ uri: url }} style={styles.avatar} />
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>833K</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>405</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bioContainer}>
                <Text style={styles.name}>FanDeEFSI</Text>
                <Text style={styles.category}>EFSIADOR</Text>
                <Text style={styles.bioText}>📸 Efsi es la mejor materia aguante Jessi</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Following ∨</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Email</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.storiesWrapper}>
                <FlatList
                    data={publicaciones}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => 'story_' + item.id}
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
                                        style={styles.storyAvatar}
                                    />
                                </View>
                            </LinearGradient>
                            <Text style={styles.storyUsername} numberOfLines={1}>
                                gato_{item.id.toLowerCase()}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
                    <Text style={styles.tabIcon}>⣿</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabIcon}>▶️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabIcon}>👤</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error: no se pudo cargar el perfil</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={publicaciones}
                    keyExtractor={(item) => 'grid_' + item.id}
                    numColumns={3}
                    ListHeaderComponent={renderHeader}
                    style={styles.flatListStyle}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.gridItem}>
                            <Image source={{ uri: item.url }} style={styles.gridImage} />
                        </TouchableOpacity>
                    )}
                />
                <Navbar />
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    flatListStyle: {
        flex: 1,
        height: '100%',
    },
    listContent: {
        paddingBottom: 80,
    },
    headerContainer: {
        paddingTop: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    avatarBorder: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 2,
        borderColor: '#dbdbdb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 78,
        height: 78,
        borderRadius: 39,
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#262626',
    },
    statLabel: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    bioContainer: {
        paddingHorizontal: 16,
        marginTop: 12,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#262626',
    },
    category: {
        color: '#8e8e8e',
        fontSize: 13,
        marginVertical: 2,
    },
    bioText: {
        fontSize: 13,
        color: '#262626',
        lineHeight: 18,
    },
    link: {
        color: '#00376b',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 15,
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        height: 32,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 13,
        color: '#262626',
    },
    storiesWrapper: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dbdbdb',
        marginTop: 15,
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
    storyAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee',
    },
    storyUsername: {
        fontSize: 11,
        color: '#262626',
        marginTop: 5,
        textAlign: 'center',
        width: '100%',
    },
    tabBar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        marginTop: 10,
    },
    tabButton: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#262626',
    },
    tabIcon: {
        fontSize: 18,
        color: '#262626',
    },
    gridItem: {
        width: itemSize,
        height: itemSize,
        padding: 1,
    },
    gridImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 14, color: 'red', fontWeight: 'bold',
    },

})