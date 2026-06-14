import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks, deleteTask } from '../api/api';
import TaskCard from '../components/TaskCard';

const FILTROS = ['Todas', 'Pendentes', 'Concluídas'];

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.\nVerifique se o backend está rodando.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchTasks(); }, []));

  const handleDelete = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        }
      }
    ]);
  };

  const tasksFiltradas = tasks.filter(t => {
    if (filtroAtivo === 'Pendentes') return !t.concluida;
    if (filtroAtivo === 'Concluídas') return t.concluida;
    return true;
  });

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6200ee" />;

  return (
    <View style={styles.container}>

      {/* Barra de filtros */}
      <View style={styles.filtroContainer}>
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroBtn, filtroAtivo === f && styles.filtroBtnAtivo]}
            onPress={() => setFiltroAtivo(f)}
          >
            <Text style={[styles.filtroText, filtroAtivo === f && styles.filtroTextAtivo]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contador */}
      <Text style={styles.contador}>
        {tasksFiltradas.length} tarefa{tasksFiltradas.length !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={tasksFiltradas}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchTasks(); }}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa encontrada.</Text>
        }
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm', { task: null })}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  filtroContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  filtroBtn: {
    flex: 1, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: '#ddd',
    alignItems: 'center',
  },
  filtroBtnAtivo: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  filtroText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filtroTextAtivo: { color: '#fff' },
  contador: {
    fontSize: 12, color: '#999',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 2,
  },
  empty: { textAlign: 'center', marginTop: 60, color: '#aaa', fontSize: 16 },
  fab: {
    position: 'absolute', bottom: 24, right: 24,
    backgroundColor: '#6200ee', width: 56, height: 56,
    borderRadius: 28, alignItems: 'center', justifyContent: 'center',
    elevation: 6,
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 32 },
});