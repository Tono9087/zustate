import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { useSetListStore } from './store';

// COMPONENTE 1: Input para agregar tareas
const TareaInput = () => {
  const [texto, setTexto] = useState('');
  const agregarTarea = useSetListStore((state) => state.agregarTarea);

  const handleAgregar = () => {
    if (texto.trim() === '') return;
    agregarTarea(texto);
    setTexto('');
  };

  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Nueva Canción</Text>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Nombre de la canción..."
        placeholderTextColor="#888"
      />
      <Button title="Agregar" onPress={handleAgregar} color="#39ff14" />
    </View>
  );
};

// COMPONENTE 2: Lista de tareas
const TareaLista = () => {
  const tareas = useSetListStore((state) => state.tareas);
  const eliminarTarea = useSetListStore((state) => state.eliminarTarea);

  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Canciones</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tareaItem}>
            <Text style={styles.tareaTexto}>{item.texto}</Text>
            <Button title="X" onPress={() => eliminarTarea(item.id)} color="#ff4444" />
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <TareaInput />
      <TareaLista />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#111', padding: 8 },
  caja: { margin: 10, padding: 20, backgroundColor: '#222', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#39ff14' },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  input: { width: '100%', borderWidth: 1, borderColor: '#39ff14', color: '#fff', padding: 8, borderRadius: 6, marginBottom: 10 },
  tareaItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 4 },
  tareaTexto: { color: '#fff', fontSize: 16, flex: 1 },
});