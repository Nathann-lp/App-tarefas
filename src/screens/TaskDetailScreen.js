import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PriorityBadge from '../components/PriorityBadge';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{task.titulo}</Text>
      <PriorityBadge prioridade={task.prioridade} />

      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{task.descricao || 'Sem descrição'}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.section}>
          <Text style={styles.label}>Prazo</Text>
          <Text style={styles.value}>📅 {task.prazo ?? '—'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Horas Estimadas</Text>
          <Text style={styles.value}>⏱ {task.horasEstimadas ?? '—'}h</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={task.concluida ? styles.concluida : styles.pendente}>
          {task.concluida ? '✅ Concluída' : '⏳ Pendente'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate('TaskForm', { task })}
      >
        <Text style={styles.editText}>✏️ Editar tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  section: { marginTop: 20 },
  label: { fontSize: 12, color: '#888', textTransform: 'uppercase', marginBottom: 4 },
  value: { fontSize: 16, color: '#333' },
  row: { flexDirection: 'row', gap: 24 },
  concluida: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
  pendente: { fontSize: 16, color: '#FF9800', fontWeight: 'bold' },
  editBtn: { marginTop: 40, alignItems: 'center', backgroundColor: '#6200ee', padding: 14, borderRadius: 12 },
  editText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});