import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task, onPress, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.titulo} numberOfLines={1}>{task.titulo}</Text>
        <PriorityBadge prioridade={task.prioridade} />
      </View>
      <Text style={styles.descricao} numberOfLines={2}>{task.descricao}</Text>
      <View style={styles.footer}>
        <Text style={styles.prazo}>📅 {task.prazo ?? 'Sem prazo'}</Text>
        <Text style={task.concluida ? styles.concluida : styles.pendente}>
          {task.concluida ? '✅ Concluída' : '⏳ Pendente'}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.del}>🗑</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  titulo: { fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 8 },
  descricao: { color: '#666', fontSize: 13, marginBottom: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prazo: { fontSize: 12, color: '#888' },
  concluida: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
  pendente: { fontSize: 12, color: '#FF9800', fontWeight: 'bold' },
  del: { fontSize: 18 },
});