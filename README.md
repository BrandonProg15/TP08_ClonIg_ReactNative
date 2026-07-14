instalar: npx expo install @react-native-async-storage/async-storage

## 1. Estructura de Directorios

```
TP08_ClonIg_ReactNative/
├── App.js                      # Componente raíz - Stack Navigation
├── components/
│   ├── Header.jsx              # Encabezado (logo + botones)
│   ├── Historias.jsx           # Carrusel de stories (gradiente circular)
│   ├── Feed.jsx                # Contenedor de FlatList posts
│   ├── Post.jsx                # Componente atómico individual
│   ├── Detalle.jsx             # Vista ampliada del post
│   └── NavBar.jsx              # Navegación inferior (5 botones)
├── screens/
│   ├── HomeScreen.jsx          # Composición: Header + Historias + Feed + NavBar
│   └── ProfileScreen.jsx       # Perfil con feed en grid 3x3
└── assets/                     # Recursos estáticos

## 2. Componentes Atómicos

### Header.jsx
- **Propósito:** Encabezado con logo "Instagram" y botones de acción (➕ crear, ➤ mensajes)
- **Props:** Ninguna
- **Estado:** Ninguno
- **Hooks:** Ninguno
- **Justificación:** Componente sin lógica reutilizable en HomeScreen y ProfileScreen

### Historias.jsx
- **Propósito:** Carrusel horizontal de stories con gradiente circular
- **Props:** Ninguna
- **Estado:** `[publicaciones, loading, error]` (useState)
- **Hooks:** `useState`, `useEffect`
- **Flujo:** useEffect fetches 10 imágenes de The Cat API → renderiza FlatList horizontal con LinearGradient
- **Justificación:** Componente de presentación que consume API y maneja su propio ciclo de vida

### Feed.jsx
- **Propósito:** Contenedor del feed vertical de publicaciones
- **Props:** Ninguna
- **Estado:** `[publicaciones, loading, error]` (useState)
- **Hooks:** `useState`, `useEffect`
- **Herencia de Datos:** Pasa cada `post` al componente hijo `Post` → `<Post post={item} />`
- **Justificación:** Componente contenedor que actúa como orquestador de datos (fetch + delegación)

### Post.jsx ⭐ **Componente Nuclear**
- **Propósito:** Publicación individual con interacciones (likes, comentarios, compartir)
- **Props Recibidas:** `{ post: { id, url } }`
- **Estado:** `[likes]` (useState) → sincronizado con AsyncStorage
- **Hooks:** `useState`, `useEffect`, `useNavigation`
- **Herencia de Datos:**
  ```javascript
  // Recibe del padre (Feed)
  <Post post={item} />
  
  // Comunica con hermano (Detalle) vía navegación
  navigation.navigate('Detalle', { id: post.id, url: post.url })
  ```
- **Interacción:** Toca imagen → navega a Detalle con parámetros
- **Funcionalidad de Likes:**
  - Al montar: carga likes de AsyncStorage
  - onClick: añade/elimina del array
  - Persiste cambios en AsyncStorage
- **Justificación:** Componente atómico que encapsula toda la lógica de post individual

### Detalle.jsx
- **Propósito:** Vista ampliada del post con comentarios y sincronización de likes
- **Props Obtenidas:** `{ id, url }` de route.params
- **Estado:** `[likes]` (useState) → sincronizado con AsyncStorage
- **Hooks:** `useState`, `useEffect`, `useRoute`, `useNavigation`
- **Relación con Post:** Comparten el mismo AsyncStorage "MisLikes" → likes modificados aquí se reflejan en Post
- **Comentarios:** Array estático (data mockada) para demostración
- **Justificación:** Componente de detalle que sincroniza estado global via AsyncStorage

### NavBar.jsx
- **Propósito:** Barra de navegación con 5 botones (🏠 Home, ▶️ Reels, ➤ DM, 🔎 Search, 👤 Profile)
- **Props:** Ninguna
- **Estado:** Ninguno
- **Hooks:** `useNavigation`
- **Navegación:**
  ```javascript
  Home → navigation.navigate('HomeScreen')
  Profile → navigation.navigate('ProfileScreen', {url: avatarUrl})
  ```
- **Justificación:** Componente de navegación reutilizable ubicado en screens

### HomeScreen.jsx y ProfileScreen.jsx
- **Propósito:** Pantallas raíz que componen múltiples componentes
- **HomeScreen:** Header + Historias + Feed + NavBar
- **ProfileScreen:** Header + Avatar + Stats + Bio + Stories + FlatList grid (3x3) + NavBar
- **Justificación:** Screens orquestan la composición final de componentes menores

---

## 3. Gestión de Estados (Hooks)

### Estados por Componente

| Componente | Hook | Estado | Tipo |
|---|---|---|---|
| **Header** | - | - | Funcional sin estado |
| **Historias** | `useState` | `publicaciones`, `loading`, `error` | Local |
| **Feed** | `useState` | `publicaciones`, `loading`, `error` | Local |
| **Post** | `useState` | `likes: Array<id>` | Local → Persistido en AsyncStorage |
| **Detalle** | `useState` | `likes: Array<id>` | Sincronizado con AsyncStorage |
| **NavBar** | - | - | Funcional sin estado |
| **ProfileScreen** | `useState` | `publicaciones`, `loading`, `error` | Local |

### Estado Global (Persistente)

**Almacenamiento:** AsyncStorage con clave `"MisLikes"`

**Estructura:**
```javascript
// Array de IDs de posts que el usuario ha likeado
["post_id_1", "post_id_2", "post_id_3"]

**Acceso:** Componentes `Post` y `Detalle`

**Sincronización:** 
- **Lectura** (useEffect): Al montar componente
- **Escritura**: Inmediata tras click en botón de like
- **Propagación**: Automática entre Post y Detalle (comparten misma clave)

### Hooks Especiales Utilizados

| Hook | Componentes | Propósito |
|---|---|---|
| `useState` | Historias, Feed, Post, Detalle, ProfileScreen | Gestión de estado reactivo |
| `useEffect` | Historias, Feed, Post, Detalle, ProfileScreen | Fetch de API y carga de AsyncStorage |
| `useNavigation` | Post, Detalle, NavBar | Navegación programática |
| `useRoute` | Detalle, ProfileScreen | Obtención de route params |
| `Dimensions.get()` | Post, ProfileScreen | Dimensiones dinámicas de viewport |

## 4. Sistema de Navegación

**Stack Navigation (React Navigation v7):**
```
App.js (Root)
├── HomeScreen (initialRouteName)
│   └── Composición: Header + Historias + Feed + NavBar
├── Detalle (route params: { id, url })
└── ProfileScreen (route params: { url })

| Navegación | Origen | Destino | Parámetros |
|---|---|---|---|
| Click imagen | Post | Detalle | `{ id, url }` |
| Click Home | NavBar | HomeScreen | Ninguno |
| Click Perfil | NavBar | ProfileScreen | `{ url }` |